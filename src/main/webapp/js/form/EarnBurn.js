/*      global variable declaration     */
debugger;
var lbirthdate = '';
var pincode;
var TransactionPinAllowed;
var laniversarydate = '';
var lTransactionType = '';
var lLoyaltyURL = localStorage.getItem('url') + "webresources/LoyaltyWebservices/";
var lStoreData = localStorage.getItem('storeDetails');
var lStore = JSON.parse(lStoreData);
var UserRemaining = localStorage.getItem('NoOfCustomerRemaiming');
var CashBackBalance = localStorage.getItem('CashBackBalance');
var storeId = lStore.StroreId;
var daysCount = lStore.daysCount;
var requesterId = '';
var mobileNumber = sessionStorage.getItem('custMobileNo');      //Add customer.html
//if (mobileNumber) {
//    document.getElementById('searchCustomer').value = mobileNumber;
//}
var UserDetail = JSON.parse(sessionStorage.getItem('USER'));

var custId = '';
var custName = '';
var balancePoints = 0;
var minTransAmnt = 0;
var pointValue = 0;
var pointIssuance = 0;
var firstTransCriteria = '';
var nextTranscriteria = '';
var burnCriteria = '';
var criteria = '';
var earnPointCriteria = '';
var purchaseAmount = 0;
var validity = '';
var expiry = '';
var isSearchComplete = false;
var IsRedeemCodeBtnClicked = false;
var CutomerMobileVal = false;
var PaymentHistoryId = 0;
/*  End of global variable declaration  */

/*  Code for field validation Smart-Admin template  */
pageSetUp();
var errorClass = 'invalid';
var errorElement = 'em';

