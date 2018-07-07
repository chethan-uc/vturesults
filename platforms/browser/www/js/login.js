var currentPage = {};

currentPage.init = function () {
    console.log("Welcome to Dashboard :: init");
    $("#loader").hide();
    default_usn();
}
function clear_content(){
    $("#name").val("");
}
function default_usn(){
    if(localStorage.usn=="" || localStorage.usn==null){
        $("#name").val("");
    } else{
        $("#name").val(localStorage.usn);
    }
}
function validateCode(str){
    if( /[^a-zA-Z0-9]/.test( str ) ) {
        //alert('Input is not alphanumeric');
        var textVal = $('#name').val();
        $('#name').val(textVal.substring(0,textVal.length - 1));
        return false;
    }else{
        return true;      
    } 
}

function login() {

    localStorage.setItem('token', '0cf672a9-4c8e-4f05-ba77-5dca4b45a225');
    var usn = $("#name").val();
    $("#loader").show();
    if (usn!=""){
        $.ajax
        ({
            type: "GET",
            url: "https://www.myvturesults.com/api/result/" + usn,
            dataType: 'json',
            headers: {
                "Authorization": "Token " + localStorage.token
            },
            success: function (data) {
                $("#loader").hide();
                if (data.type == "") {
                    localStorage.setItem('status', data.status);
                    localStorage.setItem('college', data.result.college);
                    localStorage.setItem('name', data.result.name);
                    localStorage.setItem('usn', data.result.usn);
                    localStorage.setItem('branch', data.result.branch);
                    results();
                } else {

                    localStorage.setItem('type', data.type);
                    $("body").load(path + "pages/404.html", function () {
                        $.getScript(path + "js/404.js", function () {
                            if (currentPage.init) {
                                currentPage.init();
                            }
                        });
                    });

                }


            }, error: function () {
                $("#loader").hide();
                alert(data.status);
            }
        });
    }else{
        $("#loader").hide();
        $("#error_msg").html("Please type USN number.");
    }
}