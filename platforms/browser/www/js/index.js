var currentPage = {};
var pageParam = [];
var path = "";
function login_page(){
    $("body").load(path + "pages/login.html", function () {
        $.getScript(path + "js/login.js", function () {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
}
function results() {
    if (localStorage.status == "success") {
        $("body").load(path + "pages/results.html", function () {
            $.getScript(path + "js/results.js", function () {
                if (currentPage.init) {
                    currentPage.init();
                }
            });
        });
    } else {
        login_page();
    }
}
function init() {
    results();
}

function get_latest_results() {
    $("#btn_latest_result").attr('disabled','disabled');
    $("#btn_latest_result").html(" Processing ..");
    if (localStorage.status == "success") {
        //$("#loader").show();
        $.ajax({
            type: "GET",
            url: "https://www.myvturesults.com/api/refresh-result/" + localStorage.usn,
            dataType: 'json',
            headers: {
                "Authorization": "Token " + localStorage.token
            },
            success: function (data) {
                $("#loader").hide();
                localStorage.setItem('task_id', data.result.task_id);
                task_status(data.result.task_id);

            },
            error: function () {
                $("#loader").hide();
                alert(data.status);
            }
        });
    }else{
        login_page();
    }
}

function refresh_task_id(){
    $("#btn_latest_result").attr('disabled','disabled');
    $("#btn_latest_result").html(" Processing ..");
    //alert(localStorage.task_id);
    task_status(localStorage.task_id);
}
function task_status(task_id) {
    $.ajax({
        type: "GET",
        url: "https://www.myvturesults.com/api/task-status/" + task_id,
        dataType: 'json',
        headers: {
            "Authorization": "Token " + localStorage.token
        },
        success: function (data) {
            $("#loader").hide();
            if (data.result.task_status == "SUCCESS") {

                results();
            } else if (data.result.task_status == "FAILURE") {
                results();
            } else {
                refresh_task_id();
            }
        },
        error: function () {
            $("#loader").hide();
            alert(data.status);
        }
    });
}

function profile() {
    $(".submenu").slideToggle('fast');
}

function logout() {
    //localStorage.clear();
    localStorage.removeItem('status');
    
    $("body").load(path + "pages/login.html", function () {
        $.getScript(path + "js/login.js", function () {
            if (currentPage.init) {
                $('#name').val(localStorage.usn);
                currentPage.init();
                return false;
            }
        });
    });

}
