$("#btnSave").on('click');
pageSetUp();
var errorClass = 'invalid';
var errorElement = 'em';
var $createWorkoutPlanform = $("#createWorkoutPlanform").validate({
	errorClass: errorClass,
	errorElement: errorElement,
	highlight: function(element) {
		$(element).parent().removeClass('state-success').addClass("state-error");
		$(element).removeClass('valid');
	},
	unhighlight: function(element) {
		$(element).parent().removeClass("state-error").addClass('state-success');
		$(element).addClass('valid');
	},
	// Rules for form validation
	rules: {
		workoutDate: {
			required: true
		},
		workoutTime: {
			required: true
		}
	},
	messages: {
		workoutDate: {
			required: 'Please enter workout date'
		},
		workoutTime: {
			required: 'Please enter workout time'
		}
	},
	//Ajax form submition
	submitHandler: function(form) {
		saveWorkoutPlan();
	},
	// Do not change code below
	errorPlacement: function(error, element) {
		error.insertAfter(element.parent());
	}
});

/*      End of Code Validation       */

function saveWorkoutPlan() {
	
	if ($createWorkoutPlanform.valid()) {

		var url1 = "/addWorkoutPlan";
		var lAjax1 = new FormAjax();
		lAjax1.setUrl(url1);
		lAjax1.setSync(true);
		lAjax1.setData($('form').serialize())
		lAjax1.addEventListener('success', function(response) {
			
			console.log(response);
			$.smallBox({
				title: "Workout Plan",
				content: "<i class='fa fa-clock-o'></i> <i>Workout Plan Save Successfully...</i>",
				color: "#659265",
				iconSmall: "fa fa-check fa-2x fadeInRight animated",
				timeout: 4000
			});
		});
		lAjax1.addEventListener('error', function(textStatus, errorThrown) {
			console.log(textStatus + " ; " + errorThrown);
		});
		lAjax1.execute();

	} else {
		console.log('Form validation error');
	}
}

function OnLoad() {
	
	var url = "/getAllMember";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.memberId).text(item.firstName + " - " + item.email).appendTo('#memberId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
	
	var url = "/getAllWorkout";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.workoutId).text(item.workoutName).appendTo('#workoutId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
	
	var url = "/getAllInstructor";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.instructorId).text(item.instructorName).appendTo('#instructorId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
}


