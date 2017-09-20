(function() {
	'use strict';
	/* global $ */
	const taskList = [{
   		'name': 'Test Task #1',
  		'date': '12/01/2012',
  		'assigned': 'John Doe'
  	},{
  		'name': 'Test Task #2',
  		'date': '12/02/2012',
  		'assigned': 'John Doe'
	}, {
   		'name': 'Test Task #3',
  		'date': '12/03/2012',
  		'assigned': 'John Doe'
	}, {
   		'name': 'Test Task #4',
  		'date': '12/04/2012',
  		'assigned': 'John Doe'
	}, {
   		'name': 'Test Task #5',
  		'date': '12/05/2012',
  		'assigned': 'John Doe'
	}, {
   		'name': 'Test Task #6',
  		'date': '12/06/2012',
  		'assigned': 'John Doe'
	}, {
   		'name': 'Test Task #7',
  		'date': '12/07/2012',
  		'assigned': 'John Doe'
	}];

	function appendTask(task, element) {
		element.css('display', 'grid');
		element.find('.task-name span').text(task.name);
		element.find('.task-date span').text(task.date);
		element.find('.task-assigned span').text(task.assigned);
		$('#task-recorded').append(element);
	}

	function initializeForm() {
		$('#task-form').submit((e)=> {
			e.preventDefault();
			let newTask = {
				name: $('#task-name').val(),
				date: $('#task-date').val(),
				assigned: $('#task-assignedTo').val()
			};
			$('#task-name').val('');
			$('#task-date').val('');
			$('#task-assignedTo').val('');
			taskList.push(newTask);
			appendTask(newTask, $('#task-recorded').children().first().clone());
		});
	}

	function initialize() {
		let element = $('#task-recorded').children().first().clone();
		taskList.forEach((entry) => {
			var clone = element.clone();
			appendTask(entry, clone);
		});

		initializeForm();
	}

	initialize();
	// $("#task-recorded").append(jQuery("#container_div_id").children().first().clone())

})();