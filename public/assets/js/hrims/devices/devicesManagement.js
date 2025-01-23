$('#deviceLogs').bootstrapTable();
$('#deviceUsers').bootstrapTable();
$('#wofingerprintTable').bootstrapTable();
$('#wofaceimagesTable').bootstrapTable();
$(document).off('click', '.deleteUser').on('click', '.deleteUser', function (e) {
    var thisBtn = $(this);
    var userid = thisBtn.data('id');
    var n = $('#deviceViewName').val();

    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete '+userid+' from the '+n+' Device. You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {

            var id = $('#deviceViewID').val();            
            var uid = thisBtn.data('uid');

            var url = base_url + '/hrims/devices/deleteUser/'+uid;
            
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': CSRF_TOKEN
                },
                data: {
                    id: id,
                    userid: userid,
                    name: n,
                },
                beforeSend: function() {
                    thisBtn.attr('disabled','disabled');
                    thisBtn.addClass('input-loading'); 
                },
                success: function(response) {
                    if(response.result=='success'){
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'User has been deleted.',
                            icon: 'success'
                        });
                        thisBtn.closest('tr').remove();
                    }else{
                        Swal.fire({
                            title: 'Error.',
                            text: response.result,
                            icon: 'error'
                        });
                        thisBtn.removeAttr('disabled');
                        thisBtn.removeClass('input-loading');
                    }
                },
                error: function(xhr) {
                    thisBtn.removeAttr('disabled');
                    thisBtn.removeClass('input-loading');
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an error deleting the user. '+xhr,
                        icon: 'error'
                    });
                }
            });
        }
    });
});

$(document).off('click', '#usersnotLink').on('click', '#usersnotLink', function (e) {
    var thisBtn = $(this);
    var id = $('#deviceViewID').val();
    var form_data = {
        url_table:base_url+'/hrims/devices/usersnotTable',
        tid:'usersnotTable',
        id:id
    }
    loadTable(form_data,thisBtn);
});
$(document).off('click', '.updateNotUser').on('click', '.updateNotUser', function (e) {
    var thisBtn = $(this);
    var userid = thisBtn.data('id');    
    
    var userids = [];

    userids.push(userid);
    
    updateNotUser(thisBtn,userids);
});
$(document).off('click', '#updateWoFingerAll').on('click', '#updateWoFingerAll', function (e) {    
    var thisBtn = $('.updateWoFinger');
  
    if(thisBtn.length===0){
        Swal.fire({
            title: 'Error!',
            text: 'There is no available UserID to update',
            icon: 'error'
        });
        return;
    }

    var userids = [];

    thisBtn.each(function() {
        var id = $(this).data('id');
        userids.push(id);
    });

    updateWoFinger(thisBtn,userids);
});
$(document).off('click', '.updateWoFinger').on('click', '.updateWoFinger', function (e) {
    var thisBtn = $(this);
    var userid = thisBtn.data('id');    
    
    var userids = [];

    userids.push(userid);
    
    updateWoFinger(thisBtn,userids);
});
$(document).off('click', '#updateWoFaceAll').on('click', '#updateWoFaceAll', function (e) {    
    var thisBtn = $('.updateWoFace');
    
    if(thisBtn.length===0){
        Swal.fire({
            title: 'Error!',
            text: 'There is no available UserID to update',
            icon: 'error'
        });
        return;
    }

    var userids = [];

    thisBtn.each(function() {
        var id = $(this).data('id');
        userids.push(id);
    });

    updateWoFace(thisBtn,userids);
});
$(document).off('click', '.updateWoFace').on('click', '.updateWoFace', function (e) {
    var thisBtn = $(this);
    var userid = thisBtn.data('id');
    
    var userids = [];

    userids.push(userid);
    
    updateWoFace(thisBtn,userids);
});

function updateNotUser(thisBtn,userids){
    var id = $('#deviceViewID').val();
    var n = $('#deviceViewName').val();
    var option = 'solo';
    
    thisBtn.attr('disabled','disabled');
    thisBtn.addClass('input-loading');  

    let loadingSwal;
    loadingSwal = Swal.fire({
        title: n+' Updating...',
        html: `
        <div>
            <h2 id="users-status"><span class="fa fa-spinner fa-spin text-require"></span> Updating Users List...</h2>
        </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
    });
    updateNotUsers(thisBtn,id,loadingSwal,userids,n,option);
}
function updateWoFinger(thisBtn,userids){
    var id = $('#deviceViewID').val();
    var n = $('#deviceViewName').val();
    var option = 'solo';
    
    thisBtn.attr('disabled','disabled');
    thisBtn.addClass('input-loading');  

    let loadingSwal;
    loadingSwal = Swal.fire({
        title: n+' Updating...',
        html: `
        <div>
            <h2 id="fingerprints-status"><span class="fa fa-spinner fa-spin text-require"></span> Updating Fingerprints....</h2>
        </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
    });
    
    updateFingerprints(thisBtn,id,loadingSwal,userids,n,option);
}
function updateWoFace(thisBtn,userids){
    var id = $('#deviceViewID').val();
    var n = $('#deviceViewName').val();
    var option = 'solo';

    thisBtn.attr('disabled','disabled');
    thisBtn.addClass('input-loading');  

    let loadingSwal;
    loadingSwal = Swal.fire({
        title: n+' Updating...',
        html: `
        <div>
            <h2 id="face-images-status"><span class="fa fa-spinner fa-spin text-require"></span> Updating Face Images...</h2>
        </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
    });
    
    updateFaceImages(thisBtn,id,loadingSwal,userids,n,option);
}
