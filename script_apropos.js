// script_apropos.js - Script complet pour l'interactivité de la page À propos

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
        '.mission-card, .vision-card, .value-card, .action-item, ' +
        '.board-member, .document-card, .story-content, .story-image, ' +
        '.section-header, .cta-content'
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

    // ==================== COMPTEUR DE STATISTIQUES ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const targetText = stat.innerText;
            let targetNumber = 0;
            
            if (targetText.includes('+')) {
                targetNumber = parseInt(targetText.replace('+', ''));
            } else {
                targetNumber = parseInt(targetText);
            }
            
            if (isNaN(targetNumber)) return;
            
            let currentNumber = 0;
            const increment = targetNumber / 50;
            const isYear = targetText.includes('2024');
            
            const updateNumber = () => {
                if (currentNumber < targetNumber) {
                    currentNumber += increment;
                    if (isYear) {
                        stat.innerText = Math.floor(currentNumber);
                    } else {
                        stat.innerText = Math.floor(currentNumber) + '+';
                    }
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.innerText = targetText;
                }
            };
            
            // Observer pour démarrer quand visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    if (statNumbers.length) animateNumbers();

    // ==================== HOVER SUR LES CARTES ====================
    document.querySelectorAll('.board-member, .value-card, .document-card, .mission-card, .vision-card').forEach(card => {
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

    // ==================== ANIMATION DES ACTIONS ====================
    document.querySelectorAll('.action-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
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

    // ==================== TÉLÉCHARGEMENT DE DOCUMENTS ====================
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });

    // ==================== SMOOTH SCROLL ====================
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

    // ==================== BOUTON RETOUR EN HAUT ====================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: #e74c3c; color: white; border: none; border-radius: 50%;
        cursor: pointer; display: none; align-items: center; justify-content: center;
        font-size: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 999;
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px)';
        scrollTopBtn.style.background = '#c0392b';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0)';
        scrollTopBtn.style.background = '#e74c3c';
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

    // ==================== SURBRILLANCE DES PHOTOS DE MEMBRES ====================
    document.querySelectorAll('.member-photo img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder.jpg';
            this.alt = 'Photo non disponible';
        });
        
        // Effet de zoom au survol
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ==================== ANIMATION DU BUREAU EXÉCUTIF ====================
    const boardMembers = document.querySelectorAll('.board-member');
    
    boardMembers.forEach((member, index) => {
        member.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
        member.style.opacity = '0';
    });

    // ==================== GESTION DES LIENS ACTIFS ====================
    const currentPage = window.location.pathname.split('/').pop() || 'apropos.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // ==================== STYLE POUR LA PAGE HEADER ====================
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                pageHeader.style.backgroundPosition = `center ${scrolled * 0.5}px`;
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
    
    .board-member, .value-card, .document-card {
        transition: all 0.3s ease !important;
    }
    
    .action-item {
        transition: all 0.3s ease !important;
        cursor: pointer;
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
    
    .btn-download {
        position: relative;
        overflow: hidden;
    }
    
    .btn-download::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }
    
    .btn-download:active::after {
        width: 300px;
        height: 300px;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex !important;
        }
    }
`;

document.head.appendChild(style);