$(document).ready(function () {
    getLoyaltyPlanByStoreId();
//    var $searchForm = $("#formSearchMobile").validate({
//        errorClass: errorClass,
//        errorElement: errorElement,
//        highlight: function (element) {
//            $(element).parent().removeClass('state-success').addClass("state-error");
//            $(element).removeClass('valid');
//        },
//        unhighlight: function (element) {
//            $(element).parent().removeClass("state-error").addClass('state-success');
//            $(element).addClass('valid');
//        },
//        // Rules for form validation
//        rules: {
//            searchCustomer: {
//                required: true,
//                digits: true, //^[7-9]{1}[0-9]{9}$
//                mobileNo: true
//            }
//        },
//        // Messages for form validation
//        messages: {
//            searchCustomer: {
//                required: 'Please enter Mobile Number',
//                digits: 'Numbers only',
//                mobileNo: 'Invalid mobile number'
//            }
//        },
//        // Ajax form submition
//        submitHandler: function (form) {
////            getLoyaltyPlanByStoreId();
//            search();
//
//        },
//        // Do not change code below
//        errorPlacement: function (error, element) {
//            error.insertAfter(element.parent());
//        }
//    });


    var $formEarnBurn = $("#formEarnBurn").validate({

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
        rules: {
            PurchaseAmount: {
                required: true,
                digits: true
            },
            PointsDeducted: {
                required: true,
                digits: true
            },
            RedemptionCode: {
                required: true,
                digits: true
            },
            InvoiceId: {
                required: true,
                digits: true
            },
            CashBackAmount: {
                required: true,
                digits: true
            }
        },
        messages: {
            PurchaseAmount: {
                required: 'Please enter Purchase Amount',
                digits: 'Please enter digits only'
            },
            PointsDeducted: {
                required: 'Please enter Points to Burn',
                digits: 'Please enter digits only'
            },
            RedemptionCode: {
                required: 'Please enter Redemption Code',
                digits: 'Please enter digits only'
            },
            InvoiceId: {
                required: 'Please enter invoice number',
                digits: 'Please enter digits only'
            },
            CashBackAmount: {
                required: 'Please enter cashback amount ',
                digits: 'Please enter digits only'
            }
        },
        // Ajax form submition
        submitHandler: function (form) {
//        saveFormData();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent());
        }
    });

    /*      End of Code for Validation       */

    $('#btnSearchCustomer').on('click', function () {
        search();
    });
    $('#searchCustomer').on('keypress', function (e) {
        $("#MobileAlert").hide();
        if (e.keyCode === 13) {
            $('#btnSearchCustomer').click();
        }
    });
    $('#btnEarn').on('click', function () {
        earn();
    });
    $("#btnBurn").on('click', function () {
        burn();
    });
    $('#btnCashBack').on('click', function () {
        cashBack();
    });
    $('#reqCode').on('click', function () {
        redemptionCode();
    });
    $('#btnEarnBurnVoid').on('click', function () {
        saveFormData();
    });
    lStoreData
    $('#cashBackBtn').on('click', function () {
        validateCashBackEntry();
    });
    $('#btnIssueC').on('click', function () {

        $.SmartMessageBox({
            title: "Are you sure you want to Issue Coupon?",
            buttons: '[Cancel][OK]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "OK") {
                $('#btnEarnBurnVoid').removeAttr('disabled');
                $('#btnEarnBurnVoid').attr('enabled', true);
                $("#txnform").show().fadeIn(800);
                $('#burnRow').hide();
                $('#summaryTable').hide(800);
                $('#PurchaseAmount').focus();
                sessionStorage.setItem("IssueCoupon", true);
                sessionStorage.setItem("custIssue", custId);
                window.location.href = "index.html#ui/common/list/IssueCoupon.html";
            }
            if (ButtonPressed === "Cancel") {
                $("#MsgBoxBack").addClass('fadeOut');
                $("#MsgBoxBack").removeClass('fadeIn');

            }
        });
    });
    $('#searchCustomer').focus();

    function getLoyaltyPlanByStoreId() {
        debugger;
//        if ($searchForm.valid())
//        {
        if (daysCount < 0) {
            $.SmartMessageBox({
                title: "Your plan has expired. Please recharge to continue ",
                template: '<center></center>',
                buttons: '[OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    window.location.href = 'index.html#ui/common/dashboard/dashboard.html';
                }
            });
            return false;
        } else if (lStore.smsRemain == 0) {
            $.SmartMessageBox({
                title: "SMS pack has expired. Kindly recharge it ",
                template: '<center></center>',
                buttons: '[OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    window.location.href = 'index.html#ui/common/dashboard/dashboard.html';
                }
            });
            return false;
        }

        var lurl = lLoyaltyURL + 'getLoyaltyPlanByStoreId?data=';
        var lData = {"StroreId": storeId};
        var json = JSON.stringify(lData);
        lurl = lurl + json;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('get');
        lAjax.setContentType('Application/json');
        lAjax.addEventListener('success', function (response) {
            debugger;
            var res = JSON.parse(response);
            minTransAmnt = Number(res.MinTransAmt);
            pointIssuance = Number(res.PointAssurance) / 100;
            pointValue = Number(res.PointValue);
            firstTransCriteria = Number(res.FirstTransCriteria);
            nextTranscriteria = Number(res.NextTranscriteria);
            earnPointCriteria = res.EarnPointCriteria;
            validity = res.Validity;
            expiry = res.Expiry;
            if (res.ConfigID > 0) {
                mobileNumber = form.getFieldById('searchCustomer').getValue();
//                    search();
            } else {
                $.SmartMessageBox({
                    title: "No Loyalty Program found for this store !!!!",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.assign('index.html#ui/common/dashboard/dashboard.html');
                    }
                });
                return false;
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }
//    }

    function getCustTxnDetails(custDetails, lcustomerName) {

        var lurl = lLoyaltyURL + 'getCustomerTransactionDetailsByCustomerId';
        var lData = {"data": {"CustomerID": custDetails.custId}};
        var json = JSON.stringify(lData);
        var lAjax = new Ajax();
        lAjax.setData(json); //  It is used when setType = 'post'    
        lAjax.setUrl(lurl);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            document.getElementById('name').innerHTML = lcustomerName;
            document.getElementById('mobileNo').innerHTML = mobileNumber;
            document.getElementById('balance').innerHTML = balancePoints;
            document.getElementById('noOfTransaction').innerHTML = res.data.repeatCount;

            var d = new Date();
            var lBirthDay = custDetails.birthDate + ' ' + d.getFullYear();
            var lAnniversaryDay = custDetails.anvirsaryDate + ' ' + d.getFullYear();

            var lnewDate = new Date(lBirthDay);
            var lnewAnniversaryDay = new Date(lAnniversaryDay);

            var lBday = new Date(lnewDate.toLocaleDateString());
            var lAnniversaryDay = new Date(lnewAnniversaryDay.toLocaleDateString());

            var lCurrDate = new Date(d.toLocaleDateString());

            var timeBirthDiff = Math.abs(lBday.getTime() - lCurrDate.getTime());
            var timeAnniversaryDiff = Math.abs(lAnniversaryDay.getTime() - lCurrDate.getTime());

            var lComparedBirthDate = Math.ceil(timeBirthDiff / (1000 * 3600 * 24));
            var lComparedAnniversaryDate = Math.ceil(timeAnniversaryDiff / (1000 * 3600 * 24));

            if (lComparedBirthDate <= 7)
            {
                document.getElementById('birthdate').innerHTML = custDetails.birthDate;
//                $("#birthdate").val(custDetails.birthDate);
                $("#birthdate").css("font-weight", "bold");

            } else {
                document.getElementById('birthdate').innerHTML = custDetails.birthDate;
                $("#birthdate").css("font-weight", "normal");

            }
            if (lComparedAnniversaryDate <= 7)
            {
//                $("#anniversarydate").val(custDetails.anvirsaryDate);
                document.getElementById('anniversarydate').innerHTML = custDetails.anvirsaryDate;
                $("#anniversarydate").css("font-weight", "bold");
            } else {
                $("#anniversarydate").css("font-weight", "normal");
                document.getElementById('anniversarydate').innerHTML = custDetails.anvirsaryDate;
            }

        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }



    function search() {

//                if ($searchForm.valid())
//        {
        var CustomerMobileNo = form.getFieldById('searchCustomer').getValue();
//        if (CustomerMobileNo === "")
//        {
        $('#summaryTable').hide();
        $('#formEarnBurn').hide();
        sessionStorage.setItem('custMobileNo', '');
        $('#customerTable').hide();

        $("#btnSearchCustomer").prop('disabled', true);

        $('#summaryTable').hide();
        $('#formEarnBurn').hide();
        sessionStorage.setItem('custMobileNo', '');
        $('#customerTable').hide();

        formDataClear();
        mobileNumber = form.getFieldById('searchCustomer').getValue();
        var lurl = lLoyaltyURL + 'getCustomerByMobile?data=';

        var lData = {"StoreId": storeId, "MobileNo": mobileNumber};
        var json = JSON.stringify(lData);
        lurl = lurl + json;
        console.log(lurl);

        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('get');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.customerDetails.custId > 0) {
                $("#btnSearchCustomer").prop('disabled', false);

                smallAlert("Customer available", function () {}, 2000);
                custId = res.customerDetails.custId;
                balancePoints = Number(res.customerBalance);
                burnCriteria = res.customerNoOfTran;
                if (!res.customerDetails.firstName) {
                    var lcustomerName = (res.customerDetails.firstName) + " " + (res.customerDetails.lastName);
                } else {
                    var lcustomerName = (res.customerDetails.firstName).charAt(0).toUpperCase() + (res.customerDetails.firstName).slice(1).toLowerCase() + " " + ((res.customerDetails.lastName).charAt(0).toUpperCase() + (res.customerDetails.lastName).slice(1).toLowerCase());
                }
//                    
                getCustTxnDetails(res.customerDetails, lcustomerName);

                /*  End of code for setting values of Customer Details */
                isSearchComplete = true;
                $('#customerTable').show();
                $('#actions').show();
                if (burnCriteria === '1') {
                    criteria = firstTransCriteria;
                } else {
                    criteria = nextTranscriteria;
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

//            } else {
//                console.log('form validation error');
//            }
    }


    function earn() {


        if (IsRedeemCodeBtnClicked == true) {
            $.SmartMessageBox({
                title: "Are you sure you want to cancel Transaction?",
                buttons: '[Cancel][OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    $('#btnEarnBurnVoid').removeAttr('disabled');
                    $('#btnEarnBurnVoid').attr('enabled', true);
                    $("#txnform").show().fadeIn(800);
                    $('#burnRow').hide();
                    $('#summaryTable').hide(800);
                    $('#PurchaseAmount').focus();
                    IsRedeemCodeBtnClicked = false;
                    formDataClear();
                    lTransactionType = 'EARN';
                }
                if (ButtonPressed === "Cancel") {
                    $("#MsgBoxBack").addClass('fadeOut');
                    $("#MsgBoxBack").removeClass('fadeIn');

                }
            });

        } else {
            $('#btnEarnBurnVoid').show();
            $('#normalBtnSection').show();
            $('#cashBackBtnSection').hide();
            $('#cashBackSection').hide();
            $('#radioButtonSection').hide();
            $("#formEarnBurn").show();
            $('#btnEarnBurnVoid').removeAttr('disabled');
            $('#btnEarnBurnVoid').attr('enabled', true);
            $("#txnform").show().fadeIn(800);
            $('#burnRow').hide();
            $('#summaryTable').hide(800);
            $('#PurchaseAmount').focus();
            formDataClear();
            lTransactionType = 'EARN';
        }
// document.getElementById("btnEarnBurnVoid").disabled = true;
    }

    function cashBack() {
        if (IsRedeemCodeBtnClicked == true) {
            $.SmartMessageBox({
                title: "Are you sure you want to cancel Transaction?",
                buttons: '[Cancel][OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    $('#btnEarnBurnVoid').removeAttr('disabled');
                    $('#btnEarnBurnVoid').attr('enabled', true);
                    $("#txnform").show().fadeIn(800);
                    $('#burnRow').hide();
                    $('#summaryTable').hide(800);
                    $('#PurchaseAmount').focus();
                    IsRedeemCodeBtnClicked = false;
                    formDataClear();
                    lTransactionType = 'EARN';
                }
                if (ButtonPressed === "Cancel") {
                    $("#MsgBoxBack").addClass('fadeOut');
                    $("#MsgBoxBack").removeClass('fadeIn');

                }
            });

        } else {
            $('#btnEarnBurnVoid').show();
            $('#cashBackSection').show();
            $('#radioButtonSection').show();
            $('#normalBtnSection').hide();
            $('#cashBackBtnSection').show();
            $('#cashBackBalance').text(CashBackBalance);
            $("#formEarnBurn").show();
            $('#btnEarnBurnVoid').removeAttr('disabled');
            $('#btnEarnBurnVoid').attr('enabled', true);
            $("#txnform").show().fadeIn(800);
            $('#burnRow').hide();
            $('#summaryTable').hide(800);
            $('#PurchaseAmount').focus();
            formDataClear();
//            getTrariffPlan();
        }

    }


    function burn() {

        debugger;
        if (IsRedeemCodeBtnClicked === true) {
            $.SmartMessageBox({
                title: "Are you sure you want to cancel Transaction?",
                buttons: '[Cancel][OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    $('#btnEarnBurnVoid').removeAttr('disabled');
                    $('#btnEarnBurnVoid').attr('enabled', true);
                    $("#txnform").show().fadeIn(800);
                    $('#burnRow').hide();
                    $('#summaryTable').hide(800);
                    $('#PurchaseAmount').focus();
                    IsRedeemCodeBtnClicked = false;
                    formDataClear();
                    lTransactionType = 'EARN';
                }
                if (ButtonPressed === "Cancel") {
                    $("#MsgBoxBack").addClass('fadeOut');
                    $("#MsgBoxBack").removeClass('fadeIn');

                }
            });
        } else {

            $('#normalBtnSection').show();
            $('#cashBackBtnSection').hide();

            $('#cashBackSection').hide();
            $('#radioButtonSection').hide();
//            $('#btnEarnBurnVoid').hide(); 
            $('#requestCodeBtn').hide();
            $("#formEarnBurn").show();
            $('#summaryTable').hide(800);
            $('#PurchaseAmount').focus();
//        $('#PurchaseAmount').focus();
            formDataClear();
            lTransactionType = 'BURN';
            if (balancePoints <= 0) {
                $.SmartMessageBox({
                    title: "Can not Burn. Balance point should be greater than 0.",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';
                    }
                });
            } else if (criteria > balancePoints) {
                $.SmartMessageBox({
                    title: "Can not burn !<br> You can redeem points only when customer have minimum " + criteria + " point balance.",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';

                    }
                });

            } else {
                $("#txnform").show();
                $("#burnRow").show();
                $("#labelRedemp").hide();
                $("#inputRedemp").hide();
                getPinTransactionData();
            }
            document.getElementById("reqCode").disabled = false;
            document.getElementById("btnEarnBurnVoid").disabled = false;
        }
    }

    function saveFormData() {
        debugger;
        if ($formEarnBurn.valid())
        {
//            var lurl = lLoyaltyURL + "addTransactionHistroy";
            var lData = form.getJSON();
            purchaseAmount = Number(lData.PurchaseAmount);
            var lInvoiceId = lData.InvoiceId;
            var lRemark = document.getElementById('Remark').value;
            var lPointsDeducted = Number(lData.PointsDeducted);
            var lEarnPoints = 0;
            var lClosingBalance = 0;
            var lAmountToPay = 0;
//            var lOpeningBalance = balancePoints;
            var lDataEarnBurnVoid = {};

            if (lTransactionType === 'EARN')
            {
                debugger;
                /*    Code for calculation          */
                if (purchaseAmount >= minTransAmnt) {
                    lEarnPoints = purchaseAmount * pointIssuance;
                    var lEarnAmount = lEarnPoints * pointValue;
                    lClosingBalance = Number(lEarnPoints) + Number(balancePoints);
                    lAmountToPay = purchaseAmount;
                    document.getElementById("btnEarnBurnVoid").disabled = true;
                    lDataEarnBurnVoid.data = {"IsVoid": validity, "ConsumeFlag": expiry, "TransactionType": lTransactionType, "StoreId": storeId, "CustomerID": custId, "MobileNo": mobileNumber, "Balance": balancePoints, "Remark": lRemark, "InvoiceId": lInvoiceId, "PurchaseAmount": purchaseAmount};
                    var json = JSON.stringify(lDataEarnBurnVoid);

                    $.SmartMessageBox({
                        title: "Are you sure you want to proceed this transaction.",
                        content: "Points will be earned : " + lEarnPoints + "<br> Amount earned : " + lEarnAmount,
                        buttons: '[OK][CANCEL]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            submitData(lEarnPoints, lPointsDeducted, lClosingBalance, lAmountToPay, json);
                        } else if (ButtonPressed === "CANCEL") {
                            document.getElementById("btnEarnBurnVoid").disabled = false;
                            window.location = '#ui/common/forms/EarnBurn.html';
                        }
                    });

                } else {
                    $.SmartMessageBox({
                        title: "Purchase amount should be greater than or equal to minimum transaction amount : " + minTransAmnt,
                        buttons: '[OK]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            window.location.assign('index.html#ui/common/forms/EarnBurn.html');
                            $('#PurchaseAmount').focus();

//                          location.reload();
                        }
                    });
                    return false;
                }

            } else if (lTransactionType === 'BURN') {
                debugger;
                var lBurnBalancePoints = 0;
                var lBurnAmount = 0;
                //code for pin
                var selectedOption = $("input:radio[name=opType]:checked").val();
                if (selectedOption === "TransactionOtp" || selectedOption ===  undefined )
                {
                    var otp = form.getFieldById('OTP').getValue();
                    if (!otp || otp === '') {
                        $.SmartMessageBox({
                            title: "Please enter OTP",
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                            }
                        });
                        return false;
                    }
                    if (earnPointCriteria === 'On Total bill amount') {
                        lBurnBalancePoints = Number(balancePoints) - lPointsDeducted;
                        lEarnPoints = purchaseAmount * pointIssuance;
                        balancePoints = lBurnBalancePoints + lEarnPoints;
                        lClosingBalance = Number(balancePoints);
                        lBurnAmount = lPointsDeducted * pointValue;
                        if (lBurnAmount < purchaseAmount) {
                            lAmountToPay = purchaseAmount - lBurnAmount;
                        } else {
                        }
                    } else {
                        lBurnAmount = lPointsDeducted * pointValue;
                        lAmountToPay = purchaseAmount - lBurnAmount;
                        lEarnPoints = lAmountToPay * pointIssuance;
                        lClosingBalance = (Number(balancePoints) - lPointsDeducted) + lEarnPoints;

                    }
                    lDataEarnBurnVoid.data = {"otpType": "OTP", "TransactionType": lTransactionType, "StoreId": storeId, "OTP": otp, "PointsUsed": lPointsDeducted, "CustomerID": custId, "MobileNo": mobileNumber, "Remark": lRemark, "RequesterId": requesterId, "InvoiceId": lInvoiceId, "PurchaseAmount": purchaseAmount};
                    var json = JSON.stringify(lDataEarnBurnVoid);

                    $.SmartMessageBox({
                        title: "Are you sure you want to proceed this transaction.",
                        content: "Points to be burned : " + lPointsDeducted + "<br>Amount deducted : " + lBurnAmount + "<br>Amount to collect : " + lAmountToPay,
                        buttons: '[OK][CANCEL]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            submitData(lEarnPoints, lPointsDeducted, lClosingBalance, lAmountToPay, json);
                        } else if (ButtonPressed === "CANCEL") {
                            document.getElementById("btnEarnBurnVoid").disabled = false;
                            window.location = '#ui/common/forms/EarnBurn.html';
                        }
                    });

                    document.getElementById("btnEarnBurnVoid").disabled = true;
                } else {
                    if ($("#PinTransaction").val() === "") {
                        $.SmartMessageBox({
                            title: "Please enter PIN",
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                            }
                        });
                        return false;

                    }
                    var lRemark = document.getElementById('Remark').value;
                    var lFormData = form.getJSON();
                    purchaseAmount = Number(lFormData.PurchaseAmount);
                    var lPointsDeducted = Number(lFormData.PointsDeducted);
                    var lInvoiceId = lFormData.InvoiceId;
