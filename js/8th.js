function startDownload() {
    var messageElement = document.getElementById('message');
    
    // 다운로드 시작 메시지 표시
    messageElement.textContent = '다운로드 시작';
    messageElement.style.display = 'block'; // 메시지 보이도록 설정

    // 3초 후 다운로드 완료 메시지로 변경
    setTimeout(function() {
        messageElement.textContent = '다운로드 완료!';
    }, 3000); // 3초 후
}