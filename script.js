// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Плавный скролл для всех внутренних ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Форма аудита
const auditForm = document.querySelector('.audit-form');
if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Сбор данных формы
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData);
        
        // Здесь должна быть отправка на сервер
        console.log('Данные формы:', formValues);
        
        // Сообщение об успехе
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Заявка отправлена!';
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            this.reset();
        }, 3000);
    });
}

// Анимация стикеров
function animateStickers() {
    const stickers = document.querySelectorAll('.sticker');
    
    stickers.forEach((sticker, index) => {
        sticker.style.animationDelay = `${index * 0.5}s`;
    });
}

// Инициализация при загрузке
window.addEventListener('load', () => {
    animateStickers();
    
    // Добавляем класс для анимации появления
    document.body.classList.add('loaded');
});