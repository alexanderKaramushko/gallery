// Полифилл для промисов
//=require ../../node_modules/promise-polyfill/dist/polyfill.min.js

// Полифилл для object-fit для IE 11 и меньше
//=require ../../node_modules/object-fit-images/dist/ofi.min.js

//=require append-polyfill.js
//=require functions.js

// Отрисовываем изображения с сервера после перезагрузки окна браузера
document.addEventListener("DOMContentLoaded", udpateAfterReload);

// Событие добавления нового изображения по URL
document.querySelector('.gallery__add').onclick = e => {
    e.preventDefault();
    let imgURL = document.querySelector('.gallery__url').value;

    if (!imgURL) {
        alert('No URL entered!');
        return;
    }

    get(imgURL, 'blob')
    .then(responseURL => {
        createImg(responseURL);

        return JSON.stringify({url: imgURL});
    })
    .then(result => {
        return post('http://localhost:3000/images', result);
    })
    .catch(function(error){
        alert('Uncorrect URL or broken link!');
    })
}

// Событие импорта изображений через JSON
document.querySelector('.gallery__load').onchange = e => {
    let file = e.target.files[0];

    // Условие с багфиксом в IE 11 и меньше. Он не определяет type автоматически
    if (file.name.match(/.json/g)) {
        let reader = new FileReader();

        reader.onload = function (e) {
            // !
            let parsedObj = JSON.parse(e.target.result);
            let imgIndex = Object.keys(parsedObj)[0];
            let imgArr = parsedObj[imgIndex];

            var i = 0;
    
            while (i < imgArr.length) {
                post('http://localhost:3000/images', JSON.stringify(imgArr[i]));
                i++;
            }

            document.location.reload();
        }
    
        reader.readAsText(file);
    } else {
        alert('Choose JSON file!')
    }
}