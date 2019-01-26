
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.gallery = (element) => {

    if (element.classList.contains('next')) {

        const prevEl = element.previousElementSibling;
        const presentEl = element;
        const nextEl = element.nextElementSibling;

        if (nextEl !== null && prevEl !== null) {

            const previerEl = element.previousElementSibling.previousElementSibling;

            if (previerEl !== null) {

                previerEl.classList.remove('prev');
                previerEl.classList.add('hide');

                prevEl.classList.remove('present');
                prevEl.classList.add('prev');

                presentEl.classList.remove('next');
                presentEl.classList.add('present');

                nextEl.classList.remove('hide');
                nextEl.classList.add('next');

            } else {

                prevEl.classList.remove('present');
                prevEl.classList.add('prev');

                presentEl.classList.remove('next');
                presentEl.classList.add('present');

                nextEl.classList.remove('hide');
                nextEl.classList.add('next');

            }

        } else {

            prevEl.classList.remove('present');
            prevEl.classList.add('prev');

            presentEl.classList.remove('next');
            presentEl.classList.add('present');

        }

    } else if (element.classList.contains('prev')) {

        const prevEl = element.previousElementSibling;
        const presentEl = element;
        const nextEl = element.nextElementSibling;
        const nextterEl = element.nextElementSibling.nextElementSibling;

        if (prevEl !== null) {

            prevEl.classList.remove('hide');
            prevEl.classList.add('prev');

            presentEl.classList.remove('prev');
            presentEl.classList.add('present');

            nextEl.classList.remove('present');
            nextEl.classList.add('next');

            nextterEl.classList.remove('next');
            nextterEl.classList.add('hide');

        } else {

            presentEl.classList.remove('prev');
            presentEl.classList.add('present');

            nextEl.classList.remove('present');
            nextEl.classList.add('next');

        }

    }
}