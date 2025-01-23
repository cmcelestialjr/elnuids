
viewDtr($('#ptOptions #viewDtr'));
$(document).off('click', '#viewDtr button[name="schedule"]').on('click', '#viewDtr button[name="schedule"]', function (e) {
    var thisBtn = $(this);
    schedule(thisBtn);
});
function viewDtr(thisBtn){
    var id = $('#ptOptions input[name="id"]').val();
    var year = $('#ptOptions input[name="year"]').val();
    var month = $('#ptOptions input[name="month"]').val();
    var url_table = base_url+'/hrims/payroll/monitoring/partTime/viewDtr';
    var tid = 'viewDtr';
    var form_data = {
        url_table:url_table,
        tid:tid,
        id:id,
        year:year,
        month:month
    };
    loadDivwLoader(form_data,thisBtn);
}
function schedule(thisBtn){
    var id_no = thisBtn.data('id');
    var url = base_url+'/hrims/dtr/schedule';
    var modal = 'primary';
    var modal_size = 'modal-lg';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id_no:id_no
    };
    loadModal(form_data,thisBtn);
}
