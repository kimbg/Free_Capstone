var mapDlg = document.getElementById("myDlg");
var writeDlg = document.getElementById("writeDlg");
function closeDlg()  //Dlg닫는 함수
{
    mapDlg.close();
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

    return `<h1>Title</h1>
    <img src = "http://localhost:3000/image/${data.id}" class = "main_photo">  
    <div class = "content_end"> 
    <div>${data.comment}</div>  
    <button type = "button" class = "contentbt"><img src = "http://placehold.it/45x45"></button>    
    </div>  
    <div class = "forDlg">  
    <dialog id = "myDlg">   
    <a href = "#" onclick = "closeDlg()" id = "closebtn">X</a>  
    <div class = "screen"> 
    <div class = "screen_aside_left">  
    <img src = "http://placehold.it/100x100" id = "map">    
    </div>     
    <div class = "screen_aside_right"> 
    <div>경상남도 김해시 인제로 197</div>   
    <h4>인제대학교</h4> 
    </div> </div> </dialog> </div>  
    `
}

//동적으로 생성된 버튼에도 이벤트 부여 이 이벤트를 통해 Dlg를 띄울것
$(document).on('click', '.contentbt', function () {
    $(".forDlg").css("display", "block");
    mapDlg.showModal();
});

$(document).on('click', '#writeBtn', function () {
    $(".ForwriteDlg").css("display", "block");
    writeDlg.showModal();
});

var swit = true;
//let i = 1; //이 코드는 db순서대로 가져오는코드
let cnt; //이 변수는 db뒤붙 가져오는 코드
$(function () {
    $.ajax({
        url : '/mainInit',
        type : 'POST',
    })
    .done(function(data){
        
        // backNum = data;
        // console.log("가져온 db길이 : ",backNum);
        for(let i = 0 ; i < data.length; i++)
        {
            $('#content_bar').append(AddItem(data[i]));              
        }
        cnt = data.length;
    })
    .fail(function(data,textStatus,errorThrown) {
            console.log("fail ajax");
            console.log(errorThrown);
    })
    
    
    $('#wrap').scroll(function () {
        var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
        var scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
        var contentH = $('#content_bar').height(); //문서 전체 내용을 갖는 div의 높이
        if (scrollT + scrollH + 1 >= contentH && swit) // 스크롤바가 아래 쪽에 위치할 때
        {
            swit = false;
            $.ajax({
                url : '/sendajax',
                type : 'POST',
                data : {'num' : cnt},
            })
            .done(function(data) {
                if(data != 'noData'){
                    console.log('done부분의 data : ',data);
                    $('#content_bar').append(AddItem(data[0]));            
                    swit = true;
                    cnt++;
                }
                //console.log('swit : ',data);
            })


            //아래주석이 db순서대로 가져오는 코드
            //게시물의 경우 최신 게시글이 먼저 보여야하기때문에 아래코드는 순서가 반대임
            //  $.ajax({
            //     url : '/sendajax',
            //     type : 'POST',
            //     dataType : "JSON",
            //     data : {'num' : i},
            // })
            // .done(function(data){
            //     if(data.data != 'noData'){
            //         console.log('done부분의 data : ',data);
            //         i++;                            
            //         $('#content_bar').append(AddItem(data));            
            //         swit = true;
            //     }
            //     //console.log('swit : ',data);
            // })
            // .fail(function(data,textStatus,errorThrown) {
            //     //console.log("fail ajax");
            //     //console.log(errorThrown);
            // })
            
           
        }
    });
});
	//여기까지 추가내용 불러오기


//Dlg Code 여기서 부터는 Dlg Code

document.querySelectorAll(".drop-zone__input").forEach(inputElement => {
    const dropZoneElement = inputElement.closest(".drop-zone");
    //closest는 html중 가장 근처에있는 클래스를 찾는다
    // closest 설명 https://developer.mozilla.org/ko/docs/Web/API/Element/closest
    //javascript코드 여기서는 ;무조건 붙이자 ;; 뒤코드 실행안된다

    //drag&drop의 틀을 클릭하면 file선택을 클릭하도록 한다.
    dropZoneElement.addEventListener("click", e => {
        inputElement.click();
    });

    //file이 변경된다면
    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {            
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    //드래그가 drag&drop틀인 div위에 있을때 dashed -> solid
    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    //dragleave, dragend 일경우 drag&drop의 틀 div에 클래스 drop-zone--over제거
    ["dragleave", "dragend"].forEach(type => {
        dropZoneElement.addEventListener(type, e => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    //파일을 끌어다 놨을때
    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();  //해당 파일이 실행되는것을 방지

        //drop했을때 파일이 존재한다면
        if (e.dataTransfer.files.length) {

            inputElement.files = e.dataTransfer.files; //드래그엔드롭한 파일을 인풋 태그파일에 넣는코드
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]); //
        }

        //solid -> dashed
        dropZoneElement.classList.remove("drop-zone--over");
    });

    
    
});

//dropZoneElement는 drag&drop 틀이되는 div
//file은 drag&drop 한 file
function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
    let submitButton = document.getElementById("subbtn");

    //첫번쨰의 경우 prompt를 제거한다 즉 글귀(span) 제거
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    //첫번쨰로는 thumbnailElement가 없기에 만들어준다
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    //아래 파일이름 추가
    thumbnailElement.dataset.label = file.name;

    //thumbnail을 이미지 파일로 보여준다
    if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`
        }
        $("#rightWindow").css("display", "block");
        //submitButton.disabled = "false";
    } else { //이미지 타입이 아닐경우 null
        thumbnailElement.style.backgroundImage = null;
        //submitButton.disabled = "disabled";
    }   
}

 //
 let fileInput = document.getElementById("fileselector");



 $(document).on('click', '#sbtn1', function () {
     $(".ForwriteDlg").css("display", "block");
     $("#rightWindow").css("display", "none");
     writeDlg.showModal();
 });

 $("#cancelBtn").on("click",function() {
     closeBtn();
 })

//  fileInput.addEventListener("change", e => {
//      $("#rightWindow").css("display", "block");
//  })

function closeBtn() {
    
    writeDlg.close();
    fileInput.value = '';
    $(".ForwriteDlg").css("display", "none");
 }