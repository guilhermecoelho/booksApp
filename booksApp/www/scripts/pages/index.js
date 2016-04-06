// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    function onDeviceReady() {


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

$(document).ready(function () {

    createListBooks();

    $('ul').on("click", function () {
        var key = $(this).parent().attr('id');
        window.sessionStorage.setItem(key, key);
        window.location = "newBook.html";
    });

});

function createListBooks() {

    if (window.localStorage.length === 0) {
        var message = ln.key("list.empty_list");
    } else {
        var listobjects = [];

        for (var i in window.localStorage) {
            listobjects.push(JSON.parse(localStorage[i]));
        }

        for (var i = 0; i < listobjects.length; i++) {
           
            //ignore the last object, it´s just garbage
            if (listobjects[i].counter === 0) {
                break;
            }

            var actualPage;
            var totalPage = ln.key("list.total_page") + ' : ' + listobjects[i].totalPage;
            var bookName = listobjects[i].bookName;

            if (listobjects[i].isFinish == true) {
                actualPage = ln.key("newBook.finish");
            }
            else if (listobjects[i].isReading == false) {
                actualPage = ln.key("list.not_reading");
            } else {
                actualPage = ln.key("list.actual_page") + ' : ' + listobjects[i].actualPage;
            }

            var book = $('#divBookExample').clone();
            
            book.attr('style', '');
            book.attr('id', listobjects[i].key);
            book.find('#txtNameBook').text(listobjects[i].bookName);
            book.find('#txtTotalPage').text(totalPage);
            book.find('#txtActualPage').text(actualPage);

            $('article').append(book);
        }
    }
}