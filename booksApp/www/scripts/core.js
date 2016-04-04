//common functions for all system

"use strict";
$(document).ready(function () {

    createMenu();

});

//create menu itens
function createMenu() {
    var righthide = '<ul class="right hide-on-med-and-down">';
    var slideOut = '<ul id="slide-out" class="side-nav">';
    var button = '<a href="#" data-activates="slide-out" class="button-collapse"><i class="mdi-navigation-menu"></i></a>';

    //menu itens
    var index = '<li><a href="index.html" data-i18n="menu.books"></a></li>';
    var newBook = '<li><a href="newBook.html" data-i18n="menu.add"></a></li>';

    var merge =
        '<nav>' +
            righthide +
            index +
            newBook +
            '</ul>' +
            slideOut +
           index +
           newBook +
           '</ul>' +
            button +
        '</nav>';
    $('header').append(merge);

    $(".button-collapse").sideNav();
}
