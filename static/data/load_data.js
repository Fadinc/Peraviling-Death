document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('static/data/data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        const contentMap = {
            'txt-concept': 'story_concept',
            'txt-story': 'story_annotation',
            'txt-tech': 'tech_description',
            'txt-abilities': 'abilities_intro',
            'txt-anatomy': 'anatomy_main',
            'txt-map': 'map_comment',
            'txt-manifestation': 'manifestation_details',
            'txt-character': 'character_descr'
        };
        
        // Универсальная замена контента
        for (const [elementId, jsonKey] of Object.entries(contentMap)) {
            const element = document.getElementById(elementId);
            if (element && data[jsonKey]) {
                element.innerHTML = data[jsonKey]; 
            }
        }
        
        console.log('✅ Текстовый контент успешно загружен из JSON');
        
    } catch (error) {
        console.warn('⚠️ Не удалось загрузить JSON, используется статический HTML:', error.message);
        // Fallback: ничего не делаем, остается текст из HTML
    }
});

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
    overlay.addEventListener('click', closePanel); // Закрытие по клику на затемнение

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