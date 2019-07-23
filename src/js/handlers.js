// Обработчики

// Загрузка картинок с сервера при перезагрузке окна браузера
document.addEventListener('DOMContentLoaded', () => {
    updateImgList();

    // Вызываем функцию полифилла для object-fit для IE 11 и меньше
    objectFitImages();
})

// Загрузка по прямой ссылке к картинке или к JSON файлу с прямыми ссылками на картинки
document.querySelector('#load-img-by-url').onclick = e => {
    e.preventDefault();

    let imgUrl = document.querySelector('#url-input').value;

    // Регулярка для проверки на правилность ввода урла
    let urlMatch = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+|www\.[a-zA-Z0-9]+)/gi;
    let urlRegexp = new RegExp(urlMatch);

    if (imgUrl == '') {
        alert('Enter URL!');
        return;
    }

    if (!imgUrl.match(urlRegexp)) {
        alert('Invalid URL!');
        return;
    }

    get(imgUrl).then(({response, header}) => {
        if (header.indexOf('application/json') !== -1) {
            let parsedJSON = JSON.parse(response);

            parsedJSON.forEach(e => {
                post('http://localhost:3000/galleryImages', JSON.stringify(e));

                createImg(e);
            });
        }

        if (header.indexOf('image/jpeg') !== -1) {
            post('http://localhost:3000/galleryImages', JSON.stringify({url: imgUrl}));

            createImg({url: imgUrl});
        }
    })
}

// Загрузка JSON файла с комьютера
document.querySelector('#load-img-by-json').onchange = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader(file);

    // IE почему-то возвращает пустой type, поэтому делаю проверку на JSON файл через name
    if (!file.name.match(/.json/g)) {
        alert('Load JSON file!');
        return;
    }

    fileReader.onload = () => {
        let parsedJSON = JSON.parse(fileReader.result);
        let galleryIndex = Object.keys(parsedJSON)[0];

        parsedJSON[galleryIndex].forEach(e => {
            post('http://localhost:3000/galleryImages', JSON.stringify(e));

            createImg(e);
        });
    }

    fileReader.readAsText(file);
 }