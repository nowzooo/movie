const pupil = document.getElementById('pupil');
    const sparkle = pupil.querySelector('.sparkle');
    const videoContainer = document.querySelector('.video-container');
    let eyeRect;
    let isVideoLoaded = false; // 비디오가 로드되고 애니메이션이 끝났는지 추적하는 변수

    // eyeRect를 업데이트하는 함수
    function updateEyeRect() {
        eyeRect = videoContainer.getBoundingClientRect();
    }

    // 비디오가 로드되었을 때 애니메이션 끝난 후
    document.querySelector('video').addEventListener('canplaythrough', () => {
        isVideoLoaded = true;
    });

    // 페이지 로드 및 리사이즈 시 eyeRect 업데이트
    window.addEventListener('load', updateEyeRect);
    window.addEventListener('resize', updateEyeRect);

    // 마우스 이동 이벤트 처리
    document.addEventListener('mousemove', (event) => {
        if (!isVideoLoaded) return; // 비디오가 로드되지 않으면 눈동자가 움직이지 않음

        if (!eyeRect) return; // eyeRect가 초기화되지 않은 경우 처리 방지

        const { clientX, clientY } = event;

        // 눈 중심 좌표 계산
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        // 마우스 방향으로 눈동자 이동
        const deltaX = clientX - eyeCenterX;
        const deltaY = clientY - eyeCenterY;

        // 눈과 눈동자가 움직일 수 있는 범위 제한
        const maxMovementX = (eyeRect.width / 2) - (pupil.offsetWidth / 2); // pupil의 반지름을 고려한 제한
        const maxMovementY = (eyeRect.height / 2) - (pupil.offsetHeight / 2); // pupil의 반지름을 고려한 제한

        // deltaX와 deltaY의 범위 제한
        const limitedX = Math.max(-maxMovementX, Math.min(maxMovementX, deltaX / 40));
        const limitedY = Math.max(-maxMovementY, Math.min(maxMovementY, deltaY / 10));

        // 눈과 눈동자 위치 업데이트
        pupil.style.transform = `translate(${limitedX}px, ${limitedY}px)`;
        // eye는 pupil의 부모 요소로 계속 따라가게 됨
        document.querySelector('.eye').style.transform = `translate(-50%, -50%) translate(${limitedX}px, ${limitedY}px)`;
    });

    // 초기 eyeRect 설정
    updateEyeRect();