// script_galerie.js - Script complet pour l'interactivité de la page Galerie

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ==================== MENU MOBILE ====================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // ==================== DROPDOWN MOBILE ====================
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
                
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== dropdown) item.classList.remove('active');
                });
            }
        });
    });

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
        '.gallery-item, .filter-wrapper, .section-header, .page-header'
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

    // ==================== SYSTÈME DE FILTRAGE AVANCÉ ====================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.filter-search input');
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let currentFilter = 'all';
    let currentSearch = '';
    let filterTimeout;

    if (filterButtons.length && galleryItems.length) {
        
        // Ajouter les compteurs aux boutons
        function updateCounters() {
            filterButtons.forEach(button => {
                const filter = button.getAttribute('data-filter');
                let count;
                
                if (filter === 'all') {
                    count = galleryItems.length;
                } else {
                    count = document.querySelectorAll(`.gallery-item[data-category="${filter}"]`).length;
                }
                
                let countSpan = button.querySelector('.count');
                if (!countSpan) {
                    countSpan = document.createElement('span');
                    countSpan.className = 'count';
                    button.appendChild(countSpan);
                }
                countSpan.textContent = count;
            });
        }

        // Fonction de filtrage
        function applyFilters() {
            galleryGrid.classList.add('loading');
            
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                let visibleCount = 0;
                
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
                    const desc = item.querySelectorAll('p')[0]?.textContent.toLowerCase() || '';
                    const location = item.querySelectorAll('p')[1]?.textContent.toLowerCase() || '';
                    
                    const categoryMatch = currentFilter === 'all' || category === currentFilter;
                    const searchMatch = currentSearch === '' || 
                                      title.includes(currentSearch) || 
                                      desc.includes(currentSearch) ||
                                      location.includes(currentSearch);
                    
                    if (categoryMatch && searchMatch) {
                        item.classList.remove('filtered-out');
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                        visibleCount++;
                    } else {
                        item.classList.add('filtered-out');
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            if (item.classList.contains('filtered-out')) {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
                
                galleryGrid.classList.remove('loading');
                showNoResultsMessage(visibleCount === 0);
                updateCounters();
            }, 300);
        }

        // Message "Aucun résultat"
        function showNoResultsMessage(show) {
            let noResultsEl = document.querySelector('.no-results-message');
            
            if (show) {
                if (!noResultsEl) {
                    noResultsEl = document.createElement('div');
                    noResultsEl.className = 'no-results-message';
                    noResultsEl.innerHTML = `
                        <i class="fas fa-images" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                        <h3 style="color: #666; margin-bottom: 10px;">Aucune image trouvée</h3>
                        <p style="color: #999; margin-bottom: 20px;">Aucune image ne correspond à votre recherche</p>
                        <button class="btn-reset" style="background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Voir toutes les images</button>
                    `;
                    galleryGrid.appendChild(noResultsEl);
                    
                    noResultsEl.querySelector('.btn-reset').addEventListener('click', resetFilters);
                }
            } else {
                if (noResultsEl) {
                    noResultsEl.remove();
                }
            }
        }

        // Réinitialiser les filtres
        window.resetFilters = function() {
            currentFilter = 'all';
            currentSearch = '';
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            
            if (searchInput) {
                searchInput.value = '';
            }
            
            applyFilters();
        };

        // Événements sur les boutons de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                currentFilter = this.getAttribute('data-filter');
                applyFilters();
            });
        });

        // Recherche avec debounce
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                currentSearch = this.value.toLowerCase().trim();
                applyFilters();
            });
        }

        // Initialisation
        updateCounters();
        applyFilters();
    }

    // ==================== LIGHTBOX AMÉLIORÉE ====================
    const lightbox = document.getElementById('galleryLightbox');
    
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.prev');
        const nextBtn = lightbox.querySelector('.next');
        
        let currentIndex = 0;
        let images = [];
        
        // Initialiser la lightbox
        function initLightbox() {
            images = [];
            
            document.querySelectorAll('.gallery-item:not(.filtered-out)').forEach((item, index) => {
                const img = item.querySelector('.gallery-image');
                const title = item.querySelector('h3')?.textContent || '';
                const desc = item.querySelectorAll('p')[0]?.textContent || '';
                const location = item.querySelectorAll('p')[1]?.textContent || '';
                
                if (img) {
                    images.push({
                        src: img.src,
                        title: title,
                        desc: desc,
                        location: location,
                        element: item
                    });
                }
                
                // Supprimer ancien écouteur et ajouter le nouveau
                item.removeEventListener('click', handleImageClick);
                item.addEventListener('click', handleImageClick);
            });
        }

        // Gestionnaire de clic sur image
        function handleImageClick(e) {
            if (e.target.closest('a') || e.target.closest('button')) return;
            
            const clickedItem = e.currentTarget;
            const newIndex = images.findIndex(img => img.element === clickedItem);
            
            if (newIndex !== -1) {
                currentIndex = newIndex;
                updateLightbox();
                lightbox.classList.add('active');
                body.style.overflow = 'hidden';
            }
        }

        // Mettre à jour la lightbox
        function updateLightbox() {
            if (images.length === 0) return;
            
            const img = images[currentIndex];
            lightboxImg.src = img.src;
            lightboxImg.alt = img.title;
            lightboxCaption.innerHTML = `
                <h3 style="margin-bottom: 5px;">${img.title}</h3>
                <p style="margin: 0;">${img.desc} ${img.location}</p>
                <span style="font-size: 12px; color: #999;">${currentIndex + 1} / ${images.length}</span>
            `;
        }

        // Navigation
        function nextImage() {
            if (images.length === 0) return;
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        }

        function prevImage() {
            if (images.length === 0) return;
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        }

        // Événements lightbox
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                body.style.overflow = '';
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                body.style.overflow = '';
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        });

        // Réinitialiser la lightbox après filtrage
        const observer = new MutationObserver(() => {
            initLightbox();
        });
        
        observer.observe(galleryGrid, { childList: true, subtree: true });
        
        // Initialisation
        initLightbox();
    }

    // ==================== HOVER SUR LES IMAGES ====================
    document.querySelectorAll('.gallery-item').forEach(item => {
        const overlay = item.querySelector('.image-overlay');
        const image = item.querySelector('.gallery-image');
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
            
            if (overlay) {
                overlay.style.opacity = '1';
            }
            
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
            
            if (overlay) {
                overlay.style.opacity = '0';
            }
            
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // ==================== BOUTON RETOUR EN HAUT ====================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
        background: #e7a23a; color: white; border: none; border-radius: 50%;
        cursor: pointer; display: none; align-items: center; justify-content: center;
        font-size: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 999;
        transition: all 0.3s ease;
    `;
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px)';
        scrollTopBtn.style.background = '#e7a23a';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0)';
        scrollTopBtn.style.background = '#e7a23a';
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

    // ==================== EFFET PARALLAX SUR LE HEADER ====================
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled > 100) {
                pageHeader.style.backgroundPosition = `center ${scrolled * 0.5}px`;
            }
        });
    }

    // ==================== GESTION DES LIENS ACTIFS ====================
    const currentPage = window.location.pathname.split('/').pop() || 'galerie.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
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
});

// ==================== STYLES CSS AJOUTÉS DYNAMIQUEMENT ====================
const style = document.createElement('style');
style.textContent = `
    /* Styles pour la galerie */
    .gallery-item {
        transition: all 0.3s ease !important;
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    
    .gallery-image-wrapper {
        position: relative;
        overflow: hidden;
        border-radius: 10px 10px 0 0;
    }
    
    .gallery-image {
        transition: transform 0.5s ease;
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
    
    .image-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
    }
    
    .image-overlay i {
        color: white;
        font-size: 40px;
        transform: scale(0);
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .image-overlay i {
        transform: scale(1);
    }
    
    .gallery-category {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #e74c3c;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        font-weight: 600;
        z-index: 2;
    }
    
    .gallery-caption {
        padding: 15px;
    }
    
    .gallery-caption h3 {
        margin: 0 0 10px 0;
        font-size: 16px;
        color: #333;
    }
    
    .gallery-caption p {
        margin: 5px 0;
        font-size: 14px;
        color: #666;
    }
    
    .caption-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #eee;
    }
    
    .views {
        color: #999;
        font-size: 13px;
        cursor: pointer;
    }
    
    .views i {
        margin-right: 5px;
    }
    
    .views:hover {
        color: #e74c3c;
    }
    
    /* Filtres */
    .filter-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 40px;
    }
    
    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .filter-btn {
        padding: 10px 20px;
        border: none;
        background: white;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    .filter-btn:hover {
        background: #e74c3c;
        color: white;
        transform: translateY(-2px);
    }
    
    .filter-btn.active {
        background: #e74c3c;
        color: white;
    }
    
    .filter-btn .count {
        margin-left: 8px;
        padding: 2px 6px;
        background: rgba(0,0,0,0.1);
        border-radius: 3px;
        font-size: 12px;
    }
    
    .filter-btn.active .count {
        background: rgba(255,255,255,0.2);
    }
    
    .filter-search {
        position: relative;
        flex: 1;
        max-width: 300px;
    }
    
    .filter-search i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: #999;
    }
    
    .filter-search input {
        width: 100%;
        padding: 12px 20px 12px 45px;
        border: 1px solid #ddd;
        border-radius: 30px;
        font-size: 14px;
        transition: all 0.3s ease;
    }
    
    .filter-search input:focus {
        outline: none;
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    /* Lightbox */
    .gallery-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        z-index: 9999;
        display: none;
        justify-content: center;
        align-items: center;
    }
    
    .gallery-lightbox.active {
        display: flex;
        animation: fadeIn 0.3s ease;
    }
    
    .lightbox-content {
        max-width: 90%;
        max-height: 80%;
        position: relative;
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 70vh;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(0,0,0,0.3);
    }
    
    .lightbox-caption {
        position: absolute;
        bottom: -50px;
        left: 0;
        width: 100%;
        color: white;
        text-align: center;
        padding: 10px;
    }
    
    .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: white;
        border: none;
        border-radius: 50%;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .lightbox-close:hover {
        transform: rotate(90deg);
        background: #e74c3c;
        color: white;
    }
    
    .lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        background: rgba(255,255,255,0.2);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .lightbox-nav:hover {
        background: #e74c3c;
    }
    
    .lightbox-nav.prev {
        left: 20px;
    }
    
    .lightbox-nav.next {
        right: 20px;
    }
    
    .no-results-message {
        grid-column: 1 / -1;
        text-align: center;
        padding: 50px;
        background: #f9f9f9;
        border-radius: 10px;
    }
    
    .btn-reset:hover {
        background: #c0392b !important;
        transform: translateY(-2px);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .filter-wrapper {
            flex-direction: column;
            align-items: stretch;
        }
        
        .filter-search {
            max-width: 100%;
        }
        
        .filter-buttons {
            justify-content: center;
        }
        
        .lightbox-nav {
            width: 40px;
            height: 40px;
            font-size: 16px;
        }
    }
`;

document.head.appendChild(style);