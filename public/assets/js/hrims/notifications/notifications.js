loadOptions();
$(document).off('change', '#mainType').on('change', '#mainType', function (e) {
    loadOptions();
});
$(document).off('change', '#payslipDiv select[name="option"]').on('change', '#payslipDiv select[name="option"]', function (e) {
    loadPayslipOption();
});
$(document).off('change', '#payslipDiv select[name="duration"]').on('change', '#payslipDiv select[name="duration"]', function (e) {
    loadPayslipDuration();
});
$(document).off('click', '#payslipDiv button[name="send"]').on('click', '#payslipDiv button[name="send"]', function (e) {
    sendPayslip($(this));
});
function loadOptions(){
    var mainType = $('#mainType option:selected').val();
    $('.options').addClass('hide');
    $('#'+mainType+'Div').removeClass('hide');
}
function loadPayslipOption(){
    var option = $('#payslipDiv select[name="option"] option:selected').val();
    $('.individual').addClass('hide');
    $('.employmentStatus').addClass('hide');
    $('.'+option).removeClass('hide');
}
function loadPayslipDuration(){
    var duration = $('#payslipDiv select[name="duration"] option:selected').val();
    if(duration=='year'){
        $('.month').addClass('hide');
    }else{
        $('.month').removeClass('hide');
    }
}
function sendPayslip(thisBtn){
    var option = $('#payslipDiv select[name="option"] option:selected').val();
    var duration = $('#payslipDiv select[name="duration"] option:selected').val();
    var employee = $('#payslipDiv select[name="employee"] option:selected').val();
    var payroll_type = $('#payslipDiv select[name="payroll_type"] option:selected').val();
    var year = $('#payslipDiv select[name="year"] option:selected').val();
    var month = $('#payslipDiv select[name="month"] option:selected').val();
    var emp_stats = $('#payslipDiv select[name="emp_stat[]"]');
    var fund_sources = $('#payslipDiv select[name="fund_source[]"]');
    var fund_services = $('#payslipDiv select[name="fund_service[]"]');
    var include = $('#payslipDiv input[name="include"]').prop('checked') ? 1 : 0;

    var x = 0;
    var selected_emp_stat = [];
    var selected_fund_source = [];
    var selected_fund_service = [];

    emp_stats.each(function() {
        var values = $(this).val();
        if (values) {
            selected_emp_stat = selected_emp_stat.concat(values);
        }
    });
    fund_sources.each(function() {
        var values = $(this).val();
        if (values) {
            selected_fund_source = selected_fund_source.concat(values);
        }
    });
    fund_services.each(function() {
        var values = $(this).val();
        if (values) {
            selected_fund_service = selected_fund_service.concat(values);
        }
    });

    $('#payslipDiv #emp_stat_div').removeClass('border-require');
    $('#payslipDiv #fund_source_div').removeClass('border-require');
    $('#payslipDiv #employeeSearch').removeClass('border-require');

    if(option=='employmentStatus'){
        if(selected_emp_stat==''){
            $('#payslipDiv #emp_stat_div').addClass('border-require');
            x++;
        }
        if(selected_fund_source==''){
            $('#payslipDiv #fund_source_div').addClass('border-require');
            x++;
        }
    }else if(option=='individual'){
        if(!employee){
            $('#payslipDiv #employeeSearch').addClass('border-require');
            x++;
        }
    }

    if(x>0){
        return;
    }

    var data = {
        option: option,
        duration: duration,
        employee: employee,
        payroll_type: payroll_type,
        year: year,
        month: month,
        emp_stats: selected_emp_stat,
        fund_sources: selected_fund_source,
        fund_services: selected_fund_service,
        include: include
    };

    var url = base_url + '/hrims/notifications/sendPayslip';
    let loadingSwal;

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data: data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');

            loadingSwal = Swal.fire({
                title: 'Sending...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        },
        success: function(response) {
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');

            if (loadingSwal) {
                loadingSwal.close();
            }

            if(response.result=='success'){
                Swal.fire({
                    title: 'Success.',
                    // text: response.message,
                    icon: 'success'
                });
            }else{
                Swal.fire({
                    title: 'Error.',
                    text: response.result,
                    icon: 'error'
                });
            }
        },
        error: function(error) {
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');

            if (loadingSwal) {
                loadingSwal.close();
            }

            Swal.fire({
                title: 'Error!',
                text: 'There was an error processing your request.',
                icon: 'error'
            });
        }
    });
}
