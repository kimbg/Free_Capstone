function content (data) {
    return `
     <div class="wrap">  
     <div class="info">  
        <div class="title">  
            카카오${data.num}              
        </div>  
        <div class="body">  
            <div class="img"> 
                <img src="http://localhost:3000/image/${data.num}" width="73" height="70"> 
           </div>  
            <div class="desc">  
                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>  
                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>  
                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">게시글 보기</a></div>  
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




$(function() {
    $.ajax({
        url : 'map/getMarkers',
        type : 'POST'
    })
    .done(function(data) {
        for(var i = 0 ; i < data.length; i++){                      
            
            let marker = new kakao.maps.Marker({
                map : map,
                position : new kakao.maps.LatLng(data[i].lat,data[i].lng),
                swit : true,
            })

            let overlay = new kakao.maps.CustomOverlay({
                content: content(data[i]),
                map: map,
                position: marker.getPosition()       
            });

            //얘는 처음부터 부연설명 창이 뜨니까 난잡해서 없애는 코드
            if(marker.swit === undefined){ 
                overlay.setMap(null);
                marker.swit = false;
            }

            kakao.maps.event.addListener(marker,'click',function() {
                if(marker.swit) {
                    overlay.setMap(null);
                }
                else if(marker.swit == false){
                    overlay.setMap(map);
                }
                marker.swit = !marker.swit;
            })
        }        
    })
})