//                    document.getElementById("btnEarnBurnVoid").disabled = true;

                    if (purchaseAmount < Number(minTransAmnt)) {
                        $.SmartMessageBox({
                            title: "Purchase amount should be more than or equal to minimum transaction amount : " + minTransAmnt,
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                                $('#PurchaseAmount').focus();
                            }
                        });
                    } else if (lFormData.PointsDeducted === '' || !lFormData.PointsDeducted) {
                        $.SmartMessageBox({
                            title: "Please enter points to burn",
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                            }
                        });
                    } else if (lPointsDeducted > balancePoints) {
                        $.SmartMessageBox({
                            title: "You are allowed to redeem points not more than : " + balancePoints,
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                            }
                        });
                    } else if ((lPointsDeducted * pointValue) > purchaseAmount) {
                        $.SmartMessageBox({
                            title: "Points to burn should be less than purchase amount ",
                            buttons: '[OK]'
                        }, function (ButtonPressed) {
                            if (ButtonPressed === "OK") {
                                window.location = '#ui/common/forms/EarnBurn.html';
                            }
                        });
                    } else if (purchaseAmount >= Number(minTransAmnt) && (lPointsDeducted * pointValue) <= Number(purchaseAmount) && lPointsDeducted <= Number(balancePoints) && lPointsDeducted > 0) {
//                        document.getElementById("btnEarnBurnVoid").disabled = true;
//                        $.SmartMessageBox({
//                            title: "Purchase amount should be more than or equal to minimum transaction amount<br>Or Points to burn should not be less than purchase amount",
//                            buttons: '[OK]'
//                        }, function (ButtonPressed) {
//                            if (ButtonPressed === "OK") {
//                                window.location.assign('index.html#ui/common/forms/EarnBurn.html');
//                            }
//                        });\
                        if (parseInt($("#PinTransaction").val()) === lStore.transactionPin) {
                            if (earnPointCriteria === 'On Total bill amount') {
                                lBurnBalancePoints = Number(balancePoints) - lPointsDeducted;
                                lEarnPoints = purchaseAmount * pointIssuance;
                                balancePoints = lBurnBalancePoints + lEarnPoints;
                                lClosingBalance = Number(balancePoints);
                                lBurnAmount = lPointsDeducted * pointValue;
                                if (lBurnAmount < purchaseAmount) {
                                    lAmountToPay = purchaseAmount - lBurnAmount;
                                } else {
                                }
                            } else {
                                lBurnAmount = lPointsDeducted * pointValue;
                                lAmountToPay = purchaseAmount - lBurnAmount;
                                lEarnPoints = lAmountToPay * pointIssuance;
                                lClosingBalance = (Number(balancePoints) - lPointsDeducted) + lEarnPoints;

                            }
                            lDataEarnBurnVoid.data = {"TransactionType": lTransactionType, "StoreId": storeId, "OTP": $("#PinTransaction").val(), "PointsUsed": lPointsDeducted, "CustomerID": custId, "MobileNo": mobileNumber, "Remark": lRemark, "RequesterId": 0, "otpType": "PIN", "InvoiceId": lInvoiceId, "PurchaseAmount": purchaseAmount};
                            var json = JSON.stringify(lDataEarnBurnVoid);

                            $.SmartMessageBox({
                                title: "Are you sure you want to proceed this transaction.",
                                content: "Points to be burned : " + lPointsDeducted + "<br>Amount deducted : " + lBurnAmount + "<br>Amount to collect : " + lAmountToPay,
                                buttons: '[OK][CANCEL]'
                            }, function (ButtonPressed) {
                                if (ButtonPressed === "OK") {
                                    submitData(lEarnPoints, lPointsDeducted, lClosingBalance, lAmountToPay, json);
                                } else if (ButtonPressed === "CANCEL") {
                                    document.getElementById("btnEarnBurnVoid").disabled = false;
                                    window.location = '#ui/common/forms/EarnBurn.html';
                                }
                            });

                        } else {
                            $.SmartMessageBox({
                                title: "Invalid Pin",
                                buttons: '[OK]'
                            }, function (ButtonPressed) {
                                if (ButtonPressed === "OK") {
                                    window.location.assign('index.html#ui/common/forms/EarnBurn.html');
                                    $("#PinTransaction").focus();
                                    $("#PinTransaction").val(" ");
                                }
                            });
                        }

                    } else {
                        alert("error");





                    }
                }



            } else {

            }
