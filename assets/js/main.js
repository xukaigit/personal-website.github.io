/* ===============================================
   ALBERT'S HOMEPAGE - MAIN JAVASCRIPT FILE
   ===============================================
   This file contains the logic for:
   1. Mobile Navigation Menu Toggle
   2. Active Link Highlighting on Scroll
   3. Modal (Pop-up) for Contact QR Codes
   4. Project Filtering
   5. Dual Theme (Light/Dark) Logic
   =============================================== */

// Wait for the DOM to be fully loaded before running the scripts
document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================
       1. MOBILE NAVIGATION MENU TOGGLE
       =============================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    // Show menu when toggle button is clicked
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
        });
    }

    // Hide menu when a navigation link is clicked (useful on mobile)
    const linkAction = () => {
        navMenu.classList.remove('show-menu');
    }
    navLinks.forEach(link => link.addEventListener('click', linkAction));


    /* ===============================================
       2. ACTIVE LINK HIGHLIGHTING ON SCROLL
       =============================================== */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58; 
            const sectionId = current.getAttribute('id');

            const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active-link');
                } else {
                    link.classList.remove('active-link');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);


    /* ===============================================
       3. MODAL (POP-UP) FOR CONTACT QR CODES
       =============================================== */
    const modalViews = document.querySelectorAll('.modal');
    const modalBtns = {
        'wechat-btn': document.getElementById('wechat-modal'),
        'qq-btn': document.getElementById('qq-modal')
    };
    const modalCloses = document.querySelectorAll('.modal__close');

    // Function to open a modal
    const openModal = (modalElement) => {
        if (modalElement) modalElement.classList.add('active');
    };

    // Add click event listeners to open buttons
    Object.keys(modalBtns).forEach(buttonId => {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', () => {
                openModal(modalBtns[buttonId]);
            });
        }
    });

    // Function to close a modal
    const closeModal = (event) => {
        event.target.closest('.modal').classList.remove('active');
    };
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });

    // Also close modal when clicking on the overlay
    modalViews.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    });


    /* ===============================================
       4. PROJECT FILTERING
       =============================================== */
    const filterContainer = document.querySelector('.projects__filters');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-button')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }
    
    /* ===============================================
       5. DUAL THEME (LIGHT/DARK) LOGIC
       =============================================== */
    const themeButton = document.getElementById('theme-button');
    const darkThemeIcon = 'fa-sun';
    const lightThemeIcon = 'fa-moon';
    const htmlTag = document.documentElement;

    const getSavedTheme = () => localStorage.getItem('selected-theme');
    const getSystemPreference = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const savedTheme = getSavedTheme();
    const systemTheme = getSystemPreference();
    const themeToApply = savedTheme || systemTheme;

    htmlTag.setAttribute('data-theme', themeToApply);
    if (themeToApply === 'dark') {
        themeButton.classList.add(darkThemeIcon);
        themeButton.classList.remove(lightThemeIcon);
    }

    themeButton.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlTag.setAttribute('data-theme', newTheme);
        localStorage.setItem('selected-theme', newTheme);

        themeButton.classList.toggle(darkThemeIcon);
        themeButton.classList.toggle(lightThemeIcon);
    });

}); // End of DOMContentLoaded