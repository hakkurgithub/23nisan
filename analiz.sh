echo "==============================================="
echo "📊 23 NİSAN ÇOCUK PORTALI PROJE ANALİZ RAPORU"
echo "==============================================="

# 1. DOSYA YAPISI KONTROLÜ
echo -e "\n📂 [1] Dosya Yapısı İnceleniyor..."
if [ -d "data" ]; then echo "✅ 'data' klasörü mevcut."; else echo "❌ 'data' klasörü EKSİK!"; fi
if [ -d "pages" ]; then echo "✅ 'pages' klasörü mevcut."; else echo "❌ 'pages' klasörü EKSİK!"; fi
if [ -f "public/manifest.json" ]; then echo "✅ PWA Manifest mevcut."; else echo "❌ PWA Manifest EKSİK!"; fi

# 2. KRİTİK VERİ DOSYALARI
echo -e "\n📄 [2] Veri Dosyaları Kontrolü (JSON):"
files=("data/events.json" "data/blog.json" "data/songs.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        count=$(grep -c "{" "$file")
        echo "✅ $file mevcut ($count kayıt bulundu)."
    else
        echo "❌ $file bulunamadı!"
    fi
done

# 3. ÜYELİK SİSTEMİ KALINTI TARAMASI (Temizlik Gereksinimi)
echo -e "\n🧹 [3] Üyelik Sistemi Kalıntı Taraması..."
echo "Aşağıdaki dosyalarda 'üyelik/ücret' terimleri bulundu (Temizlenmesi önerilir):"
grep -rnE "isLoggedIn|userType|premium|login|register" pages/ --exclude-dir=node_modules

# 4. GÖRSEL İZİNLERİ KONTROLÜ
echo -e "\n🖼️ [4] Görsel Yapılandırması (next.config.js):"
if grep -q "remotePatterns" next.config.js 2>/dev/null; then
    echo "✅ Görsel izinleri yapılandırılmış."
else
    echo "⚠️ 'next.config.js' içinde görsel izinleri (remotePatterns) eksik olabilir!"
fi

echo -e "\n==============================================="
echo "✅ Analiz Tamamlandı. Lütfen yukarıdaki çıktıyı AI'ya iletin."
echo "==============================================="