//            document.getElementById("btnEarnBurnVoid").disabled = true;


        } else {
            console.log('Form validation error');
        }

    }
    function submitData(pEarnPoints, pPointsDeducted, pClosingBalance, pAmountToPay, pJSONData) {
debugger
        var lOpeningBalance = balancePoints;
        var lurl = lLoyaltyURL + "addTransactionHistroy";
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('post');
        lAjax.setData(pJSONData);
        lAjax.addEventListener('success', function (response) {

            var res = JSON.parse(response);
            console.log(res);
            if (res.flag === true)
            {
                smallAlert("Saved successfully", function () {}, 2000);

                /*  Setting data inside summary table   */
                document.getElementById('openingBalance').innerHTML = lOpeningBalance + ' Points';
                document.getElementById('pointsEarned').innerHTML = Math.floor(pEarnPoints) + ' Points';
                if (pPointsDeducted === '' || pPointsDeducted === 0) {
                    document.getElementById('pointsBurned').innerHTML = '0 Points';
                } else {
                    document.getElementById('pointsBurned').innerHTML = pPointsDeducted + ' Points';
                }
                document.getElementById('closingBalance').innerHTML = Math.floor(pClosingBalance) + ' Points';
                document.getElementById('purchaseAmount').innerHTML = purchaseAmount + ' INR';
                document.getElementById('amountToPay').innerHTML = pAmountToPay + ' INR';
                document.getElementById("btnEarnBurnVoid").disabled = true;
                $('#summaryTable').show();
                $('#txnform').fadeOut(500);
                $('#actions').fadeOut(500);
                $('#customerTable').fadeOut(500);
                formDataClear();
                document.getElementById("btnEarnBurnVoid").disabled = false;
                IsRedeemCodeBtnClicked = false;
                $('#searchCustomer').focus();

            } else
            {
                if (res.message === "Transaction not added")
                {
                    $.SmartMessageBox({
                        title: " Transaction failed Please try agin later",
                        buttons: '[OK]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            window.location = '#ui/common/forms/EarnBurn.html';
                        }
                    });
                } else if (res.statusCode === '1053')
                {
                    $.SmartMessageBox({
                        title: 'Invalid OTP ',
                        buttons: '[OK]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            window.location = '#ui/common/forms/EarnBurn.html';
                        }
                    });
                } else if (res.statusCode === '520')
                {
                    $.SmartMessageBox({
                        title: "Server Error. Please try again.",
                        buttons: '[OK]'
                    }, function (ButtonPressed) {
                        if (ButtonPressed === "OK") {
                            window.location = '#ui/common/forms/EarnBurn.html';
                        }
                    });
                }
                $('#summaryTable').hide();
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }
    function redemptionCode() {
        debugger;

        if ($formEarnBurn.valid()) {
//            console.log("inside function redemption code ");

            var lRemark = document.getElementById('Remark').value;
            var lFormData = form.getJSON();
            purchaseAmount = Number(lFormData.PurchaseAmount);
            var lPointsDeducted = Number(lFormData.PointsDeducted);
            var lInvoiceId = lFormData.InvoiceId;
            document.getElementById("btnEarnBurnVoid").disabled = true;

            if (purchaseAmount < Number(minTransAmnt)) {
                $.SmartMessageBox({
                    title: "Purchase amount should be more than or equal to minimum transaction amount : " + minTransAmnt,
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';
                        $('#PurchaseAmount').focus();
                    }
                });
            } else if (lFormData.PointsDeducted === '' || !lFormData.PointsDeducted) {
                $.SmartMessageBox({
                    title: "Please enter points to burn",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';
                    }
                });
            } else if (lPointsDeducted > balancePoints) {
                $.SmartMessageBox({
                    title: "You are allowed to redeem points not more than : " + balancePoints,
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';
                    }
                });
            } else if ((lPointsDeducted * pointValue) > purchaseAmount) {
                $.SmartMessageBox({
                    title: "Points to burn should be less than purchase amount ",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location = '#ui/common/forms/EarnBurn.html';
                    }
                });
            } else if (purchaseAmount >= Number(minTransAmnt) && (lPointsDeducted * pointValue) <= Number(purchaseAmount) && lPointsDeducted <= Number(balancePoints) && lPointsDeducted > 0) {
                // code for pin 
                var selectedOption = $("input:radio[name=opType]:checked").val();
                if (selectedOption === "TransactionOtp" || selectedOption === undefined)
                {
                    document.getElementById("inputRedemp").style.display = 'block';
                    document.getElementById("labelRedemp").style.display = 'block';
                    $("#inputRedemp").focus();
                    document.getElementById("btnEarnBurnVoid").disabled = false;
                    $("#normalBtnSection").show();

                    var lurl = lLoyaltyURL + 'sendRedeemptioncode';
                    var lData = {};

                    lData.data = {"MobileNo": mobileNumber, "Remark": lRemark, "StoreId": storeId, "PointsUsed": lPointsDeducted, "InvoiceId": lInvoiceId, "CustomerID": custId, "PurchaseAmount": purchaseAmount};
                    var json = JSON.stringify(lData);
                    var lAjax = new Ajax();
                    lAjax.setData(json);
                    lAjax.setUrl(lurl);
                    lAjax.setType('post');
                    lAjax.addEventListener('success', function (response) {
                        var res = JSON.parse(response);
                        requesterId = res.message;
                        lMessage = res.message;
                        if (res.flag === true)
                        {
                            smallAlert("OTP sent", function () {}, 3000);
                            document.getElementById('reqCode').disabled = true;
                            setTimeout(function () {
                                document.getElementById('reqCode').disabled = false;
                            }, 60000);
                            IsRedeemCodeBtnClicked = true;
                            $("#btnEarnBurnVoid").show();
                            $("#redemptionCodeSection").show();
                            $("#pinRadio").prop('disabled', true);

                            //window.history.pushState({page: 1}, "", "");
//                        window.history.pushState(null, null, location.href);
//                        window.onpopstate = function ()
//                        {
//                            if (confirm("Are you sure you want leave this page. Transactioned will be cancelled!") == true) {
//                                history.go(0);
//                            }
//                        };
//                        window.onpopstate = function (event) {
//
//                            if (event) {
//                                if (confirm("Are you sure you want leave this page. Transactioned will be cancelled!") == true) {
//                                    //window.history.pushState({page: 1}, "", "#ui/common/forms/EarnBurn.html");
//                                    //var backURL = window.history.back();
//                                    //console.log(backURL);
//                                }
//                                alert(backURL);
//                            }
//                        }


                        } else if (lMessage === 'SMS limit exceeds') {
                            $.SmartMessageBox({
                                title: "SMS pack has expired. Kindly recharge it",
                                buttons: '[OK]'
                            }, function (ButtonPressed) {
                                if (ButtonPressed === "OK") {
                                    formDataClear();
                                    window.location.assign('index.html#ui/common/forms/EarnBurn.html');
                                }
                            });
                        } else
                        {
//                    smallAlert("Failed to send OTP", function () {}, 2000);
                        }
                    });
                    lAjax.addEventListener('error', function (textStatus, errorThrown) {
                        console.log("Error : " + textStatus + "" + errorThrown);
                    });
                    lAjax.execute();
                }

            } else {

                document.getElementById("btnEarnBurnVoid").disabled = true;
                $.SmartMessageBox({
                    title: "Purchase amount should be more than or equal to minimum transaction amount<br>Or Points to burn should not be less than purchase amount",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.assign('index.html#ui/common/forms/EarnBurn.html');
                    }
                });
            }
        } else {
            console.log('Form validation error');
        }
    }

    function formDataClear() {
        $('#formEarnBurn')[0].reset();
    }

    $("#searchCustomer").on('keyup', function (e) {
        if (IsRedeemCodeBtnClicked == true) {
            $.SmartMessageBox({
                title: "Are you sure you want to cancel Transaction?",
                buttons: '[Cancel][OK]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    $("#customerTable").hide();
                    $("#actions").hide();
                    $("#txnform").hide();
                    $("#summaryTable").hide();
                    IsRedeemCodeBtnClicked = false;
                }
                if (ButtonPressed === "Cancel") {

                }
            });
        } else {
            $("#MobileAlertNUmber").text("");
            $("#btnSearchCustomer").prop('disabled', true);
            $("#customerTable").hide();
            $("#actions").hide();
            $("#txnform").hide();
            $("#summaryTable").hide();
            var mobileNo = e.target.value;
            var digit = mobileNo.toString()[0];
            if (!(digit.charAt(0) === "6" || digit.charAt(0) === "7" || digit.charAt(0) === "8" || digit.charAt(0) === "9")) {
                $("#MobileAlertNUmber").text("Please Enter Valid Mobile Number !!!");
                $("#btnSearchCustomer").prop('disabled', false)
            } else
            {
                if (mobileNo.length === 10) {
                    $("#searchCustomer").prop('disabled', true);
                    mobileNumber = form.getFieldById('searchCustomer').getValue();
                    var lurl = lLoyaltyURL + 'getCustomerByMobile?data=';
                    var lData = {"StoreId": storeId, "MobileNo": mobileNumber};
                    var json = JSON.stringify(lData);
                    lurl = lurl + json;
                    console.log(lurl);

                    var lAjax = new Ajax();
                    lAjax.setUrl(lurl);
                    lAjax.setType('get');
                    lAjax.addEventListener('success', function (response) {
                        var res = JSON.parse(response);
                        if (res.customerDetails.custId === 0) {
                            if (UserRemaining == 0) {
                                $("#btnSearchCustomer").prop('disabled', false);
                                $.SmartMessageBox({
                                    title: "Customer doesn't exist. Can not add customer !!! Plz Contact Support Team ",
                                    template: '<center></center>',
                                    buttons: '[OK]'
                                }
                                , function (ButtonPressed) {
                                    if (ButtonPressed === "OK") {
                                        $("#searchCustomer").val('');
                                        $("#searchCustomer").focus();
                                        $("#btnSearchCustomer").prop('disabled', false);
                                        $("#searchCustomer").prop('disabled', false);
                                    }
                                });


                            } else
                            {

                                window.location.href = 'index.html#ui/common/forms/AddCustomer.html?mobileNo=' + mobileNumber;

                            }
                        } else if (res.customerDetails.custId > 0) {
                            $("#btnSearchCustomer").prop('disabled', false);
                            $("#searchCustomer").prop('disabled', false);

                            smallAlert("Customer available", function () {}, 2000);
                            custId = res.customerDetails.custId;
                            custName = res.customerDetails.firstName + " " + res.customerDetails.lastName;
                            balancePoints = Number(res.customerBalance);
                            burnCriteria = res.customerNoOfTran;
                            if (!res.customerDetails.firstName) {
                                var lcustomerName = (res.customerDetails.firstName) + " " + (res.customerDetails.lastName);
                            } else {
                                var lcustomerName = (res.customerDetails.firstName).charAt(0).toUpperCase() + (res.customerDetails.firstName).slice(1).toLowerCase() + " " + ((res.customerDetails.lastName).charAt(0).toUpperCase() + (res.customerDetails.lastName).slice(1).toLowerCase());
                            }
//                    
                            getCustTxnDetails(res.customerDetails, lcustomerName);

                            /*  End of code for setting values of Customer Details */
                            isSearchComplete = true;
                            $("#MobileAlertNUmber").text("");
                            $("#summaryTable").hide();
                            $('#customerTable').show();
                            $('#actions').show();
                            $("#searchCustomer").val('');
                            if (burnCriteria === '1') {
                                criteria = firstTransCriteria;
                            } else {
                                criteria = nextTranscriteria;
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
                }
            }
        }

    });

    function validateCashBackEntry()
    {
        var invoiceAmount = $("#PurchaseAmount").val();
        var CashBackAmount = $("#CashBackAmount").val();

        //
        var cash = "";
        $("#cashBackBtn").prop('disabled', true);
        $("#bot1-Msg1").prop('disabled', true);

        var selValue = $("input[type='radio']:checked").val();

        if (selValue === "Flat")
        {
            cash = $("#CashBackAmount").val();

        } else {
            cash = parseFloat(parseFloat($("#PurchaseAmount").val()) * parseFloat($("#CashBackAmount").val()) / 100).toFixed(2);

        }
        ///
        if ($("#CashBackAmount").val() === "" || $("#InvoiceId").val() === "" || $("#PurchaseAmount").val() === "")
        {

        } else if (parseInt(CashBackBalance) <= 10)
        {
            $.SmartMessageBox({
                title: "You need to add some credit to issue those credit ",
                buttons: '[OK]'
            }
            );
            $("#cashBackBtn").prop('disabled', false);
        } else if (parseInt(CashBackBalance) < parseInt(cash))
        {
            $.SmartMessageBox({
                title: "You have low credit to complete this transaction ",
                buttons: '[OK]'
            }
            );
            $("#cashBackBtn").prop('disabled', false);

        } else if (parseInt(invoiceAmount) < parseInt(cash))
        {
            $.SmartMessageBox({
                title: "CashBack amount should be less than to Invoice amount ",
                buttons: '[OK]'
            }
            );
            $("#cashBackBtn").prop('disabled', false);

        } else {
            var amounts = $("#CashBackAmount").val();
            $.SmartMessageBox({
                title: "Are you sure you want to proceed this transaction.",
                content: "Cashback will be given : " + cash,
                buttons: '[OK][CANCEL]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "OK") {
                    addCashBackEntry();
                } else if (ButtonPressed === "CANCEL") {
//                            document.getElementById("btnEarnBurnVoid").disabled = false;
                    window.location = '#ui/common/forms/EarnBurn.html';
                }
            });

        }
    }

    function addCashBackEntry() {
        var cash = "";
        $("#cashBackBtn").prop('disabled', true);
        $("#bot1-Msg1").prop('disabled', true);

        var selValue = $("input[type='radio']:checked").val();

        if (selValue === "Flat")
        {
            cash = $("#CashBackAmount").val();

        } else {
            cash = parseFloat(parseFloat($("#PurchaseAmount").val()) * parseFloat($("#CashBackAmount").val()) / 100).toFixed(2);

        }

        var lcashback = {};

        lcashback.data =
                {
                    "custId": custId,
                    "amount": cash,
                    "mobileNo": mobileNumber,
                    "consumeFlag": "NOT CONSUME",
                    "InvoiceId": $("#InvoiceId").val(),
                    "storeId": storeId,
                    "MAKERID": UserDetail.MAKERID,
                    "custName": custName,
                    "invoiceAmount": $("#PurchaseAmount").val()
                };

        var json = JSON.stringify(lcashback);
        var lurl = lLoyaltyURL + "cashBackTransaction";
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('post');
        lAjax.setData(json);
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            var details = JSON.parse(res.data);
            console.log(res);
            if (res.flag === true)
            {
                var newAmount = parseFloat($('#cashBackBalance').text()) - parseFloat(details.newCashBackCharges);
                CashBackBalance = newAmount;
                $('#cashBackBalance').text(details.newCashBackCharges);
                smallAlert("Saved successfully", function () {}, 2000);
                location.reload();

            } else if (res.message === 'SMS limit exceeds')
            {
                $.SmartMessageBox({
                    title: "SMS pack has expired. Kindly recharge it",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        formDataClear();
                        location.reload();
                    }
                });
            } else if (res.message === 'Balance limit exceeds')
            {
                $("#cashBackBtn").prop('disabled', false);
                $.SmartMessageBox({
                    title: "Your Balance is low. Kindly recharge it",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
//                        formDataClear();
                        $("#CashBackAmount").focus();
                    }
                });
                $("#cashBackBtn").prop('disabled', false);
            } else
            {
                smallAlert("Operation successfully", function () {}, 2000);
                $("#cashBackBtn").prop('disabled', false);

            }


        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();


    }

