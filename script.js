document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.feature-item, .benefit-card, .team-member');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const organization = document.getElementById('organization').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Create brain wave animation in the background
    const createWaveAnimation = () => {
        const canvas = document.createElement('canvas');
        const techSection = document.querySelector('.technology');
        
        if (!techSection) return;
        
        techSection.appendChild(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.opacity = '0.1';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        
        const ctx = canvas.getContext('2d');
        let width = canvas.width = techSection.offsetWidth;
        let height = canvas.height = techSection.offsetHeight;
        
        // Resize handler
        window.addEventListener('resize', () => {
            width = canvas.width = techSection.offsetWidth;
            height = canvas.height = techSection.offsetHeight;
        });
        
        // Wave parameters
        const waves = [
            { y: height * 0.3, length: 0.01, amplitude: 50, speed: 0.01, color: '#00b8d4' },
            { y: height * 0.4, length: 0.02, amplitude: 30, speed: 0.02, color: '#d500f9' },
            { y: height * 0.5, length: 0.01, amplitude: 40, speed: 0.015, color: '#00b8d4' }
        ];
        
        let time = 0;
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            waves.forEach(wave => {
                ctx.beginPath();
                ctx.moveTo(0, wave.y);
                
                for (let x = 0; x < width; x++) {
                    const dx = x * wave.length;
                    const y = wave.y + Math.sin(dx + time * wave.speed) * wave.amplitude;
                    ctx.lineTo(x, y);
                }
                
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            
            time += 0.05;
            requestAnimationFrame(animate);
        }
        
        animate();
    };
    
    // Initialize wave animation
    createWaveAnimation();
});