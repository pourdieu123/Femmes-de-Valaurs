// script_membres.js - Script complet pour l'interactivité de la page Membres

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

   

    // ==================== HEADER SCROLL ====================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==================== ANIMATIONS AU SCROLL ====================
    const animatedElements = document.querySelectorAll(
        '.category-detailed-card, .board-member-card, .rights-card, .duties-card, ' +
        '.benefits-info, .benefits-cta, .section-header, .cta-content, .members-intro'
    );
    
    function checkScroll() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // ==================== HOVER SUR LES CARTES ====================
    document.querySelectorAll('.category-detailed-card, .board-member-card, .rights-card, .duties-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
        });
    });

    // ==================== ANIMATION DES BADGES ====================
    document.querySelectorAll('.category-badge').forEach((badge, index) => {
        badge.style.animation = `pulse 2s ease ${index * 0.2}s infinite`;
    });

    // ==================== MODAL ACTIVITÉS ====================
    const modal = document.getElementById('activityModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.querySelector('.modal-close');

    if (modal && modalBody && modalClose) {
        const activities = {
            'evenements': `
                <div style="text-align: center; padding: 30px;">
                    <i class="fas fa-heart" style="font-size: 60px; color: #e74c3c; margin-bottom: 20px;"></i>
                    <h2 style="margin-bottom: 20px;">Faire un don</h2>
                    <p style="margin-bottom: 20px;">Votre générosité nous permet d'aider plus de femmes à se former et à s'épanouir.</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <p><strong>Mobile Money :</strong> +229 01 96 19 06 81</p>
                        <p><strong>Compte bancaire :</strong> FVI - Bank of Africa</p>
                    </div>
                    <button onclick="alert('Merci pour votre générosité !')" style="background: #e74c3c; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer; font-size: 16px;">Faire un don</button>
                </div>
            `,
            'projets-en-cours': `
                <div style="padding: 30px;">
                    <h2 style="margin-bottom: 30px;">Projets en cours 2026</h2>
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: #333; margin-bottom: 10px;">📚 Centre de formation</h3>
                        <p>Construction d'un centre de formation pour 100 femmes</p>
                        <div style="width: 100%; background: #eee; height: 10px; border-radius: 5px; margin: 10px 0;">
                            <div style="width: 65%; background: #27ae60; height: 10px; border-radius: 5px;"></div>
                        </div>
                        <p style="text-align: right;">65% financé</p>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: #333; margin-bottom: 10px;">👩‍🏫 Programme mentorat</h3>
                        <p>Encadrement de 50 jeunes filles par des femmes leaders</p>
                        <div style="width: 100%; background: #eee; height: 10px; border-radius: 5px; margin: 10px 0;">
                            <div style="width: 80%; background: #27ae60; height: 10px; border-radius: 5px;"></div>
                        </div>
                        <p style="text-align: right;">80% réalisé</p>
                    </div>
                </div>
            `,
            'realisations': `
                <div style="padding: 30px;">
                    <h2 style="margin-bottom: 30px;">Nos réalisations</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 40px; font-weight: bold;">500+</span>
                            <p>Femmes formées</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #f093fb, #f5576c); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 40px; font-weight: bold;">10</span>
                            <p>Missions</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 40px; font-weight: bold;">3</span>
                            <p>Sections</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                            <span style="font-size: 40px; font-weight: bold;">20+</span>
                            <p>Événements</p>
                        </div>
                    </div>
                </div>
            `
        };

        document.querySelectorAll('.section-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.dataset.section;
                
                if (activities[section]) {
                    modalBody.innerHTML = activities[section];
                    modal.classList.add('active');
                    body.style.overflow = 'hidden';
                }
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            body.style.overflow = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // ==================== COMPTEUR DE COTISATION ====================
    const cotisationAmount = document.querySelector('.cotisation-amount .amount');
    if (cotisationAmount) {
        const amount = 10000;
        let currentAmount = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const interval = setInterval(() => {
                        if (currentAmount < amount) {
                            currentAmount += 200;
                            cotisationAmount.textContent = currentAmount.toLocaleString() + ' FCFA';
                        } else {
                            cotisationAmount.textContent = '10 000 FCFA';
                            clearInterval(interval);
                        }
                    }, 20);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(cotisationAmount);
    }

    // ==================== SURBRILLANCE DES PHOTOS ====================
    document.querySelectorAll('.member-photo img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder.jpg';
            this.alt = 'Photo non disponible';
        });
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ==================== ANIMATION DES LISTES ====================
    document.querySelectorAll('.category-rights ul li, .rights-list li, .duties-list li, .advantages-list ul li').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.3s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });

    // ==================== BOUTON RETOUR EN HAUT ====================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: #e78427; color: white; border: none; border-radius: 50%;
        cursor: pointer; display: none; align-items: center; justify-content: center;
        font-size: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 999;
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px)';
        scrollTopBtn.style.background = '#e78427';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0)';
        scrollTopBtn.style.background = '#e78427';
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // ==================== EFFET DE SURVOL POUR LES AVANTAGES ====================
    document.querySelectorAll('.advantages-list li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.paddingLeft = '25px';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.paddingLeft = '';
        });
    });

    // ==================== ANIMATION DU BUREAU EXÉCUTIF ====================
    const boardMembers = document.querySelectorAll('.board-member-card');
    
    boardMembers.forEach((member, index) => {
        member.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        member.style.opacity = '0';
    });

    // ==================== GESTION DES LIENS ACTIFS ====================
    const currentPage = window.location.pathname.split('/').pop() || 'membres.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ==================== EFFET PARALLAX SUR LE HEADER ====================
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                pageHeader.style.backgroundPosition = `top ${scrolled * 0.5}px center`;
            }
        });
    }

    // ==================== SMOOTH SCROLL POUR LES ANCRES ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // ==================== ANIMATION DU MONTANT DE COTISATION ====================
    const cotisationCard = document.querySelector('.cotisation-card');
    if (cotisationCard) {
        cotisationCard.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        });
        
        cotisationCard.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = '';
        });
    }

    // ==================== MESSAGE DE BIENVENUE POUR LES NOUVEAUX MEMBRES ====================
    const joinBtn = document.querySelector('.btn-primary[href="contact.html"]');
    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            const confirm = window.confirm('Souhaitez-vous vraiment rejoindre notre association ? Vous serez redirigé vers la page de contact.');
            if (!confirm) {
                e.preventDefault();
            }
        });
    }
});

// ==================== STYLES CSS AJOUTÉS DYNAMIQUEMENT ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .category-badge {
        animation: pulse 2s ease infinite;
    }
    
    .category-detailed-card, .board-member-card {
        transition: all 0.3s ease !important;
    }
    
    .member-photo {
        overflow: hidden;
        border-radius: 50%;
    }
    
    .member-photo img {
        transition: transform 0.3s ease;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .cotisation-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .advantages-list li {
        transition: all 0.3s ease;
        cursor: pointer;
        padding: 8px;
        border-radius: 5px;
    }
    
    .rights-list li, .duties-list li {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .rights-list li:hover, .duties-list li:hover {
        color: #e7a33c;
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
        }
    }
`;

document.head.appendChild(style);