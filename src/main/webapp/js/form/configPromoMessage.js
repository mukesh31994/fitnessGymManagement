/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var temp;

$('#btnUpdate').click(function (){
//    debugger;
    var messages=temp;
    var parsedText="";
    var lParsedArr = messages.split('[');
    for(var i=0; i < lParsedArr.length ; i++)
    {
        if(lParsedArr[i].toString().search(']') > 0){
            var lSplitData = lParsedArr[i].toString();
            var lMessage = lSplitData.substr(0,lSplitData.search(']'));
            var output=getFieldValues(lMessage);
            parsedText += output;
            parsedText += lSplitData.substr(lSplitData.search(']')+1,lSplitData.length);
        }
        else
        {
            parsedText +=lParsedArr[i].toString();
        }
    }
    $('#parseText').show();
    $('#parseText').text(parsedText);
});
function OnLoad()
{
    var action = dataParam.getData('action');
    if (action && action === 'view')
    {
        view();
        dataParam.setData('action', '');
    }   
}

function view()
{
    var action = dataParam.getData('action');
    var id = dataParam.getData('id');
    console.log('action ' + action + 'id:' + id);
    form.view(id, viewCallBack);
}

function viewCallBack(pData)
{
//    debugger;
    var lParsedArr = pData.message.split('[');
    for(var i=0; i < lParsedArr.length ; i++)
    {
        if(lParsedArr[i].toString().search(']') > 0){
            var lSplitData = lParsedArr[i].toString();
            var lMessage = lSplitData.substr(0,lSplitData.search(']'));
            displayFields(lMessage);
        }
    }
//    debugger;
    temp=pData.message;
    $('#message').text(pData.message);
}

function getFieldValues(pMessage)
{
    if(pMessage === 'Shop Name'){
        //$('#selectShop').show();
        //$('#shop').show();
        //getShopList();
        return $('#shopName option:selected').val();
    }else if(pMessage === 'Customer Name'){
        return "";
    }else if(pMessage === 'Offer Text'){
        //$('#offerText').show();
        return $('#txtRemark').val();
    }else if(pMessage === 'Date'){
        //$('#selectDate').show();
        return $('#date').val();
    }else if(pMessage === 'Time'){
        //$('#time').show();
        //$('#selectTime').show();
        //$('#blank').show();
        //$('#ampm').show();
        return $('#time option:selected').val()+" "+$('#ampm option:selected').val();
    }
    else if(pMessage === 'Points')
    {
        //$('#enterPoints').show();
        //$('#points').show();
        return $('#points').val();
    }
}

function displayFields(pMessage){
    if(pMessage === 'Shop Name'){
        $('#selectShop').show();
        $('#shop').show();
        getShopList();
    }else if(pMessage === 'Customer Name'){
        
    }else if(pMessage === 'Offer Text'){
        $('#offerText').show();
        $('#Remark').show();
    }else if(pMessage === 'Date'){
        $('#selectDate').show();
        $('#date').show();
    }else if(pMessage === 'Time'){
        $('#timeSection').show();
        $('#time').show();
        $('#selectTime').show();
        $('#sectionAMPM').show();
        $('#blank').show();
        $('#ampm').show();
    }
    else if(pMessage === 'Points')
    {
        $('#pointsSection').show();
        $('#enterPoints').show();
        $('#points').show();
    }
}

function getShopList(){
    var url = localStorage.getItem("url") + "webresources/LoyaltyWebservices/getStoreListByUserId?data=";
        var lUserData = {};

        var getData = sessionStorage.getItem("USER");
        lUserData = JSON.parse(getData);
        var lData = {userId: lUserData.userId};
        var json = JSON.stringify(lData);
        url = url + json;

        var lAjax = new Ajax();
        lAjax.setUrl(url);
        lAjax.setType('get');
        lAjax.addEventListener('success', function (response) {
//            debugger;
            var res = JSON.parse(response);
            var lShopName =  [];
            for(var i = 0; i < res.stores.length ; i++){
                var newOption = $('<option>');
                newOption.attr('value', res.stores[i].DBAName).text(res.stores[i].DBAName);
                $('#shopName').append(newOption);
                lShopName.push(res.stores[i].DBAName);
            }
           
        });
        lAjax.addEventListener('error', function (textStatus, errorThrown) {
            console.log("Error : " + textStatus + "" + errorThrown);
        });
        lAjax.execute();
}
pageSetUp();