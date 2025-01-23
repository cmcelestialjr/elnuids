$(document).ready(function() {
    $(document).off('click', '#forwardModal button[name="submit"]')
    .on('click', '#forwardModal button[name="submit"]', function (e) {
        forwardSubmit($(this));
    });
    $(document).off('click', '#forward-link')
    .on('click', '#forward-link', function (e) {
        forwardTab();
    });
    $(document).off('click', '#forwarded-link')
    .on('click', '#forwarded-link', function (e) {
        forwardedTab();
    });
    if ($('#forward-tab').length>0) {
        forwardTab();
    }
});
function forwardSubmit(thisBtn){
    var id = thisBtn.data('id');
    var n = thisBtn.data('n');
    var office_id = $('#forwardModal select[name="office"] option:selected').val();
    var remarks = $('#forwardModal textarea[name="remakrs"]').val();
    var is_return = $('#forwardModal input[name="is_return"]:checked').val();

    var form_data = {
        id:id,
        office_id:office_id,
        remarks:remarks,
        is_return:is_return
    };
    $.ajax({
        url: base_url+'/dts/forwardSubmit',
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
                $('#'+n).html(data.latest_action);
                toastr.success('Success!');
                thisBtn.addClass('input-success');
                $("#modal-default").modal('hide');
            }else{
                toastr.error('Error!');
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
function forwardTab(){
    $.ajax({
        url: base_url+'/dts/forwardTab',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        cache: false,
        beforeSend: function() {
            $('#forwarded-tab').html('');
        },
        success : function(data){
            $('#forward-tab').html(data);
        },
        error: function (){

        }
    });
}
function forwardedTab(){
    $.ajax({
        url: base_url+'/dts/forwardedTab',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        cache: false,
        beforeSend: function() {
            $('#forward-tab').html('');
        },
        success : function(data){
            $('#forwarded-tab').html(data);
        },
        error: function (){

        }
    });
}
