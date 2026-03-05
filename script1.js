/**
 * CONTACT.JS - Formulaire de contact et FAQ
 */

if (window.location.pathname.includes('contact.html')) {

    document.addEventListener('DOMContentLoaded', function() {
        initContactForm();
        initFaqAccordion();
    });

    // Formulaire de contact
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value.trim();
            const consent = document.getElementById('consent')?.checked;
            
            const formStatus = document.getElementById('formStatus');
            const submitBtn = this.querySelector('.submit-btn');
            
            // Validation simple
            if (!name || !email || !subject || !message || !consent) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }
            
            // Simulation d'envoi
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
                this.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
            }, 1500);
        });
    }

    // FAQ Accordéon
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        if (!faqQuestions.length) return;
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Fermer toutes les autres FAQ
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                    const icon = item.querySelector('.faq-toggle i');
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                });
                
                // Ouvrir la FAQ cliquée si elle n'était pas active
                if (!isActive) {
                    faqItem.classList.add('active');
                    const icon = question.querySelector('.faq-toggle i');
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }

    // Validation d'email (réutilisée depuis utils.js)
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}