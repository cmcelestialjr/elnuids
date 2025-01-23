signatories();
employeeNameSearch();
$(document).off('change', '#loadSheet select[name="school_year"]').on('change', '#loadSheet select[name="school_year"]', function (e) {
    signatories();
});
$(document).off('change', '.employeeNameSearch').on('change', '.employeeNameSearch', function (e) {
    loadsheet();
});
function signatories(){
    var thisBtn = $('#loader');
    var form_data = {
       
    };
    $.ajax({
        url: base_url+'/fis/get-signatories',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            thisBtn.html('<center>'+skeletonLoader('')+'</center>');
            $('#documentPreview').addClass('hide');
        },
        success : function(response){
            $('#reviewedBy').append('<option value="'+response.reviewedBY+'">'+response.reviewedBY+'</option>');
            $('#concurredBy').append('<option value="'+response.concurredBy+'">'+response.concurredBy+'</option>');
            $('#recommendingApproval').append('<option value="'+response.recommendingApproval+'">'+response.recommendingApproval+'</option>');
            $('#approvedBy').append('<option value="'+response.approvedBy+'">'+response.approvedBy+'</option>');
            loadsheet(response);
        },
        error: function (){
            thisBtn.html('');
        }
    });
    
}
function loadsheet(){
    var thisBtn = $('#loader');
    var school_year = $('select[name="school_year"] option:selected').val();
    var reviewedBy = $('#reviewedBy option:selected').val();
    var concurredBy = $('#concurredBy option:selected').val();
    var recommendingApproval = $('#recommendingApproval option:selected').val();
    var approvedBy = $('#approvedBy option:selected').val();

    var form_data = {
        school_year:school_year,
        reviewedBy:reviewedBy,
        concurredBy:concurredBy,
        recommendingApproval:recommendingApproval,
        approvedBy:approvedBy
    };

    $.ajax({
        url: base_url+'/fis/loadSheet',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
            thisBtn.html('<center>'+skeletonLoader('')+'</center>');            
            $('#documentPreview').addClass('hide');
            $('#documentPreview').attr('src', '');
        },
        success : function(data){
            thisBtn.html('');
            $('#documentPreview').removeClass('hide');
            if(data.result=='success'){
                $('#documentPreview').attr('src', data.src+'#zoom=80');
            }
        },
        error: function (){
            thisBtn.html('');
        }
    });
}
function employeeNameSearch(){
    $(document).ready(function() {
        $(".employeeNameSearch").select2({
            dropdownParent: $("#reviewedByDiv"),
            ajax: {
            url: base_url+'/search/employeeName',
            type: "post",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                _token: CSRF_TOKEN,
                search: params.term
                };
            },
            processResults: function (response) {
                return {
                results: response
                };
            },
            cache: true
            }
        });
        $(".employeeNameSearch").select2({
            dropdownParent: $("#concurredByDiv"),
            ajax: {
            url: base_url+'/search/employeeName',
            type: "post",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                _token: CSRF_TOKEN,
                search: params.term
                };
            },
            processResults: function (response) {
                return {
                results: response
                };
            },
            cache: true
            }
        });
        $(".employeeNameSearch").select2({
            dropdownParent: $("#recommendingApprovalDiv"),
            ajax: {
            url: base_url+'/search/employeeName',
            type: "post",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                _token: CSRF_TOKEN,
                search: params.term
                };
            },
            processResults: function (response) {
                return {
                results: response
                };
            },
            cache: true
            }
        });
    });
}

