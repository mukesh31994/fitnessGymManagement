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
        firstName: {
            required: true
        },
        lastName: {
            required: true
        },
        mobileNo: {
            required: true,
            minlength: 10,
            maxlength: 10,
            digits: true,
            mobileNo: true
        },
        age: {
            required: true,
            digits: true
        },
        date: {
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
        mobileNo: {
            required: 'Please enter mobile number',
            digits: 'Digits only',
            mobileNo: 'Enter valid mobile number'
        },
        age: {
            required: 'Please enter age',
            digits: 'Digits only'
        },
        date: {
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
        }
    },
//Ajax form submition
    submitHandler: function (form) {
        saveCustomerDetails();
    },
// Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

/*      End of Code Validation       */

function saveCustomerDetails() {

    if ($customerUpdateForm.valid()) {
	debugger;
    var url1 = "http://localhost:8080/addMember";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData({"emailAddress":"devdh@gmail.com"})
    lAjax1.addEventListener('success', function (response) {debugger;
        console.log(response);

    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {debugger;
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
        
    } else {
        console.log('Form validation error');
    }
}

function getUserDetails()
{debugger;
    var url1 = "http://localhost:8080/getUserDetail";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setSync(true);
    lAjax1.setData({"emailAddress":"devdh@gmail.com"})
    lAjax1.addEventListener('success', function (response) {debugger;
        var json = JSON.parse(response);
        var data = JSON.parse(json.data);
        sessionStorage.setItem("USER", json.user);
        var lUser = JSON.parse(json.user);
        var menuDom = document.getElementById("menu");
//            if (menuDom.id == 'menu') {
        var menu = new Menu();
        menu.setDom(menuDom);
        menu.setData(data);
        menu.render();
        initApp.leftNav();
//            }
        document.getElementById("UserName").innerHTML = lUser.emailAddress;

//        _callback();
     /*   getStoreListByUserId();*/

    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {debugger;
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
//        }
}
