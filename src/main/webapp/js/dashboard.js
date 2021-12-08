
getMyBalanceDashboard();
createLoyaltyChart();
// ;
var DateRangepickerSelected = false;
var DateRangepickerSelected1 = false;
$(document).ready(function () {
    DateRangepickerSelected = true;
    DateRangepickerSelected1 = true;
//    if (dashboardMenuClick === true)
//    {
//    getMyBalanceDashboard();
//    }
//    createLoyaltyChart();
});

function createLoyaltyChart() {
   
    dashboardMenuClick = true;
    getCurrDate();

    var end = moment().add(1, "days");
    var d = new Date(end);
    var start = moment("01-01-" + d.getFullYear(), "DD-MM-YYYY");
    var toDate = new Date();
    var m = '' + toDate.getMonth() + 1;
    if (m.length < 2) {
        m = '0' + m;
    }
    var da = '' + toDate.getDate();
    if (da.length < 2) {
        da = '0' + da;
    }
//    var toDate1 = moment(da + "-" + m + "-" + toDate.getFullYear(), "DD-MM-YYYY");
    cb(start, end);
    var lDate1 = currDate;
    lCurrentDate = lDate1;
    var d = new Date();
    lStartDate = d.getFullYear() + '-01-01 ';// + lDate1[1];
    var lStoreJSON = localStorage.getItem("storeDetails");
    lSelectedStore = JSON.parse(lStoreJSON);
    arr1 = new Array();
    arr1.push(lSelectedStore.StroreId).toString();
    arr1.push(lStartDate);
    arr1.push(lCurrentDate);
    if (DateRangepickerSelected1 === true) {
        loadCharts(arr1);
        $("#repeatPurchaseSection").show();
    }
}


