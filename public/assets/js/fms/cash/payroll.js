payrollDivDisplay($('.small-box-footer.search'));

$(document).off('click', '.small-box-footer').on('click', '.small-box-footer', function (e) {
    e.preventDefault();
    payrollDivDisplay($(this));
});

$(document).off('click', '#payrollSearchSubmit').on('click', '#payrollSearchSubmit', function (e) {
    e.preventDefault();
    $('#payrollSearchTable').removeClass('hide');
    displaySearchTable();
});
$(document).off('click', '.bank').on('click', '.bank', function (e) {
    bankPayroll($(this));
});
$(document).off('click', '#bank #submit').on('click', '#bank #submit', function (e) {
    bankSubmit($(this));
});
$(document).off('click', 'button[name="submit-list"]').on('click', 'button[name="submit-list"]', function (e) {
    listTable();
});

function displaySearchTable(){
    var thisBtn = $('#payrollSearchSubmit');
    var value = $('#payrollSearchInput').val();
    var form_data = {
        url_table:base_url+'/fms/cash/payroll/search',
        tid:'payrollSearchTable',
        value:value,
    };
    loadTablewLoader(form_data,thisBtn);
}

function listTable(){
    var thisBtn = $('button[name="submit-list"]');
    var payroll_type = $('select[name="payroll_type"] option:selected').val();
    var by = $('select[name="by"] option:selected').val();
    var year = $('select[name="year"] option:selected').val();
    var month = $('select[name="month"] option:selected').val();
    var type = $('select[name="type"] option:selected').val();

    var form_data = {
        url_table:base_url+'/fms/cash/payroll/list',
        tid:'payrollSearchTable',
        payroll_type:payroll_type,
        by:by,
        year:year,
        month:month,
        type:type
    };
    loadTablewLoader(form_data,thisBtn);
}

function payrollDivDisplay(thisBtn){
    $('.small-box-footer').html(' <i class="fa fa-times"></i>');
    $('.small-box-footer').removeClass('active');

    thisBtn.addClass('active');
    thisBtn.html(' <h5><i class="fa fa-check text-default"></i></h5>');

    if($('.small-box-footer.search').hasClass('active')){
        payrollLoaderDisplay();
        setTimeout(function() {
            payrollSearchDisplay();
        }, 200);
    }else{
        payrollListDisplay();
    }
}

function payrollLoaderDisplay(){
    var htmlContent = '<div class="main-item">'+
        '<div class="animated-background" style="height:50px;">'+
            '<div class="background-masker"></div>'+
        '</div><br><br>'+
        '<table style="width:100%">';

    for (var i = 0; i < 10; i++) {
        htmlContent += '<tr>';
        for (var j = 0; j < 2; j++) {
            var bgClass = (i % 2 === 0) ? 'animated-background' : 'static-background';
            htmlContent +=
                '<td>'+
                    '<div class="' + bgClass + '">' +
                        '<div class="background-masker btn-divide-left"></div>'+
                    '</div>'+
                '</td>';
        }
        htmlContent += '</tr>';
    }

    htmlContent += '<tr>'+
                '<td>'+
                    '<div class="animated-background">'+
                        '<div class="background-masker btn-divide-left"></div>'+
                    '</div>'+
                '</td>'+
                '<td>'+
                    '<div class="animated-background">'+
                        '<div class="background-masker btn-divide-left"></div>'+
                    '</div>'+
                '</td>'+
            '</tr>';

    htmlContent += '</table></div>';

    $('#payrollDivDisplay').html(htmlContent);
}

function payrollSearchDisplay(){
    $('#payrollDivDisplay').html('');
    var htmlContent = '<div class="col-12">';
    htmlContent += '<div class="input-group">'+
                        '<input type="text" class="form-control" placeholder="Search payroll..." id="payrollSearchInput" style="height:40px;">'+
                        '<div class="input-group-append">'+
                            '<button class="btn btn-info btn-info-scan" id="payrollSearchSubmit"><i class="fa fa-check"></i></button>'+
                        '</div>'+
                    '</div>';
    htmlContent += '</div>';
    htmlContent += payrollTable();
    $('#payrollDivDisplay').html(htmlContent);
}

function payrollTable(){
    table = '<div class="col-12"><br><table id="payrollSearchTable" class="table table-bordered table-fixed hide"'+
        'data-toggle="table" '+
        'data-search="true" '+
        'data-height="600" '+
        'data-buttons-class="primary" '+
        'data-show-export="true" '+
        'data-show-columns-toggle-all="true" '+
        'data-mobile-responsive="true" '+
        'data-pagination="true" '+
        'data-page-size="10" '+
        'data-page-list="[10, 50, 100, All]" '+
        'data-loading-template="loadingTemplate" '+
        'data-export-types="[\'csv\', \'txt\', \'doc\', \'excel\', \'json\', \'sql\']">';
    table += '<thead>';
    table += '<th data-field="f1" data-sortable="true" data-align="center">#</th>';
    table += '<th data-field="f2" data-sortable="true" data-align="center">Bank</th>';
    table += '<th data-field="f3" data-sortable="true" data-align="center">Payroll ID</th>';
    table += '<th data-field="f4" data-sortable="true" data-align="center">Et Al</th>';
    table += '<th data-field="f5" data-sortable="true" data-align="center">Type</th>';
    table += '<th data-field="f6" data-sortable="true" data-align="center">Amount</th>';
    table += '</thead>';
    table += '</table></div>';
    return table;
}

function payrollListDisplay(){
    var form_data = {
        id:0
    };
    $.ajax({
        url: base_url+'/fms/cash/payroll/listOptions',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        beforeSend: function() {
            payrollLoaderDisplay();
            $('#payrollDivDisplay').html('');
        },
        success : function(data){
            var updatedContent = data + payrollTable();
            $('#payrollDivDisplay').html(updatedContent);
            $('#payrollSearchTable').removeClass('hide');
            $(".select2").select2();
        },
        error: function (){
            toastr.error('Error!');
        }
    });
}

function bankPayroll(thisBtn){
    var id = thisBtn.data('id');
    var x = thisBtn.data('x');
    var url = base_url+'/hrims/payroll/view/bank';
    var modal = 'default';
    var modal_size = 'modal-md';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id,
        x:x
    };
    loadModal(form_data,thisBtn);
}

function bankSubmit(thisBtn){
    var id = thisBtn.data('id');
    var x = thisBtn.data('x');
    var date_1 = $('#bank #date_1').val();
    var time_1 = $('#bank #time_1').val();
    var date_2 = $('#bank #date_2').val();
    var time_2 = $('#bank #time_2').val();
    var date_3 = $('#bank #date_3').val();
    var time_3 = $('#bank #time_3').val();

    var form_data = {
        id:id,
        x:x,
        date_1:date_1,
        time_1:time_1,
        date_2:date_2,
        time_2:time_2,
        date_3:date_3,
        time_3:time_3
    };
    $.ajax({
        url: base_url+'/hrims/payroll/view/bankSubmit',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');
        },
        success : function(data){
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');
            if(data.result=='success'){
                toastr.success('Success');
                thisBtn.addClass('input-success');
                $('#bank'+x).html(data.btn)
                $('#modal-default').modal('hide');
            }else{
                toastr.error(data.result);
                thisBtn.addClass('input-error');
            }
            setTimeout(function() {
                thisBtn.removeClass('input-success');
                thisBtn.removeClass('input-error');
            }, 3000);
        },
        error: function (){
            toastr.error('Error!');
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-success');
            thisBtn.removeClass('input-error');
        }
    });
}
