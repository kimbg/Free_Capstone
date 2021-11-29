var content = function(data) {
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
                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>  
            </div>  
        </div>  
    </div>     
</div>;
    `
}



var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(35.24737353430608000, 128.90290783503153000), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var positions = [];

var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 



$(function() {
    $.ajax({
        url : '/getMarkers',
        type : 'POST'
    })
    .done(function(data) {
        console.log("js 데이터 받음",data);
        console.log("데이터 길이 : ",data.length);
        for(var i = 0 ; i < data.length; i++){           
            // let marker = ({
            //     title : `${i}`,
            //     latlng : new kakao.maps.LatLng(data[i].lat,data[i].lng)
            // })

            //마카 생성
            let marker = new kakao.maps.Marker({
                map : map,
                position : new kakao.maps.LatLng(data[i].lat,data[i].lng),
                swit : true
            })

            let overlay = new kakao.maps.CustomOverlay({
                content: content(data[i]),
                map: map,
                position: marker.getPosition()       
            });

            kakao.maps.event.addListener(marker,'click',function() {
                if(marker.swit == true) {
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

