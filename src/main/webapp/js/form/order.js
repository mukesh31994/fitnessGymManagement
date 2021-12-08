/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$("#btnAdd").on('click', saveOrder);

function viewCallBack(pData) {
    console.log('pData' + pData);
}

function OnLoad() {
//    debugger;
    var action = dataParam.getData('action');
    if (action && action === 'view') {        
        view();
    }
}

function view() {
    var action = dataParam.getData('action');
    var id = dataParam.getData('id');
    console.log('action ' + action + 'id:' + id);
    form.view(id, viewCallBack);
}


function saveOrder() {    
    var data = form.getJSON();
    var lJSON = {};
    var action = dataParam.getData('action');
    if (action && action === 'view') {        
        view();
        lJSON = form.getJSON();
    }else{
         lJSON = form.getJSON();
         delete lJSON['orderId'];
    }
//    debugger;    
    form.save(lJSON);
}

var errorClass = 'invalid';
var errorElement = 'em';


var $orderForm = $("#orderform").validate({
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
        FirstName: {
            required: true
        },
        LastName: {
            required: true

        },
        MobileNo: {
            required: true,
            minlength: 10,
            maxlength: 10
        }
    },
    // Messages for form validation
    messages: {
        FirstName: {
            required: 'Please enter your First name'
        },
        LastName: {
            required: 'Please enter your Last Name'

        },
        MobileNo: {
            required: 'Please enter your phone number'
        }
    },
    // Ajax form submition
//        submitHandler: function (form) {
//            $(form).ajaxSubmit({
//                success: function () {
//                    $("#addCustomer-form").addClass('submited');
//                }
//            });
//        },
    // Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});
