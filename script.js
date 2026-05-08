document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = navLinks.querySelectorAll('a');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            navLinks.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'; // Change icon to close
        } else {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'; // Change icon back to hamburger
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 12, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 12, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const revealElements = document.querySelectorAll('.section-title, .about-text, .about-image-wrapper, .card, .contact-card, .resume-text');
    
    // Add "reveal" class to elements we want to animate
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Bento Tiles Reveal Animation ---
    const bentoTiles = document.querySelectorAll('.bento-tile');
    bentoTiles.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // --- Read More Toggle for Project Descriptions ---
    const projectDescriptions = document.querySelectorAll('.project-desc');
    
    // Use a slight delay to ensure layout is calculated before checking heights
    setTimeout(() => {
        projectDescriptions.forEach(desc => {
            // Check if the text is clamped (actual height > visible height)
            if (desc.scrollHeight > desc.clientHeight) {
                const btn = document.createElement('button');
                btn.className = 'read-more-toggle';
                btn.textContent = 'Read More';
                
                // Insert the button right after the description
                desc.parentNode.insertBefore(btn, desc.nextSibling);
                
                btn.addEventListener('click', () => {
                    desc.classList.toggle('expanded');
                    if (desc.classList.contains('expanded')) {
                        btn.textContent = 'Show Less';
                    } else {
                        btn.textContent = 'Read More';
                    }
                });
            }
        });
    }, 100);

});
