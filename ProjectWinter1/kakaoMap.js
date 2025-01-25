var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = {
    center: new kakao.maps.LatLng(37.56735, 126.97618), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
    mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도 종류
};

// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption);

// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 지도 시점 변화 완료 이벤트를 등록한다
kakao.maps.event.addListener(map, 'idle', function () {
var message = '지도의 중심좌표는 ' + map.getCenter().toString() + ' 이고,' + 
                '확대 레벨은 ' + map.getLevel() + ' 레벨 입니다.';
console.log(message);
});

var markers = []; // 마커들을 저장할 배열

// 지도 클릭 이벤트 리스너 등록 (지도를 클릭하면 마커 추가)
kakao.maps.event.addListener(map, 'click', function (event) {
// 클릭된 좌표 얻기
var latLng = event.latLng;

// 마커를 생성한다
var marker = new kakao.maps.Marker({
    position: latLng,
    draggable: true, // 드래그 가능하도록 설정
    map: map // 마커를 지도에 표시
});

// 마커 배열에 마커 추가
markers.push(marker);

// 클릭된 마커에 대한 인포윈도우 생성
var infowindow = new kakao.maps.InfoWindow({
    content: `
        <div style="padding:5px;">
            <label for="restaurantName">식당 이름:</label>
            <input type="text" id="restaurantName" placeholder="식당 이름">
            <label for="restaurantDescription">내용:</label>
            <input type="text" id="restaurantDescription" placeholder="식당 내용">
            <button id="saveButton">저장</button>
        </div>
    `
});

// 인포윈도우를 클릭된 마커 위에 표시
infowindow.open(map, marker);

// 저장 버튼 클릭 시 입력된 데이터 저장
document.getElementById('saveButton').addEventListener('click', function () {
    var restaurantName = document.getElementById('restaurantName').value;
    var restaurantDescription = document.getElementById('restaurantDescription').value;

    if (restaurantName && restaurantDescription) {
        // 인포윈도우 내용 수정
        infowindow.setContent(`
            <div style="padding:5px;">
                <strong>${restaurantName}</strong><br>
                ${restaurantDescription}
            </div>
        `);

        // 마커에 관련 정보 저장 (예: 제목, 내용 등)
        marker.setTitle(restaurantName);
        marker.setClickable(true);

        // 추가 작업 (예: 데이터베이스에 저장) 등을 할 수 있습니다.
    } else {
        alert('식당 이름과 내용을 입력해주세요!');
    }
});
});