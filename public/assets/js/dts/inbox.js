$(document).ready(function() {
    $(document).off('click', '.docs-option')
    .on('click', '.docs-option', function (e) {
        var id = $(this).data('id');
        var option = $(this).data('o');
        if(option=='Receive'){
            receiveDoc(id,$(this));
        }else if(option=='Forward'){
            forwardDoc(id,$(this));
        }else if(option=='History'){
            historyDoc(id);
        }else if(option=='Document'){
            documentDoc(id);
        }else if(option=='Edit'){
            editDoc(id);
        }
    });
    
    $(document).off('click', '.updateDoc')
    .on('click', '.updateDoc', function (e) {
        var dts_no = $(this).data('id');
        $(this).addClass("hide");
        $(`#fileShow-${dts_no}`).removeClass("hide");
    });

    $(document).off('change', '.file-input')
    .on('change', '.file-input', function (e) {
        var dts_no = $(this).data('id');
        var total_files = $(`#file-${dts_no}`)[0].files.length;
        if(total_files==1){
            var file_selected_count = total_files+' file';
        }else{
            var file_selected_count = total_files+' files';
        }
        $(`#file-selected-count-${dts_no}`).html(file_selected_count+' selected..');
    });

    $(document).off('click', '.submitUpdateDoc')
    .on('click', '.submitUpdateDoc', function (e) {
        var thisBtn = $(this);
        var dts_no = $(this).data('id');
        var total_files = $('input[name="file[]"]')[0].files.length;        

        if(total_files>0){
            var form_data = new FormData();

            for (var x = 0; x < total_files; x++) {
                form_data.append('files'+x, $('input[name="file[]"]')[0].files[x]);
            }        

            form_data.append('dts_no', dts_no);
            form_data.append('total_files', total_files);

            $.ajax({
                url: base_url+'/dts/documentUpdate',
                type: 'POST',
                headers: {
                    'X-CSRF-TOKEN': CSRF_TOKEN
                },
                data:form_data,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json',
                beforeSend: function() {
                    thisBtn.attr('disabled','disabled');
                },
                success : function(response){
                    thisBtn.removeAttr('disabled');
                    $(`#updateDoc-${dts_no}`).removeClass("hide");
                    $(`#fileShow-${dts_no}`).addClass("hide");
                    if(response.result=='success'){ 
                        const pdf = `<iframe src="${response.doc}#zoom=80" style="width:100%;height:100%"></iframe>`;
                        $('.pdf-container').html(pdf);
                        $('input[name="file[]"]').empty();
                        $(`#file-selected-count-${dts_no}`).html('');
                        toastr.success('Success!');
                    }else{
                        toastr.error(response.result);
                    }
                },
                error: function (){
                    thisBtn.removeAttr('disabled');
                    $(`#updateDoc-${dts_no}`).removeClass("hide");
                    $(`#fileShow-${dts_no}`).addClass("hide");
                }
            });
        }
    });

    $(document).off('click', '#submitForm')
    .on('click', '#submitForm', function (e) {
        var thisBtn = $(this);
        var dts_no = thisBtn.data('id');
        var type = $('#documentType option:selected').val();
        var particulars = $('#particulars').val();
        var description = $('#description').val();
        var amount = $('#amount').val();
        var remarks = $('#remarks').val();
        var status = $('#documentStatus option:selected').val();
        var check = 0;

        if(particulars==''){
            $('#particulars').addClass('border-require');
        }else{
            $('#particulars').removeClass('border-require');
        }

        if(description==''){
            $('#description').addClass('border-require');
        }else{
            $('#description').removeClass('border-require');
        }

        if(check>1){
            return;
        }

        var form_data = {
            dts_no:dts_no,
            type:type,
            particulars:particulars,
            description:description,
            amount:amount,
            remarks:remarks,
            status:status
        };
        $.ajax({
            url: base_url+'/dts/editDocSubmit',
            type: 'POST',
            headers: {
                'X-CSRF-TOKEN': CSRF_TOKEN
            },
            data:form_data,
            cache: false,
            dataType: 'json',
            beforeSend: function() {
                thisBtn.attr('disabled','disabled');
            },
            success : function(response){
                thisBtn.removeAttr('disabled');
                if(response.result=='success'){
                    toastr.success('Success!');
                    $(`#document-${dts_no}`).html(response.document);
                    $(`#particulars-${dts_no}`).html(particulars);
                    $(`#description-${dts_no}`).html(description);
                    $(`#status-doc-${dts_no}`).html(`<button class="${response.statusBtn} btn-xs">${response.statusName}</button>`);
                }else{
                    toastr.error(response.result);
                }
            },
            error: function (){
                thisBtn.removeAttr('disabled');
            }
        });

    });
    
});

function receiveDoc(id,thisBtn){
    var form_data = {
        id:id
    };
    $.ajax({
        url: base_url+'/dts/receive',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        beforeSend: function() {

        },
        success : function(data){
            if(data.result=='success'){
                paginate(1);
                toastr.success('Success!');
            }else{
                toastr.error('Error!');
            }
        },
        error: function (){

        }
    });
}

function historyDoc(id){
    window.location.href = base_url+'/ids/dts/search/n/'+id;
}

