$("#btnSave").on('click');
pageSetUp();
var errorClass = 'invalid';
var errorElement = 'em';
var $createWorkoutform = $("#createWorkoutform").validate({
    errorClass: errorClass,
    errorElement: errorElement,
    highlight: function (element) {
        $(element).parent().removeClass('state-success').addClass("state-error");
        $(element).removeClass('valid');
    },
    unhighlight: function (element) {
        $(element).parent().removeClass("state-error").addClass('state-success');
        $(element).addClass('valid');
    },
// Rules for form validation
    rules: {
        workoutName: {
            required: true
        },
        description: {
            required: true
        }
    },
    messages: {
        workoutName: {
            required: 'Please enter workout name'
        },
        description: {
            required: 'Please enter description'
        }
    },
//Ajax form submition
    submitHandler: function (form) {
        saveWorkout();
    },
// Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function saveWorkout() {

    if ($createWorkoutform.valid()) {
	$("#userId").val(JSON.parse(sessionStorage.user).userId);
    var url1 = "/addWorkout";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
		$.smallBox({
			title: "Workout",
			content: "<i class='fa fa-clock-o'></i> <i>Workout Save Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListWorkout.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
        
    } else {
        console.log('Form validation error');
    }
}


