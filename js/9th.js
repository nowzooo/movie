function generateRandomImage() {
    // 폴더에서 불러올 수 있는 이미지 파일 목록 (여기서는 이미지 파일명만 지정)
    const imageFiles = [
      'img/20_the_truman_show.jpg',  // img 폴더 내 이미지 경로
      'img/dpkz4yiXoaYvYP2WoRP09UmrAh6.jpg',
      'img/rajTvnpDKRupZPpKJRxeJMKrIs6.jpg',
      'img/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      'img/3sSXrvJPXjUCncgFDU6BkIVjNRA.jpg'
    ];

    // 랜덤으로 이미지 선택
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const imageSrc = imageFiles[randomIndex]; // img 폴더에서 불러옴

    // 랜덤 위치 생성 (가로, 세로 위치)
    const randomX = Math.floor(Math.random() * window.innerWidth);  // 화면 너비 내에서 랜덤 X 위치
    const randomY = Math.floor(Math.random() * window.innerHeight); // 화면 높이 내에서 랜덤 Y 위치

    // 새 <img> 요소 생성
    const newImage = document.createElement('img');
    newImage.src = imageSrc; // 랜덤 이미지 경로
    newImage.alt = '랜덤 이미지';
    newImage.className = 'random-image';

    // 이미지 크기 설정 (옵션, 예: 100px x 100px)
    newImage.style.width = '10rem';
    newImage.style.height = '15rem';

    // 이미지의 랜덤 위치 설정
    newImage.style.left = `${randomX}px`;
    newImage.style.top = `${randomY}px`;

    // <body>에 이미지 추가
    document.body.appendChild(newImage);
  }