//    function getTrariffPlan()
//    {
//        debugger;
//         var lcashback = {};
//        lcashback.data =
//                {
//                    "MAKERID": UserDetail.MAKERID
//                };
//
//        var json = JSON.stringify(lcashback);
//        var lurl = lLoyaltyURL + "getMerchantCashBackBalance";
//        var lAjax = new Ajax();
//        lAjax.setUrl(lurl);
//        lAjax.setType('post');
//        lAjax.setData(json);
//        lAjax.addEventListener('success', function (response) {
//            debugger;
//            var res = JSON.parse(response);
//            console.log(res);
//           
//
//
//        });
//        lAjax.addEventListener('error', function (textStatus, errorThrown) {
//            console.log("Error : " + textStatus + "" + errorThrown);
//        });
//        lAjax.execute();
//
//        
//    }
});

function cashbackAmt() {
    if ($("input[name='gender']:checked").val() == "Flat") {
        document.getElementById("flatLabel").style.display = "block";
        document.getElementById("perLabel").style.display = "none";
        $("#CashBackAmount").attr("maxlength", 6);
        $("#CashBackAmount").val(0);
        $("#CashBackAmount").removeAttr("max");
    }
    if ($("input[name='gender']:checked").val() == "Percentage") {
        document.getElementById("perLabel").style.display = "block";
        document.getElementById("flatLabel").style.display = "none";
        $("#CashBackAmount").attr("maxlength", 3);
        $("#CashBackAmount").attr("max", 100);
        $("#CashBackAmount").val(0);
    }
}
function checkPercentage() {
    $("#cashBackBtn").attr("disabled", false);
    if ($("input[name='gender']:checked").val() == "Flat") {

    }
    if ($("input[name='gender']:checked").val() == "Percentage") {
        if ($("#CashBackAmount").val() > 100) {
            $("#cashBackBtn").attr("disabled", true);
        }
    }
}

