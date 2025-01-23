$(document).off('click', '.designationEdit').on('click', '.designationEdit', function (e) {
    designationEdit($(this));
});
$(document).off('click', '#designationEditModal button[name="submit"]').on('click', '#designationEditModal button[name="submit"]', function (e) {
    designationEditSubmit($(this));
});
function designationEdit(thisBtn){
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/designation/edit';
    var modal = 'default';
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
function designationEditSubmit(thisBtn){
    var id = thisBtn.data('id');
    var name = $('#designationEditModal input[name="name"]').val();
    var shorten = $('#designationEditModal input[name="shorten"]').val();
    var level = $('#designationEditModal input[name="level"]').val();
    var office = $('#designationEditModal select[name="office"] option:selected').val();
    var employee = $('#designationEditModal select[name="employee"] option:selected').val();
    var form_data = {
        id:id,
        name:name,
        shorten:shorten,
        level:level,
        office:office,
        employee:employee
    };
    $.ajax({
        url: base_url+'/hrims/designation/editSubmit',
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
                designationTableList();
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
