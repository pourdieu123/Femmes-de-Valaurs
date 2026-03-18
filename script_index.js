// script.js - Script complet pour l'interactivité du site Femme de Valeur International

document.addEventListener('DOMContentLoaded', function() {
    'use strict';


    // ==================== HEADER SCROLL ====================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ==================== SLIDER HERO ====================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length && dots.length) {
        let currentSlide = 0;
        let slideInterval;
        const slideCount = slides.length;

        function showSlide(index) {
            if (index < 0) index = slideCount - 1;
            if (index >= slideCount) index = 0;
            
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }

        function startAutoplay() {
            stopAutoplay();
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoplay() {
            if (slideInterval) clearInterval(slideInterval);
        }

        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoplay(); startAutoplay(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoplay(); startAutoplay(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { showSlide(index); stopAutoplay(); startAutoplay(); });
        });

        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', stopAutoplay);
            hero.addEventListener('mouseleave', startAutoplay);
        }

        startAutoplay();
    }

    // ==================== ANIMATIONS SCROLL ====================
    const animatedElements = document.querySelectorAll('.about-card, .section-header, .hero-content, .cta-content, .member-card, .gallery-item');
    
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

    // ==================== LIENS ACTIFS ====================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkPage === 'index.html') {
            link.classList.add('active');
        }
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
                    <button onclick="alert('Redirection vers la page de don')" style="background: #e74c3c; color: white; border: none; padding: 12px 30px; border-radius: 5px; cursor: pointer;">Faire un don</button>
                </div>
            `,
            'projets-en-cours': `
                <div style="padding: 30px;">
                    <h2 style="margin-bottom: 30px;">Projets en cours 2026</h2>
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: #333;">📚 Centre de formation</h3>
                        <p>Construction d'un centre de formation pour 100 femmes</p>
                        <div style="width: 100%; background: #eee; height: 10px; border-radius: 5px; margin: 10px 0;">
                            <div style="width: 65%; background: #27ae60; height: 10px; border-radius: 5px;"></div>
                        </div>
                        <p style="text-align: right;">65% financé</p>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <h3 style="color: #333;">👩‍🏫 Programme mentorat</h3>
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

    // ==================== HOVER CARDS ====================
    document.querySelectorAll('.about-card, .member-card, .gallery-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // ==================== FORMULAIRE CONTACT ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'Envoi...';
            btn.disabled = true;
            
            setTimeout(() => {
                alert('Message envoyé avec succès ! Nous vous répondrons bientôt.');
                this.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

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

    // ==================== LIGHTBOX GALERIE ====================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;
            
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.9); display: flex; align-items: center;
                justify-content: center; z-index: 9999; opacity: 0;
                transition: opacity 0.3s ease; cursor: pointer;
            `;
            
            lightbox.innerHTML = `
                <img src="${img.src}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
                <button style="position: absolute; top: 20px; right: 20px; background: white; border: none; width: 50px; height: 50px; border-radius: 50%; font-size: 30px; cursor: pointer; display: flex; align-items: center; justify-content: center;">&times;</button>
            `;
            
            body.appendChild(lightbox);
            body.style.overflow = 'hidden';
            
            setTimeout(() => lightbox.style.opacity = '1', 10);
            
            const closeBtn = lightbox.querySelector('button');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                lightbox.style.opacity = '0';
                setTimeout(() => { lightbox.remove(); body.style.overflow = ''; }, 300);
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.opacity = '0';
                    setTimeout(() => { lightbox.remove(); body.style.overflow = ''; }, 300);
                }
            });
        });
    });

    // ==================== CHARGEMENT MEMBRES ====================
    const membersGrid = document.querySelector('.members-grid');
    if (membersGrid && membersGrid.children.length === 0) {
        const membres = [
            { nom: 'Marie-Claire ADJOVI', role: 'Présidente' },
            { nom: 'Béatrice HOUNDJO', role: 'Secrétaire Générale' },
            { nom: 'Estelle DOSSOU', role: 'Trésorière' },
            { nom: 'Judith AHOYO', role: 'Conseillère' }
        ];
        
        membres.forEach(membre => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <div class="member-image" style="width: 100%; height: 250px; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-user-circle" style="font-size: 100px; color: white;"></i>
                </div>
                <div class="member-info" style="padding: 20px; text-align: center;">
                    <h3 style="margin-bottom: 5px;">${membre.nom}</h3>
                    <p style="color: #666;">${membre.role}</p>
                </div>
            `;
            membersGrid.appendChild(card);
        });
    }
});