// Modern Vanilla JavaScript for smooth scrolling and navigation
(function() {
  'use strict';

  // Smooth scrolling for anchor links
  function initSmoothScrolling() {
    const scrollTriggers = document.querySelectorAll('a.js-scroll-trigger[href*="#"]:not([href="#"])');
    
    scrollTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const targetId = href.split('#')[1];
        
        if (targetId && location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
          e.preventDefault();
          
          const target = document.getElementById(targetId) || document.querySelector(`[name="${targetId}"]`);
          
          if (target) {
            const offsetTop = target.offsetTop - 56; // Account for fixed navbar
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Close mobile menu when clicking on scroll trigger links
  function initMobileMenuClose() {
    const scrollTriggers = document.querySelectorAll('.js-scroll-trigger');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarCollapse) {
      scrollTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
          });
          bsCollapse.hide();
        });
      });
    }
  }

  // Initialize scrollspy for active navigation highlighting
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
      let current = '';
      const scrollPos = window.scrollY + 100; // Offset for navbar height
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
    
    // Throttled scroll event for better performance
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateActiveNav);
        ticking = true;
      }
    }
    
    function handleScroll() {
      ticking = false;
      requestTick();
    }
    
    window.addEventListener('scroll', handleScroll);
    updateActiveNav(); // Initial call
  }

  // Initialize all functionality when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initMobileMenuClose();
    initScrollSpy();
  });

})();