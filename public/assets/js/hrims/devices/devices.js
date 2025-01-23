devicesTable();
$(document).off('click', '#devicesNewModal').on('click', '#devicesNewModal', function (e) {
    var thisBtn = $(this);
    var url = base_url+'/hrims/devices/devicesNewModal';
    var modal = 'default';
    var modal_size = 'modal-sm';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo'
    };
    loadModal(form_data,thisBtn);
});
$(document).off('click', '.devicesEditModal').on('click', '.devicesEditModal', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/devices/devicesEditModal';
    var modal = 'default';
    var modal_size = 'modal-sm';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id
    };
    loadModal(form_data,thisBtn);
});
$(document).off('click', '.devicesViewModal').on('click', '.devicesViewModal', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/devices/devicesViewModal';
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
});
$(document).off('click', '.devicesView').on('click', '.devicesView', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var url = base_url+'/hrims/devices/devicesView';
    var modal = 'default';
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
});
$(document).off('click', '#devicesNewModalForm button[name="submit"]').on('click', '#devicesNewModalForm button[name="submit"]', function (e) {
    var thisBtn = $(this);
    var name = $('#devicesNewModalForm input[name="name"]').val();
    var ipaddress = $('#devicesNewModalForm input[name="ipaddress"]').val();
    var port = $('#devicesNewModalForm input[name="port"]').val();
    var remarks = $('#devicesNewModalForm textarea[name="remarks"]').val();
    var x = 0;
    $('#devicesNewModalForm input[name="name"]').removeClass('border-require');
    $('#devicesNewModalForm input[name="ipaddress"]').removeClass('border-require');
    if(name==''){
        $('#devicesNewModalForm input[name="name"]').addClass('border-require');
        toastr.error('Please input name of device');
        x++;
    }
    if(ipaddress=='' || ipaddressValidate(ipaddress)==false){
        $('#devicesNewModalForm input[name="ipaddress"]').addClass('border-require');
        toastr.error('Please input valid ipaddress');
        x++;
    }
    if(port<=0){
        $('#devicesNewModalForm input[name="port"]').addClass('border-require');
        toastr.error('Please input valid port');
        x++;
    }
    var form_data = {
        name:name,
        ipaddress:ipaddress,
        port:port,
        remarks:remarks
    };
    if(x==0){
        $.ajax({
            url: base_url+'/hrims/devices/devicesNewModalSubmit',
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
                    devicesTable();
                    toastr.success('Success');
                    thisBtn.addClass('input-success');
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
});
$(document).off('click', '#devicesEditModalForm button[name="submit"]').on('click', '#devicesEditModalForm button[name="submit"]', function (e) {
    var thisBtn = $(this);
    var id = $('#devicesEditModalForm input[name="id"]').val();
    var name = $('#devicesEditModalForm input[name="name"]').val();
    var ipaddress = $('#devicesEditModalForm input[name="ipaddress"]').val();
    var port = $('#devicesEditModalForm input[name="port"]').val();
    var remarks = $('#devicesEditModalForm textarea[name="remarks"]').val();
    var status = $('#devicesEditModalForm select[name="status"] option:selected').val();
    var x = 0;
    $('#devicesEditModalForm input[name="name"]').removeClass('border-require');
    $('#devicesEditModalForm input[name="ipaddress"]').removeClass('border-require');
    if(name==''){
        $('#devicesEditModalForm input[name="name"]').addClass('border-require');
        toastr.error('Please input name of device');
        x++;
    }
    if(ipaddress=='' || ipaddressValidate(ipaddress)==false){
        $('#devicesEditModalForm input[name="ipaddress"]').addClass('border-require');
        toastr.error('Please input valid ipaddress');
        x++;
    }
    if(port<=0){
        $('#devicesEditModalForm input[name="port"]').addClass('border-require');
        toastr.error('Please input valid port');
        x++;
    }
    var form_data = {
        id:id,
        name:name,
        ipaddress:ipaddress,
        port:port,
        status:status,
        remarks:remarks
    };
    if(x==0){
        $.ajax({
            url: base_url+'/hrims/devices/devicesEditModalSubmit',
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
                    devicesTable();
                    toastr.success('Success');
                    thisBtn.addClass('input-success');
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
});
$(document).off('click', '#devicesUpdateStatus').on('click', '#devicesUpdateStatus', function (e) {
    var thisBtn = $(this);
    $("#devicesTable").css("opacity", 0.5);
    $("#devicesTable").prop("disabled", true);
    var form_data = {
        id:1
    };
    $.ajax({
        url: base_url+'/hrims/devices/devicesUpdateStatus',
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
                if (data.devices && data.devices.length > 0) {
                    $("#devicesTable").css("opacity", 1);
                    $("#devicesTable").prop("disabled", false);
                    $('.devicesStatus').html('');
                    $.each(data.devices, function (index, device) {
                        if(device.status=='On'){
                            var status = '<button class="btn btn-success btn-success-scan"><span class="fa fa-check"></span> On</button>';
                        }else{
                            var status = '<button class="btn btn-danger btn-danger-scan"><span class="fa fa-times"></span> Off</button>';
                        }
                        var dateTime = '';
                        if(device.dateTime!=''){
                            var dateTime = '<button class="btn btn-primary btn-primary-scan btn-sm devicesDateTimeModal"'+
                                            'data-id="'+device.id+'"'+
                                            'data-s="'+device.status+'">'+
                                            '<span class="fa fa-calendar"></span> '+device.dateTime+'</button>';
                        }
                        $('#device_status_'+device.id).html('');
                        $('#device_dateTime_'+device.id).html('');
                        $('#device_status_'+device.id).html(status);
                        $('#device_dateTime_'+device.id).html(dateTime);
                        $('#logs_acquire_'+device.id).attr('data-s', device.status);
                    });
                }
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
});
$(document).off('click', '.devicesDateTimeModal').on('click', '.devicesDateTimeModal', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var s = thisBtn.data('s');
    if(s!='On'){
        toastr.error('This Device is Off!');
    }else{
        var url = base_url+'/hrims/devices/devicesDateTimeModal';
        var modal = 'default';
        var modal_size = 'modal-sm';
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
});
$(document).off('click', '#dateTimeModalSubmit button[name="submit"]').on('click', '#dateTimeModalSubmit button[name="submit"]', function (e) {
    var thisBtn = $(this);
    var id = $('#dateTimeModalSubmit input[name="id"]').val();
    var date = $('#dateTimeModalSubmit input[name="date"]').val();
    var time = $('#dateTimeModalSubmit input[name="time"]').val();
    var x = 0;
    $('#dateTimeModalSubmit input[name="date"]').removeClass('border-require');
    $('#dateTimeModalSubmit input[name="time"]').removeClass('border-require');
    if(date==''){
        $('#dateTimeModalSubmit input[name="date"]').addClass('border-require');
        toastr.error('Please input valid date!');
        x++;
    }
    if(time==''){
        $('#dateTimeModalSubmit input[name="time"]').addClass('border-require');
        toastr.error('Please input valid time');
        x++;
    }
    if(x==0){
        var form_data = {
            id:id,
            date:date,
            time:time
        };
        $.ajax({
            url: base_url+'/hrims/devices/dateTimeModalSubmit',
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
                    var dateTime = '<button class="btn btn-primary btn-primary-scan btn-sm devicesDateTimeModal"'+
                                            'data-id="'+data.id+'"'+
                                            'data-s="On">'+
                                            '<span class="fa fa-calendar"></span> '+data.dateTime+'</button>';
                    $('#device_dateTime_'+data.id).html(dateTime);
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
});
$(document).off('click', '.logsClear').on('click', '.logsClear', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var form_data = {
        id:id
    };
    $.ajax({
        url: base_url+'/hrims/devices/logsClear',
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
});
$(document).off('click', '.devicesUpdate').on('click', '.devicesUpdate', function (e) {
    var thisBtn = $(this);
    var id = thisBtn.data('id');
    var n = thisBtn.data('n');
    var option = 'all';

    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to update '+n+' Device. Please ensure it’s not during peak hours!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, update it!'
    }).then((result) => {
        if (result.isConfirmed) {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');  

            let loadingSwal;
            loadingSwal = Swal.fire({
                title: n+' Updating...',
                html: `
                <div>
                    <h2 id="users-status"><span class="fa fa-spinner fa-spin text-require"></span> Updating Users List...</h2>
                    <h2 id="fingerprints-status"><span class="fa fa-spinner fa-spin text-require"></span> Fingerprints</h2>
                    <h2 id="face-images-status"><span class="fa fa-spinner fa-spin text-require"></span> Face Images</h2>
                </div>
                `,
                allowOutsideClick: false,
                showConfirmButton: false,
            });
            
            updateUsersList(thisBtn,id,loadingSwal,n,option);
        }
    });
    
});
function updateUsersList(thisBtn,id,loadingSwal,n,option){
        
            var url = base_url + '/hrims/devices/updateUsersList/'+id;
            var form_data = {
            
            };
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': CSRF_TOKEN
                },
                data: form_data,
                cache: false,
                dataType: 'json',
                beforeSend: function() {
                            
                },
                success: function(response) {
                    if(response.result=='success'){            
                        if(response.count==0){ 
                            loadingSwal.update({
                                showCloseButton: true,
                                title: n+' Updated',
                                allowOutsideClick: true,
                                showConfirmButton: true,
                            });
                        
                            Swal.getCloseButton().onclick = () => {
                                loadingSwal.close();
                            };

                            const usersStatus = document.getElementById('users-status');
                            const fingerprintsStatus = document.getElementById('fingerprints-status');
                            const faceImagesStatus = document.getElementById('face-images-status');
                            usersStatus.innerHTML = `<span class="fa fa-check text-success"></span> Users List`;
                            fingerprintsStatus.innerHTML = `<span class="fa fa-check text-success"></span> Fingerprints`;
                            faceImagesStatus.innerHTML = `<span class="fa fa-check text-success"></span> Face Images`;
                            thisBtn.removeAttr('disabled');
                            thisBtn.removeClass('input-loading');
                        }else{
                            const usersStatus = document.getElementById('users-status');
                            const fingerprintsStatus = document.getElementById('fingerprints-status');
                            usersStatus.innerHTML = `<span class="fa fa-check text-success"></span> Users List`;
                            fingerprintsStatus.innerHTML = `<span class="fa fa-spinner fa-spin text-require"></span> Updating Fingerprints...`;
                            updateFingerprints(thisBtn,id,loadingSwal,response.userids,n,option);
                        }
                    }else{
                        thisBtn.removeAttr('disabled');
                        thisBtn.removeClass('input-loading');
                        if (loadingSwal) {
                            loadingSwal.close();
                        }
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
                        text: 'There was an error processing your request. '+error,
                    icon: 'error'
                });
            }
        });
}
function updateNotUsers(thisBtn,id,loadingSwal,userids,n,option){
    var url = base_url + '/hrims/devices/updateNotUsers/'+id;

    var form_data = {
        userids:userids
    };

    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data: form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
                      
        },
        success: function(response) {
            if(response.result=='success'){
                    loadingSwal.update({
                        showCloseButton: true,
                        title: n+' Updated',
                        allowOutsideClick: true,
                        showConfirmButton: true,
                    });
                
                    Swal.getCloseButton().onclick = () => {
                        loadingSwal.close();
                    };
                    thisBtn.removeAttr('disabled');
                    thisBtn.removeClass('input-loading');
                    thisBtn.closest('tr').remove();
                    const usersStatus = document.getElementById('users-status');
                    usersStatus.innerHTML = `<span class="fa fa-check text-success"></span> User List`;

                    const userids1 = response.userids;

                    userids1.forEach(function(userid, index) {
                        var newRow = `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${userid}</td>
                                <td>
                                    <button class="btn btn-primary btn-primary-scan updateWoFace" data-id="${userid}">
                                        <span class="fa fa-edit"></span>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        `;
                        $('#wofaceimagesTable tbody').prepend(newRow);

                        var newRow = `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${userid}</td>
                                <td>
                                    <button class="btn btn-primary btn-primary-scan updateWoFinger" data-id="${userid}">
                                        <span class="fa fa-edit"></span>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        `;
                        $('#wofingerprintTable tbody').prepend(newRow);
                    });
            }else{
                thisBtn.removeAttr('disabled');
                thisBtn.removeClass('input-loading');
                if (loadingSwal) {
                    loadingSwal.close();
                }
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
                text: 'There was an error processing your request. '+error,
                icon: 'error'
            });
        }
    });
}
function updateFingerprints(thisBtn,id,loadingSwal,userids,n,option){
    var url = base_url + '/hrims/devices/updateFingerprints/'+id;
    var form_data = {
        userids:userids,
        option:option
    };
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data: form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
                      
        },
        success: function(response) {
            if(response.result=='success'){
                if(option=='all'){
                    const faceImagesStatus = document.getElementById('face-images-status');
                    faceImagesStatus.innerHTML = `<span class="fa fa-spinner fa-spin text-require"></span> Updating Face Images...`;
                    updateFaceImages(thisBtn,id,loadingSwal,userids,n,option);
                }else{
                    loadingSwal.update({
                        showCloseButton: true,
                        title: n+' Updated',
                        allowOutsideClick: true,
                        showConfirmButton: true,
                    });
                
                    Swal.getCloseButton().onclick = () => {
                        loadingSwal.close();
                    };
                    thisBtn.removeAttr('disabled');
                    thisBtn.removeClass('input-loading');
                    thisBtn.closest('tr').remove();
                }
                const fingerprintsStatus = document.getElementById('fingerprints-status');              
                fingerprintsStatus.innerHTML = `<span class="fa fa-check text-success"></span> Fingerprints`;
            }else{
                thisBtn.removeAttr('disabled');
                thisBtn.removeClass('input-loading');
                if (loadingSwal) {
                    loadingSwal.close();
                }
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
                text: 'There was an error processing your request. '+error,
                icon: 'error'
            });
        }
    });
}
function updateFaceImages(thisBtn,id,loadingSwal,userids,n,option){
    var url = base_url + '/hrims/devices/updateFaceImages/'+id;
    var form_data = {
        userids:userids
    };
    $.ajax({
        url: url,
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data: form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {
                      
        },
        success: function(response) {
            if(response.result=='success'){
                loadingSwal.update({
                    showCloseButton: true,
                    title: n+' Updated',
                    allowOutsideClick: true,
                    showConfirmButton: true,
                });
            
                Swal.getCloseButton().onclick = () => {
                    loadingSwal.close();
                };
                if(option=='all'){
                    const usersStatus = document.getElementById('users-status');
                    const fingerprintsStatus = document.getElementById('fingerprints-status');
                    usersStatus.innerHTML = `<span class="fa fa-check text-success"></span> Users List`;
                    fingerprintsStatus.innerHTML = `<span class="fa fa-check text-success"></span> Fingerprints`;
                }else{
                    thisBtn.removeAttr('disabled');
                    thisBtn.removeClass('input-loading');
                    thisBtn.closest('tr').remove();
                }
                const faceImagesStatus = document.getElementById('face-images-status');                
                faceImagesStatus.innerHTML = `<span class="fa fa-check text-success"></span> Face Images`;
                
            }else{
                thisBtn.removeAttr('disabled');
                thisBtn.removeClass('input-loading');
                if (loadingSwal) {
                    loadingSwal.close();
                }
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
                text: 'There was an error processing your request. '+error,
                icon: 'error'
            });
        }
    });
}
function devicesTable(){
    var form_data = {
        url_table:base_url+'/hrims/devices/devicesTable',
        tid:'devicesTable'
    };
    loadTable(form_data);
}
