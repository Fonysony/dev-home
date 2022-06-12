const element = document.querySelector('.dick');
let start, previousTimeStamp;
let done = false;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
        console.log('start:', start);
    }
    const elapsed = timestamp - start;
    console.log('elapse:', elapsed);

    if (previousTimeStamp !== timestamp) {
        // Math.min() is used here to make sure the element stops at exactly 200px
        const count = Math.min(0.1 * elapsed, 200);
        element.style.transform = 'translateX(' + count + 'px)';
        if (count === 200) done = true;
    }

    if (elapsed < 2000) { // Stop the animation after 2 seconds
        previousTimeStamp = timestamp;
        !done && window.requestAnimationFrame(step);
    } else {
        start = 0;
        window.requestAnimationFrame(step);
    }
}

window.requestAnimationFrame(step);