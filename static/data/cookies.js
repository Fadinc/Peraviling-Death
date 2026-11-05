// Функция установки cookie
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

//30 дней * 24 часа * 60 минут * 60 секунд * 1000 мс
setCookie('user_consent', 'accepted', { 
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});