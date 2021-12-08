var imagepreview = '';
var industryTypeList = "";
var newIndustryType = '';
var lIndustryList;
var MerchantLogo = '';
var imagereader = '';
var MerchantPlan = JSON.parse(sessionStorage.getItem('MerchantPlan'));
var lCategory = [];
var lSubCategory = [];
var lEcommerce;
var pincodeVar = "Next";
var lat = "";
var lng = "";
var Address1val = "";
var geoAddress = "";
var newCuisineList = '';
var selectedCuisines = '';
var geoOutletAddress = '';

$(document).ready(function () {
    $("#opens").timeEntry({ampmPrefix: ' ', spinnerImage: ''});
    $("#closes").timeEntry({ampmPrefix: ' ', spinnerImage: ''});
    localStorage.setItem("locationDetail", null);
    pageSetUp();
    merchatDetails();
//    CuisineList();

    $("#merchantIndustryType").select2();
    $("#subMerchantIndustryType").select2();
    var $validator = $("#updateWizard-1").validate({

        rules: {

            merchantName: {
                required: true
            },
            merchantMobileNo: {
                required: true,
                minlength: 10,
                maxlength: 10
            },
            dbaName: {
                required: true
            },
            legalName: {
                required: true
            },
            mGstType: {
                required: true
            },
            deliveryType: {
                required: true
            },
            address1: {
                required: true
            },
            address3: {
                required: true
            },
            Outletaddress1: {
                required: true
            },
            Outletaddress3: {
                required: true
            },
            Outletpincode: {
                required: true
            },
            landmark: {
                required: true
            },
            city: {
                required: true
            },
            pincode: {
                required: true,
                minlength: 6,
                maxlength: 6
            },
            terminalId: {
                required: true
            },
            terminalSerialNumber: {
                required: true
            },
            termModel: {
                required: true
            },
            circuitId: {
                required: true
            },
            simNumber: {
                required: true
            },
            telcoName: {
                required: true
            },
            terminalModel: {
                required: true
            },
            terminalType: {
                required: true
            },
            subMerchantIndustryType: {
                required: true
            },
            radius: {
                required: true
            },
            opens: {
                required: true
            },
            closes: {
                required: true
            }
//            opensHour: {
//                required: true
//            },
//            closesHour: {
//                required: true
//            }

        },
        messages: {
            merchantName: "Please enter Name.",
            merchantMobileNo: "Please enter mobile no.",
            dbaName: "Please enter business name.",
            legalName: "Please enter business legal name.",
            mGstType: "Please enter merchant GST type.",
            deliveryType: "Please select delivery type.",
            address3: "Please enter Merchant Address.",
            address1: "Please enter Room Number.",
            Outletaddress3: "Please enter Outlet Address.",
            Outletaddress1: "Please enter shop Number.",
            Outletpincode: "Please enter pincode",
            landmark: "Please enter landmark.",
            mid: "Please enter MID",
            gstNumber: "Please enter gst number",
            city: "Please specify your city",
            pincode: "Please enter pincode.",
            terminalSerialNumber: "Please enter Terminal Serial Number",
            termModel: "Please enter Terminal Model Number",
            simNumber: "Please enter SIM Number",
            circuitId: "Please enter Circuit ID",
            telcoName: "Please enter Telco Name",
            terminalModel: "Please select Terminal Model",
            terminalType: "Please select Terminal Type",
            subMerchantIndustryType: "Please select Industry Type.",
            radius: "Please enter radius",
            opens: "Please select time",
            closes: "Please select time"
//            opensHour: "Select day-time",
//            closesHour: "Select day-time"
        },
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    var bcd = "";
    var bca = "";
    $("#abc").click(function () {
        bcd = "klm";
    });
    var abc = "";
    var xyz = "";
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        $target.parent().addClass('.disabled');
        if ($target.parent().hasClass('disabled') === false && abc === xyz && bcd === bca) {
            return false;
        }
        xyz = "";
        bcd = "";
    });
    $('#bootstrap-wizard-update').bootstrapWizard({
        'tabClass': 'form-wizard',
        'onNext': function (tab, navigation, index) {
            var $valid = $("#updateWizard-1").valid();
            if (!$valid) {
                $validator.focusInvalid();
                return false;
            } else {
                xyz = "klm";
                if (pincodeVar == "Next") {
                    $('#bootstrap-wizard-update').find('.form-wizard').children('li').eq(index - 1).addClass(
                            'complete');
                    $('#bootstrap-wizard-update').find('.form-wizard').children('li').eq(index - 1).find('.step')
                            .html('<i class="fa fa-check"></i>');
                    var lTitle = tab[0].innerText;
                }
                if (lTitle.trim() === 'Address Details') {
                    if (geoAddress != "") {
                        debugger;
                        getAddressDetailbyjava(geoAddress);
                    }
                }
                if (lTitle.trim() === 'Outlet Address') {
                    if (geoOutletAddress != '') {
                        var radioValue = $("input[name='AddresYesOrNo']:checked").val();
                        if (radioValue == "NO") {
                            var OutletAdd3 = $("#Outletaddress3").val();
                            getAddressDetailbyjava(OutletAdd3);
                        }
                    }
                }
                if (lTitle.trim() === 'Save Form') {
                    $('#scrollImg').css('display', 'block');
                    $('#nextButton').css('display', 'none');
                    setTimeout(function () {
                        $('#nextButton').css('display', 'block');
                    }, 180000);
                    updateMerchant();
                }
            }
        }
    });
    $("#imageModalBtn").on('click', function () {
        if (MerchantLogo === null || MerchantLogo === '') {
            $("#imageModal").modal("hide");
        } else {
            $("#imageModal").modal("show");
            var img = document.createElement("img");
            $(img).attr({
                "id": "displayImage",
                "src": "DisplayImage?path=/home/Prepaid/Images/" + MerchantLogo,
//                "src": "DisplayImage?path=/Users/Dhamani/NetBeansProjects/PreparedSolutions/prepaid/prepaid/Images/" + MerchantLogo,
                "height": "100%", "width": "100%",
                "class": "product-image", "alt": "Image"});
            $("#imageModalDiv").append(img);
        }
    });
});

