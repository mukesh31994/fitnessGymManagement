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
		firstName: {
			required: true
		},
		lastName: {
			required: true
		},
		contact: {
			required: true,
			minlength: 10,
			maxlength: 10,
			digits: true
		},
		age: {
			required: true,
			digits: true
		},
		birthdate: {
			required: true,
			date: true
		},
		gender: {
			required: true
		},
		address: {
			required: true
		},
		memberShipType: {
			required: true
		},
		email: {
			required: true
		}

	},
	messages: {
		firstName: {
			required: 'Please enter first name',
			alphabets: 'Alphabets only'
		},
		lastName: {
			required: 'Please enter last name',
			alphabets: 'Alphabets only'
		},
		contact: {
			required: 'Please enter mobile number',
			digits: 'Digits only'
		},
		age: {
			required: 'Please enter age',
			digits: 'Digits only'
		},
		birthdate: {
			date: 'Enter valid date'
		},
		gender: {
			required: 'Please select your gender'
		},
		address: {
			required: 'Please enter the address'
		},
		memberShipType: {
			required: 'Please select membership type'
		},
		email: {
			required: 'Please select email-Id'
		}
	},
	//Ajax form submition
	submitHandler: function(form) {
		saveMember();
	},
	// Do not change code below
	errorPlacement: function(error, element) {
		error.insertAfter(element.parent());
	}
});

/*      End of Code Validation       */

function saveMember() {

	if ($customerUpdateForm.valid()) {

		var url1 = "/addMember";
		var lAjax1 = new FormAjax();
		lAjax1.setUrl(url1); 
		lAjax1.setSync(true);
		lAjax1.setData($('form').serialize())
		lAjax1.addEventListener('success', function(response) {
			//console.log(response);
			$.smallBox({
				title: "Member",
				content: "<i class='fa fa-clock-o'></i> <i>Member Save Successfully...</i>",
				color: "#659265",
				iconSmall: "fa fa-check fa-2x fadeInRight animated",
				timeout: 4000
			});
			JSON.parse(response).memberId
			window.location.href = "#ui/form/AddPayment.html?id=" + JSON.parse(response).memberId
			//	window.location.href="#ui/list/ListMember.html";
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
	$("#branchId").val(JSON.parse(sessionStorage.user).branchId);
	var url = "/getAllMembershipType";
	var lAjax1 = new FormAjax();
	lAjax1.setUrl(url);
	lAjax1.setSync(true);
	lAjax1.setData($('form').serialize())
	lAjax1.addEventListener('success', function(response) {
		var dataSet = JSON.parse(response);
		$.each(dataSet, function(i, item) {
			$('<option>').val(item.membershipId).text(item.membershipName + " - " + item.membershipAmount + " Euro").appendTo('#membershipId');
		});

	});
	lAjax1.addEventListener('error', function(textStatus, errorThrown) {
		console.log(textStatus + " ; " + errorThrown);
	});
	lAjax1.execute();
}

