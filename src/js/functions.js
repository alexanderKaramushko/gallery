// Функции

// Функция получения данных с сервера
function get(url) { 
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.open('GET', url, true);
        // request.responseType = type;
        request.send();
    
        request.addEventListener('load', () => {
            if (request.status != 200) {
                reject();
            } else {
                // Второй аргумент нужен для проверки типа приходящих данных, чтобы понять парсить ли нам JSON или просто вставлять src до картинки
                resolve({response: request.response, header: request.getAllResponseHeaders('Content-Type')});
            }
        })
    })
}

// Функция размещения данных на сервер
function post(url, body) {
    let postRequest = new XMLHttpRequest();

    postRequest.open('POST', url, false);
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(body);
}

// Функция отрисовки новых изображений
function createImg({url, width, height}) {
    let img = new Image();
    img.src = url;

    // Рассчитываем новые пропорции согласно нашей фиксированный высоте в 200px
    let calcNewWidth = width/(height/200);
    img.style.width = `${calcNewWidth}px`;

    img.classList.add('gallery__img');

    document.querySelector('.gallery__list').append(img);
}

// Функция обновления галереи при перезагрузке окна браузера
function updateImgList() {
    get('http://localhost:3000/galleryImages', 'application/json').then(({response}) => {
        JSON.parse(response).forEach(e => {
            createImg(e); 
        })
    })
}