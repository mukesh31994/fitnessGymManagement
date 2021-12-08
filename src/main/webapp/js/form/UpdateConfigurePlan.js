/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.Lead_Date
 */
//$("#btnUpdate").on('click', UpdateConfigurePlan);

function viewCallBack(pData)
{
    console.log('pData' + pData);
}

function OnLoad()
{
    var action = dataParam.getData('action');
    if (action && action === 'view')
    {
        view();
        dataParam.setData('action', '');
    }   
}

function view()
{
    var action = dataParam.getData('action');
    var id = dataParam.getData('id');
    console.log('action ' + action + 'id:' + id);
    form.view(id, viewCallBack);
}

pageSetUp();
$("#MinTransAmt").focus();
var errorClass = 'invalid';
var errorElement = 'em';
var $updateConfigurePlanForm = $("#updateConfigurePlanForm").validate({
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
        MinTransAmt: {
            required: true
        },
        PointAssurance: {
            required: true
        },
         FirstTransCriteria: {
            required: true
        },
        NextTranscriteria: {
            required: true
        }
       
    },
    messages: {
        MinTransAmt : {
            required: 'Please enter minimum transaction amount'
            
        },
        PointAssurance: {
            required: 'Please enter Points Issuance'
        
        },
        FirstTransCriteria:{
           required: 'Please enter 1st redemption value' 
        },
        NextTranscriteria:{
           required: 'Please enter 2nd redemption value' 
        }
    },
    //Ajax form submition
    submitHandler: function (form) {
        UpdateConfigurePlan();
    },
    // Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

function UpdateConfigurePlan()
{
  
    if ($updateConfigurePlanForm.valid()) 
     {
    var lJSON = {};
    var action = dataParam.getData('action');
    if (action && action === 'view') {
        lJSON = form.getJSON();
        var getData = sessionStorage.getItem("USER");
        lUserData = JSON.parse(getData);
        if (lUserData.userType === 'MANAGER')
        {
            lJSON.MAKERID = lUserData.addedBy;
        } else
        {
            lJSON.MAKERID = lUserData.userId;
        }
    } else {
        lJSON = form.getJSON();
          if (lJSON.MinTransAmt === "0")
            {
                $.SmartMessageBox({
                    title: "Minimum transaction amount should be greater than 0",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.assign('index.html#ui/common/forms/UpdateConfigurePlan.html');
                        $('#MinTransAmt').focus();

//                          location.reload();
                    }
                });
            }else
            {
                form.update(lJSON, function () {
          
            smallAlert("Updated successfully", function () {
                window.location = '#ui/common/list/ConfigurePlanDetails.html';
                location.reload();
            }, 2000);
        });
            }
    }
    
    
}
else {
        console.log('Form validation error');
    }
}
