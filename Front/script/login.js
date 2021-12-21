$(document).ready(() => {
    
})

$('.inputbtn').on('mouseover', () => {
    $('.inputbtn').css("background-color", "#FFD8D8");
})

$('.inputbtn').on('mouseout', () => {
    $('.inputbtn').css("background-color", "#fA7A80");
})

$('#joinbtn').on('click', () => {
    $('#login_window').css("display", "none");
    $('#join_window').css("display", "grid");
})

$('#return_bnt').on('click', () => {
    $('#login_window').css("display", "grid");
    $('#join_window').css("display", "none");
})

function sendData() {
    console.log("!!!")
    let id_val = document.getElementById("id_input").value;
    let pw_val = document.getElementById("pw_input").value;
    let name_val = document.getElementById("name_input").value;
    let birth_val = document.getElementById("birth_input").value;

    console.log("!!!" + id_val + pw_val + name_val + birth_val)

    if(id_val == '' || pw_val == '' || name_val == '' || birth_val == '') {
        alert("양식이 알맞게 채워졌는지 확인해주세요!")
        return;
    }
    $.ajax({
        url : '/register',
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