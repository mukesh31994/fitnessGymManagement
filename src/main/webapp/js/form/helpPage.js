
function getConfigPlan() {
//debugger;
    var lLoyaltyURL = localStorage.getItem('url') + "webresources/LoyaltyWebservices/";
    var lurl = lLoyaltyURL + 'getLoyaltyPlanByStoreId?data=';
    var lStoreData = localStorage.getItem('storeDetails');
    var lStore = JSON.parse(lStoreData);
    var lData = {"StroreId": lStore.StroreId};
    var json = JSON.stringify(lData);
    lurl = lurl + json;
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.addEventListener('success', function (response) {
        var res = JSON.parse(response);
//        console.log(res);
    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
    });
    lAjax.execute();
}
window.onload = getConfigPlan;