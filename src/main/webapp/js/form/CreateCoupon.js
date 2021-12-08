var lStoreData = localStorage.getItem('storeDetails');
var lStore = JSON.parse(lStoreData);
var errorClass = 'invalid';
var errorElement = 'em';
var offerImageReader = '';
var date = new Date().toISOString().slice(0, 10);
getCategory('category');
getCategory('subcategory');
$("#startDate").attr('min', date);
$("#endDate").attr('min', date);
$("#storeAddress").val(lStore.storeAddress+","+lStore.Locality+"-"+lStore.Pincode);
$(document).on('load', function () {
//    getCategory('category');
});
var $addCouponForm = $("#addCoupon").validate({
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
        couponTitle: {
            required: true
//            alphabets: true
        },
        cType: {
            required: true

        },
        offerType: {
            required: true
        },

        offerValue: {
            required: true
        },
        offerText: {
            required: true
        },
        startDate: {
            required: true
        },
        endDate: {
            required: true
        },
        couponDescription: {
            required: true
        },
        category: {
            required: true
        },
        couponCode: {
            required: true
        },
        storeAddress: {
            required: true
        }
    },
    messages: {
        couponTitle: {
            required: 'Please enter Coupon Title'
//            alphabets: true
        },
        cType: {
            required: 'Please enter Coupon Type'

        },
        offerType: {
            required: 'Please enter offer Type'
        },

        offerValue: {
            required: 'Please enter offer value'
        },
        offerText: {
            required: 'Please enter offer text'
        },
        startDate: {
            required: 'Please select start date'
        },
        endDate: {
            required: 'Please select end date'
        },
        couponDescription: {
            required: 'Please enter coupon description'
        },
        category: {
            required: 'Please select category'
        },
        couponCode: {
            required: 'Please enter Coupon code'
        },
        storeAddress: {
            required: 'Please enter Store Address'
        }
    },
    //Ajax form submition
    submitHandler: function (form) {
        addCoupon();
    },
    // Do not change code below
    errorPlacement: function (error, element) {
        error.insertAfter(element.parent());
    }
});

