$(document).ready(function(){

	var url = "/ajax-crud/public/tasks";

	//display modal form for task editing
	$('.open-modal').click(function(){
		var task_id = $(this).val();
		$.get(url + '/' + task_id, function (data) {
			//success data
			console.log(data);
			$('#task_id').val(data.id);
			$('#task').val(data.task);
			$('#description').val(data.description);
			$('#email').val(data.email);
			$('#btn-save').val("update");
			$('#myModal').modal('show');
		})
	});

	//display modal form for creating new task
	$('#btn-add').click(function(){
		$('#btn-save').val("add");
		$('#frmTasks').trigger("reset");
		$('#myModal').modal('show');
	});

	//delete task and remove it from list
	$('.delete-task').click(function(){
		var task_id = $(this).val();

		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		})
		$.ajax({
			type: "DELETE",
			url: url + '/' + task_id,
			success: function (data) {
				console.log(data);
				$("#task" + task_id).remove();
			},
			error: function (data) {
				console.log('Error:', data);
			}
		});
	});

	//create new task / update existing task
	$("#btn-save").click(function (e) {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		})
		e.preventDefault();
		var formData = {
			task: $('#task').val(),
			description: $('#description').val(),
			email: $('#email').val(),
		}

		//used to determine the http verb to use [add=POST], [update=PUT]
		var state = $('#btn-save').val();
		var type = "POST"; //for creating new resource
		var task_id = $('#task_id').val();
		var my_url = url;
		if (state == "update"){
			type = "PUT"; //for updating existing resource
			my_url += '/' + task_id;
		}
		console.log(formData);
		$.ajax({
			type: type,
			url: my_url,
			data: formData,
			dataType: 'json',
			success: function (data) {
				console.log(data);
				if($.isEmptyObject(data.errors)){
					$('.alert-success').show().fadeIn('slow');
					$('.alert-success').append('<p>Success</p>').delay(3000).fadeOut('slow');

					var task = '<tr id="task' + data.id + '"><td>' + data.id + '</td><td>' + data.task + '</td><td>' + data.description + '</td><td>'+ data.email +'</td><td>' + data.created_at + '</td>';
					task += '<td><button class="btn btn-warning btn-xs btn-detail open-modal" value="' + data.id + '">Edit</button>';
					task += ' <button class="btn btn-danger btn-xs btn-delete delete-task" value="' + data.id + '">Delete</button></td></tr>';

					if (state == "add"){ //if user added a new record
						$('#tasks-list').append(task);
					}else{ //if user updated an existing record

						$("#task" + task_id).replaceWith( task );
					}
					$('#frmTasks').trigger("reset");
					$('#myModal').modal('hide')
				}else{
					$.each(data.errors, function(key, value){
						$('.alert-danger').show().fadeIn('slow');
						$('.alert-danger').append('<p>'+value+'</p>').delay(3000).fadeOut('slow');
					});
				}
			},
			error: function (data) {
				console.log('Error:', data);
			}
		});
	});
});