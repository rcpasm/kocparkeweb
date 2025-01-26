// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

// Initialize slider
function initSlider() {
    // Set first slide and dot as active
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Start automatic sliding
    startSlideTimer();
}

// Next slide function
function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

// Previous slide function
function prevSlide() {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
}

// Go to specific slide
function goToSlide(n) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Update current slide
    currentSlide = n;
    
    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Start automatic sliding
function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Stop automatic sliding
function stopSlideTimer() {
    clearInterval(slideInterval);
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlideTimer();
    startSlideTimer();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlideTimer();
    startSlideTimer();
});

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        stopSlideTimer();
        startSlideTimer();
    });
});

// Pause slider on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopSlideTimer);
slider.addEventListener('mouseleave', startSlideTimer);

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', initSlider);

// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle navigation
    nav.classList.toggle('active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Scroll to top functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        document.querySelector('.scroll-top').classList.add('active');
    } else {
        document.querySelector('.scroll-top').classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Video lazy loading ve kontrol
document.addEventListener('DOMContentLoaded', function() {
    const lazyVideos = document.querySelectorAll('.lazy-video');
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                if (source.dataset.src) {
                    source.src = source.dataset.src;
                    video.load();
                    video.play();
                    observer.unobserve(video);
                }
            }
        });
    }, { threshold: 0.5 });

    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });

    // Video tıklama kontrolü
    document.querySelectorAll('.video-container').forEach(container => {
        const video = container.querySelector('video');
        
        container.addEventListener('click', (e) => {
            if (!e.target.closest('.mute-btn')) {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });
    });

    // Ses kontrolü
    document.querySelectorAll('.mute-btn').forEach(btn => {
        const video = btn.parentElement.querySelector('video');
        const icon = btn.querySelector('i');

        btn.addEventListener('click', () => {
            video.muted = !video.muted;
            if (video.muted) {
                icon.className = 'fas fa-volume-mute';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        });
    });
}); 