function forwardDoc(id,thisBtn){
    var id_name = thisBtn.closest('tr').find('.latest_action').attr('id');
    var url = base_url+'/dts/forward';
    var modal = 'default';
    var modal_size = 'modal-md';
    var form_data = {
        url:url,
        modal:modal,
        modal_size:modal_size,
        static:'',
        w_table:'wo',
        id:id,
        id_name:id_name
    };
    loadModal(form_data,thisBtn);
}

function documentDoc(id) {
    var form_data = {
        id:id
    };
    $.ajax({
        url: base_url+'/dts/documentView',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        success: function(response) {
            if(response.result=='success'){
       
                const doc = response.doc;
                const dts_no = response.dts_no;
                const canUpdate = response.canUpdate;

                const buttonUpdate = canUpdate=="yes" ? 
                    `<button class="btn btn-info btn-info-scan updateDoc" id="updateDoc-${dts_no}" data-id="${dts_no}">
                        <span class="fa fa-edit"></span> Update</button>
                        <div class="hide" id="fileShow-${dts_no}">
                            <div class="file-drop-area">
                                <button class="btn btn-primary btn-primary-scan">Choose file</button>
                                &nbsp; <span class="file-message">or drag and drop file here</span>
                                <input class="file-input" type="file" name="file[]" id="file-${dts_no}" accept="application/pdf,image/*" data-id="${dts_no}" multiple>
                            </div>
                            <div id="file-selected-count-${dts_no}"></div>
                            <button class="btn btn-success btn-success-scan submitUpdateDoc" data-id="${dts_no}">
                                <span class="fa fa-save"></span> Submit</button><br><br>
                        </div>
                    ` 
                    : '';

                Swal.fire({
                    title: `DTS NO: ${dts_no}`,
                    html: `
                        ${buttonUpdate}
                        <div class="pdf-container" style="height:600px;">
                            <iframe src="${doc}#zoom=80" style="width:100%;height:100%"></iframe>
                        </div>
                    `,
                    showConfirmButton: false,
                    showCloseButton: true,
                    width: '80%',
                    padding: '20px',
                    customClass: {
                        popup: 'pdf-popup'
                    }
                });
            }else{
                Swal.fire({
                    title: response.result,
                    icon: 'error',
                    showConfirmButton: false,
                    showCloseButton: true,
                })
            }
        },
        error: function(xhr, status, error) {
            console.log("Error fetching images:", error);
        }
    });
}

function editDoc(id)
{
    var form_data = {
        id:id
    };
    $.ajax({
        url: base_url+'/dts/editDoc',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        dataType: 'json',
        success: function(response) {
            if(response.result=='success'){
       
                const dts_no = response.dts.dts_id;                
                const typeId = response.dts.type_id;
                const statusId = response.dts.status_id;
                const particulars = response.dts.particulars;
                const description = response.dts.description;
                const amount = response.dts.amount;
                const remarks = response.dts.remarks ? response.dts.remarks : '';
                const required = `<span class="text-require">*</span>`;

                Swal.fire({
                    title: `DTS NO: ${dts_no}`,
                    html: `
                        <div class="row" style="text-align:left;">
                            <div class="col-lg-12">
                                <i class="text-require" style="font-size:12px">* required fields</i>
                            </div>
                            <div class="col-12">
                                <label>Document Type${required}:</label>
                                <div id="select2-editDoc">
                                    <select class="form-control select2-editDoc" id="documentType">
                                        
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label for="particulars">Particulars${required}:</label>
                                <input type="text" class="form-control" name="particulars" id="particulars" value="${particulars}">
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <label for="description">Description${required}:</label>
                                <input type="text" class="form-control" name="description" id="description" value="${description}">
                            </div>
                            <div class="col-6">
                                <label for="amount">Amount:</label>
                                <input type="number" class="form-control" name="amount" id="amount" value="${amount}">
                            </div>
                            <div class="col-6">
                                <label for="remakrs">Remakrs:</label>
                                <textarea class="form-control" name="remarks" id="remarks">${remarks}</textarea>
                            </div>
                            <div class="col-12">
                                <label for="documentStatus">Status:</label>
                                <select class="form-control" id="documentStatus">
                                        
                                </select>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary btn-primary-scan" id="submitForm" data-id="${dts_no}">
                                        <span class="fa fa-save"></span> Submit</button>
                                </div>
                            </div>
                        </div>
                    `,
                    showConfirmButton: false,
                    showCloseButton: true,
                    width: '80%',
                    padding: '20px',
                });

                const documentTypeSelect = $('#documentType');
                response.dtsTypes.forEach(type => {
                    const isSelected = type.id === typeId ? 'selected' : '';
                    documentTypeSelect.append(`<option value="${type.id}" ${isSelected}>${type.name}</option>`);
                });

                // Populate Status Select with selected value
                const documentStatusSelect = $('#documentStatus');
                response.dtsStatus.forEach(status => {
                    const isSelected = status.id === statusId ? 'selected' : '';
                    documentStatusSelect.append(`<option value="${status.id}" ${isSelected}>${status.name}</option>`);
                });

                $(".select2-editDoc").select2({
                    dropdownParent: $("#select2-editDoc")
                });
                
            }else{
                Swal.fire({
                    title: response.result,
                    icon: 'error',
                    showConfirmButton: false,
                    showCloseButton: true,
                })
            }
        },
        error: function(xhr, status, error) {
            console.log("Error fetching images:", error);
        }
    });
}

