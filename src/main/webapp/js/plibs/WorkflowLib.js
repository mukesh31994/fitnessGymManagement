/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function Team() {

    this.dataList;
    this.teamMap = new Hashtable();

    this.getTeamMap = function () {
        return this.teamMap;
    };

    this.setTeamMap = function (pTeamMap) {
        this.teamMap = pTeamMap;
    };

    this.setDataList = function (pDataList) {
        this.dataList = pDataList;
    };

    this.getDataList = function () {
        return this.dataList;
    };

    this.getTeam = function () {
        var that = this;
        var url = localStorage.getItem("url") + 'webresources/LeadWorkflowServiceAPI/getOrgStructure';
        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType("GET");
        lAjax.setSync(true); //need to select records. hence made synchronous.
        var that = this;
        this.teamMap = new Hashtable();
        lAjax.addEventListener('success', function (response) {
            response = JSON.parse(response);
            that.getDataList().empty();
            for (var i in response) {
                var lData = response[i];
                that.teamMap.put(lData.levelCode, lData);
                var lStr = lData.levelValue + " , " + lData.userName;
                var opt = $("<option></option>").attr("value", lData.levelCode);
                opt.text(lStr);
                that.getDataList().append(opt);
            }
//            
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };

}


function Workflow() {
    this.data;
    this.url = localStorage.getItem("url") + "webresources/LeadWorkflowServiceAPI/routeBulk";
    this.message = "Request routed..";


    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.getURL = function () {
        return this.url;
    };

    this.setMessage = function (pMessage) {
        this.message = pMessage;
    };

    this.getMessage = function () {
        return this.message;
    };

    this.route = function () {
        var that = this;
        var lAjax = new Ajax();
        lAjax.setUrl(this.getURL());
        lAjax.setType("POST");
        lAjax.setDataType("json");
        lAjax.setSync(true); //need to select records. hence made synchrono
        lAjax.setHeader("Content-Type", "application/json; charset=utf-8");
        var data = JSON.stringify(this.data);
        lAjax.setData(data);
        lAjax.addEventListener('success', function (response) {
            //response = JSON.parse(response);
            //var opt = $("<option></option>").attr("value", res.DATA[i][0]);
            //alert("Lead Assigned");
            $.smallBox({
                title: that.getMessage(),
                content: "<i class='fa fa-clock-o'></i> <i>" + that.getMessage() + "...</i>",
                color: "#739E73",
                iconSmall: "fa fa-thumbs-up bounce animated",
                timeout: 2000
            }, function () {

                //window.location.hash = "ui/view/leads/AssignedToManager.html";
                checkURL();
            });
            if ($('#modal').modal) {
                $('#modal').modal('hide');
            }
        });

        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log('error: ' + errorThrown + '\n Status: ' + textStatus);
            alert('error: ' + errorThrown + '\n Status: ' + textStatus);
        });
        lAjax.execute();
    };



}


function smallAlert(pMessage, pCallBack, pTimeOut) {
    if(pTimeOut)pTimeOut=1000;
    $.smallBox({
        title: pMessage,
        content: "<i class='fa fa-clock-o'></i> <i>" + pMessage + "...</i>",
        color: "#739E73",
        iconSmall: "fa fa-thumbs-up bounce animated",
        timeout: pTimeOut
    }, function () {
        pCallBack();
    });
}


