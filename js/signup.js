/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function onReady() {
    console.log(usStates);
    var signup = document.getElementById('signup');

    var stateSelect = signup.elements['state'];

    var i;
    var option;
    for(i=0; i < usStates.length; ++i) {
        option = document.createElement('option');
        option.innerHTML = usStates[i].name;
        option.value = usStates[i].code;
        stateSelect.appendChild(option);
    }

    var occupation = document.getElementById('occupation');
    occupation.addEventListener("change", function() {
        if (occupation.value == "other") {
            document.getElementById('occupationOther').style.display = "block";
        } else {
            document.getElementById('occupationOther').style.display = "none";
        }
    });

    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function() {
        var r = confirm("Are you sure?");
        if (r) {
            location.assign("http://www.google.com");
        }

    });

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
    //firstName, lastName, address1, city, state, zip, birthdate
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var i;
    var formValid = true;

    for(i=0; i < requiredFields.length; ++i) {
        formValid &= validateRequiredField(form.elements[requiredFiedls[i]]);
    }

    if(form.elements['occupation'].value == "other") {
        formValid &= validateRequiredField(form.elements['occupationOther']);
    }
f   //check whether zip is in valid format
    formValid &= zipcodeValidate(form.elements['zip']);

    //check whether the user is more than 13 years older
    formValid &= ageValidate(form.elements['birthdate']);

    return formValid;
} //validateForm()

function zipcodeValidate(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = zipRegExp.test(zip.value);
    if(valid) {
        zip.className = 'form-control';
    } else {
        //visually changes bad fields for the user by changing the class of the field which has a different CSS red border
        zip.className = 'form-control invalid-field';
    }
    return valid;
}

function ageValidate(birthdate) {
// to do
}

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