function validateTransactionType(type)
{
    debugger;
    if (type === "otp") {
        $("#TransactionOtp").prop('checked', true);
        $("#TransactionPin").prop('checked', false);
        $("#enterPinSection").hide();
        $("#requestCodeBtn").show();
        $("#PinTransaction").prop('disabled', true);
        $("#btnEarnBurnVoid").hide();

    } else {
        $("#btnEarnBurnVoid").show();
        $("#redemptionCodeSection").hide();
        $("#TransactionPin").prop('checked', true);
        $("#TransactionOtp").prop('checked', false);
        $("#enterPinSection").show();
        $("#requestCodeBtn").hide();
        $("#PinTransaction").prop('disabled', false);

    }

}

function getPinTransactionData()
{
    debugger;

    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getStoreDetailsByPK";
//           var lData1 = {};
    var lData = {"StroreId": parseInt(localStorage.storeId)};
//         var lData = {"data": {"CustomerID": custDetails.custId}};
    var json = JSON.stringify(lData);
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {

//           
        var lStore = JSON.parse(response);
        var lData = JSON.parse(lStore.data);
        pincode = lData.transactionPin;
        TransactionPinAllowed = lData.transactionPinAllow;
        if (TransactionPinAllowed === "Yes")
        {
            $("#pinRadioSection").show();
            $("#enterPinSection").show();
             $("#TransactionPin").prop('checked', true);

        } else {
            $("#pinRadioSection").hide();
            $("#enterPinSection").hide();
            $("#requestCodeBtn").show();
            $("#normalBtnSection").hide();
             $("#TransactionOtp").prop('checked', true);
        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + " - " + errorThrown);
    });
    lAjax.execute();



}

