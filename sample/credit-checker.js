function CreditChecker (config) {
	this.init = function () {
		this.bindUpdateEvents();
	}

	this.bindUpdateEvents = function () {
		var self = this;
        $(config.buttonSelector).each(function() {
            var companyNumber = $(this).data('company-number');
            var price = $(this).data('price');
            self.ajaxProcess(companyNumber, price);
        });
	}

	this.ajaxProcess = function (companyNumber, price) {
		var url = config.baseUrl + '/' + companyNumber + '/check-paid-credit?price=' + price;
        $.ajax({
            url: url,
            beforeSend: function() {
                //
            },
            success: function(response) {
                var html;
                var status = response.memberStatusCode;
                switch (status) {
                    case 1:
                    case 4:
                        html = '<label class="label label-danger disabled">' + trans(translations['language']['common.fail']) + '</label>';
                        break;
                    case 2:
                    case 3:
                        html = '<label class="label label-success">' + trans(translations['language']['common.success']) + '</label>&nbsp;' +
                        '<button type="button" class="btn btn-primary">' + trans(translations['paid_credit']['cancel_paid']) + '</button>';
                        break;
                    case 0:
                        html = '<label class="label label-default">' + trans(translations['mission']['invalid']) + '</label>';
                        break;
                    default:
                        html = '<label class="label label-default">' + trans(translations['mission']['invalid']) + '</label>';
                        break;
                }
                // Replace loader
                $('.credit-checker[data-company-number="' + companyNumber + '"] i').replaceWith(html);
            },
            error: function(err) {
                var html = '<label class="label label-default"' + trans(translations['mission']['invalid']) + '</label>';
                $('.credit-checker[data-company-number="' + companyNumber + '"] i').replaceWith(html);
            }
        })
	}
}