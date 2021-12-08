addLoyaltyProgrammePlan();
function addLoyaltyProgrammePlan(){
    var lurl = url + 'addLoyaltyProgrammePlan?data=';
    var lData = {"StroreId": storeId,"UserId":makerId,"PlanName":"ABC","MinTransAmt":"100","PointAssurance":pointIssuance,"PointValue":'',"Validity":'',"Expiry":'',"FirstTransCriteria":'',"NextTranscriteria":'',"EarnPointCriteria":"","Token1":'',"Token2":'',"Token3":''};
    var json = JSON.stringify(lData);
    lurl = lurl + json;
    console.log(lurl);
    var lAjax = new Ajax();
    lAjax.setUrl(lurl);
    lAjax.setType('get');
    lAjax.addEventListener('success', function (response) {
        console.log(response);
        var res = JSON.parse(response);
       
        if (res.ConfigID === 0) {
            
            $.SmartMessageBox({
                title: "No Loyalty Program is found for this store !!!!",
                template: '<center>Do you want to add plan</center>',
                buttons: '[Configure]'

            }, function (ButtonPressed) {
                if (ButtonPressed === "Configure") {
                    window.location.assign('index.html#ui/common/forms/ConfigurePlan.html');
                }

            });
        } else if (res.ConfigID) {
            smallAlert("Customer available", function () {}, 2000);
        } else {
            smallAlertFailure("Search failed", function () {}, 2000);
        }

    });
    lAjax.addEventListener('error', function (textStatus, errorThrown) {
        console.log("Error : " + textStatus + "" + errorThrown);
//        document.getElementById("img").style.visibility = "hidden";
//        document.getElementById("statusMessage").innerHTML = textStatus;

    });
    lAjax.execute();
}
