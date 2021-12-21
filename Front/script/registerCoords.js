$(function() {
    
    let coords = document.location.href.split('/');
    console.log(coords[coords.length - 2]);
    console.log(coords[coords.length - 3]);
    
    let lat = coords[coords.length - 2];
    let lng = coords[coords.length - 3];
    let comment = coords[coords.length - 1];

    console.log('lat : ',lat)
    console.log('lng : ',lng)
    console.log('comment : ',comment)
    console.log(typeof(lat),typeof(lng));
    console.log(typeof(parseFloat(lat)),parseFloat(lat));

    let newcoords;
    if(lat != 0 && lng != 0) 
        newcoords = new kakao.maps.LatLng(lat,lng);
    else
        newcoords = new kakao.maps.LatLng(35.24872579785369, 128.9028173515892);
    console.log('newcoords : ',newcoords);

    var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
    var mapOption = { 
        center: new kakao.maps.LatLng(newcoords.La,newcoords.Ma), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
    }); 
    // 지도에 마커를 표시합니다
    marker.setMap(map);

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    var latlng;
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
        
        // 클릭한 위도, 경도 정보를 가져옵니다 
        latlng = mouseEvent.latLng;
        
        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latlng);
        
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
        
        var resultDiv = document.getElementById('clickLatlng'); 
        resultDiv.innerHTML = message;
    });

    $("#submitBtn").on('click',submitCoords);

    function submitCoords() {
        
        if(newcoords.La != 0 && newcoords.Ma != 0){
            $.ajax({
                url : '/map/submitCoords',
                type : 'POST',
                data : {
                    lat : newcoords.getLat(),
                    lng : newcoords.getLng(),
                    comment : comment,
                }
            })           
            .done(function(response) {
                console.log(response);
                if(response.result == 'redirect') {
                    window.location.replace("http://localhost:3000/");
                }
            })
        }
    }

})