'use strict';

function timer() {
    const deadline = '2021-06-06',
        days = document.getElementById('days'),
        hours = document.getElementById('hours'),
        minutes = document.getElementById('minutes'),
        seconds = document.getElementById('seconds');


    function getZero(num) {
        if (num >= 0 && num < 10) {
            return ('0' + num);
        } else {
            return (num);
        }
    }

    function reloadTimer() {
        const dateContent = refreshDate(deadline);
        days.innerHTML = getZero(dateContent.days);
        hours.innerHTML = getZero(dateContent.hours);
        minutes.innerHTML = getZero(dateContent.minutes);
        seconds.innerHTML = getZero(dateContent.seconds);
    }
    reloadTimer();
    let timer = setInterval(() => {
        reloadTimer();
        timer = setInterval(reloadTimer, 1000);
    }, 1000);

    function refreshDate(deadline) {
        const currentDate = new Date();
        const t = Date.parse(deadline) - Date.parse(currentDate);
        if (t <= 0) {
            clearInterval(timer);
        }
        const dateContent = {
            days: (Math.floor(t / 1000 / 60 / 60 / 24)),
            hours: (Math.floor(t / 1000 / 60 / 60 % 24)),
            minutes: Math.floor(t / 1000 / 60 % 60),
            seconds: Math.floor(t / 1000 % 60),
            total: t
        };
        return dateContent;
    }
}

export default timer;