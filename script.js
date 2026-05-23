document.addEventListener('DOMContentLoaded', () => {
    const Menyknapp = 
    document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});