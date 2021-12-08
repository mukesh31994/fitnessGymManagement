
/*      global variable declaration     */
var Plan = true;
var lLoyaltyURL = localStorage.getItem('url') + "webresources/LoyaltyWebservices/";
var isSearchComplete = false;
var mobileNumber = '';
var ChequeSelected = true ;
/*  End of global variable declaration  */

/*  Code for field validation Smart Admin template  */
pageSetUp();
var errorClass = 'invalid';
var errorElement = 'em';

$(document).ready(function () {
    
        var $searchForm = $("#formSearchMobile").validate({
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
            searchCustomer: {
                required: true,
                digits: true, //^[7-9]{1}[0-9]{9}$
                mobileNo: true
            }
        },
        // Messages for form validation
        messages: {
            searchCustomer: {
                required: 'Please enter Mobile Number',
                digits: 'Numbers only',
                mobileNo: 'Invalid mobile number'
            }
        },
        // Ajax form submition
        submitHandler: function (form) {

        },
        // Do not change code below
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });
    
     
    

    
    /*      End of Code Validation       */

    $('#btnSearchCustomer').on('click', function () {
        search();

    });
    $('#searchCustomer').on('keypress', function (e) {
        if (e.keyCode === 13) {
            $('#btnSearchCustomer').click();
        }
    });
    $('#btnSubmit').click(function () {
        submit();
    });

    $('#modeOfPayment').change(function () {
        var lModeOfPayment = $('#modeOfPayment option:selected').val();
        if (lModeOfPayment == 'Cheque') {
            $("#sectionCheque").show();
            ChequeSelected = false;
//            $("#chequeNumber").attr({'required':true});
        } else {
            $("#sectionCheque").hide();
              document.getElementById('chequeNumber').value ='';
           ChequeSelected = true;
        }

    });

    $('#searchCustomer').focus();



    function getPlanNames() {
//        debugger
        var lurl = lLoyaltyURL + 'getPlanNames';
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('post');

        lAjax.addEventListener('success', function (response) {
            
            Plan = false;
            var res = JSON.parse(response);
            var lPlans=res.planDetails;
            for(var i=0; i<lPlans.length;i++)
            {
            var newOption = $('<option>');
            
            newOption.attr('value', lPlans[i].id).text(lPlans[i].planName);
            $('#selectPlan').append(newOption);
            
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }

    function search() {
        
        if ($searchForm.valid())
        {
            

            var lGetUserData = sessionStorage.getItem("USER");
            var lUserData = JSON.parse(lGetUserData);
            mobileNumber = form.getFieldById('searchCustomer').getValue();
            var lurl = lLoyaltyURL + 'getMerchantDetailsByMobileNumber?data=';
            var lData = {"admin": {"userId": lUserData.userId}, "merchant": {"mobileNo": mobileNumber}};
            var json = JSON.stringify(lData);
            var lAjax = new Ajax();
            lAjax.setUrl(lurl);
            lAjax.setType('post');
            lAjax.setData(json);
            lAjax.addEventListener('success', function (response) {
                
                var res = JSON.parse(response);
                if (res.merchantDetails.userDetails == "null") {
                    isSearchComplete = false;
                    $("#merchantTable").hide();
                            $("#planTable").hide();
                            $("#formSelectPlan").hide();
                    $.SmartMessageBox({
                        title: "Merchant doesn't exist ",
                        buttons: '[OK]'
                        
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "Register") {
                            window.location = 'index.html#ui/common/dashboard/dashboard.html';
                            $("#merchantTable").hide();
                            $("#planTable").hide();
                            $("#formSelectPlan").hide();
                            
                        }
                    });
                } else if (res.merchantDetails.userDetails.userId > 0) {

                    smallAlert("Merchant available", function () {}, 2000);

                    var lMerchantName = res.merchantDetails.userDetails.userName;
                    document.getElementById('name').innerHTML = lMerchantName;
                    document.getElementById('store').innerHTML = res.merchantDetails.storeDetails.LegalName;
                    document.getElementById('currentPlan').innerHTML = res.merchantDetails.planDetails.planName;
                    document.getElementById('address').innerHTML = res.merchantDetails.storeDetails.Locality + ' ' + res.merchantDetails.storeDetails.Pincode + ' ' + res.merchantDetails.storeDetails.City + ' ' + res.merchantDetails.storeDetails.State;


                    document.getElementById('StoreAllowed').innerHTML = res.merchantDetails.planDetails.noOfStoreAllowed;
                    document.getElementById('UserAllowed').innerHTML = res.merchantDetails.planDetails.noOfUserAllowed;
                    document.getElementById('CustomerAllowed').innerHTML = res.merchantDetails.planDetails.noOfCustomerAllowed;
                    document.getElementById('smsAllowed').innerHTML = res.merchantDetails.planDetails.noOfSmsAllowed;
                    /*  End of code for setting values of Customer Details */
                    isSearchComplete = true;
                  document.getElementById('chequeNumber').value ="";
                    $('#merchantTable').fadeIn('700');
                    $('#planTable').fadeIn('700');
                    $('#formSelectPlan').fadeIn('700');

                    $("#btnSubmit").show('700');
                   
                    if(Plan === true)
                    {
                      getPlanNames();  
                    }
                    
                  
                } else {
                    isSearchComplete = false;
                    smallAlert("Search failed", function () {}, 2000);
                }

            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log("Error : " + textStatus + "" + errorThrown);
          
            });
            lAjax.execute();

        } else {
            console.log('form validation error');
        }
    }

    function submit() {
        
        if(ChequeSelected == true)
        {
     
     
        $.SmartMessageBox({
            title: "Are you sure want to activate the plan",
            buttons: '[Cancel][Activate]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Cancel") {
                window.location.assign('index.html#ui/common/forms/PlanActivation.html');
            }
            if (ButtonPressed === "Activate") {
                Activation();
            }
        });
    }
    else
    {
           var lChequeNumber = $('#chequeNumber').val();
        if(lChequeNumber == '')
        {
        alert("Enter Cheque Number");
        }
        else
        {
             $.SmartMessageBox({
            title: "Are you sure want to activate the plan",
            buttons: '[Cancel][Activate]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Cancel") {
                window.location.assign('index.html#ui/common/forms/PlanActivation.html');
            }
            if (ButtonPressed === "Activate") {
                Activation();
            }
        });
        }
    }
    }
 
    
  
    

    function Activation() {
       
        var lurl = lLoyaltyURL + 'planActivation?data=';
        var lSelectedData = $('#selectPlan option:selected').val();
        var lModeOfPayment = $('#modeOfPayment option:selected').val();
        var lRemark = $("#Remark").val();
        var lChequeNumber = $('#chequeNumber').val();
        if (!lSelectedData || lSelectedData == 0) {
            $.SmartMessageBox({
                title: "Please select Plan for activation.",
                buttons: '[OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    window.location.assign('index.html#ui/common/forms/PlanActivation.html');
                }
            });
            return false;
        }
        var lData = {
            "planDetails": {"PlanId": lSelectedData},
            "merchantDetails": {"mobileNo": mobileNumber, "remark": lRemark, "modeOfPayment": lModeOfPayment, "chequeNumber": lChequeNumber}
        };
        var json = JSON.stringify(lData);

        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('post');
        lAjax.setData(json);
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.statusCode === '200' || res.statusMessage === 'Transaction successful!') {
                smallAlert("Plan activated successful", function () {}, 2000);
                search();
//                location.reload();
//                window.location.assign('index.html#ui/common/forms/PlanActivation.html');
            } else {
                $.SmartMessageBox({
                    title: "Plan activation failed. Please try again.",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.assign('index.html#ui/common/forms/PlanActivation.html');
                    }
                });
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }
});

