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