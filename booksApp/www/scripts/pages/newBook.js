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

    var t = ln.init();
    setValidation();

    i18n.init({
        lng: "pt"
    }, function (t) {
        $(document).i18n();
    });

    $('#form').validate({
        messages: "Please specify your total of pages",
        txtPageTotal: "Please specify your total of pages"
    });
});


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
            console.log(form);
        }
    });
}