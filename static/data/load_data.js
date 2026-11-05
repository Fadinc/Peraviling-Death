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
        
        console.log('Текстовый контент успешно загружен из JSON');
        
    } catch (error) {
        console.warn('Не удалось загрузить JSON, используется статический HTML:', error.message);
    }
});