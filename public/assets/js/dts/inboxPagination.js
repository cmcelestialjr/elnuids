$(document).ready(function() {
    paginate(1,0,'asc');
    $(document).off('input', '#search-pagination')
    .on('input', '#search-pagination', function (e) {
        if ($(this).val().trim() !== '') {
            $('.clear-search-pagination').show();
        } else {
            $('.clear-search-pagination').hide();
        }
        paginate(1,0,'asc');
    });

    $(document).off('click', '.clear-search-pagination')
    .on('click', '.clear-search-pagination', function (e) {
        $('#search-pagination').val('');
        $(this).hide();
        paginate(1,0,'asc');
    });

    $(document).off('click', '.btn-paginate')
    .on('click', '.btn-paginate', function (e) {
        var column = $('.th-paginate.active').data('column');
        var direction = $('.th-paginate.active').data('sort');
        if(!column){
            var column = 0;
        }
        if(direction=='asc'){
            var direction = 'desc';
        }else{
            var direction = 'asc'
        }
        paginate($(this).val(),column,direction);
    });

    $(document).off('click', '.th-paginate')
    .on('click', '.th-paginate', function (e) {
        var column = $(this).data('column');
        var direction = $(this).data('sort');

        $('.th-paginate').removeClass('active');
        $('.sort-paginate').removeClass('active');
        $(this).addClass('active');

        if(direction=='asc'){
            $(this).find('.sort-paginate.fa.fa-long-arrow-up').addClass('active');
            $(this).data('sort', 'desc');
        }else{
            $(this).find('.sort-paginate.fa.fa-long-arrow-down').addClass('active');
            $(this).data('sort', 'asc');
        }
        paginate(1,column,direction);
    });
});

