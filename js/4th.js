        // 플레이리스트 항목을 가져옴
        const playlistItems = document.querySelectorAll('.playlist li');
        const audioPlayer = document.getElementById('audio-player');
        const audioSource = document.getElementById('audio-source');
        const currentSong = document.getElementById('current-song');

        // 각 항목 클릭 시 해당 노래를 재생하도록 설정
        playlistItems.forEach(item => {
            item.addEventListener('click', () => {
                const songPath = item.getAttribute('data-src'); // 노래 경로 가져오기
                audioSource.src = songPath; // audio의 source에 노래 경로 설정
                audioPlayer.load(); // 새 노래 로드
                audioPlayer.play(); // 노래 재생
                currentSong.textContent = `현재 재생 중: ${item.textContent}`; // 현재 재생 중인 노래 표시
            });
        });