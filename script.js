// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');
const filterButtons = document.querySelectorAll('.filter-btn');
const activityCards = document.querySelectorAll('.activity-card');
const sectionLinks = document.querySelectorAll('.section-link');
const activityDetailBtns = document.querySelectorAll('.activity-details-btn');
const modal = document.getElementById('activityModal');
const modalClose = document.querySelector('.modal-close');
const modalBody = document.getElementById('modalBody');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');


// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dropdown functionality on mobile
dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Filter activities
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Show/hide activity cards based on filter
        activityCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Scroll to section when clicking section links
sectionLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hash) {
            e.preventDefault();
            
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            
            if (section) {
                // Close mobile menu if open
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Scroll to section
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // If it's a filter link, activate the corresponding filter
                if (sectionId === 'evenements' || sectionId === 'projets-en-cours' || sectionId === 'realisations') {
                    const filterBtn = document.querySelector(`.filter-btn[data-filter="${sectionId}"]`);
                    if (filterBtn) {
                        filterBtn.click();
                    }
                }
            }
        }
    });
});

// Activity details modal
activityDetailBtns.forEach(button => {
    button.addEventListener('click', function() {
        const activityId = this.getAttribute('data-id');
        const activity = activitiesData[activityId];
        
        if (activity) {
            // Create modal content
            modalBody.innerHTML = `
                <div class="modal-activity">
                    <div class="modal-activity-header">
                        <div class="modal-category">${activity.category}</div>
                        <h2 class="modal-title">${activity.title}</h2>
                        <div class="modal-meta">
                            <div class="modal-date">
                                <i class="far fa-calendar"></i>
                                <span>${activity.date}</span>
                            </div>
                            <div class="modal-location">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${activity.location}</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-activity-image">
                        <img src="${activity.image}" alt="${activity.title}">
                    </div>
                    <div class="modal-activity-content">
                        <h3>Description détaillée</h3>
                        <div class="modal-description">
                            ${activity.fullDescription}
                        </div>
                        <div class="modal-tags">
                            ${activity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary">Participer à cette activité</button>
                            <button class="btn btn-outline modal-close-btn">Fermer</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Add close event to modal close button
            document.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
        }
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Hero slider functionality
let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    // Handle wrap-around
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next slide
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

// Previous slide
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);

// Pause auto-advance on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
heroSlider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
});

// Initialize with first slide
showSlide(0);

// Form validation for contact page (if exists)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Simple validation
        if (!name) {
            showError('name', 'Veuillez entrer votre nom');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Veuillez entrer votre message');
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would send the form data to a server here
            alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            contactForm.reset();
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentElement.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    
    if (!field.parentElement.querySelector('.error-message')) {
        field.parentElement.appendChild(errorDiv);
    }
    
    field.style.borderColor = 'red';
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
        field.style.borderColor = '';
    }, 3000);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize animations on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .activity-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    
    // Add current year to footer copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
});
/*----------------------------------------
----------------------------------------*/
