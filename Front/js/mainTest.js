var dlg = document.getElementById("myDlg");
function closeDlg()  //Dlg닫는 함수
{
    dlg.close();
    document.getElementsByClassName("forDlg").style.display = "none";
}

/*스크롤시 추가내용 불러오기*/ 
// var addItem = '<h1>Title</h1>'; //추가되는 내용 기본값.
// addItem += '<img src = "http://placehold.it/500x400" class = "main_photo">';
// addItem += '<div class = "content_end">';
// addItem += '<div>content</div>';
// addItem += '<button type = "button" class = "contentbt"><img src = "http://placehold.it/45x45"></button>';
// addItem += '</div>';
// addItem += '<div class = "forDlg">';
// addItem += '<dialog id = "myDlg">';
// addItem += '<a href = "#" onclick = "closeDlg()" id = "closebtn">X</a> ';
// addItem += '<div id = "screen">';
// addItem += '<div id = "screen_aside_left">';
// addItem += '<img src = "http://placehold.it/100x100" id = "map">';
// addItem += ' </div> ';
// addItem += '<div id = "screen_aside_right">';
// addItem += '<div>경상남도 김해시 인제로 197</div>';
// addItem += '<h4>인제대학교</h4>';
// addItem += '</div> </div> </dialog> </div>';

function AddItem(data) {
    //console.log('이게되냐?',JSON.parse(data).num);
    //var sibal = JSON.parse(data);
    //console.log(JSON.stringify(data));
    //console.log(data["num"]);    

    return `<h1>Title</h1>
    <img src = "http://localhost:3000/image/${data[0].num}" class = "main_photo">  
    <div class = "content_end"> 
    <div>${data[0].comment}</div>  
    <button type = "button" class = "contentbt"><img src = "http://placehold.it/45x45"></button>    
    </div>  
    <div class = "forDlg">  
    <dialog id = "myDlg">   
    <a href = "#" onclick = "closeDlg()" id = "closebtn">X</a>  
    <div id = "screen"> 
    <div id = "screen_aside_left">  
    <img src = "http://placehold.it/100x100" id = "map">    
    </div>     
    <div id = "screen_aside_right"> 
    <div>경상남도 김해시 인제로 197</div>   
    <h4>인제대학교</h4> 
    </div> </div> </dialog> </div>  
    `
}

//동적으로 생성된 버튼에도 이벤트 부여 이 이벤트를 통해 Dlg를 띄울것
$(document).on('click', '.contentbt', function () {
    $(".forDlg").css("display", "block");
    dlg.showModal();
});

var swit = true;
let i = 1;

$(function () {
   
    
    // $('#wrap').scroll(function () {
    //     var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
    //     var scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
    //     var contentH = $('#content_bar').height(); //문서 전체 내용을 갖는 div의 높이
    //     if (scrollT + scrollH + 1 >= contentH && swit) // 스크롤바가 아래 쪽에 위치할 때
    //     {
    //         swit = false;
    //          $.ajax({
    //             url : '/sendajax',
    //             type : 'POST',
    //             dataType : "JSON",
    //             data : {'num' : i},
    //         })
    //         .done(function(data){
    //             if(data.data != 'noData'){
    //                 console.log('done부분의 data : ',data);
    //                 i++;                            
    //                 $('#content_bar').append(AddItem(data));            
    //                 swit = true;
    //             }
    //             //console.log('swit : ',data);
    //         })
    //         .fail(function(data,textStatus,errorThrown) {
    //             //console.log("fail ajax");
    //             //console.log(errorThrown);
    //         })
            
    //       //console.log("123");
           
    //     }
    // });
});
	//여기까지 추가내용 불러오기
