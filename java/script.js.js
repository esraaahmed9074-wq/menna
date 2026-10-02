document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const mobileIcon = mobileBtn?.querySelector('i');

    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn?.querySelector('i');

    const navbar = document.getElementById('navbar');

    const navLinks = document.querySelectorAll('.nav-link');

    const sections = document.querySelectorAll('section[id]');

    const reveals = document.querySelectorAll('.reveal');


    /* =========================================
       MOBILE MENU
    ========================================= */

    function closeMobileMenu() {

        if (!navMenu || !mobileIcon || !mobileBtn) {
            return;
        }

        navMenu.classList.remove('active');

        mobileIcon.classList.remove('fa-times');
        mobileIcon.classList.add('fa-bars');

        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Open navigation menu');
    }


    function openMobileMenu() {

        if (!navMenu || !mobileIcon || !mobileBtn) {
            return;
        }

        navMenu.classList.add('active');

        mobileIcon.classList.remove('fa-bars');
        mobileIcon.classList.add('fa-times');

        mobileBtn.setAttribute('aria-expanded', 'true');
        mobileBtn.setAttribute('aria-label', 'Close navigation menu');
    }


    if (mobileBtn && navMenu) {

        mobileBtn.addEventListener('click', () => {

            const isOpen = navMenu.classList.contains('active');

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });

    }


    /* Close menu after clicking a navigation link */

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            closeMobileMenu();

        });

    });


    /* Close mobile menu when clicking outside */

    document.addEventListener('click', event => {

        if (!navMenu || !mobileBtn) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMobileButton =
            mobileBtn.contains(event.target);

        if (
            navMenu.classList.contains('active') &&
            !clickedInsideMenu &&
            !clickedMobileButton
        ) {

            closeMobileMenu();

        }

    });


    /* =========================================
       THEME TOGGLE
    ========================================= */

    function applyTheme(theme) {

        document.documentElement.setAttribute(
            'data-theme',
            theme
        );

        if (!themeIcon || !themeBtn) {
            return;
        }

        if (theme === 'light') {

            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');

            themeBtn.setAttribute(
                'aria-label',
                'Switch to dark mode'
            );

            themeBtn.setAttribute(
                'title',
                'Switch to dark mode'
            );

        } else {

            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');

            themeBtn.setAttribute(
                'aria-label',
                'Switch to light mode'
            );

            themeBtn.setAttribute(
                'title',
                'Switch to light mode'
            );

        }

    }


    const savedTheme =
        localStorage.getItem('theme');


    if (savedTheme === 'light' || savedTheme === 'dark') {

        applyTheme(savedTheme);

    } else {

        applyTheme('dark');

    }


    if (themeBtn) {

        themeBtn.addEventListener('click', () => {

            const currentTheme =
                document.documentElement.getAttribute('data-theme');

            const newTheme =
                currentTheme === 'dark'
                    ? 'light'
                    : 'dark';

            localStorage.setItem(
                'theme',
                newTheme
            );

            applyTheme(newTheme);

        });

    }


    /* =========================================
       STICKY NAVBAR
    ========================================= */

    function handleNavbarScroll() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 20) {

            navbar.classList.add('scrolled');

        } else {

            navbar.classList.remove('scrolled');

        }

    }


    window.addEventListener(
        'scroll',
        handleNavbarScroll,
        { passive: true }
    );


    handleNavbarScroll();


    /* =========================================
       SCROLL REVEAL ANIMATIONS
    ========================================= */

    if ('IntersectionObserver' in window) {

        const revealOptions = {

            threshold: 0.1,

            rootMargin: '0px 0px -50px 0px'

        };


        const revealOnScroll =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add('active');

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                revealOptions
            );


        reveals.forEach(reveal => {

            revealOnScroll.observe(reveal);

        });

    } else {

        /* Fallback for older browsers */

        reveals.forEach(reveal => {

            reveal.classList.add('active');

        });

    }


    /* =========================================
       ACTIVE NAVIGATION LINK
    ========================================= */

    function scrollActive() {

        const scrollY =
            window.scrollY + 120;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute('id');


            const navLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (!navLink) {
                return;
            }


            if (
                scrollY >= sectionTop &&
                scrollY < sectionTop + sectionHeight
            ) {

                navLinks.forEach(link => {

                    link.classList.remove('active');

                });

                navLink.classList.add('active');

            }

        });

    }


    window.addEventListener(
        'scroll',
        scrollActive,
        { passive: true }
    );


    scrollActive();


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {

            closeMobileMenu();

        }

    });


    /* =========================================
       CLOSE MOBILE MENU ON RESIZE
    ========================================= */

    window.addEventListener('resize', () => {

        if (window.innerWidth > 768) {

            closeMobileMenu();

        }

    });

});