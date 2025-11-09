// Image 404 Error Handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('🖼️ Image error handler başlatıldı...');
    
    // Tüm img elementlerini bul
    const images = document.querySelectorAll('img');
    let errorCount = 0;
    
    images.forEach(function(img, index) {
        // Error event listener ekle
        img.addEventListener('error', function() {
            errorCount++;
            console.log(`❌ Image ${index + 1} yüklenemedi: ${img.src}`);
            
            // Önce SVG versiyonu var mı kontrol et
            checkSvgAlternative(img);
        });
        
        // Load event listener ekle (başarılı yükleme için)
        img.addEventListener('load', function() {
            console.log(`✅ Image ${index + 1} başarıyla yüklendi: ${img.src}`);
        });
    });
    
    // 2 saniye sonra kontrol et
    setTimeout(function() {
        console.log(`📊 Toplam ${images.length} görsel, ${errorCount} hata`);
        if (errorCount > 0) {
            console.log('💡 Placeholderlar aktif edildi');
        }
    }, 2000);
});

// SVG alternatif kontrolü
function checkSvgAlternative(img) {
    const originalSrc = img.src;
    
    // JPG veya PNG dosyası ise SVG versiyonunu kontrol et
    if (originalSrc.includes('.jpg') || originalSrc.includes('.png')) {
        const svgSrc = originalSrc.replace(/\.(jpg|png)$/, '.svg');
        
        // SVG dosyası var mı test et
        fetch(svgSrc)
            .then(response => {
                if (response.ok) {
                    console.log(`🔄 SVG alternatif bulundu: ${svgSrc}`);
                    img.src = svgSrc;
                } else {
                    throw new Error('SVG bulunamadı');
                }
            })
            .catch(() => {
                console.log(`📦 SVG alternatif yok, placeholder oluşturuluyor: ${originalSrc}`);
                createImagePlaceholder(img);
            });
    } else {
        // SVG değilse direkt placeholder oluştur
        createImagePlaceholder(img);
    }
}

function createImagePlaceholder(img) {
    // Orijinal boyutları al
    const width = img.offsetWidth || img.width || 200;
    const height = img.offsetHeight || img.height || 150;
    
    // Placeholder emoji belirleme
    let emoji = '🎨';
    let title = 'Görsel';
    
    const src = img.src.toLowerCase();
    
    if (src.includes('logo')) {
        emoji = '🏠';
        title = '23 Nisan Logo';
    } else if (src.includes('hero') || src.includes('banner')) {
        emoji = '🎉';
        title = 'Ana Banner';
    } else if (src.includes('instructor') || src.includes('uzman')) {
        emoji = '👩‍🏫';
        title = 'Eğitmen';
    } else if (src.includes('project')) {
        if (src.includes('parmak')) emoji = '🖐️';
        else if (src.includes('kagit')) emoji = '🎭';
        else if (src.includes('cicek')) emoji = '🌸';
        else if (src.includes('origami')) emoji = '🗾';
        else if (src.includes('seramik')) emoji = '🏺';
        else if (src.includes('mozaik')) emoji = '🧩';
        else if (src.includes('ahsap')) emoji = '🪵';
        else if (src.includes('mandala')) emoji = '🌀';
        else if (src.includes('tshirt')) emoji = '👕';
        else if (src.includes('cam')) emoji = '🪟';
        else if (src.includes('heykel')) emoji = '🗿';
        else if (src.includes('mural')) emoji = '🖼️';
        title = 'Sanat Projesi';
    } else if (src.includes('oyun')) {
        if (src.includes('boyama')) emoji = '🎨';
        else if (src.includes('yapboz')) emoji = '🧩';
        else if (src.includes('hafiza')) emoji = '🧠';
        else if (src.includes('quiz')) emoji = '❓';
        title = 'Oyun';
    } else if (src.includes('sponsor')) {
        emoji = '🏢';
        title = 'Sponsor';
    } else if (src.includes('user') || src.includes('avatar')) {
        emoji = '👤';
        title = 'Kullanıcı';
    } else if (src.includes('blog')) {
        emoji = '📝';
        title = 'Blog';
    } else if (src.includes('atolye')) {
        emoji = '🛠️';
        title = 'Atölye';
    } else if (src.includes('gallery')) {
        emoji = '🖼️';
        title = 'Galeri';
    } else if (src.includes('etkinlik')) {
        emoji = '🎪';
        title = 'Etkinlik';
    } else if (src.includes('video')) {
        emoji = '🎬';
        title = 'Video';
    }
    
    // SVG placeholder oluştur
    const svgPlaceholder = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad${Date.now()}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#457B9D;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#A8DADC;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad${Date.now()})" rx="8"/>
            <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="${Math.min(width/4, 48)}" text-anchor="middle" fill="white">${emoji}</text>
            <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="${Math.min(width/15, 14)}" text-anchor="middle" fill="white" opacity="0.9">${title}</text>
        </svg>
    `;
    
    // SVG'yi data URL'e çevir
    const svgBlob = new Blob([svgPlaceholder], {type: 'image/svg+xml'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Image src'yi değiştir
    img.src = svgUrl;
    img.alt = `${title} Placeholder`;
    
    // Debugging için
    img.style.border = '2px solid rgba(230, 57, 70, 0.3)';
    img.title = `Placeholder: ${title} (Orijinal: ${img.getAttribute('data-original-src') || 'Bilinmiyor'})`;
    
    // Orijinal src'yi kaydet
    if (!img.getAttribute('data-original-src')) {
        img.setAttribute('data-original-src', img.getAttribute('src') || 'Bilinmiyor');
    }
}

// Konsol bildirimleri
console.log('🎨 23 Nisan Image Handler yüklendi!');
console.log('📷 404 hataları otomatik placeholder ile değiştirilecek');
console.log('🔧 Debug: Placeholder görsellerin kırmızı border\'ı var');

// Global error handler
window.addEventListener('error', function(e) {
    if (e.target && e.target.tagName === 'IMG') {
        console.log('🚨 Global image error yakalandı:', e.target.src);
        createImagePlaceholder(e.target);
    }
});

// Image replacement helper function
window.replaceImageWithPlaceholder = function(imgElement, customEmoji, customTitle) {
    if (imgElement && imgElement.tagName === 'IMG') {
        // Custom emoji ve title ile placeholder oluştur
        const emoji = customEmoji || '🎨';
        const title = customTitle || 'Görsel';
        
        const width = imgElement.offsetWidth || 200;
        const height = imgElement.offsetHeight || 150;
        
        const svgPlaceholder = `
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#457B9D" rx="8"/>
                <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" fill="white">${emoji}</text>
                <text x="50%" y="75%" font-family="Arial" font-size="12" text-anchor="middle" fill="white">${title}</text>
            </svg>
        `;
        
        const svgBlob = new Blob([svgPlaceholder], {type: 'image/svg+xml'});
        const svgUrl = URL.createObjectURL(svgBlob);
        
        imgElement.src = svgUrl;
        imgElement.alt = `${title} Placeholder`;
    }
};