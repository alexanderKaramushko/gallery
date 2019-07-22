
// Функция получения данных с сервера
function get(url, type) { 
    return new Promise((succeed, fail) => {
        let request = new XMLHttpRequest();

        request.open('GET', url, true);
        request.responseType = type;
        request.send();
    
        request.addEventListener('load', () => {
            if (request.status != 200) {
                fail();
            } else {
                succeed(request.response);
            }
        })
    })
}

// Функция для размещения данных на сервере
function post(url, body) {
    let postRequest = new XMLHttpRequest();

    postRequest.open('POST', url, false);
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(body);
}

// Функция отрисовки новых изображений
function createImg(responseUrl) {
    let img = document.createElement('img');
    let url = window.URL || window.webkitURL;
    img.classList.add('gallery__img');
    img.src = url.createObjectURL(responseUrl);
    document.querySelector('.gallery__list').append(img);

    objectFitImages();
}

// Функция загрузки изображений после перезагрузки окна браузера
function udpateAfterReload() {
    get('http://localhost:3000/images', 'application/json').then(result => {
        JSON.parse(result).forEach(e => {
            get(e.url, 'blob').then(responseURL => {
                createImg(responseURL); 
            })
        });
    })
}