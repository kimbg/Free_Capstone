function content (data) {
    return `
     <div class="wrap">  
     <div class="info">  
        <div class="title">  
            사진이름 : ${data.number}              
        </div>  
        <div class="body">  
            <div class="img"> 
                <img src="http://localhost:3000/photo/${data.number}.jpg" width="73" height="70"> 
           </div>  
            <div class="desc">  
                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>  
                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>  
                <div><a href="http://localhost:3000/page/post/${data.number}" target="_blank" class="link">게시글 보기</a></div>  
            </div>  
        </div>  
    </div>     
</div>
    `
}



var mapContainer = document.getElementById('map') // 지도를 표시할 div 
var mapOption = { 
    center: new kakao.maps.LatLng(35.24737353430608000, 128.90290783503153000), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
var geocoder = new kakao.maps.services.Geocoder(), //주소-좌표 변환 객체를 생성한다.
    infowindow = new kakao.maps.InfoWindow({zindex:1});

function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }    
}

// 좌표로 행정동 주소 정보를 요청합니다
function searchAddrFromCoords(coords, callback) {    
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}


// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

let overlays = [];


$(function() {
    $.ajax({
        url : '/map/getMarkers',
        type : 'POST'
    })
    .done(function(data) {
        
        let name = data.user.user.name;
        $("#profile_img").attr("src",`http://localhost:3000/profile/${name}.jpg`)
        $("#profile_name").text(name);
        
        for(var i = 0 ; i < data.DBdata.length; i++){                      
            console.log("받은 데이터",i);
            console.log(data.DBdata[i]);
            let marker = new kakao.maps.Marker({
                map : map,
                position : new kakao.maps.LatLng(data.DBdata[i].lat,data.DBdata[i].lng),
            })

            let overlay = new kakao.maps.CustomOverlay({
                content: content(data.DBdata[i]),
                map: map,
                position: marker.getPosition()       
            });
            

            //얘는 처음부터 부연설명 창이 뜨니까 난잡해서 없애고, 기본적인 값 초기화
            if(marker.swit === undefined){ 
                overlay.setMap(null);
                marker.title = data.DBdata[i].number;
                marker.picAddress = `http://localhost:3000/photo/${data.DBdata[i].number}.jpg`;
                marker.comment =  data.DBdata[i].comment;
                marker.username = data.DBdata[i].user_id;
            }

            overlays.push(overlay);

            kakao.maps.event.addListener(marker,'click',function() {
                setting(marker);
                overlay.setMap(map);
            })            
        }
    })
})

function setting(marker) {
    $("#mainName").text(marker.title);
    $("#mainPhoto").attr("src",marker.picAddress);
    $("#username").text(marker.username);
    for(let i = 0 ; i < overlays.length; i++){
        overlays[i].setMap(null);
    }
}
