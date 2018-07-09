/**
 * @author trong.td
 */
function ConfirmPayment(config) {

    const unconfirmed = '<span class="label label-warning">' + trans(translations['subscription']['payment']['unconfirmed']) + '</span>';
    const unpaid = '<span class="label label-default">' + trans(translations['subscription']['payment']['unpaid']) + '</span>';
    const paid = '<span class="label label-success">' + trans(translations['subscription']['payment']['paid']) + '</span>';

    this.showSuccessMessage = function() {
        var companyName = $('.table-paid-companies tr[data-id="' + this.companyId + '"] td a.name').text();
        var message = trans(translations['language']['company.list.confirm_payment_success'], {name: companyName});
        toastr.success(message, {timeOut: 3000})
    }

    this.companyId = null;
    /**
     * @param config
     *      buttonSelector
     *      modalSelector
     *
     */
    this.init = function() {
        this.bindConfirmClick();
        this.bindModalEvents();
        this.bindFormEvent();
    };

    this.bindConfirmClick = function() {
        var _this = this;
        $(config.buttonSelector).on('click', function(){
            _this.companyId = $(this).attr('data-id');
            $(config.modalSelector).modal('show');
            _this.setCompanyName(this);
            _this.setActionForm(_this.companyId);
        });
    };

    this.bindModalEvents = function() {
        var _this = this;
        $(config.modalSelector).on('shown.bs.modal', function () {
            $.get(appUrl + '/owner/companies/'+_this.companyId+'/payment-histories/need-confirm', function(html) {
                $(config.modalSelector).find('.modal-body').html(html);
                ElementLoader.hide("#confirm-payment-modal .modal-content");
            }).error(function() {
                ElementLoader.hide("#confirm-payment-modal .modal-content");
            });
        });
        $(config.modalSelector).on('hidden.bs.modal', function () {
            ElementLoader.show("#confirm-payment-modal .modal-content");
            $(config.modalSelector).find('.modal-title').html('');
            $(config.modalSelector).find('.modal-body').html('');
            $(config.modalSelector).find('.error-confirm').hide();
        });
    };

    this.bindFormEvent = function() {
        var _this = this;
        $(config.modalSelector).on('submit', '.confirm-payment-form', function (event) {
            event.preventDefault();
            var url = $(this).attr('action');
            var data = $(this).serialize();

            var selectedMonths = $(config.modalSelector).find('.confirm-payment-form [name="months[]"]').serializeArray();
            var totalMonths  = $(config.modalSelector).find('.confirm-payment-form [name="months[]"]').length;

            if (selectedMonths.length === 0) {
                $(config.modalSelector).find('.error-confirm').show();
            } else {
                ButtonLoader.show('#confirm-payment-modal .confirm-payment-form [type="submit"]',
                    '#confirm-payment-modal .confirm-payment-form [type="button"], #confirm-payment-modal');
                $(config.modalSelector).find('.error-confirm').hide();

                $.post(url, data, function(res) {
                    if (selectedMonths.length === totalMonths) {
                        $(config.modalSelector).modal('hide');
                        $('.btn-confirm-payment[data-id="'+ _this.companyId + '"]').remove();
                    } else {
                        $.each(selectedMonths, function(index, month) {
                            $(config.modalSelector).find('.confirm-payment-form tr[data-month="' + month.value + '"]').remove();
                        });
                    }
                    if (res.confirm_status === 'unconfirmed') {
                        $('.table-paid-companies tr[data-id="'+ _this.companyId + '"] td.status').html(unconfirmed)
                    } else if (res.confirm_status === 'unpaid') {
                        $('.table-paid-companies tr[data-id="'+ _this.companyId + '"] td.status').html(unpaid)
                    } else if (res.confirm_status === 'paid') {
                        $('.table-paid-companies tr[data-id="'+ _this.companyId + '"] td.status').html(paid)
                    }
                    _this.showSuccessMessage();
                    ButtonLoader.hide('#confirm-payment-modal .confirm-payment-form [type="submit"]',
                        '#confirm-payment-modal .confirm-payment-form [type="button"], #confirm-payment-modal');
                }).fail(function() {
                    ButtonLoader.hide('#confirm-payment-modal .confirm-payment-form [type="submit"]',
                        '#confirm-payment-modal .confirm-payment-form [type="button"], #confirm-payment-modal');
                });
            }

            return false;
        });
    };

    this.setCompanyName = function(button) {
        var name = $(button).parents('tr').find('.name').text();
        $(config.modalSelector).find('.modal-title').html(name);
    };

    this.setActionForm = function(companyId) {
        var action = $(config.modalSelector).find('.confirm-payment-form').attr('action');
        action = action.replace('__ID__', companyId);
        $(config.modalSelector).find('.confirm-payment-form').attr('action', action);
    };

    this.startModelLoader = function() {
        $(config.modalSelector).find('.modal-body').html('');
    }
}