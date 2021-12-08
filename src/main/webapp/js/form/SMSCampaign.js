
var gCustomerList = 0;
var gGridParam = "";
var gBaseQuery = "SELECT * FROM vw_totalCustomer_invoiceDetail";
var gBaseQuery1 = "SELECT * FROM QUESTION_MASTER";
var gCustomerType = "Selective";
var gSelectedQuestion = "";
var gQuestionList = "";
var gQuestionIds = "";
var qval = "";
var ltab = "1";
document.getElementById("smsRemaining").innerHTML = JSON.parse(localStorage.getItem("storeDetails")).smsRemain;
$("#opt").value = 0;
var flag = 0;
var gCustomerList1 = [];
var date = new Date().toISOString().slice(0, 10);
var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
$("#expiryDay").attr('min', tomorrow);
var $validator = $("#wizard-1").validate({

    rules: {

        campaignName: {
            required: true
        },
        campaignDescription: {
            required: true
        },
        templateListType: {
            required: true
        },
        templateList: {
            required: true
        },
        earnAmount: {
            required: true
        },
        expiryDay: {
            required: true
        },
        customerListDiv: {
            required: true
        }

    },
    messages: {
        campaignName: "Please enter CampaignName",
        campaignDescription: "Please enter Campaign Description",
        templateListType: "Please select Template Type",
        templateList: "Please select Template",
        earnAmount: "Enter Earn Amount",
        expiryDay: "Enter expiry day",
        customerListDiv: "No customer Selected"

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
var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

var liActive = 0;

$("#balanceCondition2").append("<option value='' data-bv-field='color' >------Select------</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");
$("#lastVisitCondition2").append("<option value='' data-bv-field='color'>-Select-</option>",
        "<option value='<' data-bv-field='color'>Before</option>",
        "<option value='between' data-bv-field='color'>Between</option>");
$("#totalBusinessCondition2").append("<option value='' data-bv-field='color'>------Select------</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");
$("#noOfVisitsCondition2").append("<option value='' data-bv-field='color'>-- Select --</option>",
        "<option value='>' data-bv-field='color'>Greater than</option>",
        "<option value='<' data-bv-field='color'>Less than</option>",
        "<option value='=' data-bv-field='color'>Equal to</option>");

$(document).on('load', function () {
    $("#expiryDay").attr('min', date);
    GetAllTemplate();

    var liAddClass = "#li1";
    $(liAddClass).addClass('active');
    var divAddClass = "#tab1";
    $(divAddClass).addClass('active');
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("lastVisitDate")[0].setAttribute('max', today);
});

//$('select#condition1').on('click', function () {
//    switch ($(this).val()) {
//        case "CurrentPoint":
//            $("#balanceCondition2").empty();
//            $("#balanceCondition2").append("<option value='' data-bv-field='color' >------Select------</option>",
//                    "<option value='>' data-bv-field='color'>Greater than</option>",
//                    "<option value='<' data-bv-field='color'>Less than</option>",
//                    "<option value='=' data-bv-field='color'>Equal to</option>");
//            break;
//
//        case "LastVisit":
//            $("#lastVisitCondition2").empty();
//            $("#lastVisitCondition2").append("<option value='' data-bv-field='color'>-Select-</option>",
//                    "<option value='<' data-bv-field='color'>Before</option>",
//                    "<option value='between' data-bv-field='color'>Between</option>");
//            break;
//
//        case "TotalInvoice":
//            $("#totalBusinessCondition2").empty();
//            $("#totalBusinessCondition2").append("<option value='' data-bv-field='color'>------Select------</option>",
//                    "<option value='>' data-bv-field='color'>Greater than</option>",
//                    "<option value='<' data-bv-field='color'>Less than</option>",
//                    "<option value='=' data-bv-field='color'>Equal to</option>");
//            break;
//
//        case "Visits":
//            $("#noOfVisitsCondition2").empty();
//            $("#noOfVisitsCondition2").append("<option value='' data-bv-field='color'>-- Select --</option>",
//                    "<option value='>' data-bv-field='color'>Greater than</option>",
//                    "<option value='<' data-bv-field='color'>Less than</option>",
//                    "<option value='=' data-bv-field='color'>Equal to</option>");
//            break;
//
//        default:
//            $("#condition1").append("Nothing selected");
//    }
//});

$('#condition1').on('change', function () {
    switch ($(this).val()) {
        case "CurrentPoint":
            $('#balanceDiv').show();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#noOfVisitsDiv').hide();
            break;

        case "LastVisit":
            $('#lastVisitDiv').show();
            $('#balanceDiv').hide();
            $('#totalBusinessDiv').hide();
            $('#noOfVisitsDiv').hide();
            break;

        case "TotalInvoice":
            $('#totalBusinessDiv').show();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#noOfVisitsDiv').hide();
            break;

        case "Visits":
            $('#noOfVisitsDiv').show();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();
            break;
        default:
            $('#noOfVisitsDiv').hide();
            $('#balanceDiv').hide();
            $('#lastVisitDiv').hide();
            $('#totalBusinessDiv').hide();

    }
});

$('#lastVisitCondition2').on('change', function () {
    switch ($(this).val()) {
        case "<":
            $('#sinceDiv').show();
            $('#betweenDiv').hide();
            break;

        case "between":
            $('#betweenDiv').show();
            $('#sinceDiv').hide();
            $("#getListButton").css("margin-right", "0%");
            break;
    }
});

function getCustomerList() {
    var lGridParams = new Array();
    var lCondition = $("#condition1").val();
    if (lCondition === "CurrentPoint") {
        lGridParams.push(lCondition);
        lGridParams.push($("#balanceCondition2").val());
        lGridParams.push(parseInt($("#balanceAmount").val()));
    } else if (lCondition === "TotalInvoice") {
        lGridParams.push(lCondition);
        lGridParams.push($("#totalBusinessCondition2").val());
        lGridParams.push(parseInt($("#totalBusinessAmount").val()));
    } else if (lCondition === "Visits") {
        lGridParams.push(lCondition);
        lGridParams.push($("#noOfVisitsCondition2").val());
        lGridParams.push(parseInt($("#noOfVisitsCount").val()));
    } else if (lCondition === "LastVisit") {
        if ($("#lastVisitCondition2").val() === "<") {
            lGridParams.push(lCondition);
            lGridParams.push($("#lastVisitCondition2").val());
            lGridParams.push("'" + $("#lastVisitDate").val() + "'");
        } else if ($("#lastVisitCondition2").val() === "between") {
            lGridParams.push(lCondition);
            lGridParams.push($("#lastVisitCondition2").val());
            lGridParams.push("'" + $("#startLastVisitDate").val() + "' AND '" + $("#endLastVisitDate").val() + "'");
        }
    }
    gGridParam = lGridParams;
    var lUrl = localStorage.getItem("url") + '/QueryServlet';
    lUrl += "?baseQuery=" + gBaseQuery + " where StoreId = " + JSON.parse(localStorage.getItem("storeDetails")).StroreId;
    if (gCustomerType === "Selective") {
        lUrl += "&gridParams=" + JSON.stringify(lGridParams);
        lUrl += "&ruleNo=" + "RULE2";
        $("#customerListDiv").show();
        $("#customerList").attr("multiple", false);
        $("#customerList").attr("size", 4);
    } else if (gCustomerType === "All") {
        lUrl += "&ruleNo=" + "-";
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", false);

    }
    var lAjax = new Ajax();
    lAjax.setUrl(lUrl);
    lAjax.setSync(true);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
//        debugger;
        response = JSON.parse(response);
        gCustomerList = response;
        $("#customerNo").html(response.length);
        $("#customerList").empty();
        var dropdown = document.getElementById("customerList");
        $("#customerCount").show();
        $("#customerListDiv").show();
        if (response.length > 0) {
            for (var i in response) {
                var option = document.createElement("option");
                option.text = response[i].CustomerName + "  -  " + response[i].MobileNo;
                option.value = response[i].MobileNo + "_" + i;
                dropdown.add(option);
            }
        } else {
            var option = document.createElement("option");
            option.text = "No Customer Found";
            dropdown.add(option);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
    });
    lAjax.execute();
}

$("#customerNo").on('click', function () {
//    debugger;
    var dropdown = document.getElementById("tcustomerModalForm");
    var j = 0;
    var displaycustList = [];

    if (gCustomerList.length > 0) {
        if (gCustomerList1.length > 0)
        {
            displaycustList = gCustomerList1;
        } else {
            displaycustList = gCustomerList;
        }
        dropdown.innerHTML = "<h3><b>Name</b><b style='float:right'>Mobile no</b></h3><br>";
        for (var i in displaycustList) {
            j++;
            cust = "<label>" + j + ".   " + displaycustList[i].CustomerName + "</label><label style='float:right'>-   " + displaycustList[i].MobileNo + "</label><br>";
            dropdown.innerHTML += cust;
        }
    } else {
        cust = "<label>No Customer Selected</label>";
        dropdown.innerHTML = cust;
    }
});

function customerType(pCustomerType) {
    if (pCustomerType === "All") {
        $("#allcustomer").show();
        $("#selectiveCustomerDiv").hide();
        $("#getListButton").hide();
        $("#multisect").show();
        gCustomerType = "All";
        $("#customerList").empty();
        getCustomerList();
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", false);
    } else if (pCustomerType === "Selective") {
        $("#selectiveCustomerDiv").show();
        $("#allcustomer").hide();
        $("#getListButton").show();
        $("#multisect").hide();
        gCustomerType = "Selective";
        $("#customerList").empty();
        $("#customerListDiv").hide();
        $("#customerList").attr("multiple", true);
        $("#customerList").attr("size", 4);
    }
}
$("#customerList").on("click", function () {
    gCustomerList1 = [];
    var selectedCust = [];
//    if ($("input[name='customerT']:checked").val() === "All") {

    var selectedOpt = $(this).val();
    for (i in selectedOpt) {
        var cont = selectedOpt[i].split('_')[1];
        if (!selectedCust.includes(cont)) {
            selectedCust.push(selectedOpt[i].split('_')[1]);
        }
    }
    var gCL = [];
    var c = 0; //gCustomerList;
    for (i in gCustomerList) {
        for (var j in selectedCust) {
            if (i === selectedCust[j]) {
                gCL[c] = gCustomerList[i];
                c++;
            }
        }
    }
    gCustomerList1 = gCL;
//    }
});

function nextPage() {
//    debugger;
    var ttype = $("#templateListType").val();
    var stype = $("#templateList").val();
    var Trig = 0;
    var Trig1 = 0;
    var Trig2 = 0;
    if ((parseInt(liActive) == 1) || (parseInt(liActive) == 2)) {
        if (ttype == "") {
            Trig1 = 1;
        }
        if (stype == "") {
            Trig2 = 1;
        }
        if ((ttype == "Survey Template") && (gSelectedQuestion.length == 0)) {
            Trig = 1;
        }
    }
    if (Trig1 == 0) {
        if (Trig2 == 0) {
            if (Trig == 0) {
                var $valid = $("#wizard-1").valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                } else
                {
                    if (parseInt(liActive) < 3) {
                        if ($('li.active').attr('id') === undefined) {
                            var id = $('li.active')[2].id;
                            var livar = id.charAt(2);
                            liActive = livar;
                            var nextli = parseInt(livar) + 1;
                            $("#li" + livar).removeClass('active');
                            $("#tab" + livar).removeClass('active');
                            $("#li" + (nextli)).addClass('active');
                            $("#tab" + (nextli)).addClass('active');
                        } else {
                            liActive = $('li.active').attr('id').charAt(2);
                            if (liActive === "3") {

                            } else {
//            liActive = ltab;
                                var divActive = $('div.active').attr('id').charAt(3);
                                var liAddClass = "#li" + (parseInt(liActive) + 1);
                                $("#" + $('li.active').attr('id')).removeClass('active');
                                $(liAddClass).addClass('active');

                                $('div.active').attr('id');
                                $("#" + $('div.active').attr('id')).removeClass('active');
                                var divAddClass = "#tab" + (parseInt(divActive) + 1);
                                $(divAddClass).addClass('active');
                            }
                        }
                    }

                    if (parseInt(liActive) === 1) {
//            ltab = "2";   
//           liActive= $('li.active').attr('id').charAt(2);
                        if (flag === 0) {
                            GetAllTemplate();
                        }
                        flag = 1;

                    }
                    if (parseInt(liActive) === 2) {
                        if ($('li.active').attr('id') === undefined) {
                            var id = $('li.active')[2].id;
                            var livar = id.charAt(2);
                            ltab = livar;
//                            if ($("input[name='customerT']:checked").val() === "All") {
                            if (gCustomerList1.length !== 0) {
//                        gCustomerList = gCustomerList1;
                                $("#customerNo").html(gCustomerList1.length);
                            }
//                            }
                        } else {
//                            if ($("input[name='customerT']:checked").val() === "All") {
                            if (gCustomerList1.length !== 0) {
                                $("#customerNo").html(gCustomerList1.length);
                            }
//                            }
                            ltab = $('li.active').attr('id').charAt(2);
                        }

                        document.getElementById("questionNo").innerHTML = gSelectedQuestion.length;
                        document.getElementById("displaytemplatetype").innerHTML = $("#templateListType").val();
                        document.getElementById("modaltemplatetype").innerHTML = $("#templateListType").val();
                        summaryQuestionModal();
                        if ($("#templateListType").val() === "Survey Template") {
                            $("#questionrow").show();
                        } else {
                            $("#questionrow").hide();
                        }
                    }
                }
            } else {
                alert("Please select atleast one question for survey template!");

            }
        } else {
            $("#stErr").show();
        }
    } else {
        $("#tErr").show();
    }
}

function prevpage() {
//    debugger;
    if ($('li.active').attr('id') === undefined) {
        var id = $('li.active')[2].id;
        var livar = id.charAt(2);
        liActive = livar;
        var prevli = parseInt(livar) - 1;
        if (liActive === "1") {

        } else {
            $("#li" + livar).removeClass('active');
            $("#tab" + livar).removeClass('active');
            $("#li" + (prevli)).addClass('active');
            $("#tab" + (prevli)).addClass('active');

            ltab--;
            liActive = ltab;
        }
    } else {
        liActive = $('li.active').attr('id').charAt(2);
        if (liActive === "1") {

        } else {
            var divActive = $('div.active').attr('id').charAt(3);
            var liAddClass = "#li" + (parseInt(liActive) - 1);
            $("#" + $('li.active').attr('id')).removeClass('active');
            $(liAddClass).addClass('active');

            $('div.active').attr('id');
            $("#" + $('div.active').attr('id')).removeClass('active');
            var divAddClass = "#tab" + (parseInt(divActive) - 1);
            $(divAddClass).addClass('active');
            ltab--;
            liActive = ltab;
        }
    }

}

var checkedValue = new Array();
function checkBox() {
    gSelectedQuestion = checkedValue;
    summaryquestionmod();
    if (gSelectedQuestion.length > 0) {
        $.SmartMessageBox({
            title: "Done!",
            content: "Questions selected successfully!",
            buttons: '[OK]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "OK") {
                $('#questionModal').modal('hide');
            }
        });
    } else {
        $('#questionModal').modal('hide');
    }
}
$('.questionCheckbox').on('.checked', function () {
    $(this).css("background-color", "yellow");
});