function paginate(page,column,direction) {
    var value = $('#search-pagination').val();
    var form_data = {
        value:value,
        page:page,
        column:column,
        direction:direction
    };
    $.ajax({
        url: base_url+'/dts/inboxPaginate',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {

        },
        success : function(data){
            updatePaginationButtons(data);
            updateDisplayedContent(data);
            getCounts();
        },
        error: function (){

        }
    });
}
function updatePaginationButtons(data) {
    $('#pagination').html('');

    $.each(data.links, function(index, item) {
        if(item.page_number==data.current_page){
            var button = '<button class="btn-paginate active" value="' + item.page_number + '">' + item.page_number + '</button>';
        }else{
            var button = '<button class="btn-paginate btn-primary" value="' + item.page_number + '">' + item.page_number + '</button>';
        }

        $('#pagination').append(button);
    });

    var currentPage = parseInt(data.current_page);
    var totalPages = parseInt(data.total_pages);

    var prevPage = currentPage - 5;
    var nextPage = currentPage + 5;

    var showing_from = parseInt(data.current_page)*data.perPage-data.perPage+1;
    var showing_to = parseInt(data.current_page)*data.perPage;
    if(showing_to>=data.total_query){
        var showing_to = data.total_query;
    }
    $('#pagination-info').html('');
    $('#pagination-info').html('Showing '+showing_from+' to '+showing_to+' of '+data.total_query+' rows');

    if (prevPage > 0) {
        var prevButton = '<button class="btn-paginate btn-info" value="' + prevPage + '"><span class="fa fa-angle-left"></span></button>';
        var firstButton = '<button class="btn-paginate btn-info" value="1"><span class="fa fa-angle-double-left"></span></button>';
        $('#pagination').prepend(prevButton);
        $('#pagination').prepend(firstButton);
    }

    if (nextPage <= totalPages) {
        var nextButton = '<button class="btn-paginate btn-info" value="' + nextPage + '"><span class="fa fa-angle-right"></span></button>';
        var lastButton = '<button class="btn-paginate btn-info" value="' + data.total_pages + '"><span class="fa fa-angle-double-right"></span></button>';
        $('#pagination').append(nextButton);
        $('#pagination').append(lastButton);
    }
}
function updateDisplayedContent(data) {
    $('#table-body-pagination').html('');
    var x = 1;
    if(data.current_page>1){
        var x = parseInt(data.current_page)*data.perPage-data.perPage+1;
    }
    if(data.list.length<=0){
        var row = '<tr>';
            row += '<td colspan="11" class="center" style="padding-top:50px;padding-bottom:50px"><h4>No document yet...</h4></td>';
            row += '</tr>';
            $('#table-body-pagination').append(row);
    }else{
        $.each(data.list, function(index, item) {
            var receive = '<span class="span-paginate fa fa-caret-square-o-down btn btn-primary btn-primary-scan docs-option" title="Receive" data-id="'+item.id+'" data-o="Receive"></span> ';
            var forward = '<span class="span-paginate fa fa-forward btn btn-info btn-info-scan docs-option" title="Forward" data-id="'+item.id+'" data-o="Forward"></span> ';
            var view = '<span class="span-paginate fa fa-search btn btn-success btn-success-scan docs-option" title="History" data-id="'+item.dts_id+'" data-o="History"></span> ';
            var doc = '<span class="span-paginate fa fa-file-o btn btn-secondary btn-secondary-scan docs-option" title="Document" data-id="'+item.id+'" data-o="Document"></span> ';
            var edit = '<span class="span-paginate fa fa-edit btn btn-default btn-default-scan docs-option" title="Edit" data-id="'+item.id+'" data-o="Edit"></span> ';
            var date_from = getDateTime(item.created_at);
            if (item.latest){
                var dateTime = getDateTime(item.latest.created_at);
                var duration = getDuration(item.created_at,item.latest.created_at);
                var option = item.latest.option.name;
                if(item.latest.is_return=='Y' && item.latest.option_id==2){
                    var option = 'Returned';
                }
                if(item.latest.option_id==1){
                    var option = ' ('+option+' by) ';
                    if(data.office_id==item.latest.office_id){
                        var options = forward+view+doc;
                    }else{
                        var options = view+doc;
                    }
                }else{
                    var option = ' ('+option+' to) ';
                    if(data.office_id==item.latest.action_office_id){
                        var options = forward+view+doc;
                    }else{
                        var options = receive+view+doc;
                    }
                }
                var latest_action = item.latest.action_office.shorten+option+item.latest.office.shorten+'<br>'+dateTime;
            }else{
                var latest_action = '';
                var duration = getDuration(item.created_at,'');
                if(data.office_id==item.office_id){
                    var options = forward+view+doc;
                }else{
                    var options = view+doc;
                }
            }
            if(data.office_id==item.office_id){
                var options = options+edit;
            }
            var row = '<tr>';
            row += '<td class="center">' + x + '</td>';
            row += '<td>' + item.dts_id + '</td>';
            row += '<td class="center">' + item.office.shorten + '</td>';
            row += '<td id="document-'+item.dts_id+'">' + item.type.name + '</td>';
            row += '<td id="particulars-'+item.dts_id+'">' + item.particulars + '</td>';
            row += '<td id="description-'+item.dts_id+'">' + item.description + '</td>';
            row += '<td class="center">' + date_from + '</td>';
            row += '<td class="center">' + duration + '</td>';
            row += '<td class="center latest_action" id="latest_action_'+x+'">' + latest_action + '</td>';
            row += '<td id="status-doc-'+item.dts_id+'" class="center"><button class="' + item.status.btn + ' btn-xs">' + item.status.name + '</button></td>';
            row += '<td class="center">'+options+'</td>';
            row += '</tr>';
            $('#table-body-pagination').append(row);
            x++;
        });
    }
}
function getCounts(){
    $.ajax({
        url: base_url+'/dts/inboxCount',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        cache: false,
        dataType: 'json',
        beforeSend: function() {

        },
        success : function(data){
            $('#total-docs-count').html(data.total_docs_count);
            $('#received-docs-count').html(data.received_docs_count);
            $('#forwarded-docs-count').html(data.forwarded_docs_count);
            $('#returned-docs-count').html(data.returned_docs_count);
        },
        error: function (){

        }
    });
}
function getDateTime(date){
    var currentDate = new Date(date);

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var month = months[currentDate.getMonth()];
    var day = currentDate.getDay();
    var date = currentDate.getDate();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var formattedDate = month + ' ' + date + ', ' + year + ' ' + hours + ':' + minutes + ' ' + ampm;

    return formattedDate;
}
function getDuration(date_from,date_to){
    var date_from = new Date(date_from);
    if(date_to==''){
        var date_to = new Date();
    }else{
        var date_to = new Date(date_to);
    }

    var duration = date_to - date_from;

    var days = Math.floor(duration / (1000 * 60 * 60 * 24));
    var hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    var days_view = '';
    var hours_view = '';
    var minutes_view = '';

    if(days==1){
        var days_view = days+'day ';
    }else if(days>1){
        var days_view = days+'days ';
    }

    if(hours==1){
        var hours_view = hours+'hr ';
    }else if(hours>1){
        var hours_view = hours+'hrs ';
    }

    if(minutes==1){
        var minutes_view = minutes+'min ';
    }else if(minutes>1){
        var minutes_view = minutes+'mins ';
    }

    return days_view+hours_view+minutes_view;
}



