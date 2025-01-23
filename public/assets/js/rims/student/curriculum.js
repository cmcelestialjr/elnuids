fetchProgramList();
$(document).off('change', '#studentCurriculumModal select[name="level"]').on('change', '#studentCurriculumModal select[name="level"]', function (e) {
    fetchProgramList();
});
$(document).off('change', '#studentCurriculumModal select[name="program"]').on('change', '#studentCurriculumModal select[name="program"]', function (e) {
    fetchCurriculumList();
});
$(document).off('change', '#studentCurriculumModal select[name="curriculum"]').on('change', '#studentCurriculumModal select[name="curriculum"]', function (e) {
    curriculumLoadDiv();
});
$(document).off('change', '#studentCurriculumModal select[name="branch"]').on('change', '#studentCurriculumModal select[name="branch"]', function (e) {
    curriculumLoadDiv();
});
function fetchProgramList(){
    var thisBtn = $('#studentCurriculumModal select');
    var id = $('#studentViewModal input[name="id"]').val();
    var level = $('#studentCurriculumModal select[name="level"] option:selected').val();
    var form_data = {
        id:id,
        level:level
    };
    $.ajax({
        url: base_url+'/rims/student/studentProgramList',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        beforeSend: function() {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');
            $('#studentCurriculumModal select[name="program"]').empty();
            $('#studentCurriculumModal select[name="curriculum"]').empty();
            $('#studentCurriculumModal select[name="branch"]').empty();
        },
        success : function(data){
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');
            console.log(data);
            $.each(data.programs, function(index, item) {
                var option = new Option(item.name+' ('+item.shorten+')', item.id);
                if (item.id === data.program_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="program"]').append(option);
            });
            $.each(data.curriculums, function(index, item) {
                var option = new Option(item.year_from, item.id);
                if (item.id === data.curriculum_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="curriculum"]').append(option);
            });
            $.each(data.branches, function(index, item) {
                var option = new Option(item.name, item.id);
                if (item.id === data.branch_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="branch"]').append(option);
            });
            $('#studentCurriculumModal select[name="curriculum"]').trigger('change');
            $('#studentCurriculumModal select[name="branch"]').trigger('change');
            curriculumLoadDiv();
        },
        error: function (){
            toastr.error('Error!');
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-success');
            thisBtn.removeClass('input-error');
        }
    });
}
function fetchCurriculumList(){
    var thisBtn = $('#studentCurriculumModal select');
    var id = $('#studentViewModal input[name="id"]').val();
    var program = $('#studentCurriculumModal select[name="program"] option:selected').val();
    var form_data = {
        id:id,
        program:program
    };
    $.ajax({
        url: base_url+'/rims/student/studentCurriculumList1',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        beforeSend: function() {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');
            $('#studentCurriculumModal select[name="curriculum"]').empty();
            $('#studentCurriculumModal select[name="branch"]').empty();
        },
        success : function(data){
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');
            $.each(data.curriculums, function(index, item) {
                var option = new Option(item.year_from, item.id);
                if (item.id === data.curriculum_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="curriculum"]').append(option);
            });
            $.each(data.branches, function(index, item) {
                var option = new Option(item.name, item.id);
                if (item.id === data.branch_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="branch"]').append(option);
            });
            $('#studentCurriculumModal select[name="curriculum"]').trigger('change');
            $('#studentCurriculumModal select[name="branch"]').trigger('change');
            curriculumLoadDiv();
        },
        error: function (){
            toastr.error('Error!');
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-success');
            thisBtn.removeClass('input-error');
        }
    });
}
function fetchBranchList(){
    var thisBtn = $('#studentCurriculumModal select');
    var id = $('#studentViewModal input[name="id"]').val();
    var curriculum = $('#studentCurriculumModal select[name="curriculum"] option:selected').val();
    var form_data = {
        id:id,
        curriculum:curriculum
    };
    $.ajax({
        url: base_url+'/rims/student/studentBranchList',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': CSRF_TOKEN
        },
        data:form_data,
        cache: false,
        beforeSend: function() {
            thisBtn.attr('disabled','disabled');
            thisBtn.addClass('input-loading');
            $('#studentCurriculumModal select[name="branch"]').empty();
        },
        success : function(data){
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-loading');
            $.each(data.branches, function(index, item) {
                var option = new Option(item.name, item.id);
                if (item.id === data.branch_id) {
                    option.selected = true;
                }
                $('#studentCurriculumModal select[name="branch"]').append(option);
            });
            $('#studentCurriculumModal select[name="branch"]').trigger('change');
            curriculumLoadDiv();
        },
        error: function (){
            toastr.error('Error!');
            thisBtn.removeAttr('disabled');
            thisBtn.removeClass('input-success');
            thisBtn.removeClass('input-error');
        }
    });
}
function curriculumLoadDiv(){
    var thisBtn = $('#studentCurriculumModal select');
    var id = $('#studentViewModal input[name="id"]').val();
    var level = $('#studentCurriculumModal select[name="level"] option:selected').val();
    var curriculum = $('#studentCurriculumModal select[name="curriculum"] option:selected').val();
    var form_data = {
        id:id,
        level:level,
        curriculum:curriculum
    };
    var form_data = {
        url_table:base_url+'/rims/student/studentCurriculumLoad',
        tid:'studentCurriculumDiv',
        id:id,
        level:level,
        curriculum:curriculum
    };
    loadDivwLoader(form_data,thisBtn);
}
