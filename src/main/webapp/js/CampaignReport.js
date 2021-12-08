/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var lStoreId = localStorage.getItem("storeId");
var lCampaignId = 0;
var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/";
var lquestionType = [];
var lquestionIds = [];
var lflag = [];
var totalcust = 0;
var respcust = 0;

$("text").css("font-weight", "bold");
function OnLoad()
{
//    debugger;
//    $("#createQuestions").remove();
//    lCampaignId = 0;
    lCampaignId = dataParam.getData('id');
    loadPieChart();
    totalcount();
//    document.getElementById("totalcustomer").innerHTML=totalcust;
}


function Listview(flag) {
//    debugger;
    var Flag = "";
    if (flag === "Not Responded") {
        Flag = 0;
    } else {
        Flag = 1;
    }
//    var lCriteria = "StoreId = " + 9 + "and FLAG = '" + flag + "'";
    var list = new List();
    list.setViewCode("ENQ524");
    localStorage.setItem("enqCode", list.getViewCode());
    list.setServerPaging(true);
    list.setSearchable(true);
    list.setTargetNode(document.getElementById('data-table'));
//    list.setCriteria(lCriteria);

    var lSearchParamArray = new Array();
    var lSearchParam = new SearchParam();
    lSearchParam.setIndex(0);
    lSearchParam.setValue("" + lCampaignId);
    lSearchParamArray.push(lSearchParam);
    var lSearchParam = new SearchParam();
    lSearchParam.setIndex(1);
    lSearchParam.setValue("" + Flag);
    lSearchParamArray.push(lSearchParam);
    var lSearchParam = new SearchParam();
    lSearchParam.setIndex(2);
    lSearchParam.setValue("" + lStoreId);
    lSearchParamArray.push(lSearchParam);
    list.setSeachParam(lSearchParamArray);
    list.render();

    $("#response").show();
}

function totalcount() {
    var lurl = url + 'getCampaignStatistics';
    var lData = {"CampaignId": lCampaignId,"storeId":lStoreId};
    var json = JSON.stringify(lData);
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('post');
    lAjax.setData(json);
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true) {
//            debugger;
//             lflag =res.AllData;
            var rcust = 0;
            for (var i = 0; i < res.AllData.length; i++)
            {
                lflag[i] = res.AllData[i].flag;
                if (lflag[i] === 1)
                {
                    rcust++;
                }

            }
            respcust = rcust;
            totalcust = res.AllData.length;

        } else {
            smallAlertFailure("Search failed", function () {}, 2000);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();

}

function loadPieChart()
{
//    debugger;
    totalcount();
    var arr1 = new Array();
    arr1.push(lCampaignId);
    arr1.push(lStoreId);

    var lChart2 = new Chart();
    var lChart2Config = {
        type: 'pie3d',
        renderAt: 'container',
        width: '100%',
        height: '289px',
        dataFormat: 'json',

        dataSource: {
            "chart": {
                "caption": "Response Chart",
                "labeldisplay": "auto",
                "numberPrefix": "",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
//                "bgColor": "#ffffff",
//                "showBorder": "0",
                "use3DLighting": "1",
                "showShadow": "0",
                "enableSmartLabels": "1",
                "startingAngle": "310",
                "showLabels": "1",
                "showPercentValues": "0",
                "showLegend": "1",
                "showBorder": "1",
                "borderColor": "#666666",
                "borderThickness": "2",
                "bgColor": "EEEEEE,CCCCCC",
                "bgratio": "60,40",
                "bgAlpha": "70,80",
                "bgAngle": "180",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "theme": "fint"
            }
        },
        "events": {
            "dataPlotClick": function (eventObj, dataObj) {
                document.getElementById("headerName").innerHTML = dataObj.toolText.split(",")[0];
                Listview(dataObj.toolText.split(",")[0]);
            }
        }};
    var lChartCode = {data: {'chartCode': 'CHART4', 'gridParams': arr1}};
    lChart2.setChartCode(JSON.stringify(lChartCode));
    lChart2.setChartType("pie3d");
    lChart2.setConfig(lChart2Config);
    lChart2.setContainer("container");
    lChart2.render();

}

