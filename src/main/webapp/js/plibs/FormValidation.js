/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validateAmount(amount)
{
    if (/^\d{7}$/.test(amount)) {
        return true;
    } else {
        alert("Invalid amount ; must be 7 digits");
        return false;
    }

}

function validateMobileNo(mobileNo)
{
    if (/^\d{10}$/.test(mobileNo)) {
        return true;
    } else {
        alert("Invalid number; must be ten digits");
        return false;
    }

}

function validateNumber(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {

        return false;
    } else {
        return true;
    }
}

function validateLength(value, length)
{
    if (value.length !== length) {
        alert("Please enter valid value");
        return false;
    } else
    {
        return true;
    }
}

function validateEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        alert("Please enter valid email id");
        return false;
    } else {
        return true;
    }
}

function validateName(name)
{
    if (/^[A-Za-z\s]+$/.test(name))
    {
        return true;
    } else {
        alert("Please enter valid name");
        return false;
    }
}

function validateRequired(value)
{
    if (value.length > 0)
        return true;
    else
        return false;
}


