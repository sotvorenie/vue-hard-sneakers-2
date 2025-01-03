import {useAbsoluteBlockStore} from "@/store/absoluteBlockStore.js";

let absoluteBlockStore;
window.addEventListener('DOMContentLoaded', () => {
    absoluteBlockStore = useAbsoluteBlockStore();
})
let absoluteBlock;

let topCoordinate;
let leftCoordinate;

let width;

let viewBlock;

function viewPhotoAnimation(event) {
    const {target} = event;

    const parent = target.parentNode;

    //узнаем коориданаты первоначальной фотографии (до нажатия), чтобы "вернуть" ее потом на место
    let coordinate = parent.getBoundingClientRect();
    topCoordinate = coordinate.top + coordinate.width/2;
    leftCoordinate = coordinate.left + coordinate.width/2;

    //узнаем размеры первоначальной фотографии
    width = coordinate.width;

    //изменяем root переменные, чтобы они применились в keyframes to
    document.documentElement.style.setProperty('--left', `${leftCoordinate}px`);
    document.documentElement.style.setProperty('--top', `${topCoordinate}px`);
    document.documentElement.style.setProperty('--width', `${width}px`);

    //делаем задний полупрозрачный фон и убираем прокрутку у body
    let top = window.scrollY;
    absoluteBlock = document.querySelector('.absolute-block');
    absoluteBlock.style.background = 'transparent';
    setInterval(() => {
        absoluteBlock.style.background = '';
    }, 100)
    absoluteBlock.style.top = `${top}px`;
    absoluteBlockStore.absoluteBlockVisible = true;
    document.body.classList.add('body-overflow-hidden');

    //берем src фото по которому кликнули и передаем его в src для показа
    absoluteBlockStore.imageViewSrc = target.src;

    //получаем DOM-элемент нашего предпросмотра
    viewBlock = document.querySelector('.view-photo');

    //перемещаем блок предпросмотра фото на место оригинального фото и задаем ему размеры оригинального фото
    viewBlock.style.width = `${width}px`;
    viewBlock.style.left = `${leftCoordinate}px`;
    viewBlock.style.top = `${topCoordinate}px`;

    //отрисовываем блок показа фото
    absoluteBlockStore.viewImageBlockVisible = true;

    //задаем этому блоку класс для анимации перехода к центру страницы
    viewBlock.classList.add('view-photo--active');
}

function closePhotoAnimation() {
    viewBlock.classList.remove('view-photo--active');
    viewBlock.style.width = `min(500px, 90%)`;
    viewBlock.style.top = `50%`;
    viewBlock.style.left = `50%`;
    viewBlock.style.outline = '1';
    setTimeout(() => {
        viewBlock.style.width = `${width}px`;
        viewBlock.style.top = `${topCoordinate}px`;
        viewBlock.style.left = `${leftCoordinate}px`;
        viewBlock.style.outline = '0';
    }, 50)
}

export {viewPhotoAnimation, closePhotoAnimation}