function questionList() {
    $("#response").hide();
//    debugger;
    var lurl = url + 'questionListByCampaignId';
    var lData = {"CampaignId": lCampaignId,storeId:lStoreId};
//    var lData res.flag = {"data": {"CampaignId": lCampaignId}};
    var json = JSON.stringify(lData);
//    lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('post');
    lAjax.setData(json);
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
        if (res.flag === true) {
            var lQuestionResponse = [];
            var lQuestions = [];
            for (var i = 0; i < res.Questions.length; i++) {
                var lQuestionList = [];
                lQuestionList.push(res.Questions[i].question);
//                lQuestionList.push(res.QuestionIds[i].questionId);
//                lQuestionList.push(res.QuestionResponse[res.QuestionIds[i].questionId]);
//                lQuestionList.push(res.QuestionResponse[res.QuestionIds[i].questionId[1]]);
                lquestionType[i] = res.Questions[i].questionType;
                lQuestions.push(lQuestionList);
                lquestionIds[i] = res.QuestionIds[i].questionId;

                lQuestionResponse.push(res.QuestionResponse[res.QuestionIds[i].questionId]);
            }
            createQuestion(lquestionIds, lQuestions, lQuestionResponse);
        } else {
            smallAlertFailure("Search failed", function () {}, 2000);
        }
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();

}

function createQuestion(lQuestionId, lQuestions, lQuestionResponse) {
//    questionChart1();
//    debugger;
    for (var i = 0; i < lQuestions.length; i++) {
        var lHtml = "<div class=\"row\">" +
                "<section class=\"col-sm-6\" style='width: 44%;padding-left: 40px'>" +
//                "<div class=\"input-group\" id=\"question_\"" + i + ">" +
////                (i + 1) + ") " + lQuestionList[i] +
//                "</div>" +
                "</section>" +
                "<section class=\"col-sm-12\" >" +
                "<div id=\"container" + (i + 1) + "\"></div>" +
                "</section>";
        $("#createQuestions").before(lHtml);
        if (lquestionType[i] === "DESCRIPTIVE") {

            descriptiveAnswerModal((i + 1), lQuestions[i], lquestionIds[i]);
        } else if (lquestionType[i] === "CHECKBOX")
        {
            checkboxBarGraph((i + 1), lQuestionId[i], lQuestions[i],lQuestionResponse[i]);
        } else {
            questionChart1((i + 1), lQuestions[i], lQuestionResponse[i]);
        }
    }
}
function descriptiveAnswerModal(i, lQuestion, qid) { 
//    debugger;
    var lLabel = "";
    var lHtml = "";
    if (respcust > 0) {
//   var lsect1="<section class='col-sm-6' style='font-size:150%'>Total Customer:"+tcust +"</section>";
        var atag = "<a onclick='modalopen(" + qid + ",\"" +lQuestion+"\")' style='text-decoration: underline;font-size:smaller'> CLick Here To display result</a>";
        var lsect1 = "<section class='col-sm-12' style='font-size:130%;text-align:center'><b>Customer Responded:(" + respcust + "/" + totalcust + ")</b><br>" + atag + "</section>";
        lLabel = "<h4 style='text-align:center;font-size: 122%;font-weight: bolder;margin-top: 1.5%;font-family: Verdana, sans;margin-bottom: 4%;'> "
                + i + ") " + lQuestion + "</h4><div class='row'>" + lsect1 + "</div>";
        lHtml = "<div style='background-color: #fafafa;border: 2px solid;padding: 10%;padding-top: 1%;height: 175px;background-image: linear-gradient(90deg, #ccccccc7, #fafafa);'>"
                + lLabel + "</div>";
        $("#container" + i).append(lHtml);
    } else {
        $("#container" + i).text(i + ") " + lQuestion).css("bold");
        var qdiv = document.getElementById('container' + i);
        qdiv.setAttribute("style", "border: solid black 2px; text-align:center;padding: 5%;font-weight:600;font-size:130%");
        $("#container" + i).append("<br><b style='color:grey'>----No Response given by customer yet!----</b>");
    }
}

