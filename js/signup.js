/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function onReady() {
    var signup = document.getElementById('signup');

    signup.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address', 'city', 'state', 'zipcode'];
    var i;
    var formValid = true;

    for(i=0; i < requiredFields.length; ++1) {
        formValid &= validateRequiredField(form.elements[requiredFiedls[i]]);
    }

    //sets the alert paragraph text if form validation fails
    if(!formValid) {
        var errMsg = document.getElementById('error-message');
        //adds text
        errMsg.innerHTML = 'Please fill out the required fields';

        //changes the style from what it is currently to 'block' (it was initially invisible, now it is visible)
        errMsg.style.display = 'block';
    }

    return formValid;
} //validateForm()

function validateRequiredField(field) {
    var value = field.value.trim(); //cuts off the space in front of or at the end of the string in the field we're checking

    var valid = value.length > 0;
    if(valid) {
        field.className = 'form-control';
    } else {
        //visually changes bad fields for the user by changing the class of the field which has a different CSS red border
        field.className = 'form-control invalid-field';
    }
    return valid;
} //validateRequiredField()

document.addEventListener('DOMContentLoaded', onReady);