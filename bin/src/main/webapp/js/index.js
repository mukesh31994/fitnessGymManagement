/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 //GetNotifications();




function notifyMe(title, body)
{
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var options = {
            body: body,
            icon: 'img/icon.png'
        }
        var notification = new Notification(title, options);

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                var options = {
                    body: body,
                    icon: 'img/icon.png'
                }
                var notification = new Notification(title, options);
            }
        });
    }

    // Finally, if the user has denied notifications and you 
    // want to be respectful there is no need to bother them any more.
}


/*
function GetNotifications()
{
    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "GetNotifications"});
    lAjax1.addEventListener('success', function (response) {
        console.log("res " + response);
        response = response.replace("[", "");
        response = response.replace("]", "");
        var res = response.split(",");
        for (var i = 0; i < res.length; i++) {
            console.log("res " + res[i]);
            var data = res[i].split("_");
            if (data.length > 1)
            {
                notifyMe(data[0], data[1]);
            }
        }
        RemoveNotifications();
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}


function RemoveNotifications()
{

    var url1 = localStorage.getItem("url") + "PanelUtilities";
    var lAjax1 = new FormAjax();
    lAjax1.setUrl(url1);
    lAjax1.setData({reqType: "RemoveNotifications"});
    lAjax1.addEventListener('success', function (response) {
        console.log("res " + response);
    });
    lAjax1.addEventListener('error', function (textStatus, errorThrown) {
        console.log(textStatus + " ; " + errorThrown);
    });
    lAjax1.execute();
}



*/