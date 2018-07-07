var currentPage = {};

currentPage.init = function () {
    console.log("Welcome to Search :: init");
    $("#error_msg").html(localStorage.type);
}

function back_login(){
    $("body").load(path + "pages/login.html", function () {
        $.getScript(path + "js/login.js", function () {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
}