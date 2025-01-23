$(document).ready(function() {
    $(document).off('click', '#receive-link')
    .on('click', '#receive-link', function (e) {
        receiveTab();
    });
    $(document).off('click', '#received-link')
    .on('click', '#received-link', function (e) {
        receivedTab();
    });
    if ($('#received-tab').length>0) {
        receiveTab();
    }
});
function receiveTab(){
    $.ajax({
        url: base_url+'/dts/receiveTab',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        cache: false,
        beforeSend: function() {
            $('#received-tab').html('');
        },
        success : function(data){
            $('#receive-tab').html(data);
        },
        error: function (){

        }
    });
}
function receivedTab(){
    $.ajax({
        url: base_url+'/dts/receivedTab',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        cache: false,
        beforeSend: function() {
            $('#receive-tab').html('');
        },
        success : function(data){
            $('#received-tab').html(data);
        },
        error: function (){

        }
    });
}
