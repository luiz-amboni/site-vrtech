document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            // Correção: Ignora links que são apenas "#" (como o logo) para evitar erro de sintaxe
            if (href === '#' || !href.startsWith('#')) return;

            const target = document.querySelector(href);
            if (target) {
                // Calculate offset (Header height approx 80px + 20px padding = 100px)
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('mobile-menu');
                if (!navMenu.classList.contains('hidden')) {
                    navMenu.classList.add('hidden');
                }
            }
        });
    });

    // Mobile Menu Toggle (Fixed Logic)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('mobile-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('hidden');
        });
    }

    // Scroll Reveal Animation (Optimized)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 50; // Trigger earlier

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Debounce scroll event for performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    revealOnScroll(); // Initial check

    // Phone Mask (Brazilian Format)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let v = e.target.value.replace(/\D/g, "");
            
            if (v.length > 11) v = v.slice(0, 11);

            if (v.length > 10) {
                v = v.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
            } else if (v.length > 5) {
                v = v.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
            } else if (v.length > 2) {
                v = v.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
            } else if (v.length > 0) {
                v = v.replace(/^(\d*)/, "($1");
            }
            
            e.target.value = v;
        });
    }

    // WhatsApp Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o recarregamento da página
            console.log('Botão clicado. Iniciando envio...');

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            // Feedback visual de carregamento
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            // Envia para o Backend
            // Detecta automaticamente o endereço (localhost ou 127.0.0.1) para evitar erros de conexão
            const apiHost = window.location.hostname || 'localhost';
            fetch(`http://${apiHost}:3000/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, phone })
            })
            .then(response => {
                if (response.ok) {
                    alert('Recebemos sua solicitação! Entraremos em contato em breve.');
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        throw new Error(data.error || 'Erro desconhecido no servidor');
                    });
                }
            })
            .catch(error => {
                console.error('Erro detalhado:', error);
                alert(`Erro ao enviar: ${error.message}\n\nVerifique se o servidor (npm start) está rodando na porta 3000.`);
            })
            .finally(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});