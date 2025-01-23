viewPayroll($('#ptOptions #viewPayroll'));
function viewPayroll(thisBtn){
    var id = $('#ptOptions input[name="id"]').val();
    var year = $('#ptOptions input[name="year"]').val();
    var month = $('#ptOptions input[name="month"]').val();
    var emp_option = $('#monitoringOption option:selected').val();
    var options = [];
    $.each($('select[name="options[]"] option:selected'), function(index, value) {
        options.push(value);
    });
    var url_table = base_url+'/hrims/payroll/monitoring/partTime/viewPayroll';
    var tid = 'viewPayroll';
    var form_data = {
        url_table:url_table,
        tid:tid,
        id:id,
        year:year,
        month:month,
        emp_option:emp_option,
        options:options
    };
    loadDivwLoader(form_data,thisBtn);
}
