function scrollToNextSection() {
    document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener("DOMContentLoaded", function () {
    const sliderContainer = document.querySelector('.section4__slider-container'); // קונטיינר של הסליידים
    const slides = document.querySelectorAll('.section4__slide'); // כל הסליידים
    const prevButton = document.querySelector('.section4__control-button--prev'); // כפתור לחזרה לאחור
    const nextButton = document.querySelector('.section4__control-button--next'); // כפתור למעבר קדימה
  
    let currentIndex = 0;
  
    function updateSliderPosition() {
        const slideWidth = slides[0].offsetWidth + 20; p
        sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  
    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
        }
        updateSliderPosition();
    });
  
    nextButton.addEventListener('click', function () {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        }
        updateSliderPosition();
    });
  
    window.addEventListener('resize', updateSliderPosition);
  });
  




  document.addEventListener("DOMContentLoaded", function () {
    // בוחר את המיכל של הסליידים
    const sliderContainer = document.querySelector('.section4__slider-container');
    
    // בוחר את כל הסליידים
    const slides = document.querySelectorAll('.section4__slide');
    
    // בוחר את כפתור ה-"prev" לחזרה אחורה
    const prevButton = document.querySelector('.section4__control-button--prev');
    
    // בוחר את כפתור ה-"next" למעבר קדימה
    const nextButton = document.querySelector('.section4__control-button--next');

    // משתנה לשמירת המיקום הנוכחי של הסלייד (אינדקס)
    let currentIndex = 0;

    // פונקציה לעדכון מיקום הסליידר
    function updateSliderPosition() {
        // מחשב את ההזזה של הסלייד לפי רוחב הסלייד והמרווח ביניהם
        const slideWidth = slides[0].offsetWidth + 20; // רוחב הסלייד + רווח בין סליידים
        sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // הזזת הסלייד לפי האינדקס הנוכחי
    }

    // מאזין ללחיצה על כפתור "prev" ומעדכן מיקום
    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) { // בדיקה אם לא מדובר בסלייד הראשון
            currentIndex--; // הורדת אינדקס ב-1 כדי לזוז אחורה
            updateSliderPosition(); // קריאה לפונקציה לעדכון המיקום
        }
    });

    // מאזין ללחיצה על כפתור "next" ומעדכן מיקום
    nextButton.addEventListener('click', function () {
        if (currentIndex < slides.length - 1) { // בדיקה אם לא מדובר בסלייד האחרון
            currentIndex++; // העלאת אינדקס ב-1 כדי לזוז קדימה
            updateSliderPosition(); // קריאה לפונקציה לעדכון המיקום
        }
    });

    // מאזין לשינוי בגודל החלון ומעדכן את מיקום הסלייד
    window.addEventListener('resize', updateSliderPosition); // קריאה לפונקציה כדי לשמור על התאמת הסלייד לגודל החדש
});


document.addEventListener("DOMContentLoaded", function () {
    // Находим элемент меню 'DESTINATION'
    const destinationMenuItem = document.querySelector(".header__nav-links li:nth-child(3) a");

    if (!destinationMenuItem) {
        console.error("Элемент меню 'DESTINATION' не найден.");
        return;
    }

    // Создаем элемент попапа
    const popup = document.createElement("div");
    popup.classList.add("destination-popup");
    popup.innerHTML = `
        <ul class="destination-list" style="list-style: none; padding-left: 0; margin: 0; text-align: left;">
            <li style="margin-bottom: 10px;"><a href="NorthTour.html" class="destination-item">North</a></li>
             <li style="margin-bottom: 10px;"><a href="JerusalemTour.html" class="destination-item">East</a></li>
            <li style="margin-bottom: 10px;"><a href="#" class="destination-item">Centre</a></li>
            <li style="margin-bottom: 10px;"><a href="#" class="destination-item">South</a></li>
        </ul>
    `;

    // Добавляем стили для попапа
    popup.style.position = "absolute";
    popup.style.top = "100%";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.padding = "10px";
    popup.style.backgroundColor = "#fff";
    popup.style.color = "#000";
    popup.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
    popup.style.display = "none";
    popup.style.zIndex = "5000"; // Увеличено значение z-index для отображения поверх других элементов
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.3s ease";
    popup.style.pointerEvents = "all";
    destinationMenuItem.parentElement.style.position = "relative";

    // Добавляем попап в документ
    destinationMenuItem.parentElement.appendChild(popup);

    // Добавляем стили для пунктов попапа, чтобы они соответствовали стилю 'DESTINATION'
    const style = document.createElement('style');
    style.innerHTML = `
        .destination-item {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 22px;
            color: #000;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .destination-item:hover {
            color: #87CEEB;
        }
    `;
    document.head.appendChild(style);

    // Обработчики событий для отображения и скрытия попапа
    const showPopup = () => {
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.opacity = "1";
        }, 10);
    };

    const hidePopup = () => {
        setTimeout(() => {
            if (!popup.matches(':hover') && !destinationMenuItem.matches(':hover')) {
                popup.style.opacity = "0";
                setTimeout(() => {
                    popup.style.display = "none";
                }, 300);
            }
        }, 100);
    };

    destinationMenuItem.addEventListener("mouseenter", showPopup);
    popup.addEventListener("mouseenter", showPopup);

    destinationMenuItem.addEventListener("mouseleave", hidePopup);
    popup.addEventListener("mouseleave", hidePopup);
});

document.addEventListener("DOMContentLoaded", function() {
    // Находим форму по ID и добавляем обработчик события на отправку
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            // Проверяем, заполнено ли хотя бы одно из полей email или phone
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (email === "" && phone === "") {
                alert("Please provide at least one contact information: Email or Phone Number.");
                return;
            }

            // Показываем оверлей и сообщение об успехе
            const overlay = document.getElementById('overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
        });
    } else {
        console.error("Element with ID 'contactForm' not found.");
    }
});

// Функция для закрытия оверлея и сброса формы
function closeOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset(); // Очищаем поля формы
    }
}