var count = 0;
function selectqts(pid) {
//    debugger;
    var checkboxtag;

    checkboxtag = document.getElementsByClassName('questionCheckbox');
    if (checkedValue.indexOf(checkboxtag[pid.replace('_q', '')].value) !== -1)
    {
        $("#" + pid).css("background-color", "");
        count--;
        var pos = checkedValue.indexOf(checkboxtag[pid.replace('_q', '')].value);
        checkedValue.splice(pos, 1);
        $('input[name=' + pid + ']').prop('checked', false);
    } else {
        $("#" + pid).css("background-color", "#e6e6ff");
        count++;
        checkedValue.push(checkboxtag[pid.replace('_q', '')].value);
        $('input[name=' + pid + ']').prop('checked', true);

    }
    $("#opt").html(count); //selected question count
}

$('#questionModal').on('shown.bs.modal', function () {
    $('#searchinput').focus();
});

function selectqbtn() {
//    debugger;
    $("#searchinput").focus();
    if (checkedValue.length === 0) {
        $("#questionModal").modal("show");
        var lUrl = localStorage.getItem('url') + "webresources/LoyaltyWebservices/getCampaignDetailById";
        var lAjax = new Ajax();
        lAjax.setUrl(lUrl);
        lAjax.setType('post');
        lAjax.setData("-");
        lAjax.addEventListener('success', function (response) {
            $("#formQuestion").empty();
            var lHtml = "";
            response = JSON.parse(response);
            var QuestionList = gQuestionList = response.Questions;
            var QuestionIds = gQuestionIds = response.QuestionIds;
            $("#tquestioncount").html(gQuestionList.length);

            for (var i = 0; i < QuestionList.length; i++) {
                var lInput = "";
                var lHtml1 = "<div class='squestion' id='" + i + "_q' onclick='selectqts(this.id)' ><input class=\"questionCheckbox\" type=\"checkbox\" name='" + i + "_q' value= " + QuestionIds[i] + ">" + "        <span class='questiontext'>" + QuestionList[i].question + "</span><br>";
                if (QuestionList[i].questionType === "RADIO") {
                    var lInput = "<span>(radio answer)</span><br>";
                    for (var j = 1; j <= parseInt(QuestionList[i].noOfOptions); j++) {
                        var value = "s";
                        switch (j) {
                            case 1:
                                value = QuestionList[i].answer1;
                                break;
                            case 2:
                                value = QuestionList[i].answer2;
                                break;
                            case 3:
                                value = QuestionList[i].answer3;
                                break;
                            case 4:
                                value = QuestionList[i].answer4;
                                break;
                            case 5:
                                value = QuestionList[i].answer5;
                                break;
                            case 6:
                                value = QuestionList[i].answer6;
                                break;
                            case 7:
                                value = QuestionList[i].answer7;
                                break;
                            case 8:
                                value = QuestionList[i].answer8;
                                break;
                            case 9:
                                value = QuestionList[i].answer9;
                                break;
                            case 10:
                                value = QuestionList[i].answer10;
                                break;
                        }
                        lInput += "<span style=\"font-size: 16px;padding-left:1%;\">" + j + "." + value + "</span>";
                    }
                } else if (QuestionList[i].questionType === "SCALE") {
                    var lInput = "<span>(scale answer)</span><br>";
                    var td1 = "";
                    var td2 = "";
                    for (var j = 1; j <= parseInt(QuestionList[i].noOfOptions); j++) {
                        var value = "";
                        var colour = "";
                        switch (j) {
                            case 1:
                                value = QuestionList[i].answer1;
                                colour = "red";
                                break;
                            case 2:
                                value = QuestionList[i].answer2;
                                colour = "orange";
                                break;
                            case 3:
                                value = QuestionList[i].answer3;
                                colour = "yellow";
                                break;
                            case 4:
                                value = QuestionList[i].answer4;
                                colour = "yellowgreen";
                                break;
                            case 5:
                                value = QuestionList[i].answer5;
                                colour = "green";
                                break;
                            case 6:
                                value = QuestionList[i].answer6;
                                break;
                            case 7:
                                value = QuestionList[i].answer7;
                                break;
                            case 8:
                                value = QuestionList[i].answer8;
                                break;
                            case 9:
                                value = QuestionList[i].answer9;
                                break;
                            case 10:
                                value = QuestionList[i].answer10;
                                break;
                        }
                        td1 += "<th>" + value + "</th>";
                        td2 += "<td><input style='display:none;' type='radio' name='" + QuestionIds[i] + "' value='" + value + "' class='" + colour + "' id='" + QuestionIds[i] + QuestionIds[j - 1] + "radio'/><label for='" + QuestionIds[i] + QuestionIds[j - 1] + "radio' class='" + colour + "-label'></label></td>";
                    }
                    var tr1 = "<thead><tr>" + td1 + "</tr></thead>";
                    var tr2 = "<tbody><tr>" + td2 + "</tr></tbody>";
                    lInput = "<table style='margin-left: 3%;font-size: 15px'>" + tr1 + tr2 + "</table>";
                } else if (QuestionList[i].questionType === "RANGE") {
                    var lInput = "";
                    var r1 = QuestionList[i].answer1;
                    var r2 = QuestionList[i].answer2;
                    lInput += "<span>(range answer from " + r1 + " to " + r2 + ")</span>"
//                 lInput += "<span>(" + r1 + ")<input type='range' min='" + r1 + "' max='" + r2 + "' step='1' name= '" + QuestionIds[i] + "' id='ival' oninput='dval.value = ival.value'>(" + r2 + ")</span>";
                } else if (QuestionList[i].questionType === "DESCRIPTIVE") {
                    var lInput = "<span>(descriptive answer)</span>";
//                lInput += "<textarea name= '" + QuestionIds[i] + "' placeholder='Type your Answer here....' style=\"padding-left:1%;width:40%\"></textarea><br>";
                } else if (QuestionList[i].questionType === "CHECKBOX") {
                    var lInput = "<span>(checkbox answer)</span><br>";
                    for (var j = 1; j <= parseInt(QuestionList[i].noOfOptions); j++) {
                        var value = [];
                        switch (j) {
                            case 1:
                                value = QuestionList[i].answer1;
                                break;
                            case 2:
                                value = QuestionList[i].answer2;
                                break;
                            case 3:
                                value = QuestionList[i].answer3;
                                break;
                            case 4:
                                value = QuestionList[i].answer4;
                                break;
                            case 5:
                                value = QuestionList[i].answer5;
                                break;
                            case 6:
                                value = QuestionList[i].answer6;
                                break;
                            case 7:
                                value = QuestionList[i].answer7;
                                break;
                            case 8:
                                value = QuestionList[i].answer8;
                                break;
                            case 9:
                                value = QuestionList[i].answer9;
                                break;
                            case 10:
                                value = QuestionList[i].answer10;
                                break;
                        }
                        lInput += "<span style=\"font-size: 16px;padding-left:1%;\">" + j + "." + value + "</span>";
                    }
                }
                lHtml += lHtml1 + lInput + "<hr></div>";
            }
            $("#formQuestion").append(lHtml);
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
    } else {
        $("#questionModal").modal("show");
    }
}

function summaryquestionmod() {
//    debugger;
    $("#summaryquestionid").text("");
    var i = 0;
    var lInput = "";
    var QuestionList = gQuestionList;
    var QuestionIds = gQuestionIds;
    var k = 0;
    var c = 0;
    for (k = 0; k < checkedValue.length; k++) {
        for (i = 0; i < QuestionIds.length; i++) {
            if (checkedValue[k] == QuestionIds[i]) {
                c++;
                lInput += "<label>" + c + ".   " + QuestionList[i].question + "</label><br>";
            }
        }
    }
    $("#summaryquestionid").append(lInput);
}

function searchbar() {
    var input, filter, i, txtValue, questtag, txtstr, divtag;
    var count = 0;
    input = document.getElementById("searchinput");
    filter = input.value.toUpperCase();
    divtag = document.getElementsByClassName('squestion'); //div
    questtag = document.getElementsByClassName('questiontext'); //div
    for (i = 0; i < questtag.length; i++) {
        txtstr = questtag[i];
        txtValue = txtstr.textContent || txtstr.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            divtag[i].style.display = "";
            count++;
            $("#filterquestion").html(count);
        } else {
            divtag[i].style.display = "none";
        }
    }
}

function GetAllTemplate() {
    var lUrl = localStorage.getItem('url') + "webresources/LoyaltyWebservices/getAllTemplate";
    var lAjax = new Ajax();
    lAjax.setUrl(lUrl);
    lAjax.setType('post');
    lAjax.addEventListener('success', function (response) {
        response = JSON.parse(response);
        var lTemplateType = response.TemplateType;
        var lTemplates = response.AllTemplate;
        var templateListTypeDropdown = document.getElementById("templateListType");
        var j = 0;
        if (lTemplateType.length > 0) {
            for (var i in lTemplateType) {
                if (j === 0) {
                    $("#templateListType").empty();
                    j++;
                    var option = document.createElement("option");
                    option.text = "----Select Template Type----";
                    option.value = "";
                    templateListTypeDropdown.add(option);
                }
                var option = document.createElement("option");
                option.text = option.value = lTemplateType[i];
                templateListTypeDropdown.add(option);
            }
        } else {
            var option = document.createElement("option");
            option.text = "No Template Found";
            templateListTypeDropdown.add(option);
        }

        $('#templateListType').on('change', function () {
            if ($('#templateListType').val() === "Survey Template") {
                $("#questiondiv").show();
            } else {
                $("#questiondiv").hide();
            }
            var j = 0;
            var templateListDropdown = document.getElementById("templateList");
            if (lTemplates.length > 0) {
                for (var i in lTemplates) {
                    if (lTemplates[i].templateType === $('#templateListType').val()) {

                        if (j === 0) {
                            $("#templateList").empty();
                            j++;
                            var option = document.createElement("option");
                            option.text = "----Select Template----";
                            option.value = "";
                            templateListDropdown.add(option);
                        }
                        var option = document.createElement("option");
                        option.text = lTemplates[i].templateName;
                        option.value = lTemplates[i].template;
                        templateListDropdown.add(option);
                    }
                    ;
                }
            } else {
                $("#templateList").empty();
                var option = document.createElement("option");
                option.text = "No Template Found";
                templateListDropdown.add(option);
            }
            if (j === 0) {
                $("#templateList").empty();
                var option = document.createElement("option");
                option.text = "No Template Found";
                templateListDropdown.add(option);
                $('#templateMessage').val($('#templateList').val());
            }
        });


    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

$('#templateList').on('change', function () {
    $('#templateMessage').val($('#templateList').val());
    $('#summaryTemplateMessage').val($('#templateList').val());
//    document.getElementById("summaryTemplateMessage").innerHTML = $('#templateList').val();

    if ($("#templateList option:selected").text() === "Survey Template with customer benifit") {
        $("#smsAmount").show();
        $("templateMessagetemplateList").show();
    } else {
        $("#smsAmount").hide();
    }
});

function sendSMSToCustomer() {
//    debugger;
    $("#sendBtn").attr("disabled", true);
    if ($("input[name='customerT']:checked").val() === "All") {
        if (gCustomerList1.length !== 0) {
            gCustomerList = gCustomerList1;
        }
    }
    var lCondition = "";
    gGridParam.forEach(function (element) {
        lCondition += element + " ";
    });
    var lTemplateType = $("#templateListType").val();
    var lQuestionIds = "";
    if (lTemplateType === "Survey Template") {
        lQuestionIds = gSelectedQuestion;
    }
    var lQuery = gBaseQuery + " where " + lCondition;
    var lUrl = localStorage.getItem('url') + "webresources/LoyaltyWebservices/sendSMSToCustomer";
    var lData = {QuestionIds: lQuestionIds, TemplateType: lTemplateType, TemplateSubType: $("#templateList option:selected").text(), CustomerList: gCustomerList, Template: $("#templateMessage").val(), Campaign: {campaignName: $("#campaignName").val(), campaignDescription: $("#campaignDescription").val(), query: lQuery, smsType: $("#templateList  option:selected").text(), noOfCustomer: gCustomerList.length}, StoreName: JSON.parse(localStorage.getItem("storeDetails")).DBAName, StoreId: JSON.parse(localStorage.getItem("storeDetails")).StroreId.toString(), UserId: JSON.parse(localStorage.getItem("storeDetails")).UserId, MakerId: JSON.parse(sessionStorage.getItem("USER")).MAKERID};
    if ($("#templateList option:selected").text() === "Survey Template with customer benifit") {
        lData.Campaign.earnPoint = $("#earnAmount").val();
        lData.Campaign.expiryDays = $("#expiryDay").val();
    }
    var lAjax = new Ajax();
    lAjax.setUrl(lUrl);
    lAjax.setType('post');
    lAjax.setData(JSON.stringify(lData));
    lAjax.addEventListener('success', function (response) {
        response = JSON.parse(response);
        if (response.flag === true) {
            if (response.message === "Message sent successfully!") {
                var lStoreDetail = JSON.parse(localStorage.getItem("storeDetails"));
                lStoreDetail.smsRemain = response.SmsRemaining;
                localStorage.setItem("storeDetails", JSON.stringify(lStoreDetail));
                $.SmartMessageBox({
                    title: "Campaign Created & SMS Send Successfully",
                    content: "Campaign Name : " + $("#campaignName").val() + "<br> No of Customers in Campaign : " + gCustomerList.length,
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.reload();
//                        window.location = '#ui/common/forms/SMSCampaign.html';
                    }
                });
            } else if (response.message === "Plan Expired!") {
                $("#sendBtn").attr("disabled", false);
                $.SmartMessageBox({
                    title: "Cannot send SMS ! SMS PLan has expired !!! Please contact support team.",
                    buttons: '[OK]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "OK") {
                        window.location.reload();
                        window.location = '#ui/common/forms/SMSCampaign.html';
                    }
                });
            }
        } else {
            $("#sendBtn").attr("disabled", false);
            $.SmartMessageBox({
                title: "Something went wrong.",
                buttons: '[OK]'
            }, function () {
            });
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}

function summaryQuestionModal() {
    $("#customerModalList").empty();
    var lHtml = "";
    var QuestionList = gQuestionList;
    var QuestionIds = gQuestionIds;
    var k = 0;
    for (var i = 0; i < QuestionList.length; i++) {
        if (parseInt(gSelectedQuestion[k]) === QuestionIds[i]) {
            k++;
            var lInput = "";
            var lHtml1 = "<span>" + k + ".        " + QuestionList[i].question + "</span><br>";
            if (QuestionList[i].questionType === "RADIO") {

                for (var j = 1; j <= parseInt(QuestionList[i].noOfOptions); j++) {
                    var value = "";
                    switch (j) {
                        case 1:
                            value = QuestionList[i].answer1;
                            break;
                        case 2:
                            value = QuestionList[i].answer2;
                            break;
                        case 3:
                            value = QuestionList[i].answer3;
                            break;
                        case 4:
                            value = QuestionList[i].answer4;
                            break;
                        case 5:
                            value = QuestionList[i].answer5;
                            break;
                        case 6:
                            value = QuestionList[i].answer6;
                            break;
                        case 7:
                            value = QuestionList[i].answer7;
                            break;
                        case 8:
                            value = QuestionList[i].answer8;
                            break;
                        case 9:
                            value = QuestionList[i].answer9;
                            break;
                        case 10:
                            value = QuestionList[i].answer10;
                            break;
                    }
                    lInput += "<span style=\"font-size: 16px;padding-left:1%;\">" + value + "</span><br>";
                }
            } else if (QuestionList[i].questionType === "SCALE") {
                var lInput = "";
                var td1 = "";
                var td2 = "";
                for (var j = 1; j <= parseInt(QuestionList[i].noOfOptions); j++) {
                    var value = "";
                    var colour = "";
                    switch (j) {
                        case 1:
                            value = QuestionList[i].answer1;
                            colour = "red";
                            break;
                        case 2:
                            value = QuestionList[i].answer2;
                            colour = "orange";
                            break;
                        case 3:
                            value = QuestionList[i].answer3;
                            colour = "yellow";
                            break;
                        case 4:
                            value = QuestionList[i].answer4;
                            colour = "yellowgreen";
                            break;
                        case 5:
                            value = QuestionList[i].answer5;
                            colour = "green";
                            break;
                        case 6:
                            value = QuestionList[i].answer6;
                            break;
                        case 7:
                            value = QuestionList[i].answer7;
                            break;
                        case 8:
                            value = QuestionList[i].answer8;
                            break;
                        case 9:
                            value = QuestionList[i].answer9;
                            break;
                        case 10:
                            value = QuestionList[i].answer10;
                            break;
                    }
                    td1 += "<th>" + value + "</th>";
                    td2 += "<td><input style='display:none;' type='radio' name='" + QuestionIds[i] + "' value='" + value + "' class='" + colour + "' id='" + QuestionIds[i] + QuestionIds[j - 1] + "radio'/><label for='" + QuestionIds[i] + QuestionIds[j - 1] + "radio' class='" + colour + "-label'></label></td>";
                }
                var tr1 = "<thead><tr>" + td1 + "</tr></thead>";
                var tr2 = "<tbody><tr>" + td2 + "</tr></tbody>";
                lInput = "<table style='margin-left: 3%;font-size: 15px'>" + tr1 + tr2 + "</table>";
            }

            lHtml += lHtml1 + lInput + "<hr>";
        }
    }
    $("#customerModalList").append(lHtml);
}
$("#customerList").mousedown(function (e) {

    e.preventDefault();
    var scroll = this.scrollTop;

    e.target.selected = !e.target.selected;

    setTimeout(function () {
        this.scrollTop = scroll;
    }, 0);

    $(this).focus();

}).mousemove(function (e) {
    e.preventDefault();
});

function addtextarea() {

//    $("#ansrow").("")
    var c = $("#noOfOptions").val();
    for (i = 1; i <= c; i++)
    {
        $("#answer" + i).show();
    }
}

$('#questionType').on('click', function () {
    if ($("input[name=opt]:checked").val() === "RADIO" || $("input[name=opt]:checked").val() === "CHECKBOX")
    {
        $("#rangerow").hide();
        $("#optionrow").show();
        $("#ansrow").css('display', 'none');
    } else if ($("input[name=opt]:checked").val() === "RANGE")
    {
        $("#rangerow").show();
        $("#optionrow").css('display', 'none');
        $("#ansrow").css('display', 'none');
    } else
    {
        $("#rangerow").hide();
        $("#optionrow").css('display', 'none');
        $("#ansrow").css('display', 'none');
    }
});

$("#question").keypress(function () {
    $("#qterror").hide();
});
$("input[name=opt]").on('change', function () {
    $("#typeerror").hide();
});
$("#noOfOptions").keypress(function () {
    $("#opterror").hide();
    $("#ansrow").hide();
});

function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault)
            theEvent.preventDefault();
    }
}

function checkT(value) {
    var type = $("#" + value).val();
    if (type == "") {
        if (value == "templateListType") {
            $("#tErr").show();
        } else {
            $("#stErr").show();
        }
    } else {
        if (value == "templateListType") {
            $("#tErr").hide();
        } else {
            $("#stErr").hide();
        }
    }
}