function CuisineList()
{
    $("#cuisineList").val("");
    newCuisineList = '';
    var lAjax = new Ajax();
    lAjax.setUrl(url + '?type=data&code=ENQ119');
    lAjax.setSync(true);
    lAjax.addEventListener('success', function (response) {
        response = JSON.parse(response);
        newCuisineList = response.data;
        if (selectedCuisines == '' || selectedCuisines == 'undefined') {

        } else {
            if (selectedCuisines) {
                var cName = [];
                cName = selectedCuisines.split(',');
            }
        }
        if (newCuisineList !== null) {
            for (i = 0; i < newCuisineList.length; i++)
            {
                if (selectedCuisines) {
                    if (cName.includes(newCuisineList[i].CUISINE_NAME)) {
                        $("#cuisineList").append($('<option  value="' + newCuisineList[i].CUISINE_NAME + '"selected>' + newCuisineList[i].CUISINE_NAME + '</option>'));
                    } else {
                        $("#cuisineList").append($('<option  value="' + newCuisineList[i].CUISINE_NAME + '">' + newCuisineList[i].CUISINE_NAME + '</option>'));
                    }
                } else {
                    $("#cuisineList").append($('<option  value="' + newCuisineList[i].CUISINE_NAME + '">' + newCuisineList[i].CUISINE_NAME + '</option>'));
                }
            }
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function merchatDetails()
{
    var lSearch = MerchantPlan.merchantId;
    var lCriteria = " MID = '" + lSearch + "'";
    var lAjax = new Ajax();
    lAjax.setUrl(url + '?type=data&code=ENQ78&criteria=' + lCriteria);
    lAjax.setSync(true); //need to select records. hence made synchronous.
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        var Merchant = res.data[0];
        if ($.trim(Merchant.LOGO) == "") {
            if ($.trim(Merchant.PINCODE) === "111111") {
                var merchant = {};
                merchant.merchantName = $.trim(Merchant.MERCHANT_NAME);
                merchant.merchantId = lSearch;
                var merchantData = JSON.stringify(merchant);
                var lurl = localStorage.getItem("url") + "billing/v1/merchantConfigurationSteps";
                var lAjax = new Ajax();
                lAjax.setUrl(lurl);
                lAjax.setData(merchantData);
                lAjax.setType('post');
                lAjax.setContentType('Application/json');
                lAjax.addEventListener('success', function (response) {
                    var res = JSON.parse(response);
                    if (res.flag === true)
                    {

                    }
                });
                lAjax.addEventListener('error', function (textStatus, errorThrown) {
                    console.log("Error : " + textStatus + "" + errorThrown);
                });
                lAjax.execute();
            }
        }
        if (Merchant === null)
        {
            $('input:radio[name="ProductYesOrNo"]').filter('[value="NO"]').attr('checked', true);
            $("#merchantName").val("");
            $("#merchantMobileNo").val("");
            $("#legalName").val("");
            $("#dbaName").val("");
            $("#imagefile").val("");
            $("#subMerchantIndustryType").val("");
            $("#mGstType").val("");
            $("#gstNumber").val("");
            $("#gstState").val("");
            $("#minOrderValue").val("");
            $("#address1").val("");
            $("#address2").val("");
            $("#address3").val("");
            $("#landmark").val("");
            $("#city").val("");
            $("#state").val("");
            $("#country").val("");
            $("#pincode").val("");
        } else {
            if (Merchant.ECOMMERCE === "YES" || Merchant.ECOMMERCE === "PENDING") {
                lEcommerce = Merchant.ECOMMERCE;
                $("#YesRadio").prop('checked', true);
            } else {
                $("#NoRadio").prop('checked', true);
                $("#minOrderValue").prop('disabled', true);
                $("#ppSecurekey").prop('disabled', true);
                $("#ppKey").prop('disabled', true);
                $("#deliveryType").prop('disabled', true);
            }
            selectedCuisines = Merchant.CUISINE_NAME;
            var cuisine = selectedCuisines.split(",");
            if (selectedCuisines === null || selectedCuisines === "" || selectedCuisines === " ") {
                $("#cuisineName").hide();
                $("#selectList").hide();
            } else {
                $("#cuisineName").show();
                $("#selectList").show();
            }
            var newcus = cuisine.slice(0, -1);
            for (var i = 0; i < newcus.length; i++) {
                $("#selectList").append(newcus[i] + "\n");
            }
            $('input:radio[name="ProductYesOrNo"]').filter('[value="NO"]').attr('checked', true);
            if (Merchant.MERCHANT_NAME === " ") {
                $("#merchantName").val($.trim(Merchant.MERCHANT_NAME));
            } else {
                $("#merchantName").val(Merchant.MERCHANT_NAME);
            }
            if (Merchant.MERCHANT_MOBILENO === " ") {
                $("#merchantMobileNo").val($.trim(Merchant.MERCHANT_MOBILENO));
            } else {
                $("#merchantMobileNo").val(Merchant.MERCHANT_MOBILENO);
            }
            if (Merchant.radius === " ") {
                $("#radius").val("1");
            } else {
                $("#radius").val(Merchant.radius);
            }
            if (Merchant.LEGALNAME === " ") {
                $("#legalName").val($.trim(Merchant.LEGALNAME));
            } else {
                $("#legalName").val(Merchant.LEGALNAME);
            }
            if (Merchant.DBANAME === " ") {
                $("#dbaName").val($.trim(Merchant.DBANAME));
            } else {
                $("#dbaName").val(Merchant.DBANAME);
            }
            if (Merchant.LOGO === " ") {
                if ($.trim(Merchant.LOGO) !== "") {
                    $("#imagefile").prop('required', true);
                }
            } else {
                $("#imagefile").prop('required', false);
            }
            $("#subMerchantIndustryType").val(Merchant.ITID);
            if (Merchant.MERCHANT_GST_TYPE === " ") {
                $("#mGstType").val($.trim(Merchant.MERCHANT_GST_TYPE));
            } else if (Merchant.MERCHANT_GST_TYPE === "Un-Registed Bussiness") {
                $("#mGstType").val($.trim(Merchant.MERCHANT_GST_TYPE));
                $("#gstNumber").prop('disabled', true);
                $("#minOrderValue").prop('disabled', true);
            } else {
                $("#mGstType").val(Merchant.MERCHANT_GST_TYPE);
            }
            if (Merchant.GST_NUMBER === " ") {
                $("#gstNumber").val($.trim(Merchant.GST_NUMBER));
            } else {
                $("#gstNumber").val(Merchant.GST_NUMBER);
            }
            if (Merchant.GST_STATE === " ") {
                $("#gstState").val($.trim(Merchant.GST_STATE));
            } else {
                $("#gstState").val(Merchant.GST_STATE);
            }
            if (Merchant.MIN_ORDER_VALUE === " ") {
                $("#minOrderValue").val($.trim(Merchant.MIN_ORDER_VALUE));
            } else {
                $("#minOrderValue").val(Merchant.MIN_ORDER_VALUE);
            }
/////
            if (Merchant.ADDRESS1 === " ") {
                $("#address1").val($.trim(Merchant.ADDRESS1));
                Address1val = $.trim(Merchant.ADDRESS1);
            } else {
                $("#address1").val(Merchant.ADDRESS1);
                Address1val = Merchant.ADDRESS1;
            }
            if (Merchant.ADDRESS2 === " ") {
                $("#address2").val($.trim(Merchant.ADDRESS2));
            } else {
                $("#address2").val(Merchant.ADDRESS2);
            }
            if (Merchant.ADDRESS3 === " ") {
                $("#address3").val($.trim(Merchant.ADDRESS3));
            } else {
                $("#address3").val(Merchant.ADDRESS3);
            }
            if (Merchant.LANDMARK === " ") {
                $("#landmark").val($.trim(Merchant.LANDMARK));
            } else {
                $("#landmark").val(Merchant.LANDMARK);
            }
            if (Merchant.CITY === " ") {
                $("#city").val($.trim(Merchant.CITY));
            } else {
                $("#city").val(Merchant.CITY);
            }
            if (Merchant.STATE === " ") {
                $("#state").val($.trim(Merchant.STATE));
            } else {
                $("#state").val(Merchant.STATE);
            }
            if (Merchant.COUNTRY === " ") {
                $("#country").val($.trim(Merchant.COUNTRY));
            } else {
                $("#country").val(Merchant.COUNTRY);
            }
            if (Merchant.PINCODE === " ") {
                $("#pincode").val($.trim(Merchant.PINCODE));
            } else if (Merchant.PINCODE === "111111" || Merchant.PINCODE === 111111) {
                $("#pincode").val("");
            } else {
                $("#pincode").val(Merchant.PINCODE);
            }
            if (Merchant.DELIVERY_TYPE === " ") {
                $("#deliveryType").val($.trim(Merchant.DELIVERY_TYPE));
            } else {
                $("#deliveryType").val(Merchant.DELIVERY_TYPE);
            }
            if (Merchant.WP_ADDRESS1 === " ") {
                $("#Outletaddress1").val($.trim(Merchant.WP_ADDRESS1));
            } else {
                $("#Outletaddress1").val(Merchant.WP_ADDRESS1);
            }
            if (Merchant.WP_ADDRESS2 === " ") {
                $("#Outletaddress2").val($.trim(Merchant.WP_ADDRESS2));
            } else {
                $("#Outletaddress2").val(Merchant.WP_ADDRESS2);
            }
            if (Merchant.WP_ADDRESS3 === " ") {
                $("#Outletaddress3").val($.trim(Merchant.WP_ADDRESS3));
            } else {
                $("#Outletaddress3").val(Merchant.WP_ADDRESS3);
            }
            if (Merchant.WP_LANDMARK === " ") {
                $("#Outletlandmark").val($.trim(Merchant.WP_LANDMARK));
            } else {
                $("#Outletlandmark").val(Merchant.WP_LANDMARK);
            }
            if (Merchant.WP_CITY === " ") {
                $("#Outletcity").val($.trim(Merchant.WP_CITY));
            } else {
                $("#Outletcity").val(Merchant.WP_CITY);
            }
            if (Merchant.WP_STATE === " ") {
                $("#Outletstate").val($.trim(Merchant.WP_STATE));
            } else {
                $("#Outletstate").val(Merchant.WP_STATE);
            }
            if (Merchant.WP_COUNTRY === " ") {
                $("#Outletcountry").val($.trim(Merchant.WP_COUNTRY));
            } else {
                $("#Outletcountry").val(Merchant.WP_COUNTRY);
            }
            if (Merchant.WP_PINCODE === " ") {
                $("#Outletpincode").val($.trim(Merchant.WP_PINCODE));
            } else {
                $("#Outletpincode").val(Merchant.WP_PINCODE);
            }
            if (Merchant.PPSECURE_KEY === " ") {
                $("#ppSecurekey").val($.trim(Merchant.PPSECURE_KEY));
            } else {
                $("#ppSecurekey").val(Merchant.PPSECURE_KEY);
            }
            if (Merchant.PPKEY === " ") {
                $("#ppKey").val($.trim(Merchant.PPKEY));
            } else {
                $("#ppKey").val(Merchant.PPKEY);
            }
//            if (Merchant.WP_NAME === "" || Merchant.WP_NAME === " ") {
//                $("#Outletname").val($.trim(Merchant.WP_NAME));
//            }else{
//                $("#Outletname").val(Merchant.WP_NAME);
//            }
            getIndustry(Merchant);
            if (Merchant.INDUSTRYTYPE !== '36') {
                $("#cuisineDiv").hide();
            } else {
                $("#cuisineDiv").show();
            }
            MerchantLogo = Merchant.LOGO;
            var open = Merchant.FROM_TIME;
            if (open === "" || open === " " || open === null) {
                $("#opens").val(formatAMPM(new Date));
            } else {
                $("#opens").val(open);
            }
//            var spltOpen = open.split(" ");
            var close = Merchant.TO_TIME;
            if (close === "" || close === " " || close === null) {
                $("#closes").val(formatAMPM(new Date));
            } else {
                $("#closes").val(close);
            }
//            var splitClose = close.split(" ");
            var days = Merchant.DAYS_CLOSED;
            var food = Merchant.CHOICE;
            if (days === null || days === " " || days === "") {
                $("#dayClosed").hide();
                $("#selectedDays").hide();
            } else {
                $("#dayClosed").show();
                $("#selectedDays").show();
            }
            var newdays = days.split(",");
//            $("#opens").val(open);
//            $("#opensHour").val(spltOpen[1]);
//            $("#closes").val(close);
//            $("#closesHour").val(splitClose[1]);
//            var newdays = newday.slice(0, -1);
            for (var k = 0; k < newdays.length; k++) {
                $("#dayClosed").append(newdays[k] + "\n");
                var index = document.getElementById("daysClosed");
                for (var a = 0; a < index.length; a++) {
                    if (newdays[k] === index[a].value) {
                        index[a].setAttribute("selected", true);
                    }
                }
            }
            var foods = food.split(",");
            var ftype = foods.slice(0, -1);
            for (var k = 0; k < ftype.length; k++) {
                var index = document.getElementById("foodType");
                for (var a = 0; a < index.length; a++) {
                    if (ftype[k] === index[a].value) {
                        index[a].setAttribute("selected", true);
                    }
                }
            }
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
    });
    lAjax.execute();
}


function updateMerchant() {
    debugger;
    var updateMerchantId = MerchantPlan.merchantId;
    var updateSubMerchantId = MerchantPlan.subMerchantId;
    var merchantDetail = {};
    var warehouseAddArr = {};
    var Category = [];
    var SubCategory = [];
    if (imagereader != "") {
        var img1 = imagereader.result.split(',');
    }
    var locDetails = JSON.parse(localStorage.getItem("locationDetail"));
    var location = "";
    if (locDetails == null) {
        location = "getLoc";
    } else if (locDetails == "null") {
        location = "getLoc";
    } else if (locDetails == undefined) {
        location = "getLoc";
    } else {

    }
    if (location != "getLoc") {
        merchantDetail.lngmin = locDetails.minLon.toFixed(8);
        merchantDetail.latmax = locDetails.maxLat.toFixed(8);
        merchantDetail.latmin = locDetails.minlat.toFixed(8);
        merchantDetail.lngmax = locDetails.maxLon.toFixed(8);
        merchantDetail.radius = $('#radius').val();
        merchantDetail.lat = lat.toFixed(8);
        merchantDetail.lng = lng.toFixed(8);
    } else {
        merchantDetail.billing = "changeRadius";
        merchantDetail.radius = $('#radius').val();
    }
    var radioValue = $("input[name='ProductYesOrNo']:checked").val();
    merchantDetail.merchantId = updateMerchantId;
    merchantDetail.subMerchantId = 1;
    merchantDetail.userType = "UpdateMerchant";
    merchantDetail.merchantName = $("#merchantName").val();
    merchantDetail.merchantMobileNo = $("#merchantMobileNo").val();
    merchantDetail.legalName = $("#legalName").val();
    merchantDetail.dbaName = $("#dbaName").val();
    merchantDetail.subMerchantName = $("#merchantName").val();
    merchantDetail.subMerchantMobileNo = $("#merchantMobileNo").val();
    merchantDetail.subMerchantLocation = $("#Outletlandmark").val();
    merchantDetail.subMerchantPincode = $("#pincode").val();
    var subMerchantAddress = $("#Outletaddress1").val() + " ," + $("#Outletaddress2").val() + " ," + $("#Outletaddress3").val();
    merchantDetail.subMerchantAddress = subMerchantAddress;
    if ($("#imagefile").val() == null || $("#imagefile").val() == '') {
        merchantDetail.logo = "noUpdate";
    } else {
        merchantDetail.logo = encodeURIComponent(img1[1]);
    }
    merchantDetail.industryType = $("#subMerchantIndustryType").val();
    merchantDetail.gstType = $("#mGstType").val();
    merchantDetail.gstNumber = $("#gstNumber").val();
    merchantDetail.gstState = $("#gstState").val();
    if (lEcommerce === 'YES' && !"NO".equalsIgnoreCase(radioValue.toString())) {
        merchantDetail.ecommerce = lEcommerce;
    } else {
        merchantDetail.ecommerce = radioValue.toString();
    }
    merchantDetail.deliveryType = $("#deliveryType").val();
    merchantDetail.minOrderValue = $("#minOrderValue").val();
    merchantDetail.address1 = $("#address1").val();
    merchantDetail.address2 = $("#address2").val();
    merchantDetail.address3 = $("#address3").val();
    merchantDetail.landmark = $("#landmark").val();
    merchantDetail.city = $("#city").val();
    merchantDetail.state = $("#state").val();
    merchantDetail.country = $("#country").val();
    merchantDetail.pincode = $("#pincode").val();
    merchantDetail.ppKey = $("#ppKey").val();
    merchantDetail.ppSecurekey = $("#ppSecurekey").val();
    var newCuisineList = $("#cuisineList").val();
    var selectedCuisine = "";
    if (newCuisineList == "" || newCuisineList == null || newCuisineList == 'undefined') {

    } else {
        for (var i = 0; i < newCuisineList.length; i++) {
            selectedCuisine = selectedCuisine.concat(newCuisineList[i] + ",");
        }
        merchantDetail.cuisineName = selectedCuisine;
    }
    warehouseAddArr.address1 = $("#Outletaddress1").val();
    warehouseAddArr.address2 = $("#Outletaddress2").val();
    warehouseAddArr.address3 = $("#Outletaddress3").val();
    warehouseAddArr.landmark = $("#Outletlandmark").val();
    warehouseAddArr.city = $("#Outletcity").val();
    warehouseAddArr.state = $("#Outletstate").val();
    warehouseAddArr.country = $("#Outletcountry").val();
    warehouseAddArr.pincode = $("#Outletpincode").val();
    for (var i = 0; i < lCategory.length; i++) {
        var lCategoryArray = {};
        lCategoryArray.groupId = lCategory[i].GROUP_ID;
        lCategoryArray.categoryId = lCategory[i].CATEGORY_ID;
        lCategoryArray.groupName = lCategory[i].GROUP_NAME;
        lCategoryArray.type = lCategory[i].TYPE;
        lCategoryArray.imgPath = lCategory[i].IMG_PATH;
        lCategoryArray.mid = updateMerchantId;
        lCategoryArray.smid = updateSubMerchantId;
        lCategoryArray.cVisibility = lCategory[i].VISIBILITY;
        lCategoryArray.cPriority = lCategory[i].PRIORITY;
        Category.push(lCategoryArray);
    }
    for (var i = 0; i < lSubCategory.length; i++) {
        var lSubCategoryArray = {};
        lSubCategoryArray.groupId = lSubCategory[i].GROUP_ID;
        lSubCategoryArray.categoryId = lSubCategory[i].CATEGORY_ID;
        lSubCategoryArray.groupName = lSubCategory[i].GROUP_NAME;
        lSubCategoryArray.type = lSubCategory[i].TYPE;
        lSubCategoryArray.imgPath = lSubCategory[i].IMG_PATH;
        lSubCategoryArray.mid = updateMerchantId;
        lSubCategoryArray.smid = updateSubMerchantId;
        lSubCategoryArray.cVisibility = lSubCategory[i].VISIBILITY;
        lSubCategoryArray.cPriority = lSubCategory[i].PRIORITY;
        SubCategory.push(lSubCategoryArray);
    }

    var lJSON = {};
    lJSON.merchantDetail = merchantDetail;
    lJSON.warehouseAddArr = warehouseAddArr;
    lJSON.Category = Category;
    lJSON.SubCategory = SubCategory;
    lJSON.source = "panel";
//    lJSON.opens = $("#opens").val() + " " + $("#opensHour").val();
    lJSON.opens = $("#opens").val();
//    lJSON.closes = $("#closes").val() + " " + $("#closesHour").val();
    lJSON.closes = $("#closes").val();
    var days = $("#daysClosed").val();
    var newDays = "";
    if (days === "" || days === null || days === "undefined") {
        newDays = null;
    } else {
        for (var j = 0; j < days.length; j++) {
            newDays = newDays.concat(days[j] + ",");
        }
    }
    var foodtype = $("#foodType").val();
    var foods = "";
    if (foodtype === "" || foodtype === null || foodtype === "undefined") {
        foods = null;
    } else {
        for (var j = 0; j < foodtype.length; j++) {
            foods = foods.concat(foodtype[j] + ",");
        }
    }
    if (newDays === null) {
        lJSON.daysClosed = newDays;
    } else {
        var newDay = newDays.slice(0, -1);
        lJSON.daysClosed = newDay;
    }
    lJSON.foodType = foods;
    var json = JSON.stringify(lJSON);
    var lurl = localStorage.getItem("url") + "billing/v1/addMerchant";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setData(json);
    lAjax.setType('post');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {
        $('#scrollImg').css('display', 'none');
        var res = JSON.parse(response);
        if (res.flag === true && res.message !== null && res.message != "Merchant Update Successfully.") {
            rediectToHome(res.message);
        } else if (res.flag === true) {
            localStorage.setItem("locationDetail", null);
            sweetAlertTimeOut('Done!', 'Merchant update successfully', 'success', 3000, function () {
                window.location.reload();
            }, 3000);
        } else {
            sweetAlertIcon('OOPS!', 'Somthing went wrong!', 'error', function () {
            });
        }
    });
    lAjax.execute();
}

function deviceTypeChange(that) {
    var id = $(that).attr('id');
    var lastChar = id[id.length - 1];
    console.log(lastChar);
    if ($("#deviceType_" + lastChar).val() === "USB") {
        $("#usb_" + lastChar).show();
        $("#famco_" + lastChar).hide();
    } else if ($("#deviceType_" + lastChar).val() === "FAMCO") {
        $("#usb_" + lastChar).hide();
        $("#famco_" + lastChar).show();
    } else {
        $("#usb_" + lastChar).hide();
        $("#famco_" + lastChar).hide();
    }
}

function uploadImage() {

    var file = document.querySelector('input[Name = "logo"]').files[0];
    imagereader = new FileReader();
    var preview = {};
    imagereader.onload = function ()
    {
        progressHandler(file);
    };
    imagereader.onloadend = function () {
        preview.src = imagereader.result;
    };
    imagereader.readAsDataURL(file); //reads the data as a URL
}

function progressHandler() {

    var elem = document.getElementById("progressBarService");
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function checkUserId(that) {
    var id = $(that).attr('id');
    var lastChar = id[id.length - 1];
    var lURL = localStorage.getItem("url") + "webresources/UserManagementServiceAPI/getUserByUserName";
    var lUsername = $("#userId_" + lastChar).val();
    var lData = {data: {username: lUsername}};
    var json = JSON.stringify(lData);
    var lAjax = new Ajax();
    lAjax.setUrl(lURL);
    lAjax.setType('post');
    lAjax.setData(json);
    lAjax.setContentType("application/json");
    lAjax.addEventListener('success', function (response) {
        response = JSON.parse(response);
        if (response.status === false)
        {
            document.getElementById("lUserIdAlertMessage_" + lastChar).innerHTML = "User-Id Already Exist";
            $("userId_" + lastChar).val("");
            $("userId_" + lastChar).focus();
        } else {
            document.getElementById("lUserIdAlertMessage_" + lastChar).innerHTML = "";
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
    });
    lAjax.execute();
}

function MerchantIndustryTypeList()
{

    lIndustryType = $("#merchantIndustryType option:selected").text();
    var lurl = localStorage.getItem("url") + "prepaid/v1/getIndustryType";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        industryTypeList = JSON.parse(res.data);
        var i;
        for (i = 0; i < industryTypeList.length; i++)
        {
            $("#merchantIndustryType").append($('<option value="' + industryTypeList[i].itId + '">' + industryTypeList[i].industryType + '</option>'));
        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function updateSubMerchantIndustryTypeList()
{

    lIndustryType = $("#subMerchantIndustryType option:selected").text();
    var lurl = localStorage.getItem("url") + "prepaid/v1/getIndustryType";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        industryTypeList = JSON.parse(res.data);
        var i;
        for (i = 0; i < industryTypeList.length; i++)
        {
            if (newIndustryType === industryTypeList[i].industryType) {
                $("#subMerchantIndustryType").append($('<option value="' + industryTypeList[i].itId + '" selected>' + industryTypeList[i].industryType + '</option>')).attr("disabled", true);
                if (industryTypeList[i].itId == "36") {
                    $("#cuisineDiv").show();
                } else {
                    $("#cuisineDiv").hide();
                }
            } else if (industryTypeList[i].isactive === "Active") {
                $("#subMerchantIndustryType").append($('<option value="' + industryTypeList[i].itId + '">' + industryTypeList[i].industryType + '</option>'));
            }
        }
        CuisineList();
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function merchantGstTypeUpdate(value)
{
    if (value === "GST_TYPE")
    {
        if ($("#mGstType").val() === 'Registed Bussiness Regular' || $("#mGstType").val() === 'Registed Bussiness Composition' || $("#mGstType").val() === '')
        {
            $("#gstNumber").prop('disabled', false);
            $("#gstState").prop('disabled', false);
            $("#minOrderValue").prop('disabled', false);
            $("#YesRadio").prop('disabled', false);
            $("#YesRadio").prop("checked", true);
            $("#ppSecurekey").prop('disabled', false);
            $("#ppKey").prop('disabled', false);
            $("#deliveryType").prop('disabled', false);
        } else {
            $("#gstNumber").val("");
            $("#gstNumber").prop('disabled', true);
            $("#minOrderValue").val("");
            $("#minOrderValue").prop('disabled', true);
            $("#NoRadio").prop("checked", true);
            $("#YesRadio").prop('disabled', true);
            $("#ppSecurekey").val("");
            $("#ppSecurekey").prop('disabled', true);
            $("#ppKey").val("");
            $("#ppKey").prop('disabled', true);
            $("#deliveryType").prop('disabled', true);
        }
    }
}

function getStateByGSTNO() {
    var gstNo = $("#gstNumber").val();
    if (gstNo.length === 15) {
        var digit = gstNo.slice(0, 2);
        switch (digit) {
            case "01":
                $("#gstState").val("01-Jammu & Kashmir");
                $("#priceListAlert").text("");
                break;
            case "02":
                $("#gstState").val("02-Himachal Pradesh");
                $("#priceListAlert").text("");
                break;
            case "03":
                $("#gstState").val("03-Punjab");
                $("#priceListAlert").text("");
                break;
            case "04":
                $("#gstState").val("04-Chandigarh");
                $("#priceListAlert").text("");
                break;
            case "05":
                $("#gstState").val("05-Uttarakhand");
                $("#priceListAlert").text("");
                break;
            case "06":
                $("#gstState").val("06-Haryana");
                $("#priceListAlert").text("");
                break;
            case "07":
                $("#gstState").val("07-Delhi");
                $("#priceListAlert").text("");
                break;
            case "08":
                $("#gstState").val("08-Rajasthan");
                $("#priceListAlert").text("");
                break;
            case "09":
                $("#gstState").val("09-Uttar Pradesh");
                $("#priceListAlert").text("");
                break;
            case "10":
                $("#gstState").val("10-Bihar");
                $("#priceListAlert").text("");
                break;
            case "11":
                $("#gstState").val("11-Sikkim");
                $("#priceListAlert").text("");
                break;
            case "12":
                $("#gstState").val("12-Arunachal Pradesh");
                $("#priceListAlert").text("");
                break;
            case "13":
                $("#gstState").val("13-Nagaland");
                $("#priceListAlert").text("");
                break;
            case "14":
                $("#gstState").val("14-Manipur");
                $("#priceListAlert").text("");
                break;
            case "15":
                $("#gstState").val("15-Mizoram");
                $("#priceListAlert").text("");
                break;
            case "16":
                $("#gstState").val("16-Tripura");
                $("#priceListAlert").text("");
                break;
            case "17":
                $("#gstState").val("17-Meghalaya");
                $("#priceListAlert").text("");
                break;
            case "18":
                $("#gstState").val("18-Assam");
                $("#priceListAlert").text("");
                break;
            case "19":
                $("#gstState").val("19-West Bengal");
                $("#priceListAlert").text("");
                break;
            case "20":
                $("#gstState").val("20-Jharkhand");
                $("#priceListAlert").text("");
                break;
            case "21":
                $("#gstState").val("21-Odisha");
                $("#priceListAlert").text("");
                break;
            case "22":
                $("#gstState").val("22-Chhattisgarh");
                $("#priceListAlert").text("");
                break;
            case "23":
                $("#gstState").val("23-Madhya Pradesh");
                $("#priceListAlert").text("");
                break;
            case "24":
                $("#gstState").val("24-Gujarat");
                $("#priceListAlert").text("");
                break;
            case "25":
                $("#gstState").val("25-Daman & Diu");
                $("#priceListAlert").text("");
                break;
            case "26":
                $("#gstState").val("26-Dadra & Nagar Haveli");
                $("#priceListAlert").text("");
                break;
            case "27":
                $("#gstState").val("27-Maharashtra");
                $("#priceListAlert").text("");
                break;
            case "29":
                $("#gstState").val("29-Karnataka");
                $("#priceListAlert").text("");
                break;
            case "30":
                $("#gstState").val("30-Goa");
                $("#priceListAlert").text("");
                break;
            case "31":
                $("#gstState").val("31-Lakshdweep");
                $("#priceListAlert").text("");
                break;
            case "32":
                $("#gstState").val("32-Kerala");
                $("#priceListAlert").text("");
                break;
            case "33":
                $("#gstState").val("33-Tamil Nadu");
                $("#priceListAlert").text("");
                break;
            case "34":
                $("#gstState").val("34-Pondicherry");
                $("#priceListAlert").text("");
                break;
            case "35":
                $("#gstState").val("35-Andaman & Nicobar Islands");
                $("#priceListAlert").text("");
                break;
            case "36":
                $("#gstState").val("36-Telengana");
                $("#priceListAlert").text("");
                break;
            case "37":
                $("#gstState").val("37-Andhra Pradesh");
                $("#priceListAlert").text("");
                break;
            case "97":
                $("#gstState").val("97-Other Territory");
                $("#priceListAlert").text("");
                break;
            default:
                $("#gstState").val("");
                $("#priceListAlert").text("Please enter valid gst No.");
                break;
        }
    }
}

function updateMerchantGST()
{
    var GSTNo = $("#gstNumber").val();
    if (GSTNo.length === 15) {
        var lurl = localStorage.getItem("url") + "billing/v1/validateMerchantGstType/" + GSTNo;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setType('post');
        lAjax.setContentType('Application/json');
        lAjax.addEventListener('success', function (response) {
            var res = JSON.parse(response);
            var GSTNO = JSON.parse(res.data);
            if (GSTNO === null)
            {
                $("#validateGstAlert").text("");
                getStateByGSTNO();
            } else {
                $("#validateGstAlert").text("Gst number already present.");
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    }
}

function AddressValue() {
    var radioValue = $("input[name='AddresYesOrNo']:checked").val();
    if (radioValue === "YES") {
        $("#Outletaddress1").val($("#address1").val());
        $("#Outletaddress2").val($("#address2").val());
        $("#Outletaddress3").val($("#address3").val());
        $("#Outletlandmark").val($("#landmark").val());
        $("#Outletcity").val($("#city").val());
        $("#Outletstate").val($("#state").val());
        $("#Outletcountry").val($("#country").val());
        $("#Outletpincode").val($("#pincode").val());
        $("#Outletaddress1").prop('disabled', true);
        $("#Outletaddress2").prop('disabled', true);
        $("#Outletaddress3").prop('disabled', true);
        $("#Outletlandmark").prop('disabled', true);
        $("#Outletcity").prop('disabled', true);
        $("#Outletstate").prop('disabled', true);
        $("#Outletcountry").prop('disabled', true);
        $("#Outletpincode").prop('disabled', true);
    } else {
        $("#Outletaddress1").val("");
        $("#Outletaddress2").val("");
        $("#Outletaddress3").val("");
        $("#Outletlandmark").val("");
        $("#Outletcity").val("");
        $("#Outletstate").val("");
        $("#Outletcountry").val("");
        $("#Outletpincode").val("");
        $("#Outletaddress1").prop('disabled', false);
        $("#Outletaddress2").prop('disabled', false);
        $("#Outletaddress3").prop('disabled', false);
        $("#Outletlandmark").prop('disabled', false);
        $("#Outletcity").prop('disabled', false);
        $("#Outletstate").prop('disabled', false);
        $("#Outletcountry").prop('disabled', false);
        $("#Outletpincode").prop('disabled', false);
    }
}

function writeDetails() {
    $("#Outletaddress1").val($("#address1").val());
    $("#Outletaddress2").val($("#address2").val());
    $("#Outletaddress3").val($("#address3").val());
    $("#Outletlandmark").val($("#landmark").val());
    $("#Outletcity").val($("#city").val());
    $("#Outletstate").val($("#state").val());
    $("#Outletcountry").val($("#country").val());
    $("#Outletpincode").val($("#pincode").val());
    $("#Outletaddress1").prop('disabled', true);
    $("#Outletaddress2").prop('disabled', true);
    $("#Outletaddress3").prop('disabled', true);
    $("#Outletlandmark").prop('disabled', true);
    $("#Outletcity").prop('disabled', true);
    $("#Outletstate").prop('disabled', true);
    $("#Outletcountry").prop('disabled', true);
    $("#Outletpincode").prop('disabled', true);
}

function getIndustry(Merchant) {
    var lurl = localStorage.getItem("url") + "billing/v1/getIndustryType";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {

        var res = JSON.parse(response);
        var Industry = JSON.parse(res.data);
        lIndustryList = Industry;
        for (i = 0; i < lIndustryList.length; i++)
        {
            if (lIndustryList[i].isactive === "Active" && parseInt(Merchant.ITID) === lIndustryList[i].itId) {
                $("#subMerchantIndustryType").append($('<option value="' + lIndustryList[i].itId + '" selected>' + lIndustryList[i].industryType + '</option>')).attr("disabled", true);
                if (lIndustryList[i].itId == "36") {
                    $("#cuisineDiv").show();
                } else {
                    $("#cuisineDiv").hide();
                }
            }
        }
        updateSubMerchantIndustryTypeList();
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}


function closeImageModal() {
    $("#imageModalDiv img").remove();
}

function minimumValue(Value) {
    if (Value === "YES") {
        $("#minOrderValue").prop('disabled', false);
        $("#ppSecurekey").prop('disabled', false);
        $("#ppKey").prop('disabled', false);
        $("#deliveryType").prop('disabled', false);
    } else {
        $("#minOrderValue").val("");
        $("#ppSecurekey").val("");
        $("#ppKey").val("");
        $("#minOrderValue").prop('disabled', true);
        $("#ppSecurekey").prop('disabled', true);
        $("#ppKey").prop('disabled', true);
        $("#deliveryType").prop('disabled', true);
    }

}

function getIndustryType() {
    if ($("#subMerchantIndustryType").val() === "36") {
        $("#cuisineDiv").show();
    } else {
        $("#cuisineDiv").hide();
    }
    var lIndustryId = $("#subMerchantIndustryType").val();
    var lAjax = new Ajax();
    lAjax.setUrl(url + '?type=data&code=ENQ81&criteria= INDUSTRY_ID = ' + lIndustryId);
    var that = this;
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        data = res.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].CATEGORY_ID === 0) {
                lCategory.push(data[i]);
            } else {
                lSubCategory.push(data[i]);
            }
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
    });
    lAjax.execute();
}

function rediectToHome(Value) {
    $('#OKMODAL').css('display', 'block');
    $('#OKMODAL').removeClass('sweet-overlay').addClass('sweet-alert  showSweetAlert visible');
    setTimeout(function () {
        $('#OKMODAL').css('display', 'none');
        window.location.href = "home#ui/Billing/dashboard/dashboard.html";
        window.location.reload();
    }, 120000);
    var lurl = localStorage.getItem("url") + "billing/v1/showAllMenus/" + Value;
    localStorage.clear();
    sessionStorage.clear();
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {
        window.location.reload();
        var res = JSON.parse(response);
        var warehouse = JSON.parse(res.data);
        if (res.flag === true)
        {

        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}


$('#pincode').on('keyup', function ()
{
    getPincodevalue("owner");
});
$('#Outletpincode').on('keyup', function ()
{
    getPincodevalue("outlet");
});
function getPincodevalue(type)
{
    if (type === "owner") {
        var Pincode = $("#pincode").val();
        if (Pincode.length === 6) {
            var lurl = localStorage.getItem("url") + "billing/v1/getAddressByPincode/" + Pincode;
            var lAjax = new Ajax();
            lAjax.setUrl(lurl);
            lAjax.setType('post');
            lAjax.setContentType('Application/json');
            lAjax.addEventListener('success', function (response) {
                var res = JSON.parse(response);
                var Pindata = JSON.parse(res.data);
                if (Pindata === null || Pindata === "null")
                {
                    $("#city").val("");
                    $("#state").val("");
                    $("#country").val("");
                    $("#pincodeError").text("Please enter valid pincode.");
                    $("#pincodeError").css('display', 'block').css('color', '#b94a48').css('border-color', '#b94a48');
                    jQuery('#pincodeDiv1').addClass('has-error').removeClass('has-success');
                    jQuery('#pincodeDiv').addClass('has-error');
                    jQuery('#pincode-error').addClass('has-error');
                } else {
                    $("#pincodeError").css('display', 'block').css('color', '#468847').css('border-color', '#468847');
                    jQuery('#pincodeDiv1').addClass('has-success');
                    ;
                    jQuery('#pincodeDiv').addClass('has-success').removeClass('has-error');
                    jQuery('#pincode-error').addClass('has-success');
                    $("#city").val(Pindata.district);
                    $("#state").val(Pindata.state);
                    $("#country").val(Pindata.country);
                }
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log("Error : " + textStatus + "" + errorThrown);
            });
            lAjax.execute();
        } else {
            $("#pincodeError").text("");
        }
    } else if (type === "outlet") {
        var Pincode = $("#Outletpincode").val();
        if (Pincode.length === 6) {
            var lurl = localStorage.getItem("url") + "billing/v1/getAddressByPincode/" + Pincode;
            var lAjax = new Ajax();
            lAjax.setUrl(lurl);
            lAjax.setType('post');
            lAjax.setContentType('Application/json');
            lAjax.addEventListener('success', function (response) {
                var res = JSON.parse(response);
                var Pindata = JSON.parse(res.data);
                if (Pindata === null || Pindata === "null")
                {
                    $("#Outletcity").val("");
                    $("#Outletstate").val("");
                    $("#Outletcountry").val("");
//                    $("#pincode-error").text("Please enter valid pincode.");
                    $("#invalidPincode1").text("Please enter valid pincode.");
                    $("#invalidPincode1").css('display', 'block').css('color', '#b94a48').css('border-color', '#b94a48');
                    jQuery('#outletPincodeDiv1').addClass('has-error').removeClass('has-success');
                    jQuery('#outletPincodeDiv').addClass('has-error');
                    jQuery('#Outletpincode-error').addClass('has-error');
                } else {
                    $("#invalidPincode1").text("");
                    $("#invalidPincode2").text("");
                    $("#invalidPincode1").css('display', 'none').css('color', '#468847').css('border-color', '#468847');
                    jQuery('#outletPincodeDiv1').addClass('has-success');
                    ;
                    jQuery('#outletPincodeDiv').addClass('has-success').removeClass('has-error');
                    jQuery('#Outletpincode-error').addClass('has-success');
                    $("#pincodeError").text("");
                    $("#Outletcity").val(Pindata.district);
                    $("#Outletstate").val(Pindata.state);
                    $("#Outletcountry").val(Pindata.country);
                }
            });
            lAjax.addEventListener('error', function (textStatus, errorThrown) {
                console.log("Error : " + textStatus + "" + errorThrown);
            });
            lAjax.execute();
        } else {
            $("#invalidPincode1").text("");
            $("#invalidPincode2").text("Please Enter Valid Pincode");
            $("#invalidPincode1").css('display', 'block').css('color', '#b94a48').css('border-color', '#b94a48');
            jQuery('#outletPincodeDiv1').addClass('has-error').removeClass('has-success');
            jQuery('#outletPincodeDiv').addClass('has-error');
            jQuery('#Outletpincode-error').removeClass('has-error');
            $("#Outletcity").val("");
            $("#Outletstate").val("");
            $("#Outletcountry").val("");
            $("#pincodeError").text("");
        }
    }
}

function checkPincode() {
    if ($('li.aaa').hasClass('active') && ($("#pincodeError").text() == "Please enter valid pincode.") || ($("#invalidPincode1").text() === "Please enter valid pincode.") || $("#invalidPincode2").text() === "Please Enter Valid Pincode") {
        pincodeVar = "noNext";
    } else {
        pincodeVar = "Next";
    }
}

var placeSearch, autocomplete;
var componentForm = {
    premise: 'long_name',
    sublocality_level_3: 'long_name',
    sublocality_level_2: 'long_name',
    sublocality_level_1: 'long_name',
    locality: 'long_name',
    administrative_area_level_2: 'long_name',
    route: 'long_name',
    administrative_area_level_1: 'long_name',
    country: 'long_name',
    postal_code: 'short_name'
};

$('#address3').on('keyup', function ()
{
    var SearchLoc = $("#address3").val();
    if (SearchLoc.length > 0) {
        var add1val = SearchLoc.split(' ');
        if (add1val.length >= 2) {
//            initAutocomplete();
            autocompleteAddress("address");
        }
    }
});

$('#Outletaddress3').on('keyup', function ()
{
    var SearchLoc = $("#Outletaddress3").val();
    if (SearchLoc.length > 0) {
        var add1val = SearchLoc.split(' ');
        if (add1val.length >= 2) {
//            initAutocomplete();
            var radioValue = $("input[name='AddresYesOrNo']:checked").val();
            if (radioValue == "NO") {
                autocompleteAddress("outletAddress");
            }
        }
    }
});

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle(
                    {center: geolocation, radius: position.coords.accuracy});
            autocomplete.setBounds(circle.getBounds());
            console.log(circle.getBounds());
        });
    }
}

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('address1'), {types: ['geocode']});
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    geoAddress = $("#address1").val();

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            switch (addressType) {
                case "sublocality_level_3":
                case "premise":
                    document.getElementById('address1').value = val;
                    break;
                case "sublocality_level_2":
                    document.getElementById('address2').value = val;
                    break;
                case "sublocality_level_1":
                    document.getElementById('address3').value = val;
                    break;
//                case "locality":
//                    document.getElementById('address3').value = val;
//                    break;
//                case "administrative_area_level_2":
//                    document.getElementById('landmark').value = val;
//                    break;
//                case "administrative_area_level_1":
//                    document.getElementById('address3').value = val;
//                    break;
                case "postal_code":
                    document.getElementById('pincode').value = val;
                    getPincodevalue("owner");
                    break;
                default:
                // code block
            }
        }
    }


}

function getLocation(lat, lon) {
    var locModal = {};
    locModal.latitude = lat;
    locModal.longitude = lon;
    locModal.radius = $("#radius").val();
    var lurl = localStorage.getItem("url") + "billing/v1/getGeoLoc";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setSync(true);
    lAjax.setData(JSON.stringify(locModal));
    lAjax.setType('post');
    lAjax.setContentType('application/json');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            localStorage.setItem("locationDetail", res.data);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function getAddressDetailbyjava(newAdd)
{
    var encodedUrl = encodeURI(newAdd);
    var lurl = localStorage.getItem("url") + "billing/v1/getLocationBygoogle/" + encodedUrl;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setSync(true);
    lAjax.setType('get');
    lAjax.setContentType('Application/json');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true)
        {
            var loc = JSON.parse(res.data).results[0].geometry.location;
            lat = loc.lat;
            lng = loc.lng;
            getLocation(lat, lng);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {

        console.log(textStatus + '---' + errorThrown);
    });
    lAjax.execute();
}


function autocompleteAddress(value)
{
    if (value == "address") {
        var encodedUrl = $("#address3").val();
    } else {
        var encodedUrl = $("#Outletaddress3").val();
    }
    if (encodedUrl.indexOf(' ') >= 0) {
        var lurl = localStorage.getItem("url") + "billing/v1/autocompleteAddress/" + encodedUrl;
        var lAjax = new Ajax();
        lAjax.setUrl(lurl);
        lAjax.setSync(true);
        lAjax.setType('get');
        lAjax.setContentType('Application/json');
        lAjax.addEventListener('success', function (response) {
            document.getElementById('browsers').innerHTML = '';
            $("#browsers").empty();
            $("#addList").empty();
            var res = JSON.parse(response);
            var address = JSON.parse(res.data);
            if (res.flag === true)
            {
                if (value == "address") {
                    for (var i = 0; i < address.predictions.length; i++) {
                        $("#browsers").append($('<option value="' + address.predictions[i].description + '">' + address.predictions[i].description + '</option>'));
                    }
                } else if (value == "outletAddress") {
                    for (var i = 0; i < address.predictions.length; i++) {
                        $("#addList").append($('<option value="' + address.predictions[i].description + '">' + address.predictions[i].description + '</option>'));
                    }
                } else {
                }
            }
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {

            console.log(textStatus + '---' + errorThrown);
        });
        lAjax.execute();
    }
}


$('#address3').on('change', function ()
{
    geoAddress = $('#address3').val();
});

$('#Outletaddress3').on('change', function ()
{
    geoOutletAddress = $('#address3').val();
});

var dayslist = [];
var newdayslist = [];

$("#newDaysClosed").hide();
function select(id) {
    $("#dayClosed").hide();
    var dlist = [];
    dayslist = [];
    for (var i = 0; i < 7; i++) {
        if (id.options[i].selected === true) {
            dlist.push(id.options[i].value);
        }
        dayslist.push(id.options[i].value);
    }

    newdayslist = [];
    for (var j = 0; j < dayslist.length; j++) {
        for (var k = 0; k < dlist.length; k++) {
            if (dlist[k] === dayslist[j]) {
                newdayslist.push(dlist[k]);
            }
        }
    }

    $("#newDaysClosed").html('');
    for (var a = 0; a < newdayslist.length; a++) {
        $("#newDaysClosed").append(newdayslist[a] + ",");
    }
    var daysStr = $("#newDaysClosed").text();
    var daysnewStr = daysStr.substring(0, daysStr.length - 1);
    $("#newDaysClosed").text("");
    $("#newDaysClosed").append(daysnewStr);
}

function hidefunction() {
    if (newdayslist.length === 0) {
        $("#selectedDays").hide();
        $("#newDaysClosed").hide();
    } else {
        $("#selectedDays").show();
        $("#newDaysClosed").show();
    }
}

var cuslist = [];
var newcuslist = [];

$("#selectedList").hide();

function Select(id) {
    $("#selectList").hide();
    var cuilist = [];
    cuslist = [];
    for (var i = 0; i < newCuisineList.length; i++) {
        if (id.options[i].selected === true) {
            cuilist.push(newCuisineList[i].CUISINE_NAME);
        }
        cuslist.push(id.options[i].value);
    }

    newcuslist = [];
    for (var j = 0; j < cuslist.length; j++) {
        for (var k = 0; k < cuilist.length; k++) {
            if (cuilist[k] === cuslist[j]) {
                newcuslist.push(cuilist[k]);
            }
        }
    }

    $("#selectedList").html('');
    for (var a = 0; a < newcuslist.length; a++) {
        $("#selectedList").append(newcuslist[a] + ",");
    }
}

function hideFunction() {
    if (newcuslist.length === 0) {
        $("#cuisineName").hide();
        $("#selectedList").hide();
    } else {
        $("#cuisineName").show();
        $("#selectedList").show();
    }
}

function newfunction() {
    if ($("#pincode").val() === "") {
        $("#city").val("");
        $("#state").val("");
        $("#country").val("");
    }
}

function clearFunction() {
    if ($("#Outletpincode").val() === "") {
        $("#Outletcity").val("");
        $("#Outletstate").val("");
        $("#Outletcountry").val("");
    }
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? '0' + hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function checkTime(id) {
    debugger;
    if (id.id === "opens") {
        var time = id.value.split(" ");
        var times = time[0].split(":");
        if (times[0] === "" || times[0] === " " || times[1] === "" || times[1] === " " || time[1] === "" || time[1] === " " || time[0] === undefined || time[1] === undefined || times[0] === undefined || times[1] === undefined) {
            $("#opens").closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#nextButton").css('display', 'none');
            $('#openError').text("Please select time.");
        } else {
            $("#opens").closest('.form-group').removeClass('has-error').addClass('has-success');
            $("#nextButton").css('display', 'block');
            $('#openError').text("");
        }
    } else {
        var time = id.value.split(" ");
        var times = time[0].split(":");
        if (times[0] === "" || times[0] === " " || times[1] === "" || times[1] === " " || time[1] === "" || time[1] === " " || time[0] === undefined || time[1] === undefined || times[0] === undefined || times[1] === undefined) {
            $("#closes").closest('.form-group').removeClass('has-success').addClass('has-error');
            $("#nextButton").css('display', 'none');
            $('#closeError').text("Please select time.");
        } else {
            $("#closes").closest('.form-group').removeClass('has-error').addClass('has-success');
            $("#nextButton").css('display', 'block');
            $('#closeError').text("");
        }
    }
}