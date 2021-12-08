/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * merchantworld.in:8181 
 * http://localhost:8080/MerchantWorldService/ 
 * http://dev.merchantworld.in:8281/MerchantWorldService/ 
 * https://merchantworld.in/MerchantWorldService/
 */

//var baseURL = '';
//var scheme = 'http';
//var domain = 'localhost';
//var port = '8080';
//var application = 'MerchantWorldService';

var mainUrl = window.location.href.split("index.html");

//var url = scheme + '://' + domain;
//
//if (port !== '')
//{
//    url = url + ":" + port;
//}
//;
//if (application !== '')
//{
//    url = url + "/" + application;
//}
//;
//url = url + "/";



var url = mainUrl[0]; 
baseURL = url;
if (typeof (Storage) !== "undefined") {
    //alert(url);
    localStorage.setItem("url", url);
}

function alertLocal()
{
    alert(localStorage.getItem("url"));
}


