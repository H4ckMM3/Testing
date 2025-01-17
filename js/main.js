const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('nav ul');
const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на пункт меню
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.burger-menu')) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const sliderContainer = document.querySelector('.slider-container');
const sliderNav = document.querySelector('.slider-nav');

// Создаем точки навигации
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    sliderNav.appendChild(dot);
});

function updateSlider() {
    const slideWidth = slides[0].offsetWidth; // Получаем актуальную ширину слайда
    sliderContainer.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    document.querySelectorAll('.slider-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

document.querySelector('.slider-next').addEventListener('click', nextSlide);
document.querySelector('.slider-prev').addEventListener('click', prevSlide);

// Автоматическая смена слайдов
setInterval(nextSlide, 5000);

// Открытие/закрытие модального окна
document.getElementById('openModal').addEventListener('click', () => {
    document.getElementById('feedbackModal').style.display = 'block';
});

document.getElementById('feedbackModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('feedbackModal')) {
        document.getElementById('feedbackModal').style.display = 'none';
    }
});

// Сортировка товаров
document.getElementById('sort').addEventListener('change', (e) => {
    const products = Array.from(document.querySelectorAll('.product'));
    const container = document.querySelector('.products');
    
    products.sort((a, b) => {
        const priceA = parseInt(a.querySelector('p').textContent);
        const priceB = parseInt(b.querySelector('p').textContent);
        const nameA = a.querySelector('h3').textContent;
        const nameB = b.querySelector('h3').textContent;
        
        switch(e.target.value) {
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            case 'name':
                return nameA.localeCompare(nameB);
        }
    });
    
    container.innerHTML = '';
    products.forEach(product => container.appendChild(product));
});

// Обработка формы
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Форма отправлена!');
    document.getElementById('feedbackModal').style.display = 'none';
});