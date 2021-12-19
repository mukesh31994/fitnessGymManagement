$("#btnSave").on('click');
pageSetUp();
$("#FirstName").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $addInstructorform = $("#addInstructorform").validate({
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
        username: {
            required: true
        },
        password: {
            required: true
        },
        contact: {
            required: true,
            minlength: 10,
            maxlength: 10,
            digits: true,
            mobileNo: true
        },
        address: {
            required: true
        },
        email: {
            required: true
        }

    },
    messages: {
        username: {
            required: 'Please enter full name',
            alphabets: 'Alphabets only'
        },
         password: {
            required: 'Please enter password',
            alphabets: 'Alphabets only'
        },
        contact: {
            required: 'Please enter mobile number',
            digits: 'Digits only',
            mobileNo: 'Enter valid mobile number'
        },
        address: {
            required: 'Please enter the address'
        },
        email: {
            required: 'Please select email-Id'
        }
    },
//Ajax form submition
    submitHandler: function (form) {
        saveMember();
    },
// Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function saveMember() {

    if ($addInstructorform.valid()) {
	
    var url1 = "/addInstructor";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {
        console.log(response);
		$.smallBox({
			title: "Instructor",
			content: "<i class='fa fa-clock-o'></i> <i>Instructor Save Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListInstructor.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
        
    } else {
        console.log('Form validation error');
    }
}


