var loginbtn = document.getElementById("loginbt");
var memberjoinbt = document.getElementById("memberjoinbtn");
loginbtn.onmouseover = function () {
    loginbtn.style.fontWeight = "bold";
    loginbtn.style.fontSize = "1.1em";
}
loginbtn.onmouseout = function () {
    loginbtn.style.fontWeight = "normal";
    loginbtn.style.fontSize = "1em";
}
memberjoinbt.onmouseover = function () {
    memberjoinbt.style.fontWeight = "bold";
    memberjoinbt.style.fontSize = "1.1em";
}
memberjoinbt.onmouseout = function () {
    memberjoinbt.style.fontWeight = "normal";
    memberjoinbt.style.fontSize = "1em";
}

function sendData() {
    let id_val = document.getElementById("id_input").value;
    let pw_val = document.getElementById("pw_input").value;
    let name_val = document.getElementById("name_input").value;
    let birth_val = document.getElementById("birth_input").value;
    if(id_val === undefined || pw_val === undefined || name_val === undefined || 
        birth_val === undefined) {
            alert("양식이 알맞게 채워졌는지 확인해주세요!")
            return;
        }
    $.ajax({
        url : '/join',
        type : 'POST',
        data : {
            id : id_val,
            pw : pw_val,
            name : name_val,
            birth : birth_val
        }
    })
    .done(function(data) {
       console.log(data);
       if(data.data === 'not')
       {
           alert("이미 중복되는 아이디가 있습니다. 다른 아이디로 바꿔주세요!");
       }
       else if (data.data === "success")
       {
           alert("회원가입 성공하셨습니다! 로그인을 해주세요!")
           window.location.reload();
       }
    })
}


$(document).ready(function () {

    alert("jQuery동작중");
    var windowSize = window.innerWidth;
    window.onresize = function () {
        windowSize = window.innerWidth;
    }

    var windowSize = window.innerWidth;
    var login_window = document.getElementById("login");
    var join_window = document.getElementById("join_window");
    var find_id_window = document.getElementById("find_id_window");
    var find_pw_window = document.getElementById("find_pw_window")

    function reset() {
        login_window.style.marginLeft = "-200px";
        join_window.style.marginLeft = "-200px";
        find_id_window.style.marginLeft = "-200px";
        find_pw_window.style.marginLeft = "-200px";

        join_window.style.opacity = 0;
        find_id_window.style.opacity = 0;
        find_pw_window.style.opacity = 0;

        join_window.style.zIndex = 0;
        find_id_window.style.zIndex = 0;
        find_pw_window.style.zIndex = 0;
    }

    $("#joinhref, #find_id, #find_pw").click(function () {
        $("#row_2").removeClass("joinhref");
        $("#row_2").removeClass("find_id");
        $("#row_2").removeClass("find_pw");
        $("#row_2").addClass($(this).attr("id"));

        var currentSide = document.getElementById("row_2").classList[1];
        login_window.style.border = "1px solid black";
        reset();

        if (windowSize > 800) {
            login_window.style.marginLeft = "-400px";

            if (currentSide == "joinhref") {
                join_window.style.marginLeft = "0px";
                join_window.style.opacity = 1;
                join_window.style.zIndex = 1;
            }
            else if (currentSide == "find_id") {
                find_id_window.style.marginLeft = "0px";
                find_id_window.style.opacity = 1;
                find_id_window.style.zIndex = 1;
            }
            else if (currentSide == "find_pw") {
                find_pw_window.style.marginLeft = "0px";
                find_pw_window.style.opacity = 1;
                find_pw_window.style.zIndex = 1;
            }
        }
        else {
            if (currentSide == "joinhref") {
                join_window.style.opacity = 1;
                join_window.style.zIndex = 3;
            }
            else if (currentSide == "find_id") {
                find_id_window.style.opacity = 1;
                find_id_window.style.zIndex = 3;
            }
            else if (currentSide == "find_pw") {
                find_pw_window.style.opacity = 1;
                find_pw_window.style.zIndex = 3;
            }
        }

    });

    var closeBtn = $(".close");
    closeBtn.click(function () {
        reset();        
    });
    
});