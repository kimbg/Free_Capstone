var dlg = document.getElementById("myDlg");
function closeDlg()  //Dlg닫는 함수
{
    dlg.close();
    document.getElementsByClassName("forDlg").style.display = "none";
}

/*스크롤시 추가내용 불러오기*/ 
var addItem = '<h1>Title</h1>'; //추가되는 내용 기본값.
addItem += '<img src = "http://localhost:3000/Image/1" class = "main_photo">';
addItem += '<div class = "content_end">';
addItem += '<div>content</div>';
addItem += '<button type = "button" class = "contentbt"><img src = "http://placehold.it/45x45"></button>';
addItem += '</div>';
//이 위까지는 기본적인 게시글 사진, 글 이고 아래부터는 Dlg를 위해 추가되는 내용 잘모르겠으면 위 html 주석 참조
addItem += '<div class = "forDlg">';
addItem += '<dialog id = "myDlg">';
addItem += '<a href = "#" onclick = "closeDlg()" id = "closebtn">X</a> ';
addItem += '<div id = "screen">';
addItem += '<div id = "screen_aside_left">';
addItem += '<img src = "http://placehold.it/100x100" id = "map">';
addItem += ' </div> ';
addItem += '<div id = "screen_aside_right">';
addItem += '<div>경상남도 김해시 인제로 197</div>';
addItem += '<h4>인제대학교</h4>';
addItem += '</div> </div> </dialog> </div>';

//동적으로 생성된 버튼에도 이벤트 부여 이 이벤트를 통해 Dlg를 띄울것
$(document).on('click', '.contentbt', function () {
    $(".forDlg").css("display", "block");
    dlg.showModal();
});

$(function () {
    $('#wrap').scroll(function () {
        var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
        var scrollH = $(this).height()*2; //스크롤바를 갖는 div의 높이
        var contentH = $('#content_bar').height(); //문서 전체 내용을 갖는 div의 높이
        if (scrollT + scrollH + 1 >= contentH) // 스크롤바가 아래 쪽에 위치할 때
        {
            $('#content_bar').append(addItem);
        }
    });
});
	//여기까지 추가내용 불러오기
