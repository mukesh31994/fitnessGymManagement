$(document).ready(function () {
    var list = '';
    var list4 = '';
    var lcurrdate12 = '';
    var lStoreJSON = localStorage.getItem("storeDetails");
    var lSelectedStore = JSON.parse(lStoreJSON);
    
    getReportCurrDate();
    function getReportCurrDate()
    {
        var d = new Date();
        d.setDate(d.getDate());
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
        var arr1 = [lCurrdate, lCurrTime, lCurrMeridian];
        lcurrdate12 = arr1.join(' ');
        return lcurrdate12;

    }
    var lcurrDate = new Date(lcurrdate12);
    var lcurrday = lcurrDate.getDate().toString();
    if (lcurrday.length < 2)
        lcurrday = '0' + lcurrday;
    var lcurrmonth = (lcurrDate.getMonth() + 1).toString();
    if (lcurrmonth.length < 2)
        lcurrmonth = '0' + lcurrmonth;

    var lcurryear = lcurrDate.getFullYear().toString();
    var lstartCurrDate = lcurryear + "-" + lcurrmonth + "-" + lcurrday + " 00:00:01";

    var ltodaydate = new Date();
    var ltodayday = ltodaydate.getDate().toString();
    if (ltodayday.length < 2)
        ltodayday = '0' + ltodayday;
    var ltodaymonth = (ltodaydate.getMonth() + 1).toString();
    if (ltodaymonth.length < 2)
        ltodaymonth = '0' + ltodaymonth;

    var ltodayyear = ltodaydate.getFullYear().toString();

    var formatDate = ltodayyear + '-' + ltodaymonth + '-' + ltodayday + " 23:59:59";

    list = new List();
    list.setViewCode("ENQ513");
    list.setRowSelectable(true);
    list.setServerPaging(true);
    list.setColumnFilter(true);
    list.setSearchable(true);
    list.setTargetNode(document.getElementById('VistwiseStarCustomer'));
    var lSearchParamArray = new Array();
    var lSearchParam = new SearchParam();

    lSearchParam.setIndex(0);
    lSearchParam.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray.push(lSearchParam);//
    lSearchParam = new SearchParam();
    lSearchParam.setIndex(1);
    lSearchParam.setValue(lstartCurrDate);
    lSearchParamArray.push(lSearchParam);//
    lSearchParam = new SearchParam();
    lSearchParam.setIndex(2);
    lSearchParam.setValue(formatDate);
    lSearchParamArray.push(lSearchParam);
    list.setSeachParam(lSearchParamArray);
    list.render();

    list4 = new List();
    list4.setViewCode("ENQ518");
    list4.setRowSelectable(true);
    list4.setServerPaging(true);
    list4.setColumnFilter(true);
    list4.setSearchable(true);
    list4.setTargetNode(document.getElementById('Volumnwisestarcustomers'));
    var lSearchParamArray4 = new Array();
    var lSearchParam4 = new SearchParam();
    lSearchParam4.setIndex(0);
    lSearchParam4.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray4.push(lSearchParam4);//
    lSearchParam4 = new SearchParam();
    lSearchParam4.setIndex(1);
    lSearchParam4.setValue(lstartCurrDate);
    lSearchParamArray4.push(lSearchParam4);//
    lSearchParam4 = new SearchParam();
    lSearchParam4.setIndex(2);
    lSearchParam4.setValue(formatDate);
    lSearchParamArray4.push(lSearchParam4);//
    list4.setSeachParam(lSearchParamArray4);
    list4.render();

    $(function () {
        var end = moment();
        var start = moment().subtract('days');
        ;

        function printDate(start, end) {
            
            $('#Starcust span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
            var lstartdate = new Date(start);
            var lendate = new Date(end);
            var lday = lstartdate.getDate().toString();
            if (lday.length < 2)
                lday = '0' + lday;
            var lmonth = (lstartdate.getMonth() + 1).toString();
            if (lmonth.length < 2)
                lmonth = '0' + lmonth;

            var lyear = lstartdate.getFullYear().toString();
            var lfinalstartdate = lyear + "-" + lmonth + "-" + lday; //" 00:00:01";

            var lday1 = lendate.getDate().toString();
            if (lday1.length < 2)
                lday1 = '0' + lday1;

            var lmonth1 = (lendate.getMonth() + 1).toString();
            if (lmonth1.length < 2)
                lmonth1 = '0' + lmonth1;

            var lyear1 = lendate.getFullYear().toString();
            var lfinalEndDate = lyear1 + "-" + lmonth1 + "-" + lday1;//+ " 23:59:59";
            search1(lfinalstartdate, lfinalEndDate);
        }

        function search1(startDate, endDate)
        {
            list = new List();
            list.setViewCode("ENQ513");
            var lStoreJSON = localStorage.getItem("storeDetails");
            var lSelectedStore = JSON.parse(lStoreJSON);
            var lSearchParamArr1 = new Array();
            var lSearchParam11 = new SearchParam();
            lSearchParam11.setIndex(0);
            lSearchParam11.setValue("" + lSelectedStore.StroreId);
            lSearchParamArr1.push(lSearchParam11);
            lSearchParam11 = new SearchParam();
            var value1 = startDate;
            lSearchParam11.setIndex(1);
            lSearchParam11.setValue(value1);
            lSearchParamArr1.push(lSearchParam11);
            lSearchParam11 = new SearchParam();
            var value2 = endDate;
            lSearchParam11.setIndex(2);
            lSearchParam11.setValue(value2);
            lSearchParamArr1.push(lSearchParam11);
            list.setSeachParam(lSearchParamArr1);
            list.setTargetNode(document.getElementById('VistwiseStarCustomer'));
            list.render();

            list4 = new List();
            list4.setViewCode("ENQ518");
            var lStoreJSON = localStorage.getItem("storeDetails");
            var lSelectedStore = JSON.parse(lStoreJSON);
            var lSearchParamArr4 = new Array();
            var lSearchParam44 = new SearchParam();
            lSearchParam44.setIndex(0);
            lSearchParam44.setValue("" + lSelectedStore.StroreId);
            lSearchParamArr4.push(lSearchParam44);
            lSearchParam44 = new SearchParam();
            var value5 = startDate;
            lSearchParam44.setIndex(1);
            lSearchParam44.setValue(value5);
            lSearchParamArr4.push(lSearchParam44);
            lSearchParam44 = new SearchParam();
            var value6 = endDate;
            lSearchParam44.setIndex(2);
            lSearchParam44.setValue(value6);
            lSearchParamArr4.push(lSearchParam44);
            list4.setSeachParam(lSearchParamArr4);
            list4.setTargetNode(document.getElementById('Volumnwisestarcustomers'));
            list4.render();
        }

        $('#Starcust').daterangepicker({

            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, printDate);

        printDate(start, end);

    });
});
