const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const likeButtons = document.querySelectorAll('.like-btn');

let currentIndex = 0;

// Update the slider position
function updateSliderPosition() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Go to the previous slide
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSliderPosition();
});

// Go to the next slide
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSliderPosition();
});

// Handle like button click
likeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '💚 Liked' : '❤️ Like';
  });
});
