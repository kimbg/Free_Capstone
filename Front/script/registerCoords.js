$(function() {
    
    let coords = document.location.href.split('/');
    console.log(coords[coords.length - 1]);
    console.log(coords[coords.length - 2]);
    
    let lat = coords[coords.length - 1];
    let lng = coords[coords.length - 2];

    console.log('lat : ',lat)
    console.log('lng : ',lng)

    
    let newcoords;
    var latlng;

    if(lat != 0 && lng != 0)   
        newcoords = new kakao.maps.LatLng(lng,lat);
    else { //사진에 메타데이터 없는경우
        newcoords = new kakao.maps.LatLng(35.24872579785369,128.9028173515892);        
        latlng = newcoords;           
    } 
    
    console.log(newcoords);
     
    var  mapOption = { 
        center: newcoords, // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
    var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
    

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var marker = new kakao.maps.Marker({ 
        position: map.getCenter() 
    }); 
    marker.setMap(map);

    
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
        latlng = mouseEvent.latLng;         
        console.log(latlng);

        marker.setPosition(latlng);
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        var resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;
        
    });
    $("#submitBtn").on('click',submitCoords);

    function submitCoords() {
        
        if(newcoords.La != 0 && newcoords.Ma != 0){
            alert("게시물이 등록되었습니다!");
            $.ajax({
                url : '/map/submitCoords',
                type : 'POST',
                data : {
                    lat : newcoords.La,
                    lng : newcoords.Ma,
                }
            })           
            .done(function(response) {
                console.log(response);
                if(response.result == 'redirect') {
                    window.location.replace("/");
                }
            })
        }
    }

})