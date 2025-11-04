/* JavaScript engine for animations */

/* Typing section in the introduction */
const typing = document.getElementById('typed-text');

/* List of possible endings of the phrase */
const endings = ["build projects", "study Math and Computer Science", "promote social engagement", "work on creating affordable technology", "want to promote equity and inclusion"];

let ending = 0; /* Index of an ending in the endings list */
let char = 0; /* Index of the current character typed/deleted */
let deleting = false; /* Boolean showing weather an ending is typed or deleted (if deleted, deleting = true) */

function type() {
    const current = endings[ending]; /* current ending */
    const speed = deleting ? 75 : 150; /* speed of typing (75) vs deleting (150) */

    if (deleting) {
        typing.textContent = current.substring(0, char - 1); /* Deleting an ending character by character */
        char--;
    } else {
        typing.textContent = current.substring(0, char + 1); /* Typing an ending character by character */
        char++;
    }

    /* When the current ending is fully typed */
    if (!deleting && char === current.length) {
        setTimeout(() => deleting = true, 2000); /* Pause for 2000 ms and switch to deleting mode */
    }
    /* When the current ending is fully deleted */
    else if (deleting && char === 0) {
        deleting = false; /* Switch to typing mode */
        ending = (ending + 1) % endings.length; /* Move to the next word */
    }
    /* Make typing/deleting not instant but rather with a
     * constant speed by using a timeout after each cycle
     */
    setTimeout(type, speed);
}

/* Highlighting a section currently scrolled through in the navigation bar */
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = ''; /* Current active section, displayed on the page */

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        /* An offset of 150px to highlight a link a little bit in advance during scrolling*/
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

   links.forEach(link => {
        link.classList.remove('active');
        /* Creating and comparing the id of current section */
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', type);