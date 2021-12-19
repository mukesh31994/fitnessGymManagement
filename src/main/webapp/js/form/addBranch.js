$("#btnSave").on('click');
pageSetUp();
$("#FirstName").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $customerUpdateForm = $("#updateCustomerform").validate({
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
        }

    },
    messages: {
        username: {
            required: 'Please enter first name',
            alphabets: 'Alphabets only'
        },
        password: {
            required: 'Please enter last name',
            alphabets: 'Alphabets only'
        }
    },
//Ajax form submition
    submitHandler: function (form) {
        saveUser();
    },
// Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function saveUser() {
debugger;
    if ($customerUpdateForm.valid()) {
	
    var url1 = "/addUser";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData( $('form').serialize() )
    lAjax1.addEventListener('success', function (response) {debugger;
        console.log(response);
		$.smallBox({
			title: "Admin",
			content: "<i class='fa fa-clock-o'></i> <i>Admin Save Successfully...</i>",
			color: "#659265",
			iconSmall: "fa fa-check fa-2x fadeInRight animated",
			timeout: 4000
		});
		window.location.href="#ui/list/ListAdmin.html";
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {debugger;
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
        
    } else {
        console.log('Form validation error');
    }
}


