function InvoiceHandler(config) {
    this.id       = null;
    this.year     = null;
    this.month    = null;
    this.loader   = null;
    this.content  = '';
    this.isResend = false;
    this.disabledSubmit = false;
    $(config.modalSelector).find('.btn-send').prop('disabled', true);
    this.init = function() {
        this.bindModalEvents();
        this.generateMonth();
        this.generateYear();
        this.bindSendInvoiceClick();
        this.bindChangeEvent();
        this.bindSubmitEvent();
        this.bindViewEmail();
    }

    this.bindModalEvents = function() {
        var that = this;
        $(config.modalSelector).on('shown.bs.modal', function () {});
        $(config.modalSelector).on('hidden.bs.modal', function () {
            $(config.modalSelector).find('.modal-footer').find('.btn-preview').remove();
            $(config.modalSelector).find('.modal-footer').find('.btn-review').remove();
            $(config.modalSelector).find('.warning-message').empty();
            $(config.inputMonthSelector).prop('selectedIndex', 0);
            $(config.inputYearSelector).prop('selectedIndex', 0);
            ButtonLoader.hide($(config.modalSelector).find('.btn-send'));
            $(config.modalSelector).find('.btn-send').prop('disabled', true);
            that.isResend = false;
            that.month = null;
            that.year = null;
            that.id = null;
        });
        $(config.mailContentModalSelector).on('shown.bs.modal', function () {});
        $(config.mailContentModalSelector).on('hidden.bs.modal', function () {
            $(config.mailContentModalSelector).find('.mail-body').empty();
        });
    }

    this.generateMonth = function() {
        var months = '';
        for (let i = 1; i <= 12; i++) {
            i = ('0' + i).slice(-2);
            months += `<option value=${i}>${i}</option>`;
        }
        $(config.inputMonthSelector).append(months);
    }

    this.generateYear = function () {
        var years = '';
        let currentYear = (new Date()).getFullYear();
        for (let i = currentYear; i >= (currentYear - 1); i--) {
            years += `<option value=${i}>${i}</option>`;
        }
        $(config.inputYearSelector).append(years);
    }

    this.bindSendInvoiceClick = function() {
        var that = this;
        $(config.sendMailBtnSelector).on('click', function(e) {
            that.id = $(e.target).data('id');
            $(config.modalSelector).modal('show');
        });
    },

    this.bindViewEmail = function() {
        var that = this;
        $(config.viewEmailBtn).on('click', function(e) {
            let currentDate = new Date();
            let month = currentDate.getMonth() + 1 + '/' + currentDate.getFullYear();
            that.id = $(e.target).data('id');
            $.ajax({
                type: 'POST',
                url: `${appUrl}/owner/companies/${that.id}/get-email-data`,
                data: {'company_id': that.id, 'month': month},
                beforeSend: function () {
                    ButtonLoader.show(e.target);
                    $(e.target).parent().find('.loading').append(`<div class="loader-icon"></div>`);
                },
                success: function (res) {
                    let query = {
                        id: that.id,
                        month: month
                    };
                    let emailData = res.data;
                    that.content = `
                    <div class="mail-header" style="width: 650px; margin: 0 auto; padding: 25px; font-weight: 600;">
                        <h4 style="font-weight: 600;">${trans(translations['language']['maillogs']['mail_subject'])}: ${emailData['subject']}</h4>
                        <p>${trans(translations['language']['common.attachment'])}: <a href="${iaUrl}/owner/subscription/download-file?${$.param(query)}" target="_blank" title="${emailData['subject']}">${trans(translations['language']['common.download'])}</a></p>
                        <p>${trans(translations['language']['maillogs']['sending_date'])}: ${emailData['sendingDate']}</p>
                    </div>
                    ${emailData['body']}
                `;
                    $(config.mailContentModalSelector).find('.mail-body').append(that.content);
                    $(config.mailContentModalSelector).modal('show');
                },
                error: function (err) {
                    toastr.error(err.responseJSON.message, {timeOut: 4000});
                },
                complete: function () {
                    ButtonLoader.hide(e.target);
                    $(e.target).parent().find('.loader-icon').remove();
                }
            });
        });
    }

    this.bindChangeEvent = function () {
        var that = this;
        $(config.inputMonthSelector).on('change', function (e) {
            $(config.modalSelector).find('.warning-message').empty();
            that.disableAction();
            ButtonLoader.hide($(config.modalSelector).find('.btn-send'));
            that.content = '';
            that.disabledSubmit = false;
            that.month = $(e.target).val();
            if (! isNaN(parseInt(that.month)) && ! isNaN(parseInt(that.year))) {
                let months = that.month + '/' + that.year;
                that.getEmailData(months);
            }
        });
        $(config.inputYearSelector).on('change', function (e) {
            $(config.modalSelector).find('.warning-message').empty();
            that.disableAction();
            ButtonLoader.hide($(config.modalSelector).find('.btn-send'));
            that.content = '';
            that.disabledSubmit = false;
            that.year =  $(e.target).val();
            if (! isNaN(parseInt(that.month)) && ! isNaN(parseInt(that.year))) {
                let months = that.month + '/' + that.year;
                that.getEmailData(months);
            }
        });
    }

    this.showContent = function (sentFlg, data) {
        var target = null;
        var that = this;
        if (sentFlg == true) {
            target = $(config.reviewBtnSelector);
            data.forEach(function (value, index) {
                let query = {
                    id: that.id,
                    month: `${that.month}/${that.year}`
                };
                that.content += `
                    <div class="mail-header" style="width: 650px; margin: 0 auto; padding: 25px; font-weight: 600;">
                        <p>${trans(translations['language']['maillogs']['mail_send_to'])}: ${value.sendTo}</p>
                        <h4 style="font-weight: 600;">${trans(translations['language']['maillogs']['mail_subject'])}: ${value.subject}</h4>
                        <p>${trans(translations['language']['common.attachment'])}: <a href="${iaUrl}/owner/subscription/download-file?${$.param(query)}" target="_blank" title="${value.subject}">${trans(translations['language']['common.download'])}</a></p>
                        <p>${trans(translations['language']['common.date_time'])}: ${value.sendingDate}</p>
                    </div>
                    ${value.body}
                    <div style="width: 650px; margin: 0 auto; padding: 5px 25px;"><hr/></div>
                `;
            });
        } else {
            target = $(config.previewBtnSelector);
            let query = {
                id: that.id,
                month: `${that.month}/${that.year}`
            };
            that.content = `
                <div class="mail-header" style="width: 650px; margin: 0 auto; padding: 25px; font-weight: 600;">
                    <h4 style="font-weight: 600;">${trans(translations['language']['maillogs']['mail_subject'])}: ${data['subject']}</h4>
                    <p>${trans(translations['language']['common.attachment'])}: <a href="${iaUrl}/owner/subscription/download-file?${$.param(query)}" target="_blank" title="${data['subject']}">${trans(translations['language']['common.download'])}</a></p>
                </div>
                ${data['body']}
            `;
        }

        target.on('click', function () {
            $(config.mailContentModalSelector).find('.mail-body').append(that.content);
            $(config.mailContentModalSelector).modal('show');
        });
    }

    this.bindSubmitEvent = function() {
        var that = this;
        $(config.modalSelector).find('.btn-send').on('click', function () {
            if (isNaN(parseInt(that.month)) || isNaN(parseInt(that.year)) || that.disabledSubmit) {
                return false;
            }
            if (that.isResend) {
                $(config.modalSelector).css('opacity', 0);
                $.confirm({
                    text: trans(translations['text']['confirm_send_invoice']),
                    title: trans(translations['mission']['confirmation']),
                    confirm: function() {
                        $(config.modalSelector).css('opacity', 1);
                        that.submitExecution();
                    },
                    cancel: function() {
                        $(config.modalSelector).css('opacity', 1);
                    },
                    hiddenEvent: function () {
                        $(config.modalSelector).css('opacity', 1);
                    },
                    confirmButton: trans(translations['language']['common.yes']),
                    cancelButton: trans(translations['language']['common.cancel']),
                    dialogClass: "modal-dialog origin-confirm"
                });
            } else {
                that.submitExecution();
            }
        });
    }

    this.getEmailData = function (months) {
        var that = this;
        $.ajax({
            type: 'POST',
            url: `${appUrl}/owner/companies/${that.id}/get-email-data`,
            data: {'company_id': that.id, 'month': months},
            beforeSend: function () {
                ButtonLoader.show(`${config.inputMonthSelector}`);
                ButtonLoader.show(`${config.inputYearSelector}`);
                $(config.modalSelector).find('.loading').append(`<div class="loader-icon"></div>`);
            },
            success: function (res) {
                if (res.sentFlag === true) {
                    $(config.modalSelector).find('.warning-message').append(`<p>${trans(translations['subscription']['invoice']['sent_invoice'])}</p>`)
                    $(config.modalSelector).find('.modal-footer').append(`<a href="javascript:void(0)" class="btn btn-primary btn-review">${trans(translations['language']['common.review'])}</a>`);
                    that.isResend = true;
                } else {
                    $(config.modalSelector).find('.modal-footer').append(`<a href="javascript:void(0)" class="btn btn-primary btn-preview">${trans(translations['language']['common.preview'])}</a>`);
                    that.isResend = false;
                }
                if (!res.hasPaid) {
                    $(config.modalSelector).find('.btn-send').prop('disabled', false);
                } else {
                    $(config.modalSelector).find('.warning-message').append(`<p>${trans(translations['subscription']['invoice']['has_paid'], {name: res.companyName})}</p>`)
                }
                that.showContent(res.sentFlag, res.data);
            },
            statusCode: {
                400: function (err) {
                    if ($(config.modalSelector).find('.warning-message p').length == 0) {
                        $(config.modalSelector).find('.warning-message').append(`<p>${err.responseJSON.message}</p>`);
                        that.disabledSubmit = true;
                        $(config.modalSelector).find('.btn-send').prop('disabled', true);
                    }
                },
                500: function (err) {
                    toastr.error(err.responseJSON.message, {timeOut: 4000});
                }
            },
            error: function (err) {
                //toastr.error(err.responseJSON.message, {timeOut: 4000});
            },
            complete: function () {
                ButtonLoader.hide(`${config.inputMonthSelector}`);
                ButtonLoader.hide(`${config.inputYearSelector}`);
                $(config.modalSelector).find('.loader-icon').remove();
            }
        });
    }

    this.submitExecution = function () {
        var that = this;
        let query = {
            'month': `${that.month}/${that.year}`
        };
        $.ajax({
            type: 'GET',
            url: `${appUrl}/owner/companies/${that.id}/send-manual-invoice?${$.param(query)}`,
            beforeSend: function() {
                ButtonLoader.show('.btn-send');
                ButtonLoader.show('.btn-preview');
                $(config.modalSelector).find('.modal-footer').append(`<div class="loader-icon"></div>`);
            },
            success: function(response) {
                toastr.success(response.message, {timeOut: 4000});
            },
            error: function(err) {
                toastr.error(err.responseJSON.message, {timeOut: 4000})
            },
            complete: function() {
                ButtonLoader.hide('.btn-send');
                ButtonLoader.show('.btn-preview');
                $(config.modalSelector).find('.loader-icon').remove();
                $(config.modalSelector).modal('hide');
            }
        });
    }

    this.getFileName = function (path) {
        return path.split('/').reverse()[0];
    }

    this.toggleInvoiceAuto = function() {
        $(config.switchButton).not('.disabled').click(function() {
            $(this).toggleClass('On').toggleClass('Off');
            var id = $(this).data('id');
            var invoiceValue = $(this).hasClass('On') ? false : true;
            if (invoiceValue) {
                $(this).parent().find(config.buttonSelector).css('display', 'inline-block');
                $(this).parent().find(config.buttonViewEmailSelector).hide();
            } else {
                $(this).parent().find(config.buttonViewEmailSelector).css('display', 'inline-block');
                $(this).parent().find(config.buttonSelector).hide();
            }
            var url = $(this).data('url');
            $.ajax({
                type: 'PUT',
                url: url,
                data: {is_ignored_invoice_receipt: invoiceValue},
                success: function(response) {
                    //
                },
                error: function(err) {
                    //
                }
            });
        });
    }

    this.disableAction = function () {
        $(config.modalSelector).find('.btn-send').prop('disabled', true);
        $(config.modalSelector).find('.modal-footer').find('.btn-preview').remove();
        $(config.modalSelector).find('.modal-footer').find('.btn-review').remove();
    }
}