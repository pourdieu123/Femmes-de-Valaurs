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

// Activity data - In a real app, this would come from a backend or JSON file
const activitiesData = {
    1: {
        title: "Réunion Mensuelle",
        category: "Événement",
        date: "Chaque 2e mercredi du mois",
        location: "Siège de l'association, Cotonou",
        description: "Rencontre mensuelle de toutes les membres de l'association pour échanger, prier et planifier les activités. Ces réunions permettent de renforcer les liens entre les membres, partager les témoignages et progresser spirituellement ensemble.",
        fullDescription: "<p>Ces réunions mensuelles sont au cœur de la vie de notre association. Elles se tiennent chaque deuxième mercredi du mois, de 10h à 12h, au siège de l'association à Cotonou.</p><p><strong>Programme type :</strong></p><ul><li>Ouverture par la Présidente et moment de prière</li><li>Partage des nouvelles de l'association</li><li>Témoignages et partages d'expériences</li><li>Enseignement spirituel ou atelier de développement</li><li>Planification des activités à venir</li><li>Moments de réseautage et d'échanges informels</li></ul><p>Ces rencontres sont essentielles pour maintenir la cohésion du groupe, discerner la direction de l'association et s'encourager mutuellement dans la foi et les projets de vie.</p>",
        image: "assets/images/event-1.jpg",
        tags: ["Spiritualité", "Échange", "Rencontre", "Prière"]
    },
    2: {
        title: "Atelier de Développement Personnel",
        category: "Événement",
        date: "25 Octobre 2025, 9h-16h",
        location: "Centre des congrès, Cotonou",
        description: "Session intensive pour découvrir son potentiel, définir ses objectifs et développer sa confiance en soi.",
        fullDescription: "<p>Cet atelier d'une journée complète est spécialement conçu pour aider les femmes à découvrir et développer leur potentiel unique. Animé par des coachs certifiés et des intervenantes inspirantes, il aborde plusieurs aspects du développement personnel.</p><p><strong>Contenu de l'atelier :</strong></p><ul><li>Découverte de ses talents et passions</li><li>Définition d'objectifs de vie clairs et réalisables</li><li>Techniques pour renforcer la confiance en soi</li><li>Gestion du stress et des émotions</li><li>Équilibre entre vie personnelle, professionnelle et spirituelle</li><li>Création d'un plan d'action personnalisé</li></ul><p>Cet atelier est ouvert à toutes les femmes, membres ou non de l'association, avec un tarif préférentiel pour les membres actives.</p>",
        image: "assets/images/event-2.jpg",
        tags: ["Développement", "Leadership", "Confiance", "Coaching"]
    },
    3: {
        title: "Soutien Juridique aux Femmes",
        category: "Projet en cours",
        date: "En cours jusqu'en Décembre 2025",
        location: "Bureau de l'association et consultations en ligne",
        description: "Accompagnement juridique des femmes en détresse avec l'appui d'un avocat partenaire de l'association.",
        fullDescription: "<p>Ce projet vise à offrir un accompagnement juridique gratuit ou à faible coût aux femmes confrontées à des difficultés légales. En partenariat avec un cabinet d'avocats spécialisé, nous fournissons des conseils et un soutien dans divers domaines.</p><p><strong>Domaines d'intervention :</strong></p><ul><li>Droit de la famille (divorce, garde d'enfants, pension alimentaire)</li><li>Violences conjugales et protection des victimes</li><li>Droits successoraux</li><li>Problématiques liées au logement</li><li>Droit du travail (harcèlement, licenciement abusif)</li><li>Accès à la propriété et aux ressources</li></ul><p>Ce service est disponible sur rendez-vous, avec des consultations en présentiel au siège de l'association ou en ligne pour les femmes vivant en milieu rural.</p>",
        image: "assets/images/project-1.jpg",
        tags: ["Juridique", "Soutien", "Femmes", "Droits"]
    },
    4: {
        title: "Programme d'Autonomisation Économique",
        category: "Projet en cours",
        date: "Lancé en Juin 2025 - Phase 1 en cours",
        location: "Cotonou et zones périurbaines",
        description: "Formation à la création d'entreprise et accompagnement des femmes entrepreneures dans leurs projets.",
        fullDescription: "<p>Ce programme ambitieux vise à donner aux femmes les compétences et ressources nécessaires pour créer et développer leurs propres activités génératrices de revenus. Il comprend plusieurs volets complémentaires.</p><p><strong>Composantes du programme :</strong></p><ul><li>Formations techniques en gestion d'entreprise, marketing et comptabilité</li><li>Ateliers pratiques sur la création de business plans</li><li>Accès à un réseau de mentorat avec des entrepreneures expérimentées</li><li>Mise en relation avec des institutions de microfinance</li><li>Suivi personnalisé pendant les 6 premiers mois d'activité</li><li>Création d'un réseau d'entrepreneures pour l'entraide et le partage</li></ul><p>La première phase du programme accompagne 50 femmes dans le lancement de leurs projets. Une deuxième phase est prévue pour 2026.</p>",
        image: "assets/images/project-2.jpg",
        tags: ["Entreprenariat", "Formation", "Autonomie", "Économie"]
    },
    5: {
        title: "Campagne de Sensibilisation en Milieu Rural",
        category: "Réalisation",
        date: "Mars 2025 - Mission de 2 semaines",
        location: "5 villages de la région de l'Atacora",
        description: "Mission réussie auprès de 300 femmes dans 5 villages pour les sensibiliser à leurs droits et à l'éducation.",
        fullDescription: "<p>Cette campagne a permis de toucher directement 300 femmes dans 5 villages reculés de la région de l'Atacora. Pendant deux semaines, une équipe de 10 volontaires de l'association a organisé des sessions de sensibilisation et de formation.</p><p><strong>Réalisations concrètes :</strong></p><ul><li>15 sessions de sensibilisation sur les droits des femmes</li><li>Ateliers sur l'importance de l'éducation des filles</li><li>Distribution de documents d'information en langue locale</li><li>Formation de 20 relais communautaires pour poursuivre le travail de sensibilisation</li><li>Création de 5 groupes de parole féminins dans les villages</li><li>Distribution de kits d'hygiène féminine à 200 femmes</li></ul><p>Cette mission a été financée par les cotisations des membres et un don d'une entreprise partenaire. Les retours des participantes ont été extrêmement positifs, avec une demande de renouveler l'expérience dans d'autres villages.</p>",
        image: "assets/images/achievement-1.jpg",
        tags: ["Sensibilisation", "Rural", "Éducation", "Droits"]
    },
    6: {
        title: "Distribution de Kits Scolaires",
        category: "Réalisation",
        date: "Janvier 2025 - Rentrée scolaire",
        location: "Écoles de Cotonou et environs",
        description: "Distribution de plus de 500 kits scolaires complets aux enfants défavorisés pour la rentrée scolaire.",
        fullDescription: "<p>À l'occasion de la rentrée scolaire 2025, notre association a organisé une grande campagne de distribution de kits scolaires aux enfants issus de familles défavorisées. Cette action a touché plus de 500 enfants dans 8 écoles différentes.</p><p><strong>Contenu des kits scolaires :</strong></p><ul><li>Cahiers, stylos, crayons, gommes, règles, compas</li><li>Sac d'école pour chaque enfant</li><li>Uniformes scolaires pour les enfants les plus nécessiteux</li><li>Livres de lecture adaptés à chaque niveau</li><li>Matériel de géométrie complet pour les collégiens</li></ul><p><strong>Impact de l'action :</strong></p><ul><li>500 enfants équipés pour bien démarrer l'année scolaire</li><li>8 écoles partenaires dans des quartiers défavorisés</li><li>Participation de 30 membres bénévoles pour la distribution</li><li>Sensibilisation des parents à l'importance de la scolarisation</li><li>Création d'un fonds de solidarité pour les frais scolaires des familles en difficulté</li></ul><p>Cette action a été rendue possible grâce aux cotisations des membres et à une collecte de fonds spéciale organisée en décembre 2024.</p>",
        image: "assets/images/achievement-2.jpg",
        tags: ["Humanitaire", "Éducation", "Enfants", "Solidarité"]
    }
};

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