function addCoupon() {

//    form.getFieldById("StoreId").setValue(lStore.StroreId);
    if ($addCouponForm.valid()) {
        $("#btnSave").prop('disabled', true);
        /* Code for searching if customer already exist     */
//        mobileNumber = form.getFieldById('MobileNo').getValue();
        var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/createLocalCoupon";
        var lData = form.getJSON();
        lData.preference = "NO";
        lData.localCoupon = "YES";
        lData.groupCoupon = "NO";
        lData.featured = "NO";
        lData.couponWebsite = lStore.DBAName;
        lData.MAKERID = lStore.UserId;
        lData.checkerid = lStore.UserId;
        lData.couponImage = "";
        lData.urlLink = "";
        lData.status = document.querySelector('input[name="status"]:checked').value;
        lData.offerType = document.querySelector('input[name="offerType"]:checked').value;
//        if (lData.offerType === "Percentage-Off" || lData.offerType === "Price-Off") {
//            lData.offerValue = lData.offerValue + "%";
//        } else if (lData.offerType === "Cashback") {
//            lData.offerValue = "&#8377; " + lData.offerValue;
//        }
        lData.termsNconditions = document.getElementById("termsNconditions").value;
        if (offerImageReader !== "") {
            var img1 = offerImageReader.result;
            var img2 = img1.split(',');
            lData.couponImage = img1;
        }
//        lData.storeAddress = "";
        var json = JSON.stringify(lData);
//        lurl = lurl + json;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setData(json);
        lAjax.setType('post');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            if (res.flag === true)
            {
                smallAlert("Saved successfully", function () {
                }, 2000);
                $('#addCoupon')[0].reset();
                window.location.assign('index.html#ui/common/list/MyCoupons.html');
//            window.location.reload();
            } else
            {
                smallAlert("Save operation failed", function () {}, 2000);
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    } else {
        $("#btnSave").prop('disabled', false);
        console.log('Form validation error');
    }
}

function getCategory(type) {
    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getCouponCategorySubCategory";
    var value = 0;
    if (type === "subcategory") {
        value = $("#categoryStr").val();
    }
    var lData = {"type": type, "value": value};
    var json = JSON.stringify(lData);
//        lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            var categoryList = JSON.parse(res.data);
            if (categoryList !== null) {
                if (type === "category") {
                    $("#categoryStr").attr("disabled", false);
                    $("#categoryStr").empty();
                    for (i = 0; i < categoryList.length; i++)
                    {
                        $("#categoryStr").append($('<option id=id_' + categoryList[i].cgId + ' value="' + categoryList[i].categoryName + '">' + categoryList[i].categoryName + '</option>'));
                    }
                } else {
                    $("#subcategortStr").attr("disabled", false);
                    $("#subcategortStr").empty();
                    for (i = 0; i < categoryList.length; i++)
                    {
                        $("#subcategortStr").append($('<option id=id_' + categoryList[i].cgId + ' value="' + categoryList[i].categoryName + '">' + categoryList[i].categoryName + '</option>'));
                    }
                }
            }
        } else
        {
            if (res.message === "No records found!") {
                if (type === "category") {
                    $("#categoryStr").empty();
                    $("#categoryStr").attr("disabled", true);
//                    smallAlert("Category not found", function () {}, 2000);
                    $("#categoryStr").append($('<option id="id_0" value="">Category Not found!</option>'));
                } else {
                    $("#subcategortStr").empty();
                    $("#subcategortStr").attr("disabled", true);
//                    smallAlert("SubCategory not found", function () {}, 2000);
                    $("#subcategortStr").append($('<option id="id_0" value="">SubCategory Not found!</option>'));
                }
            } else {
                smallAlert("operation failed", function () {}, 2000);
            }
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function ctypeChange() {
    if ($("#couponType").val() === "Deal") {
        $("#codeDiv").hide();
        $("#couponCode").val("");
        $('#couponCode').rules('remove');
    } else {
        $("#couponCode").val("");
        $("#codeDiv").show();
        $('#couponCode').rules('add', {
            required: true
        });
    }
}

$("#startDate").change(function () {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    if (Date.parse(endDate) < Date.parse(startDate)) {
        $("#serror").text("Invalid Date!").show();
        document.getElementById("startDate").value = "";
    } else {
        $("#serror").hide();
    }
//    }

});
$("#endDate").change(function () {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
//    if(endDate !== null){
    if (Date.parse(endDate) < Date.parse(startDate)) {
        $("#eerror").text("Invalid Date!").show();
        document.getElementById("endDate").value = "";
    } else {
        $("#eerror").hide();
    }

});
function uploadOfferImage()
{
    $("#btnSave").prop("disabled", true);
    $("#sendBtn").prop("disabled", false);
    $("#imageError").text("Choose Image File").hide();
    var file = document.querySelector('input[Name="couponImage"]').files[0];
    offerImageReader = new FileReader();
    var preview = {};
    offerImageReader.onload = function ()
    {
        progressHandlerOfferImage(file);
    };
    offerImageReader.onloadend = function () {
        completeHandlerOfferImage();
        preview.src = offerImageReader.result;
    };
    offerImageReader.readAsDataURL(file);
}
function progressHandlerOfferImage(event) {
// $("#addCategoryModalbtn").prop("disabled", true);
    var name = event.name;
    var elem = document.getElementById("progressBar");
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
//
            $("#btnSave").prop('disabled', false);
        } else {
            width++;
            elem.style.width = width + '%';
            if (width === 100) {
//                $("#imageDiv").show();
//                $("#imageName").val(name);
            } else {
//                $("#imageDiv").hide();
//                $("#imageName").val(name);
            }
        }
    }
}
function completeHandlerOfferImage() {

// _("progressBar").value = 0; //wil clear progress bar after successful upload
    $("#btnSave").prop('disabled', true);
}
function blockSpecialChar(e) {
    var k;
    document.all ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));
}

function offerTypeChange() {

//    $("#offerValue").find('.has-error').removeClass("has-error");
    var offert = document.querySelector('input[name="offerType"]:checked').value;
//    $("#offerValue").removeAttr("onkeypress");
    $("#offV").text("");
    $("#offIcon").addClass("fa fa-list");
    if (offert === "Free") {
//        $("#offerValue").attr("maxlength", 15);
        $("#offerValue").val("Free");
        $("#offV").text("");
    } else if (offert === "Percentage-Off" || offert === "Price-Off" || offert === "Cashback") {
        $("#offIcon").removeClass("fa fa-list");
//        $("#offerValue").attr("onkeypress", "return validateNumber(event)");
        if (offert === "Cashback") {
            $("#offerValue").val("Rs 5");
            $("#offV").html("(&#8377;)");
//            $("#offerValue").attr("maxlength", 6);
        } else {
            $("#offerValue").val("5%");
//            $("#offerValue").attr("maxlength", 3);
            $("#offV").text("(%)");
        }
    } else {
//        $("#offerValue").attr("maxlength", 15);
        $("#offV").text("");
    }
}
function validateNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {

        return false;
    } else {
        return true;
    }
}