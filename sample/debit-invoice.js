$('#modalComfirmDel').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var paymentId = button.data('id')
    var companyId = button.data('company')
    var actionUrl = button.data('url');
    var modal = $(this)
    modal.find('#formDel').attr('action', actionUrl + '/' + companyId + '/debit-invoices/' + paymentId)
})