function modalopen(qid,lQuestion) {
//    debugger;
    var lQuestionId = qid;

    var list1 = new List();
    list1.setViewCode("ENQ526");
    localStorage.setItem("enqCode", list1.getViewCode());
    list1.setServerPaging(true);
    list1.setSearchable(true);
    list1.setTargetNode(document.getElementById('data-table1'));

    var lSearchParamArray1 = new Array();
    var lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(0);
    lSearchParam1.setValue("" + lCampaignId);
    lSearchParamArray1.push(lSearchParam1);
    var lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(1);
    lSearchParam1.setValue("" + lQuestionId);
    lSearchParamArray1.push(lSearchParam1);
    var lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(2);
    lSearchParam1.setValue("" + lStoreId);
    lSearchParamArray1.push(lSearchParam1);
    list1.setSeachParam(lSearchParamArray1);
    list1.render();
//    $("#decriptivemodal").show();
    $("#decriptivemodal").modal();
    $("#descQt").text(lQuestion);
}

function questionChart1(i, lQuestions, lQuestionResponse)
{
    var lConfig = {
        type: 'doughnut3d',
        renderAt: 'container' + i,
        width: '100%',
        height: '300px',
        dataFormat: 'json',
        label: {
            "fontWeight": "bold"
        },
        dataSource: {
            "chart": {
                "caption": i + ") " + lQuestions,
                "formatnumberscale": "0",
//                "showborder": "0",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
//                    "bgColor": "#ffffff",
//                    "showBorder": "0",
                "use3DLighting": "1",
                "showShadow": "0",
                "enableSmartLabels": "1",
                "startingAngle": "310",
                "showLabels": "1",
                "showPercentValues": "1",
                "showLegend": "1",
                "showBorder": "1",
                "borderColor": "#666666",
                "borderThickness": "2",
                "bgColor": "EEEEEE,CCCCCC",
                "bgratio": "60,40",
                "bgAlpha": "70,80",
                "bgAngle": "180",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5",
                "theme": "fusion",
                "fontWeight": "bold",

            }

        }
    };
    if (lQuestionResponse.length > 0) {
        lConfig.dataSource.data = lQuestionResponse;
        new FusionCharts(lConfig).render();
    } else if (lQuestionResponse.length === 0) {
//        lConfig.dataSource.data = {"label": "No response", "value": 1};
//        new FusionCharts(lConfig).render();
//       lConfig.dataSource.data = lQuestionResponse;

        $("#container" + i).text(i + ") " + lQuestions).css("bold");
        var qdiv = document.getElementById('container' + i);
        qdiv.setAttribute("style", "border: solid black 2px; text-align:center;padding: 5%;font-weight:600;font-size:130%");
        $("#container" + i).append("<br><b style='color:grey'>----No Response given by customer yet!----</b>");
    }
}

function checkboxBarGraph(i, lQuestionId, lQuestions,lQuestionResponse) {

    var lQuestionArray = new Array();
    lQuestionArray.push(lCampaignId);
    lQuestionArray.push(lQuestionId);
    var lChart2D = new Chart();
    var lChart2DConfig = {
        type: 'MSColumn2D',
        renderAt: 'container' + i,
        width: '100%',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": i + ") " + lQuestions,
                "formatnumberscale": "0",
                "useellipseswhenoverflow": "1",
                "xaxisname": "ANSWERS",
                "yaxisname": "CUSTOMER COUNT",
                "bgcolor": "EEEEEE",
                "showBorder": "1",
                "borderColor": "#666666",
                "borderThickness": "2",
                "showvalues": "0",
                "plotgradientcolor": "",
                "placevaluesinside": "1",
                "showalternatehgridcolor": "0",
                "showplotborder": "0",
                "divlinecolor": "CCCCCC",
                "canvasborderalpha": "0",
                "drawCrossLine": "1",
                "crossLineAlpha": "100",
                "theme": "fint"
            }
        }
    };
    if(lQuestionResponse.length > 0){
    var lChartCode1 = {data: {'chartCode': 'CHART6', 'gridParams': lQuestionArray}};
    lChart2D.setChartCode(JSON.stringify(lChartCode1));
    lChart2D.setChartType("MSColumn2D");
    lChart2D.setConfig(lChart2DConfig);
    lChart2D.setContainer("container" + i);
    lChart2D.render();
    }else{
        $("#container" + i).text(i + ") " + lQuestions).css("bold");
        var qdiv = document.getElementById('container' + i);
        qdiv.setAttribute("style", "border: solid black 2px; text-align:center;padding: 5%;font-weight:600;font-size:130%");
        $("#container" + i).append("<br><b style='color:grey'>----No Response given by customer yet!----</b>");
    }
}