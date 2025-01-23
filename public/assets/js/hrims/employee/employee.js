employee_table();
$(document).off('change', '#employeeDiv select[name="option"]').on('change', '#employeeDiv select[name="option"]', function (e) {
    var thisBtn = $('#employeeDiv select[name="option"]');
    var val = $(this).val();
    employee_stat(thisBtn,val);
});
$(document).off('click', '#employeeDiv #selectionDiv button').on('click', '#employeeDiv #selectionDiv button', function (e) {
    var thisBtn = $(this);
    var status = $(this).data('id');
    $('#employeeDiv #selectionDiv button').removeClass('active');
    $(this).addClass('active');
    employee_fetch(thisBtn,status);
});
$(document).off('click', '#employeeViewModal #employee_status').on('click', '#employeeViewModal #employee_status', function (e) {
    var thisBtn = $(this);
    employee_status(thisBtn);
});
$(document).off('click', '#workDiv button[name="newModal"]').on('click', '#workDiv button[name="newModal"]', function (e) {
    var thisBtn = $(this);
    workNewModal(thisBtn,status);
});
$(document).off('click', '#workDiv .workEditModal').on('click', '#workDiv .workEditModal', function (e) {
    var thisBtn = $(this);
    workEditModal(thisBtn);
});
$(document).off('change', '#employeeInfos').on('change', '#employeeInfos', function (e) {
    var thisBtn = $(this);
    var status = $('#employeeDiv #selectionDiv button.active').data('id');
    employee_fetch(thisBtn,status);
});
function employee_table(){
    var thisBtn = $('#employeeDiv select[name="option"]');
    var status = 'default';
    employee_fetch(thisBtn,status);
}
function employee_status(thisBtn){
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/employee/employeeStatus';
    var modal = 'primary';
    var modal_size = 'modal-md';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id
    };
    loadModal(form_data,thisBtn);
}
function employee_fetch(thisBtn,status){
    var option = $('#employeeDiv select[name="option"] option:selected').val();
    var infos = [];

    $('#employeeTableDiv').html('');
    var table ='<table id="employeeTable" class="table table-bordered table-fixed"'+
                        'data-toggle="table"'+
                        'data-search="true"'+
                        'data-height="500"'+
                        'data-buttons-class="primary"'+
                        'data-show-export="true"'+
                        'data-show-columns-toggle-all="true"'+
                        'data-mobile-responsive="true"'+
                        'data-pagination="true"'+
                        'data-page-size="All"'+
                        'data-page-list="[All]"'+
                        'data-loading-template="loadingTemplate"'+
                        '">'+
                        '<thead>'+
        '<tr>'+
            '<th data-field="f1" data-sortable="true" data-align="center">#</th>'+
            '<th data-field="f2" data-sortable="true" data-align="center">Employee ID</th>'+
            '<th data-field="f3" data-sortable="true" data-align="center">Name</th>'+
            '<th data-field="f4" data-sortable="true" data-align="center">Position</th>'+
            '<th data-field="shorten" data-sortable="true" data-align="center">Shorten</th>'+
            '<th data-field="f5" data-sortable="true" data-align="center">Salary</th>'+
            '<th data-field="f6" data-sortable="true" data-align="center">Status</th>'+
            '<th data-field="f7" data-sortable="true" data-align="center">Fund Source</th>'+
            '<th data-field="f8" data-sortable="true" data-align="center">Fund Service</th>';
    $('#employeeDiv #employeeInfos option:selected').each(function() {
        var val = $(this).val();
        var text = $(this).text();
        infos.push(val);
        table += '<th data-field="'+val+'" data-sortable="true" data-align="center">'+text+'</th>';
    });
    table += '<th data-field="f9" data-sortable="true" data-align="center">View</th>'+
            '<th data-field="f10" data-sortable="true" data-align="center">Deduct</th>'+
        '</tr></thead></table>';

    $('#employeeTableDiv').html(table);

    var form_data = {
        url_table:base_url+'/hrims/employee/employeeTable',
        tid:'employeeTable',
        option:option,
        status:status,
        infos:infos
    };
    loadTablewLoader(form_data,thisBtn);
}
function employee_stat(thisBtn,val){
    var status = 'default';
                employee_fetch(thisBtn,status);
    // var form_data = {
    //     val:val
    // };
    // $.ajax({
    //     url: base_url+'/hrims/employee/employeeStat',
    //     type: 'POST',
    //     headers: {
    //         'X-CSRF-TOKEN': CSRF_TOKEN
    //     },
    //     data:form_data,
    //     cache: false,
    //     dataType: 'json',
    //     beforeSend: function() {
    //         thisBtn.attr('disabled','disabled');
    //         thisBtn.addClass('input-loading');
    //     },
    //     success : function(data){
    //         thisBtn.removeAttr('disabled');
    //         thisBtn.removeClass('input-loading');
    //         if(data.result=='success'){
    //             thisBtn.addClass('input-success');
    //             var status = 'all';
    //             employee_fetch(thisBtn,status);
    //         }else{
    //             toastr.error('Error.');
    //             thisBtn.addClass('input-error');
    //         }
    //         setTimeout(function() {
    //             thisBtn.removeClass('input-success');
    //             thisBtn.removeClass('input-error');
    //         }, 3000);
    //     },
    //     error: function (){
    //         toastr.error('Error!');
    //         thisBtn.removeAttr('disabled');
    //         thisBtn.removeClass('input-success');
    //         thisBtn.removeClass('input-error');
    //     }
    // });
}
function workNewModal(thisBtn){
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/employee/work/newModal';
    var modal = 'primary';
    var modal_size = 'modal-xl';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id
    };
    loadModal(form_data,thisBtn);
}
function workEditModal(thisBtn){
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/employee/work/editModal';
    var modal = 'primary';
    var modal_size = 'modal-xl';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id
    };
    loadModal(form_data,thisBtn);
}
