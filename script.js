// 23 Nisan Çocuk Bayramı Web Sitesi - JavaScript İşlevleri

// DOM Yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde animasyonları başlat
    initializeAnimations();
    
    // Form işlevlerini başlat
    initializeForms();
    
    // Navigasyon işlevlerini başlat
    initializeNavigation();
    
    // Oyun işlevlerini başlat
    if (document.querySelector('.games-grid')) {
        initializeGames();
    }
    
    // Etkinlik filtrelerini başlat
    if (document.querySelector('.filter-section')) {
        initializeEventFilters();
    }
});

// 1. Sayfa Animasyonları
function initializeAnimations() {
    // Hero section fade-in
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hero.style.transition = 'all 0.8s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Kartların sırayla görünmesi
    const cards = document.querySelectorAll('.event-card, .game-item, .workshop-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// 2. Form İşlevleri
function initializeForms() {
    // Şifre görünürlük toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });
    
    // Şifre güçlendirici
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const strength = checkPasswordStrength(this.value);
            updatePasswordStrength(this, strength);
        });
    });
    
    // Form validasyonu
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
    
    // Üyelik tipi değiştirme
    const membershipTabs = document.querySelectorAll('.tab-btn');
    membershipTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Aktif tabı değiştir
            membershipTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // İlgili içeriği göster
            const membershipType = this.dataset.membership;
            updateMembershipForm(membershipType);
        });
    });
}

// 3. Navigasyon İşlevleri
function initializeNavigation() {
    // Mobil menü toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            this.textContent = navList.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 4. Oyun İşlevleri
function initializeGames() {
    // Oyun kategori filtreleme
    const categoryTabs = document.querySelectorAll('.tab-btn');
    const gameCards = document.querySelectorAll('.game-item');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Aktif tabı değiştir
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Oyunları filtrele
            const category = this.dataset.category;
            filterGames(category, gameCards);
        });
    });
    
    // Ücretsiz erişim - Premium kısıtlamaları kaldırıldı
    // Tüm oyunlar artık herkese açık
    const allGames = document.querySelectorAll('.game-item');
    allGames.forEach(game => {
        game.addEventListener('click', function(e) {
            e.preventDefault();
            // Oyuna direkt erişim sağla
            const gameUrl = this.querySelector('a')?.href;
            if (gameUrl && !gameUrl.includes('#')) {
                window.location.href = gameUrl;
            }
        });
    });
}

// 5. Etkinlik Filtreleme
function initializeEventFilters() {
    const districtFilter = document.querySelector('#district-filter');
    const ageFilter = document.querySelector('#age-filter');
    const priceFilter = document.querySelector('#price-filter');
    const eventCards = document.querySelectorAll('.event-card');
    
    [districtFilter, ageFilter, priceFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', function() {
                filterEvents(eventCards);
            });
        }
    });
}

// Yardımcı Fonksiyonlar

// Şifre gücü kontrolü
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength < 2) return { level: 'weak', text: 'Zayıf', color: '#ff4757' };
    if (strength < 4) return { level: 'medium', text: 'Orta', color: '#ffa502' };
    return { level: 'strong', text: 'Güçlü', color: '#2ed573' };
}

// Şifre gücü görselini güncelle
function updatePasswordStrength(input, strength) {
    const container = input.parentElement;
    let strengthBar = container.querySelector('.strength-bar');
    let strengthText = container.querySelector('.strength-text');
    
    if (!strengthBar) {
        const strengthContainer = document.createElement('div');
        strengthContainer.className = 'password-strength';
        strengthContainer.innerHTML = `
            <div class="strength-bar"></div>
            <span class="strength-text"></span>
        `;
        container.appendChild(strengthContainer);
        strengthBar = strengthContainer.querySelector('.strength-bar');
        strengthText = strengthContainer.querySelector('.strength-text');
    }
    
    strengthBar.style.background = strength.color;
    strengthBar.style.width = strength.level === 'weak' ? '33%' : 
                              strength.level === 'medium' ? '66%' : '100%';
    strengthText.textContent = `Şifre Gücü: ${strength.text}`;
    strengthText.style.color = strength.color;
}

