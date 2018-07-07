var currentPage = {};

currentPage.init = function () {
    console.log("Welcome to Results :: init");
    $("#loader").hide();
    $("#user_name").html(localStorage.name);
    $("#user_usn").html(localStorage.usn);
    $("#user_college").html(localStorage.college);
    $("#user_branch").html(localStorage.branch);
    show_results();
}

function show_results() {
    $("#loader").show();
    $.ajax
    ({
        type: "GET",
        url: "https://www.myvturesults.com/api/result/" + localStorage.usn,
        dataType: 'json',
        headers: {
            "Authorization": "Token " + localStorage.token
        },
        success: function (data) {
            $("#loader").hide();
            var html = "";
            var div = $("#show_result");
            var res = "";
            if (data.status == "success") {
                for (var i = 0; i < (data.result.semester).length; i++) {
                    if (data.result.semester[i]['result'] == "P") {
                        res = "PASS";
                    } else {
                        res = "FAIL";
                    }
                    html += '<div class="col-12 border-bottom padding-div">';

                    html += '<div class="col-3 text-center">';
                    html += '<img src="img/book.png" style="width:40px; height:40px;"/>';
                    html += '</div >';
                    html += '<div class="col-6">';
                    html += '<p>';
                    html += '<b>SEMESTER ' + data.result.semester[i]['semester'] + ' - ' + res + '</b>';
                    html += '<br />Attempt : ' + data.result.semester[i]['attempt'] + ' , Total : ' + data.result.semester[i]['total_marks'] + '</p>';
                    html += '</div>';
                    html += '<div class="col-3 text-center">';
                    html += '<img src="img/next.png" style="width:40px; height:40px;" onclick="show_marks(' + data.result.semester[i]['semester'] + ','+data.result.semester[i]['attempt']+')" />';
                    html += '</div>';
                    html += '</div>';
                }
                html += '<div class="home-content-box text-center">';
                html += '<button class="btn" onclick="results()" style="float:left">REFRESH RESULT</button>';
                html += '<button class="btn" id="btn_latest_result" onclick="get_latest_results()" style="float:right">GET LATEST RESULT</button>';
                html += '</div>';
            } else {
                html += '<div class="home-content-box text-center">';
                html += '<div class="error_box">';
                html += '<h4 class="error_color">' + data.type + '!</h4>';
                html += '<p>' + data.message + '</p>';
                html += '</div>';
               html += '<button class="btn" onclick="results()" style="float:left">REFRESH RESULT</button>';
                html += '<button class="btn" id="btn_latest_result" onclick="get_latest_results()" style="float:right">GET LATEST RESULT</button>';
                html += '</div>';
            }
            div.html(html);
        }, error: function () {

            $("#loader").hide();
            alert(data.status);
        }
    });
}
function show_marks(semester,attempt) {
    localStorage.setItem('semester', semester);
    localStorage.setItem('attempt', attempt);
    $("body").load(path + "pages/show_result.html", function () {
        $.getScript(path + "js/show_result.js", function () {
            if (currentPage.init) {
                currentPage.init();
            }
        });
    });
}