function getMyBalanceDashboard() {
   
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getMyBalance?data=";
    var lUserData = {};
    var lUserId;
    var getData = sessionStorage.getItem("USER");
    lUserData = JSON.parse(getData);
    if (lUserData.userType === 'MANAGER')
    {
        lUserId = lUserData.addedBy;
    } else
    {
        lUserId = lUserData.userId;
    }

    var lData = {UserId: lUserId};
    var json = JSON.stringify(lData);
    url = url + json;
    var lAjax = new Ajax();
    lAjax.setUrl(url);
    lAjax.setType('get');
    lAjax.setSync(true);
    lAjax.addEventListener('success', function (response) {

        var lStoreData = localStorage.getItem("storeDetails");
        var lStore = JSON.parse(lStoreData);
        var lSmsBalanceDetails = JSON.parse(response);
//        var lNewStoreData = $.extend(lStore, {daysCount: lSmsBalanceDetails.daysCount});

        var lSmsRemain = Number(lStore.smsRemain);
        var lDailyCustomerCount = Number(lStore.currentCustomerCount);
        var lRepeateCustomerCount = Number(lStore.repeateCustomerCount);
        var lSmsUsed = Number(lSmsBalanceDetails.SmsAllowed) - Number(lSmsRemain);
        lSmsRemain1 = Number(lStore.smsRemain);
        lSmsUsed1 = Number(lSmsBalanceDetails.SmsAllowed) - Number(lSmsRemain);
        $('#paidAmount').text((Number(lStore.cardOrCash)).toLocaleString('hi-IN'));
        $('#totalBusiness').text((Number(lStore.totalBusiness)).toLocaleString('hi-IN'));
        $('#repeatCustomer').text(lRepeateCustomerCount);
        $('#earnedCounter').text((Number(lStore.earnedPoints)).toLocaleString('hi-IN'));
        $('#burnedCounter').text((Number(lStore.burnedPoints)).toLocaleString('hi-IN'));
        $('#totalCustomer').text(lDailyCustomerCount);
        $('#balanceSMS').text(lSmsRemain);
        $('#usedSMS').text(lSmsUsed);
        if (DateRangepickerSelected1 === false) {
            createLoyaltyChart();
        } else {
            DateRangepickerSelected1 === false;
        }
//       window.location.href = 'index.html#ui/common/dashboard/dashboard.html';

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}



function getCurrDate() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    var month = '' + (d.getMonth() + 1);
    var day = '' + (d.getDate());
    var year = '' + d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    var lCurrdate = year + '-' + month + '-' + day;
    var lCurrMeridian = '';
    var lCurrHour = '';
    if (d.getHours() < 12) {
        lCurrHour = d.getHours();
        lCurrMeridian = 'AM';
    } else {
        lCurrHour = d.getHours() - 12;
        lCurrMeridian = 'PM';
    }
    var lCurrTime = lCurrHour + ':' + d.getMinutes() + ':' + d.getSeconds();
    var arr1 = [lCurrdate];
    currDate = arr1.join(' ');
}

function loadCharts(arr)
{
    
//     $('#reportrange span').html(arr[1].format('MMMM D, YYYY') + ' - ' + arr[1].format('MMMM D, YYYY'));
    var arr1 = new Array();
    arr1.push(arr[0]);
    var lChart2D = new Chart();
    var lChart2DConfig = {
        type: 'MSColumn2D',
        renderAt: 'container1',
        width: '100%',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "useellipseswhenoverflow": "1",
//                    "caption": "Monthly Sales",
                "xaxisname": "Months",
                "yaxisname": "Amount",
                "bgcolor": "FFFFFF",
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
    var lChartCode1 = {data: {'chartCode': 'CHART2', 'gridParams': arr}};
    lChart2D.setChartCode(JSON.stringify(lChartCode1));
    lChart2D.setChartType("MSColumn2D");
    lChart2D.setConfig(lChart2DConfig);
    lChart2D.setContainer("container1");
    lChart2D.render();
    loadCustomerCharts(arr);
}

function loadCustomerCharts(arr)
{
    var arr1 = new Array();
    arr1.push(arr[0]);
    var lChart2D = new Chart();
    var lChart2DConfig = {
        type: 'MSColumn2D',
        renderAt: 'Custcontainer1',
        width: '100%',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "useellipseswhenoverflow": "1",
                "caption": "Enrolled Cusomer",
                "xaxisname": "Months",
                "yaxisname": "Count",
                "bgcolor": "FFFFFF",
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
    var lChartCode1 = {data: {'chartCode': 'CHART7', 'gridParams': arr}};
    lChart2D.setChartCode(JSON.stringify(lChartCode1));
    lChart2D.setChartType("MSColumn2D");
    lChart2D.setConfig(lChart2DConfig);
    lChart2D.setContainer("Custcontainer1");
    lChart2D.render();
    getPurhaseRate(arr);


}

function  getPurhaseRate(arr)
{
    var lDataEarnBurnVoid = {};
    lDataEarnBurnVoid = {"storeId": arr[0].toString(), "StartDate": arr[1], "EndDate": arr[2], "All": "false"};
    var json = JSON.stringify(lDataEarnBurnVoid);
    var lurl = localStorage.getItem("url") + "webresources/LoyaltyWebservices/GetAllDetailsByStoreId";
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('post');
    lAjax.setData(json);
    lAjax.setSync(true);
    lAjax.addEventListener('success', function (response) {
        
        var res = JSON.parse(response);
        console.log(res);
        $("#onlyOneTime").text(res.OnlyOneTime);
        $("#moreThenOne").text(res.MoreThenOne);
        var rate = parseFloat(parseFloat(res.MoreThenOne) / parseFloat(res.CustomerCount) * 100).toFixed(2);
        if (rate !== undefined && rate !== "NaN")
        {

            $("#repeatRate").text(rate + "%");
        } else {
            $("#repeatRate").text("0" + "%");
        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();

}



function firstDailysales()
{


    var lTodayDate = new Date();
    var ltodayMonth = (lTodayDate.getMonth() + 1).toString();
    if (ltodayMonth.length < 2)
        ltodayMonth = '0' + ltodayMonth;

    var ltodayYear = lTodayDate.getFullYear().toString();
    var lFormat = (ltodayYear + "-" + ltodayMonth).toString();
    document.getElementById('theDate').value = lFormat;

    var ltodayMonth1 = lTodayDate.getMonth();
    var ltodayYear1 = lTodayDate.getFullYear();

    var FirstDay = new Date(ltodayYear1, ltodayMonth1);
    var LastDay = new Date(ltodayYear1, ltodayMonth1 + 1, 0);

    var lFirstDay = FirstDay.getDate().toString();
    if (lFirstDay.length < 2)
        lFirstDay = '0' + lFirstDay;
    var lcurrmonth = (FirstDay.getMonth() + 1).toString();
    if (lcurrmonth.length < 2)
        lcurrmonth = '0' + lcurrmonth;

    var lcurryear = FirstDay.getFullYear().toString();
    var lNewFirstDay = lcurryear + "-" + lcurrmonth + "-" + lFirstDay;

    var ltodayday = LastDay.getDate().toString();
    if (ltodayday.length < 2)
        ltodayday = '0' + ltodayday;
    var ltodaymonth = (LastDay.getMonth() + 1).toString();
    if (ltodaymonth.length < 2)
        ltodaymonth = '0' + ltodaymonth;

    var ltodayyear = LastDay.getFullYear().toString();

    var lNewLastDay = ltodayyear + '-' + ltodaymonth + '-' + ltodayday;
    var lStoreJSON = localStorage.getItem("storeDetails");
    lSelectedStore = JSON.parse(lStoreJSON);
    var ldataArray1 = new Array();
    ldataArray1.push(lSelectedStore.StroreId).toString();
    ldataArray1.push(lNewFirstDay);
    ldataArray1.push(lNewLastDay);

    var lChartLine = new Chart();
    var lChartLineConfig = {
        type: 'msline',
        renderAt: 'container3',
        width: '100%',
        //height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                //"labeldisplay": "auto",
                "useellipseswhenoverflow": "1",
                "caption": "Daily Sales",
                "xaxisname": "Date-Wise",
                "yaxisname": "Amount",
                "bgcolor": "FFFFFF",
                "showvalues": "0",
                "plotgradientcolor": "",
                "placevaluesinside": "1",
                "showalternatehgridcolor": "0",
                "showplotborder": "0",
                "divlinecolor": "CCCCCC",
                "canvasborderalpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#cc3300",
                "crossLineAlpha": "100",
                "theme": "fint"
            }
        }
    };
    var lChartCode1 = {data: {'chartCode': 'CHART3', 'gridParams': ldataArray1}};
    lChartLine.setChartCode(JSON.stringify(lChartCode1));
    lChartLine.setChartType("msline");
    lChartLine.setConfig(lChartLineConfig);
    lChartLine.setContainer("container3");
    lChartLine.render();

}


function loadPie()
{

    var arr1 = new Array();
    arr1.push(arr2[0]);

    var lChart2 = new Chart();
    var lChart2Config = {
        type: 'pie3d',
        renderAt: 'container2',
        width: '100%',
        height: '289px',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Customer enrollment by gender diversity",
//                   

                "labeldisplay": "auto",
                "numberPrefix": "",
                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "use3DLighting": "1",
                "showShadow": "0",
                "enableSmartLabels": "1",
                "startingAngle": "310",
                "showLabels": "1",
                "showPercentValues": "0",
                "showLegend": "1",

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
        }
    };
    var lChartCode = {data: {'chartCode': 'CHART1', 'gridParams': arr1}};
    lChart2.setChartCode(JSON.stringify(lChartCode));
    lChart2.setChartType("pie3d");
    lChart2.setConfig(lChart2Config);
    lChart2.setContainer("container2");
    lChart2.render();


    FusionCharts.ready(function () {

        var fusioncharts = new FusionCharts({
            type: 'pie3d',
            renderAt: 'container4',
            width: '100%',
            height: '300px',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "caption": "SMS Statistics",
                    "formatnumberscale": "0",
                    "showborder": "0",
                    "paletteColors": "#FE3313,#008000",
                    "bgColor": "#ffffff",
                    "showBorder": "0",
//                    "use3DLighting": "1",
                    "showShadow": "0",
                    "enableSmartLabels": "1",
                    "startingAngle": "310",
                    "showLabels": "1",
                    "showPercentValues": "0",
                    "showLegend": "1",

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
                },
                "data": [{
                        "label": "Used",
                        "value": lSmsUsed1
                    }, {
                        "label": "Remaining",
                        "value": lSmsRemain1
                    }]
            }
        }
        );
        fusioncharts.render();
    });

}

function BirthdayAnniversaryDetails()
{
    var lStoreJSON = localStorage.getItem("storeDetails");
    var lSelectedStore = JSON.parse(lStoreJSON);

    //start code for creating BirthDate Listview
    var list2 = new List();
    list2.setViewCode("ENQ515");
    list2.setRowSelectable(true);
    list2.setServerPaging(true);
    list2.setColumnFilter(true);
    list2.setSearchable(true);
    list2.setTargetNode(document.getElementById('BirthdateDetail'));
    var lSearchParamArray2 = new Array();
    var lSearchParam2 = new SearchParam();
    lSearchParam2.setIndex(0);
    lSearchParam2.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray2.push(lSearchParam2);
    list2.setSeachParam(lSearchParamArray2);
    list2.render();
    //End code for creating BirthDate Listview

    //start code for creating Anniversary ListView
    var list3 = new List();
    list3.setViewCode("ENQ516");
    list3.setRowSelectable(true);
    list3.setServerPaging(true);
    list3.setColumnFilter(true);
    list3.setSearchable(true);
    list3.setTargetNode(document.getElementById('Anniversary'));
    var lSearchParamArray3 = new Array();
    var lSearchParam3 = new SearchParam();
    lSearchParam3.setIndex(0);
    lSearchParam3.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray3.push(lSearchParam3);
    list3.setSeachParam(lSearchParamArray3);
    list3.render();
}

function getTheDays() {
    // THE DATE OBJECT.

    var dt = new Date(document.getElementById('theDate').value);

    // GET THE MONTH AND YEAR OF THE SELECTED DATE.
    var month = dt.getMonth(),
            year = dt.getFullYear();

    // GET THE FIRST AND LAST DATE OF THE MONTH.
    var FirstDay = new Date(year, month, 1);
    var LastDay = new Date(year, month + 1, 0);


    var lFirstDay = FirstDay.getDate().toString();
    if (lFirstDay.length < 2)
        lFirstDay = '0' + lFirstDay;
    var lcurrmonth = (FirstDay.getMonth() + 1).toString();
    if (lcurrmonth.length < 2)
        lcurrmonth = '0' + lcurrmonth;

    var lcurryear = FirstDay.getFullYear().toString();
    var lNewFirstDay = lcurryear + "-" + lcurrmonth + "-" + lFirstDay;

    var ltodayday = LastDay.getDate().toString();
    if (ltodayday.length < 2)
        ltodayday = '0' + ltodayday;
    var ltodaymonth = (LastDay.getMonth() + 1).toString();
    if (ltodaymonth.length < 2)
        ltodaymonth = '0' + ltodaymonth;
    var ltodayyear = LastDay.getFullYear().toString();
    var lNewLastDay = ltodayyear + '-' + ltodaymonth + '-' + ltodayday;
    var lStoreJSON = localStorage.getItem("storeDetails");
    lSelectedStore = JSON.parse(lStoreJSON);
    var ldataArray = new Array();
    ldataArray.push(lSelectedStore.StroreId).toString();
    ldataArray.push(lNewFirstDay);
    ldataArray.push(lNewLastDay);
    LoadDailySales(ldataArray);

}
function LoadDailySales(ldataArray)
{
    var lChartLine = new Chart();
    var lChartLineConfig = {
        type: 'msline',
        renderAt: 'container3',
        width: '100%',
        //height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                //"labeldisplay": "auto",
                "useellipseswhenoverflow": "1",
                "caption": "Daily Sales",
                "xaxisname": "Date-Wise",
                "yaxisname": "Amount",
                "bgcolor": "FFFFFF",
                "showvalues": "0",
                "plotgradientcolor": "",
                "placevaluesinside": "1",
                "showalternatehgridcolor": "0",
                "showplotborder": "0",
                "divlinecolor": "CCCCCC",
                "canvasborderalpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#cc3300",
                "crossLineAlpha": "100",
                "theme": "fint"
            }
        }
    };
    var lChartCode1 = {data: {'chartCode': 'CHART3', 'gridParams': ldataArray}};
    lChartLine.setChartCode(JSON.stringify(lChartCode1));
    lChartLine.setChartType("msline");
    lChartLine.setConfig(lChartLineConfig);
    lChartLine.setContainer("container3");
    lChartLine.render();
}
$('#reportrange').daterangepicker({

//                                            startDate: start,

    endDate: function () {

        var today = new Date();
        var end = new Date().setDate(today.getDate() + 1);
        return end;
        console.log(end);
    },
    ranges: {

        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        'Last 3 Month': [moment().subtract(3, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
}, cb);
function cb(start, end) {
    
    arr2 = new Array();
    var s = start.format('YYYY-MM-DD');
    var lStoreJSON = localStorage.getItem("storeDetails");
    lSelectedStore = JSON.parse(lStoreJSON);
    //s=s+"T00:00:00";
    arr2.push(lSelectedStore.StroreId).toString();
    arr2.push(s.toString());
    var e = end.format('YYYY-MM-DD');
    //var e=e+"T23:59:59";
    arr2.push(e.toString());
    if (DateRangepickerSelected === true) {
//        end = moment().subtract(0, "days");
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        loadCharts(arr2);
//        DateRangepickerSelected = false;
    } else {
        end = moment().subtract(0, "days");
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        loadCharts(arr2);
        $("#repeatPurchaseSection").show();
    }
}