// Form validasyonu
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'Bu alan zorunludur');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // Email validasyonu
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Geçerli bir email adresi girin');
                isValid = false;
            }
        }
        
        // Telefon validasyonu
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, 'Geçerli bir telefon numarası girin');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Hata mesajı göster
function showFieldError(field, message) {
    clearFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    field.parentElement.appendChild(errorDiv);
    field.style.borderColor = '#ff4757';
}

// Hata mesajını temizle
function clearFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '#e0e0e0';
}

// Üyelik formunu güncelle
function updateMembershipForm(type) {
    const premiumSection = document.querySelector('.premium-benefits');
    const pricingCard = document.querySelector('.pricing-card');
    
    if (type === 'premium') {
        if (premiumSection) premiumSection.style.display = 'block';
        if (pricingCard) pricingCard.style.display = 'block';
    } else {
        if (premiumSection) premiumSection.style.display = 'none';
        if (pricingCard) pricingCard.style.display = 'none';
    }
}

// Oyunları filtrele
function filterGames(category, gameCards) {
    gameCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Etkinlikleri filtrele
function filterEvents(eventCards) {
    const district = document.querySelector('#district-filter')?.value;
    const age = document.querySelector('#age-filter')?.value;
    const price = document.querySelector('#price-filter')?.value;
    
    eventCards.forEach(card => {
        let show = true;
        
        if (district && district !== 'all' && card.dataset.district !== district) {
            show = false;
        }
        
        if (age && age !== 'all' && card.dataset.age !== age) {
            show = false;
        }
        
        if (price && price !== 'all' && card.dataset.price !== price) {
            show = false;
        }
        
        card.style.display = show ? 'block' : 'none';
        if (show) {
            card.style.animation = 'fadeInUp 0.5s ease';
        }
    });
}

// Ücretsiz erişim - Herkes premium özelliklere erişebilir
function isPremiumUser() {
    return true; // Artık herkes premium sayılıyor
}

// Premium modal göster
function showPremiumModal() {
    const modal = createModal(`
        <div class="premium-modal">
            <h3>🌟 Premium Üyelik Gerekli</h3>
            <p>Bu oyuna erişebilmek için Premium üyeliğiniz olması gerekiyor.</p>
            <div class="modal-benefits">
                <h4>Premium Avantajları:</h4>
                <ul>
                    <li>✅ Tüm oyunlara sınırsız erişim</li>
                    <li>✅ Reklamsız deneyim</li>
                    <li>✅ Özel içerikler</li>
                    <li>✅ İlerleme takibi</li>
                </ul>
            </div>
            <div class="modal-actions">
                <button onclick="closeModal()" class="btn-secondary">Daha Sonra</button>
                <a href="kayit.html" class="btn-primary">Premium Ol</a>
            </div>
        </div>
    `);
    document.body.appendChild(modal);
}

// Modal oluştur
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        animation: modalSlideIn 0.3s ease;
    `;
    modalContent.innerHTML = content;
    
    modal.appendChild(modalContent);
    
    // Dışarı tıklayınca kapat
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    return modal;
}

// Modal kapat
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Newsletter kayıt işlemi
function subscribeNewsletter(email) {
    // Simülasyon - gerçek uygulamada API çağrısı yapılır
    console.log('Newsletter kaydı:', email);
    alert('Newsletter kaydınız başarıyla tamamlandı! 🎉');
}

// CSS animasyonları ekle
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
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .modal-overlay .premium-modal h3 {
        color: var(--primary-color);
        margin-bottom: 15px;
    }
    
    .modal-benefits {
        text-align: left;
        margin: 20px 0;
        padding: 15px;
        background: var(--light-bg);
        border-radius: 10px;
    }
    
    .modal-benefits ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-benefits li {
        margin: 8px 0;
        color: var(--secondary-color);
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 20px;
    }
    
    .btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .btn-secondary:hover {
        background: #5a6268;
    }
    
    .nav-list.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 20px;
        z-index: 100;
    }
    
    @media (max-width: 768px) {
        .nav-list {
            display: none;
        }
        
        .mobile-toggle {
            display: block !important;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
    }
`;
document.head.appendChild(style);

// Debug konsol mesajı
console.log('🎉 23 Nisan Çocuk Bayramı Web Sitesi yüklendi!');
console.log('Merhaba küçük kodcular! 👨‍💻👩‍💻');