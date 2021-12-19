$("#btnSave").on('click');
pageSetUp();
$("#FirstName").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $customerUpdateForm = $("#updateCustomerform").validate({
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
		branchName: {
			required: true
		},
		contact: {
			required: true
		},
		address: {
			required: true
		}

	},
	messages: {
		branchName: {
			required: 'Please enter Branch name',
			alphabets: 'Alphabets only'
		},
		contact: {
			required: 'Please enter mobile number',
			digits: 'Digits only'
		},
		address: {
			required: 'Please enter Branch address',
			alphabets: 'Alphabets only'
		}
	},
	//Ajax form submition
	submitHandler: function(form) {
		saveBranch();
	},
	// Do not change code below
	errorPlacement: function(error, element) {
		error.insertAfter(element.parent());
	}
});

/*      End of Code Validation       */

function saveBranch() {

	if ($customerUpdateForm.valid()) {

		var url1 = "/addBranch";
		var lAjax1 = new FormAjax();
		lAjax1.setUrl(url1);
		lAjax1.setSync(true);
		lAjax1.setData($('form').serialize())
		lAjax1.addEventListener('success', function(response) {
			console.log(response);
			$.smallBox({
				title: "Branch",
				content: "<i class='fa fa-clock-o'></i> <i>Branch Save Successfully...</i>",
				color: "#659265",
				iconSmall: "fa fa-check fa-2x fadeInRight animated",
				timeout: 4000
			});
			window.location.href = "#ui/list/ListBranch.html";
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
	$("#userId").val(JSON.parse(sessionStorage.user).userId);
}
