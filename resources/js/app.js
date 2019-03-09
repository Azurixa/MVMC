/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.buttonState = (element, actualClass, targetClass, targetText, time = 0, afterTimeoutClass, afterTimeoutText) => {
    const buttonText = element.innerHTML;
    element.classList.remove(actualClass);
    element.classList.add(targetClass);
    element.innerHTML = targetText;
    // Reset button to standard position
    if (time > 0) {
        setTimeout(() => {
            element.classList.remove(targetClass);
            element.classList.add(afterTimeoutClass);
            element.innerHTML = afterTimeoutText;
        }, time);
    }
}

window.reloadAll = () => {
    const el = $('[data-toggle="tooltip"]');
    el.tooltip('update');
}

window.refreshGallery = () => {

    const photos = document.querySelectorAll('.gallery-image');

    photos.forEach((photo) => {
        photo.classList.remove('secondary');
        photo.classList.remove('active');
    });

    if (photos.length > 2) {

        photos[0].classList.remove('secondary');
        photos[0].classList.add('active');

        photos[1].classList.remove('active');
        photos[1].classList.add('secondary');

        photos[2].classList.remove('active');
        photos[2].classList.add('secondary');

    } else if (photos.length === 2) {

        photos[0].classList.remove('secondary');
        photos[0].classList.add('active');

        photos[1].classList.remove('active');
        photos[1].classList.add('secondary');

    } else if (photos.length === 1) {
        photos[0].classList.remove('secondary');
        photos[0].classList.add('active');
    }

}

window.gallery = (element) => {

    element.classList.remove('secondary');
    element.classList.add('active');

    const prev = element.previousElementSibling;
    const next = element.nextElementSibling;

    if (prev !== null) {
        prev.classList.remove('active');
        prev.classList.add('secondary');

        const prever = prev.previousElementSibling;

        if (next === null && prever !== null) {

            prever.classList.remove('active');
            prever.classList.add('secondary');

        } else if (prever !== null) {

            prever.classList.remove('active');
            prever.classList.remove('secondary');

        }
    }

    if (next !== null) {

        next.classList.remove('active');
        next.classList.add('secondary');

        const nexter = next.nextElementSibling;

        if (prev === null && nexter !== null) {

            nexter.classList.remove('active');
            nexter.classList.add('secondary');

        } else if (nexter !== null) {

            nexter.classList.remove('active');
            nexter.classList.remove('secondary');

        }
    }

}