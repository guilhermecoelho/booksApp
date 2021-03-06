﻿//functions for newbook.html page

"use strict";
$(document).ready(function () {

    //on check
    $('#chkReading').on('click', function () {
        var checked = $("#chkReading").is(':checked');
        checkIsReading(checked);
    });

    //when click on delete button 
    $('#divDeleteBook').on('click', function () {

        navigator.notification.confirm(ln.key('newBook.confirm_delete'), function (e) {
            if (e === 1) {
                deleteBook();
            }
        }
        , '', [ln.key('general.ok'), ln.key('general.cancel')]);

    });

    setValidation();

    //validation configuration
    $('#form').validate({
        rules: {
            txtName: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            txtName: {
                required: ln.key('general.required_field'),
                maxlength: ln.key('newBook.maxlength'),
            },

            txtPageTotal: ln.key('general.required_field')
        }

    });

    //check with is update
    var key = "";

    if (window.sessionStorage.length > 0) {
        for (var i in window.sessionStorage) {
            key = window.sessionStorage[i];
        }
        var object = JSON.parse(window.localStorage.getItem(key));

        document.getElementById('hhdKey').value = object.key;
        document.getElementById('txtName').value = object.bookName;
        document.getElementById('txtPageTotal').value = object.totalPage;
        document.getElementById('chkReading').checked = object.isReading;
        document.getElementById('txtPageActual').value = object.actualPage;
        document.getElementById('chkFinish').checked = object.isFinish;

        checkIsReading(object.isReading);

        $('#divDeleteBook').show();
    }

    //clear sessionStorage
    window.sessionStorage.clear();
});

//action when check/uncheck is reading box
function checkIsReading(checked) {

    if (checked === true) {
        $('#divActualPage').show();
    } else {
        document.getElementById('txtPageActual').value = "";
        $('#divActualPage').hide();
    }
}

//save the book on a localStorage
function saveBook() {
    try {

        var key = document.getElementById('hhdKey').value;
        var isNewKey = false;

        if (key !== "") {
            isNewKey = true;
        }

        while (isNewKey === false) {
            key = createRandomKey();
            var object = window.localStorage.getItem(key);
            if (object === null) {
                isNewKey = true;
            }
        }

        var bookName = document.getElementById('txtName').value;
        var totalPage = document.getElementById('txtPageTotal').value;
        var isReading = document.getElementById('chkReading').checked;
        var actualPage = document.getElementById('txtPageActual').value;
        var isFinish = document.getElementById('chkFinish').checked;

        var finalObject = {
            key: key,
            bookName: bookName,
            totalPage: totalPage,
            isReading: isReading,
            actualPage: actualPage,
            isFinish: isFinish
        }

        window.localStorage.setItem(key, JSON.stringify(finalObject));

        navigator.notification.alert(ln.key('newBook.success_save'), function () { window.location = "index.html"; }, '', ln.key('general.ok'));

    } catch (err) {

        navigator.notification.alert(ln.key('general.error'), function () { }, '', ln.key('general.ok'));
    }
}


//delete book from localStorage
function deleteBook() {
    try {
        var key = document.getElementById('hhdKey').value;
        window.localStorage.removeItem(key);

        navigator.notification.alert(ln.key('newBook.success_delete'), function () { window.location = "index.html"; }, '', ln.key('general.ok'));

    } catch (e) {
        navigator.notification.alert(ln.key('general.error'), function () { }, '', ln.key('general.ok'));
    }
}

//set validation plugin
function setValidation() {
    $.validator.setDefaults({
        errorClass: 'invalid',
        validClass: "valid",
        errorPlacement: function (error, element) {
            $(element)
                .closest("form")
                .find("label[for='" + element.attr("id") + "']")
                .attr('data-error', error.text());
        },
        submitHandler: function (form) {
            saveBook();
        }
    });
}

//create a random key to save the object
function createRandomKey() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }

    return randomstring;
}