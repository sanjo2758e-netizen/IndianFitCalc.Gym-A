
/* =========================================
   INDIANFITCALC MAIN JAVASCRIPT
   ========================================= */


const menuButton = document.getElementById("menuButton");

const navigation = document.getElementById("navigation");


if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {

        navigation.classList.toggle("open");

    });

}


/* Close mobile menu when a link is clicked */

const navigationLinks =
    document.querySelectorAll(".navigation a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navigation.classList.remove("open");

    });

});
