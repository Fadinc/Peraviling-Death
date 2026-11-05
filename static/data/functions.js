/* подменю Заметок */
document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('keeps-trigger');
    const panel = document.getElementById('keeps-side-panel');
    const overlay = document.getElementById('side-panel-overlay');
    const closeBtn = document.getElementById('side-panel-close');

    function openPanel() {
        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('panel-open');
    }

    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('panel-open');
    }

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel); 

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });

    // Закрытие при клике на ссылку внутри панели
    panel.querySelectorAll('.side-panel-link').forEach(link => {
        link.addEventListener('click', closePanel);
    });
});

/* открытие изображений полноэкранное */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

function openModal(src) {
    if (!modal || !modalImg) return;
    
    modalImg.src = src;
    modal.showModal();
}

function closeModal() {
    if (!modal) return;
    
    modal.close();
    // Очищаем src после закрытия, чтобы не мелькала старая картинка при следующем открытии
    setTimeout(() => { modalImg.src = ''; }, 300); 
}

// Закрытие по клику на затемненный фон (backdrop)
modal.addEventListener('click', (e) => {
    const rect = modal.getBoundingClientRect();
    // Если клик был вне области самого диалога (на backdrop)
    if (e.clientX < rect.left || e.clientX > rect.right || 
        e.clientY < rect.top || e.clientY > rect.bottom) {
        closeModal();
    }
});

// Закрытие по Escape работает автоматически благодаря showModal()
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.open) {
        closeModal();
    }
});

const infoModal = document.getElementById('info-modal');
const infoImg = document.getElementById('info-modal-img');
const infoTitle = document.getElementById('info-modal-title');
const infoDesc = document.getElementById('info-modal-desc');

// Открытие модалки с текстом
function openInfoModal(imgSrc, title, description) {
    if (!infoModal) return;
    
    infoImg.src = imgSrc;
    infoTitle.textContent = title;
    infoDesc.innerHTML = description; // Поддерживает <br> и <strong>
    
    infoModal.showModal();
}

// Закрытие модалки с текстом
function closeInfoModal() {
    if (!infoModal) return;
    infoModal.close();
    // Очистка после анимации закрытия
    setTimeout(() => { 
        infoImg.src = ''; 
        infoTitle.textContent = ''; 
        infoDesc.innerHTML = ''; 
    }, 300);
}

// Закрытие по клику на фон (backdrop)
infoModal.addEventListener('click', (e) => {
    const rect = infoModal.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) closeInfoModal();
});