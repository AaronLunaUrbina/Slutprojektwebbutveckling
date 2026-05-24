document.addEventListener('DOMContentLoaded', () => {
    const menyKnapp = 
    document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menyKnapp.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

document
.querySelectorAll('.nav-links a')
.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});
