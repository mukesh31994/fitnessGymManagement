


$(document).ready(function () {
    
    var list1 = '';
    var list5 = '';
    var lcurrdate12='';
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

//code for Slipping Away Customers
    list1 = new List();
    
    list1.setViewCode("ENQ514");
    list1.setRowSelectable(true);
    list1.setServerPaging(true);
    list1.setColumnFilter(true);
    list1.setSearchable(true);
    list1.setTargetNode(document.getElementById('VistwiseStarCustomer'));
    var lSearchParamArray1 = new Array();
    var lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(0);
    lSearchParam1.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray1.push(lSearchParam1);//
    getCurrDate();
    lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(1);
    lSearchParam1.setValue(lstartCurrDate);
    lSearchParamArray1.push(lSearchParam1);//
    lSearchParam1 = new SearchParam();
    lSearchParam1.setIndex(2);
    lSearchParam1.setValue(formatDate);
    lSearchParamArray1.push(lSearchParam1);
    list1.setSeachParam(lSearchParamArray1);
    list1.render();

    list5 = new List();
    list5.setViewCode("ENQ517");
    list5.setRowSelectable(true);
    list5.setServerPaging(true);
    list5.setColumnFilter(true);
    list5.setSearchable(true);
    list5.setTargetNode(document.getElementById('VolumnwiseslippingawayCustomers'));
    var lSearchParamArray5 = new Array();
    var lSearchParam5 = new SearchParam();
    lSearchParam5.setIndex(0);
    lSearchParam5.setValue("" + lSelectedStore.StroreId);
    lSearchParamArray5.push(lSearchParam5);//
    lSearchParam5 = new SearchParam();
    lSearchParam5.setIndex(1);
    lSearchParam5.setValue(lstartCurrDate);
    lSearchParamArray5.push(lSearchParam5);//
    lSearchParam5 = new SearchParam();
    lSearchParam5.setIndex(2);
    lSearchParam5.setValue(formatDate);
    lSearchParamArray5.push(lSearchParam5);
    list5.setSeachParam(lSearchParamArray5);
    list5.render();


    $(function () {

        var end = moment();
        var start = moment().subtract('days');;

        function printDate(start, end) {
            
            $('#SlipingAway span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
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

            list1 = new List();
            list1.setViewCode("ENQ514");
            var lStoreJSON = localStorage.getItem("storeDetails");
            var lSelectedStore = JSON.parse(lStoreJSON);
            var lSearchParamArr2 = new Array();
            var lSearchParam22 = new SearchParam();
            lSearchParam22.setIndex(0);
            lSearchParam22.setValue("" + lSelectedStore.StroreId);
            lSearchParamArr2.push(lSearchParam22);
            lSearchParam22 = new SearchParam();
            var value3 = startDate;
            lSearchParam22.setIndex(1);
            lSearchParam22.setValue(value3);
            lSearchParamArr2.push(lSearchParam22);
            lSearchParam22 = new SearchParam();
            var value4 = endDate;
            lSearchParam22.setIndex(2);
            lSearchParam22.setValue(value4);
            lSearchParamArr2.push(lSearchParam22);
            list1.setSeachParam(lSearchParamArr2);
            list1.setTargetNode(document.getElementById('VistwiseStarCustomer'));
            list1.render();



            list5 = new List();
            list5.setViewCode("ENQ517");
            var lStoreJSON = localStorage.getItem("storeDetails");
            var lSelectedStore = JSON.parse(lStoreJSON);
            var lSearchParamArr3 = new Array();
            var lSearchParam33 = new SearchParam();
            lSearchParam33.setIndex(0);
            lSearchParam33.setValue("" + lSelectedStore.StroreId);
            lSearchParamArr3.push(lSearchParam33);
            lSearchParam33 = new SearchParam();
            var value7 = startDate;
            lSearchParam33.setIndex(1);
            lSearchParam33.setValue(value7);
            lSearchParamArr3.push(lSearchParam33);
            lSearchParam33 = new SearchParam();
            var value8 = endDate;
            lSearchParam33.setIndex(2);
            lSearchParam33.setValue(value8);
            lSearchParamArr3.push(lSearchParam33);
            list5.setSeachParam(lSearchParamArr3);
            list5.setTargetNode(document.getElementById('VolumnwiseslippingawayCustomers'));
            list5.render();
        }

        $('#SlipingAway').daterangepicker({

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
