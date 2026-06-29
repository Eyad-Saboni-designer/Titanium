// ============================================
// TITANIUM PORTFOLIO - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. نظام فلترة التصنيفات
    // ============================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة النشاط من جميع الأزرار
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر المضغوط
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.add('hide');
                        item.classList.remove('show');
                    }
                }
            });
        });
    });
    
    // ============================================
    // 2. تأثير الظهور عند التمرير (Scroll Animation)
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // تطبيق الظهور على الأقسام
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
    
    // ============================================
    // 3. شريط التنقل الثابت مع التغيير عند التمرير
    // ============================================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // 4. التنقل السلس (Smooth Scroll)
    // ============================================
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 5. تأثير الكتابة على العنوان الرئيسي (Typewriter Effect)
    // ============================================
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 150);
    }
    
    // ============================================
    // 6. تأثير الماوس على البطاقات (3D Tilt Effect)
    // ============================================
    
    const portfolioCards = document.querySelectorAll('.portfolio-item');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ============================================
    // 7. عداد الإحصائيات (Counter Animation)
    // ============================================
    
    const statsSection = document.querySelector('.about');
    let counted = false;
    
    function animateCounter(element, target) {
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(count) + '+';
            }
        }, 16);
    }
    
    // ============================================
    // 8. نموذج التواصل (Form Handling)
    // ============================================
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // هنا يمكنك إضافة كود إرسال البيانات إلى الخادم
            alert('شكراً ' + name + '! تم استلام رسالتك وسأتواصل معك قريباً.');
            
            this.reset();
        });
    }
    
    // ============================================
    // 9. تأثير الجزيئات الذهبية (Golden Particles)
    // ============================================
    
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 215, 0, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }
    }
    
    // إضافة حركة الجزيئات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // ============================================
    // 10. قائمة الجوال (Mobile Menu)
    // ============================================
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // ============================================
    // 11. تأثير التحميل (Loading Animation)
    // ============================================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ============================================
    // 12. تأثير البارالاكس (Parallax Effect)
    // ============================================
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-decoration');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
});
