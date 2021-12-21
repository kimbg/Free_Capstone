$(function() {
    
    let coords = document.location.href.split('/');
    console.log(coords[coords.length - 1]);
    console.log(coords[coords.length - 2]);
    
    let lat = coords[coords.length - 1];
    let lng = coords[coords.length - 2];

    console.log('lat : ',lat)
    console.log('lng : ',lng)

    let newcoords;
    if(lat != 0 && lng != 0) 
        newcoords = new kakao.maps.LatLng(lat,lng);
    else
        newcoords = new kakao.maps.LatLng(35.24872579785369, 128.9028173515892);
    
        console.log('newcoords',newcoords);

    var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
    var mapOption = { 
        center: new kakao.maps.LatLng(newcoords.La,newcoords.Ma), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var marker = new kakao.maps.Marker({ 
        position: map.getCenter() 
    }); 
    marker.setMap(map);

    var latlng;
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
        latlng = mouseEvent.latLng; 
        
        marker.setPosition(latlng);
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        var resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;
        
    });
    $("#submitBtn").on('click',submitCoords);

    function submitCoords() {
        
        if(newcoords.La != 0 && newcoords.Ma != 0){
            alert("확인");
            $.ajax({
                url : '/map/submitCoords',
                type : 'POST',
                data : {
                    lat : newcoords.getLat(),
                    lng : newcoords.getLng(),
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