var currentPage = {};

currentPage.init = function () {
    console.log("Welcome to Results :: init");
    $("#loader").hide();
    $("#user_name").html(localStorage.name);
    $("#user_usn").html(localStorage.usn);
    $("#user_college").html(localStorage.college);
    $("#user_branch").html(localStorage.branch);
    show_marks();
}
function show_marks() {
    $("#loader").show();
    $.ajax
    ({
        type: "GET",
        url: "https://www.myvturesults.com/api/result/"+localStorage.usn+"/"+ localStorage.semester+"/"+localStorage.attempt,
        dataType: 'json',
        headers: {
            "Authorization": "Token " + localStorage.token
        },
        success: function (data) {
            $("#loader").hide();
            var html = "";
            var div = $("#show_marks");
            var res = "";

            if (data.status == "success") {

                // alert((data.result.subject).length);
                for (var i = 0; i < (data.result.subject_list).length; i++) {
                    html += '<div class="col-12 border-bottom padding-div">';
                    html += '<div class="col-3 text-center">';
                    html += '<img src="img/book.png" style="width:40px; height:40px;"/>';
                    html += '</div >';
                    html += '<div class="col-6">';
                    html += '<p>';
                    html += '<b>SUBJECT : ' + data.result.subject_list[i]['subject_name'] + '</b>';
                    html += '<br />Subject code : ' + data.result.subject_list[i]['subject_code'] + ', Internal : ' + data.result.subject_list[i]['internal_marks'] + ', External : ' + data.result.subject_list[i]['external_marks'] + ', Total : ' + data.result.subject_list[i]['total_marks'] + '</p>';
                    html += '</div>';
                    html += '<div class="col-3 text-center">';
                    if (data.result.subject_list[i]['result'] == "P") {
                        html += '<img src="img/pass.png" style="width:40px; height:40px;" />';
                    } else {
                        html += '<img src="img/fail.png" style="width:40px; height:40px;"/>';
                    }

                    html += '</div>';
                    html += '</div>';

                }
               
            }else {
                alert(data.status);
                html += '<div class="home-content-box text-center">';
                html += '<div class="error_box">';
                html += '<h4 class="error_color">' + data.type + '!</h4>';
                html += '<p>' + data.message + '</p>';
                html += '</div>';
                html += '<button class="btn" onclick="results()" style="float:left">BACK TO RESULT</button>';
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