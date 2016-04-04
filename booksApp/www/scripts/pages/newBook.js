//functions for newbook.html page

"use strict";
$(document).ready(function () {

    $('#chkReading').on('click', function () {
        var checked = $("#chkReading").is(':checked');

        if (checked === true) {
            $('#divActualPage').show();
        } else {
            $('#divActualPage').hide();
        }
    });

    $('#FormNewBook').submit(function (e) {
        alert('it´s come');
        if ($('#txtName').val() === "") {
            //$('#lblNameError').attr("data-i18n", "general.fill");
        }

        e.preventDefault();
        //alert('works');
    });
});