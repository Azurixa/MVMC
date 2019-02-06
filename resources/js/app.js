/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.reloadAll = () => {
    $('[data-toggle="tooltip"]').tooltip();
}

window.refreshGallery = () => {

    const photos = document.querySelectorAll('.gallery-image');

    photos.forEach((photo) => {
        photo.style.width = '0%';
    });

    if (photos.length > 2) {
        photos[0].style.width = '20%';
        photos[1].style.width = '60%';
        photos[2].style.width = '20%';
    } else if (photos.length === 2) {
        photos[0].style.width = '60%';
        photos[1].style.width = '20%';
    } else if (photos.length === 1) {
        photos[0].style.width = '60%';
    }

    console.log('Gallery refreshed!');

}

window.gallery = (element) => {

    element.style.width = '60%';

    const prev = element.previousElementSibling;
    const next = element.nextElementSibling;

    if (prev !== null) {
        prev.style.width = '20%';

        const prever = prev.previousElementSibling;

        if (next === null && prever !== null) {
            prever.style.width = '20%';
        } else if (prever !== null) {
            prever.style.width = '0%';
        }
    }

    if (next !== null) {
        next.style.width = '20%';

        const nexter = next.nextElementSibling;

        if (prev === null && nexter !== null) {
            nexter.style.width = '20%';
        } else if (nexter !== null) {
            nexter.style.width = '0%';
        }
    }

}

// window.gallery = (element) => {
//
//     if (element.classList.contains('next')) {
//
//         const prevEl = element.previousElementSibling;
//         const presentEl = element;
//         const nextEl = element.nextElementSibling;
//
//         if (nextEl !== null && prevEl !== null) {
//
//             const previerEl = element.previousElementSibling.previousElementSibling;
//
//             if (previerEl !== null) {
//
//                 previerEl.classList.remove('prev');
//                 previerEl.classList.add('hide');
//
//                 prevEl.classList.remove('present');
//                 prevEl.classList.add('prev');
//
//                 presentEl.classList.remove('next');
//                 presentEl.classList.add('present');
//
//                 nextEl.classList.remove('hide');
//                 nextEl.classList.add('next');
//
//             } else {
//
//                 prevEl.classList.remove('present');
//                 prevEl.classList.add('prev');
//
//                 presentEl.classList.remove('next');
//                 presentEl.classList.add('present');
//
//                 nextEl.classList.remove('hide');
//                 nextEl.classList.add('next');
//
//             }
//
//         } else {
//
//             prevEl.classList.remove('present');
//             prevEl.classList.add('prev');
//
//             presentEl.classList.remove('next');
//             presentEl.classList.add('present');
//
//         }
//
//     } else if (element.classList.contains('prev')) {
//
//         const prevEl = element.previousElementSibling;
//         const presentEl = element;
//         const nextEl = element.nextElementSibling;
//         const nextterEl = element.nextElementSibling.nextElementSibling;
//
//         if (prevEl !== null) {
//
//             prevEl.classList.remove('hide');
//             prevEl.classList.add('prev');
//
//             presentEl.classList.remove('prev');
//             presentEl.classList.add('present');
//
//             nextEl.classList.remove('present');
//             nextEl.classList.add('next');
//
//             nextterEl.classList.remove('next');
//             nextterEl.classList.add('hide');
//
//         } else {
//
//             presentEl.classList.remove('prev');
//             presentEl.classList.add('present');
//
//             nextEl.classList.remove('present');
//             nextEl.classList.add('next');
//
//         }
//
//     }
// }