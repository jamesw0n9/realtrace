<!-- Translated from the English source README.md — English is the single source of truth. See docs/i18n.md. -->
<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.pt-BR.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.id.md">Bahasa Indonesia</a> ·
  <a href="README.it.md">Italiano</a> ·
  <a href="README.tr.md">Türkçe</a> ·
  <a href="README.vi.md">Tiếng Việt</a>
</p>
# RealTrace

> **AI çağında insan yaratıcılığının kanıtlanması olmalıdır.**
>
> Ed25519 imza zinciri · Gerçek zamanlı imzalanma · İçerik yükleme sıfır · Çevrimdışı doğrulama · Resmi başlangıç zinciri bağlama (bireysel kullanıcılara ücretsiz)

[![Lisans: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Sürüm](https://img.shields.io/badge/version-v0.5.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRlar Hoş karşılanır](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="RealTrace demo" width="640" />
  <br />
  <em>25 saniye · gerçek zamanlı imzalanmadan çevrimdışı doğrulamaya (demo · ses yok)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Tam demo videoyu izleyin (MP4)</a>
</p>

> Her şey sahte yapılabildiğinde, doğruluk bir lüks haline gelir. **Tespitçiler tahmin eder. RealTrace kanıtlar.**

RealTrace, bir **insan yaratıcılığı varlık sertifikasyon sistemi**: bir kriptografik imza zinciri kullanarak bir içerik parçasının "gerçekten bir insan tarafından gerçek zamanlı olarak yazıldığını" kanıtlar — AI tarafından oluşturulmamış, sonradan yapıştırılmamış, değiştirilmemiş.

```text
İnsan yaratıcılığı ── gerçek zamanlı imzalanma ── imza zinciri ── mühürlü ve bağlanmış ── doğrulanabilir · takip edilebilir · değiştirilemez
```

---

## Manifesto

Kasım 2022'de ChatGPT doğdu. O günden itibaren, her şeyin sahte yapılabileceği bir dünyada, doğruluk bir lüks haline geldi.

AI herhangi bir tarzı taklit edebilir — ancak yazma zamanınızı taklit edemez. Tespitçiler tahmin eder. RealTrace kanıtlar.

RealTrace, bir **insan yaratıcılığı varlık sertifikasyon sistemi**: yazmaya başladığınız andan itibaren, her mola, her silme, her tuşlama ritmi gerçek zamanlı olarak kaydedilir ve Ed25519 imzalarıyla mühürlü bir yaratıcı zincirine kilitlenir. Bitirdiğinizde, bir `.rt` zincir dosyası elde edersiniz — doğrulanabilir, takip edilebilir, değiştirilemez.

**Bu artık bir çoklu seçenek sorusu değil.** Her mühür, bir önceki mühürün hash'ine atıfta bulunur. Neden-sonuç sırası kriptografiyle kilitlenir; her geriye dönük değişiklik matematiksel olarak tespit edilebilir. Bu, fizik ve matematikten gelen bir kanıt, istatistiksel bir modelden yapılan bir tahmin değildir.

**Siz yazarısınız. Kanıt hak ediyorsunuz.** Birisi "Bu AI tarafından mı yazıldı?" diye sorduğunda, açıklamak zorunda kalmamalısınız. RealTrace, size bağımsız olarak doğrulanabilir bir varlık kanıtı verir — yayınlamak, haklarınızı savunmak, kanıt için. Yaratıcılar eller boşla mücadele etmemelidir.

**İçerik her zaman size aittir.** Metin her zaman cihazınızda kalır; zincir sadece hash'leri ve davranışsal özellikleri kaydeder. Gizliliğinizi korumayı taahhüt etmiyoruz — mimarimiz, içeriklerinizi bizim için sahip olmayı imkansız kılar. İmzalanma, doğrulama ve sertifikalı kontrol tümü çevrimdışı olarak gerçekleşir. Zincir, sitemiz düşerse bile çalışmaya devam eder.

**Güven, yalnızca platform tarafından değil, belirlenmelidir.** Alt zincir kök hash'leri resmi başlangıç zincirine bağlanır. Her platformda imzalanan zincirler, bağımsız denetim için aynı açık bağlantıya geri izlenebilir.

RealTrace açık kaynaklıdır. Bireysel kullanıcılara ücretsizdir. Her yaratıcı kendi çalışmasını mühürleyebilir.

**Sizin yaratıcılığınız. Varlık kanıtınız.**

---

## İnsan yaratıcılığı biriktirilmesi gereken bir şey haline geldiğinde

Temmuz 2026'da, açılan mahkeme belgeleri, Anthropic'in "Project Panama" adlı projesini ortaya çıkardı: ikinci el satıcılar aracılığıyla bir milyondan fazla kullanılmış fiziksel kitabın toplu satın alınması — hidrolik bir presle sırtları kesilmiş, sayfa sayfa taranmış, ardından imha edilmiş — tüm bunlar Claude'nin "insan elleriyle yazılmış kelimeleri" daha fazla okuması için. Ayrı bir davada, yaklaşık 7 milyon izinsiz kitap eğitimde kullanılmış, 1,5 milyar dolarlık bir anlaşma sonucu ABD telif hakkı davasında rekor kırılmış.

AI şirketleri insan yaratıcılığını biriktiriyor. Çünkü herkesin bildiği gibi: modeller sonsuz olarak oluşturabilir, ancak insan düşünce, deneyimi ve seçimi sınırlıdır. Eski kitaplar satın alınır, taranır ve imha edilir; bir sonraki neslin yazdığı kelimeler AI selinde boğulur — "Bu ben yazdım" kanıtlamak bile mümkün olmaz.

İnsan yaratıcılığı nadir hale geldiğinde, kanıtlanması ve korunması gerekmektedir.

Bu tam da RealTrace'nin yaptığı şey: yazmaya başladığınız an itibaren, yaratıcı süreçleriniz mühürlü, değiştirilebilir bir imza zincirine kilitlenir. Sözleriniz her zaman size aittir. Yaratıcınızın varlık kanıtı vardır.

**İnsan yaratıcılığı nadir hale geldiğinde, RealTrace onun varlık kanıtıdır.**

---

## RealTrace'nin varoluş nedeni

Kasım 2022'de ChatGPT doğdu. O günden itibaren, internet üzerinde her şey "güvenilmez" haline geldi: haberler, yorumlar, makaleler, şiirler, kodlar, sözleşmeler, davalar — kimse, hatta yazar bile, bir metnin insan mı yoksa makine mi olduğunu soyut bir gözle belirleyemez.

En korkutucu olan "AI şeyler yazabilir" değil: **her şey sahte yapılabildiğinde, doğruluk bir lüks haline gelir**. İnsan yaratıcılığının değeri sessizce zayıflamaktadır — düşünceleriniz, duygularınız, deneyimleriniz ve seçimleriniz, makine çıkışından ayırt edilemez metne dönüşmüştür.

RealTrace'nin misyonu, "insan yaratıcılığı"na kriptografik bir **varlık kanıtı** vermek:

- **Yazmaya başladığınız andan itibaren**: "Bu ben yazdım" sonrası bir iddia değil, yaratıcı sürecin gerçek zamanlı kaydedilmesi ve imzalanması;
- **Platform itibarına bağımlı değil**: her imza, çevrimdışı olarak bağımsız olarak doğrulanabilir ve matematiksel olarak denetlenebilir;
- **İçerik yükleme sıfır**: metin her zaman elinizde kalır; zincir sadece hash'leri ve davranışsal özellikleri kaydeder.

> AI her şeyi taklit edebildiği bir çağda, insan yaratıcılığının onuru korunmalıdır.

---

## Çözümlediğimiz sorunlar

| Sorun | RealTrace'nin çözümü |
|:--|:--|
| AI tarafından oluşturulan içerik insan yaratıcılığından ayırt edilemez | Gerçek zamanlı imzalanma: Yazma sırasında otomatik olarak oluşturulan Ed25519 imza mühürleri, tuşlama ritmi, mola, silme miktarı ve diğer davranışsal özellikleri kaydeder |
| Sonradan değiştirme veya değiştirme tespit edilemez | Zincir hash'leme: Her mühür, bir önceki mühürün hash'ine atıfta bulunur; her geriye dönük değişiklik matematiksel olarak tespit edilebilir |
| İçerik yükleme gizlilik riski yaratır | İçerik yükleme sıfır: Metin yerel kalır; zincir sadece içerik hash'lerini ve davranışsal özellikleri kaydeder |
| Doğrulama sunucuya bağımlıdır; zincir sitemiz düşerse sona erer | Tamamen çevrimdışı: imzalanma, doğrulama ve sertifikalı kontrol tümü yerel olarak gerçekleşir; `.rt` dosyaları kendine yeterlidir |
| "Kim imzaladı, hangi sürüm imzalandı" takip edilemez | Başlangıç zinciri bağlama: alt zincir anahtarları, HKDF-SHA256 ile resmi tohumdan deterministik olarak türetilir; alt zincir kök hash'leri resmi başlangıç zincirine bağlanır — yukarı ve aşağı doğru takip edilebilir (bireysel kullanıcılara ücretsiz) |

---

## Temel ilkeler

**İmza zinciri (mühür zinciri)** — yazma sırasında her mühür, imza zincirindeki bir düğüm:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **Neden-sonuç sırası sahte yapılamaz**: her mühürün hash'i, bir önceki mühürün hash'ine atıfta bulunur; zincirin topolojik sırası `prevChainHash` ile belirlenir, sistem zamanından bağımsızdır — sonradan eklenemez veya yeniden sıralanamaz;
- **Özel anahtarlar sahte yapılamaz**: Ed25519 imzaları, cihazınızda oluşturulan yerel özel anahtarlarla oluşturulur ve cihazınızdan çıkmaz;
- **Davranışsal parmak izi**: her mühür, güvenilirlik analizi için tuşlama ritmi / mola / silme özelliklerini taşıyan (HMAC davranış zinciri) için kullanılır;
- **Başlangıç zinciri bağlama**: alt zincir anahtarları, HKDF-SHA256 ile resmi tohumdan deterministik olarak türetilir; alt zincir kök hash'leri resmi başlangıç zincirine bağlanır — yukarı ve aşağı doğru takip edilebilir (bireysel kullanıcılara ücretsiz);
- **Tam metin Merkle bağlama**: her mühür aynı zamanda tam metin Merkle kökünü de hesaplar ve zincire yazar, herhangi bir parçanın seçici olarak açıklanmasını sağlar, tüm metni açığa çıkarmadan.

**Zincir dosya formatı (`.rt`)**: `chain.json` (imza zinciri) ve `meta.json` (sürüm, zaman, sertifikalı metadata) içeren bir ZIP konteyneri. Zincir, sadece "yaratıcı süreç kanıtlarını" kaydeder, içerik never kaydeder.

[`docs/chain-spec.md`](docs/chain-spec.md) ve [`docs/rt-file-format.md`](docs/rt-file-format.md) görmek için bakın.

---

## Hızlı başlangıç

### 1. Yerel olarak yazarı açın (sunucuya gerek yok)

`writer/index.html` dosyasını çift tıklayın veya reponun kök dizinini herhangi bir statik sunucu ile hizmet verin:

```bash
npx serve .
# http://localhost:3000/writer/ adresini açın
```

- Giriş editörüne girmeden önce "Anonim yazma" veya "Devam etmek için .rt içe aktarın" seçeneğini seçin; içerik yazarken otomatik olarak imzalanır;
- "Mühürle ve Bağla"yi tıklayarak onaylayın: `.txt` orijinal dosyası ve `.rt` zincir dosyasını indirerek çevrimdışı doğrulama sayfasına yönlendirilirsiniz (sadece yerel ihraç, yükleme yok);
- `verify/index.html`i açın ve `.rt` dosyasını sürükleyip bırakarak zincir bütünlüğünü tamamen çevrimdışı olarak doğrulayın.

### 2. Resmi başlangıç zinciri bağlama etkinleştirin (isteğe bağlı, bireysel kullanıcılara ücretsiz)

```bash
copy config.example.js config.js
```

`config.js`i düzenleyin:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // resmi yayınlanan adresi kullanın
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // mühürleme sırasında zincir kök hash'lerini sunucuya gönderin
  }
};
```

> `config.js`, `.gitignore` tarafından göz ardı edilir, bu yüzden kendi uç nokta yapılandırmanız tesadüfen sürükleme yapmaz.
> Kişisel yaratıklarınızı zincire bağlama **ücretsiz**dir; kurumsal / platform işbirliği lisanslıdır (ticari işbirliği için bizimle iletişime geçin).

### 3. Testleri çalıştırın

```bash
npm test
```

## Dizin yapısı

| Yol | Açıklama |
|:--|:--|
| `core/` | Puro ön uç çekirdek (tarayıcı IIFE, sıfır inşa bağımlılığı): imzalamak `stamp.js`, kriptografi `rt-crypto.js`, çevrimdışı doğrulama `rt-verifier.js`, zincir dosyası `rt-export.js`, Merkle açıklaması `rt-merkle.js`, zaman çizelgesi `rt-timeline.js`, dosya indirme `rt-downloader.js` |
| `writer/` | Yazma aracı (tek sayfa HTML): otomatik imzalamak + imzalı indirme |
| `verify/` | Çevrimdışı zincir doğrulama sayfası: bir `.rt` dosyasını sürükleyip doğrulamak |
| `anchor/` | Resmi başlangıç zinciri bağlama istemcisi (bireysel kullanıcılara ücretsiz) |
| `docs/` | Zincir spesifikasyonu, rt dosya formatı, bağlama API belgeleri |
| `test/` | Node gerileme testleri (24/24 geçen) |

---

## Proje nasıl büyüdü

| Tarih | Milyarlık |
|:--|:--|
| 2022.11 | **Kaynak**: ChatGPT başlatıldı; "AI tarafından oluşturulan içerik artık gözle ayrılamaz hale geldi" gerçeği, "insan yaratıcılığının varlık kanıtı" fikrinin doğuşuna neden oldu |
| 2026.06 | **İlk tam uygulama**: zincir imzalamak → imzalamak → çevrimdışı doğrulama → tamamen içsel sertifika, baştan sona; paralel olarak 11 icat patenti ortaya kondu, patent ajansına sunulan ana davacı dosyası |
| 2026.07 | **Modüler yeniden yapılandırma**: imzalamak çekirdek `stamp.js` modül olarak ayrıldı, kriptografi araç çubuğu `rt-crypto.js` katmanlandırıldı, yazma / doğrulama / bağlama hizmetleri ayrıldı; resmi olarak **RealTrace** adlandırıldı; resmi başlangıç zinciri bağlama hizmeti başlatıldı |
| 2026.08 | **Açık kaynak MVP v0.1.0 sürümü yayınlandı** (AGPL-3.0 + ticari çift lisans); işletme lisanslama modeli planlanıyor |
| 2026.08 | **v0.2.0 sürümü yayınlandı**: Merkle seçici açıklama + açıklama kanıtı oluşturma, altı dil arayüzü, zincir kimliği adlandırma kuralları, yaratım modu seçimi, modüler zaman çizelgesi |
| 2026.08 | **v0.3.0 sürümü yayınlandı**: başlangıç bağlama kuyruğu (çevrimdışı sıralama + otomatik yeniden başlama + imza çalınma önleme), altı dil bağlama kuyruğu panosu yazma içine entegre edildi |
| 2026.08 | **v0.4.0 sürümü yayınlandı**: kimlik modülü (.rtkey ihraç/import, parola ile şifrelenmiş kimlik kurtarma, imzaya gömülü kimlik), zincir formatı v3 birleştirme semantikleri (aynı anahtar devamı / çapraz anahtar birleştirme konteyneri), çapraz tarayıcı doğrulayıcı |
| 2026.08 | **v0.5.0 yayınlandı**: 14 dilli README; çevirilerin tek kaynağı İngilizcedir (docs/i18n.md) |

---

## Bu sürümde neler var (v0.4.0)

Bu depo tam bir açık kaynak inşaatıdır: tam "yaz -> imzala -> imzala -> doğrula -> kimlik devamı -> zincir birleştirme" döngüsünü uygular. Bu sürüm, aşağıdakileri içerir:

- **Gerçek zaman imzalamak**: yazma sırasında otomatik olarak oluşturulan Ed25519 imza imzaları, tuş vuruş ritmi, duraklama, silme miktarı ve diğer davranışsal özellikleri kaydeder;
- **Hile yapamaz zincir**: her imza, bir önceki imzanın zincir hash'ine atıfta bulunur; her geriye dönük değişiklik matematiksel olarak tespit edilebilir;
- **Sıfır içerik yükleme**: metin yerel kalır; zincir sadece içerik hash'lerini ve davranışsal özellikleri kaydeder;
- **Çevrimdışı doğrulama**: `.rt` zincir dosyaları tamamen çevrimdışı olarak doğrulanabilir, sunucu bağımlılığı yoktur;
- **Davranışsal parmak izi**: tuş vuruş ritmi / duraklama / silme özellikleri (HMAC davranış zinciri) güvenilirlik analizi için;
- **Başlangıç zinciri bağlama (isteğe bağlı, bireysel kullanıcılara ücretsiz)**: imzalandıktan sonra zincir kök hash'i resmi başlangıç zincirine sunulur, açık olarak denetlenebilir menşe oluşturulur;
- **Sürüm izlenebilirliği**: `.rt` paketleri `meta.json` içinde `appVersion` kaydeder ve zincir formatı `version` `chain.json` içinde; sürüm bağlama sırasında zincire taşınır;
- **Merkle seçici açıklama**: her imza, tam metin Merkle kökünü bağlar, bu nedenle her bölüm açıklanabilir, tüm metin açıklanmaz;
- **Açıklama kanıtı oluşturma**: çevrimdışı doğrulama sayfasında her bölüm için bir tıkla kanıt, Merkle yolu görselleştirme ve kopyalanabilir JSON;
- **Altı dil arayüzü**: yazma / doğrulayıcı / web sitesi 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Zincir kimliği adlandırma kuralları**: 23 karakter zincir kimliği (`web-personal-…`) açık anahtar + kök hash — doğrulanabilir, tersine çevrilemez;
- **Yaratım modu seçimi**: yazma öncesinde "Anonim yazma" veya ".rt'yi devam etmek için içe aktar" seçimi yapın; devam otomatik olarak orijinal zinciri uzatır;
- **Modüler zaman çizelgesi**: ölçeklenebilir histogram zaman çizelgesi paylaşılan modül `core/rt-timeline.js`'e ayrıldı, yazma ritmini bir bakışta görülebilir hale getirir.

- **Başlangıç bağlama kuyruğu**: imzalandıktan sonra zincir metadata öncelikle yerel olarak sıralanır ve geri döndüğünde otomatik olarak senkronize edilir; Ed25519 imzası (`chainId|rootHash`) iddia çalınmasını önler;
- **Bağlama kuyruğu panosu (altı dil)**: ⛓ durum göstergesi / bir tıkla manuel senkronize etme / otomatik senkronize etme düğmesi yazma içinde — sıfır içerik yükleme korunur;
- **Gizlilik bildirimi güncellemesi**: imzalandıktan sonra sadece zincir metadata'nın başlangıç zincirine senkronize olabileceğini ve ⛓ panosunda otomatik senkronize etmenin devre dışı bırakılabileceğini açıklar;
- **Kimlik modülü**: PBKDF2-SHA256 (600K iterasyon) + AES-256-GCM şifrelenmiş kimlik anahtarı; `.rtkey` kimlik anahtarı dosyalarını ihraç / ithal et; kimlik taşıyan bir `.rt` ithal etmek yaratıcıyı parola ile geri getirir; imzalamak, aynı anahtarın orijinal zinciri devam ettirmesini sağlar;
- **Zincir formatı v3 — birleştirme semantikleri**: aynı anahtar devamı otomatik olarak orijinal zinciri uzatır (`mergeChainsVerified` yeniden imzalar ve doğrular); çapraz anahtar zincirleri bir konteyner (`aggregateChains`) içine toplanabilir, alt zincir alt zincir doğrulanır;
- **Çapraz tarayıcı doğrulayıcı**: WebCrypto olarak yedekleyen tek bir tweetnacl imza doğrulaması — tarayıcılar arasında tutarlı sonuçlar.

> Tam değişiklik günlüğü: [CHANGELOG.md](CHANGELOG.md).

Tüm özellikler geriye dönük uyumludur: eski sürümler tarafından oluşturulan `.rt` zincir dosyaları, daha sonra sürümlerde doğrulanabilir ve takip edilebilir olmalıdır.

---

## Mevcut çözümlerden nasıl farklıyız

| | RealTrace | Ortalama e-imza | TSA zaman damgası | Telif hakkı kaydı |
|:--|:--|:--|:--|:--|
| "İçerik gerçekten zamanında bir insan tarafından yazıldığını kanıtlar" | ✅ süreç düzeyi kanıtlama zinciri | ❌ sadece imzaçının kimliğini kanıtlar | ❌ sadece zamanı kanıtlar | ❌ sonradan kayıt |
| Geriye dönük hile yapmayı önler | ✅ zincir hashing + imza | ⚠️ sadece imza nesnesi | ⚠️ sadece hash nesnesi | ❌ |
| Tüm yaratıcı süreci kapsar | ✅ ilk tuş vuruşundan imzaya kadar | ❌ | ❌ | ❌ |
| Çevrimdışı doğrulamaya uygundur | ✅ yerel `.rt` | ⚠️ PKI'ya bağlı | ⚠️ çevrimdışı hizmete bağlı | ❌ kayıt organına bağlı |
| Gizlilik (içerik yükleme yok) | ✅ sıfır içerik yükleme | — | — | ❌ içerik sunulmalıdır |

---

## Kullanım senaryoları

- **Yaratıcıların çalışmasını sunmak**: çalışmanız "Bu AI yazdı mı?" ile sorgulanırsa, `.rt` varlık kanıtı yaratıcı süreci açıklar — kelime sayısı, harcanan zaman, yaratıcı ritmi, herkes tarafından doğrulanabilir;
- **Telif hakkı savunması**: kanıt artık sözlü bir iddia olmaktan çıkıyor. Zincirdeki davranışsal parmak izi ve imza zinciri, orijinal yaratıcı sürecin denetlenebilir kanıtı sağlar;
- **Yayıncılar / içerik toplulukları**: bir sunumun gerçekten zamanında bir insan tarafından gerçekten oluşturulduğunu doğrulamak, daha sonra yapıştırılmış veya makineler tarafından toplu olarak oluşturulmuş olup olmadığını anlamak;
- **Akademik senaryolar**: makaleler, projeler ve teknik belgeler için orijinal süreç kanıtı, "Bu ben yazdım" ifadesinin bir dayanağı olur.

> Yaratıcılar, şüpheye maruz kalmadan yüzleşmemeleri gerektiği için.

---

## Gizlilik & güvenlik

- **Varsayılan olarak sıfır içerik yükleme**: yazmanız yerel kalır; zincir sadece içerik hash'lerini ve davranışsal özellikleri kaydeder;
- `.rt` zincir dosyaları tamamen sizin kontrolünüz altındadır — yerel olarak saklayın veya kendi şifrelemenizle yedekleyin;
- Resmi bağlama sadece zincir kök hash'ini ve imza metadata'sını sunar, içerik asla sunulmaz;
- Tüm doğrulama mantığı açık kaynaklıdır ve denetlenebilir;
- Güvenlik açığı bulursanız, yöneticilere özel olarak mesaj gönderin; düzeltme hazır olmadan açık olarak açıklamadan önce açıklamayın.

---

---

## Sponsor · Benim için bir kahve al

Projeyi beğendiniz mi? Benim için bir kahve alın ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- Çin: Alipay / WeChat Pay QR kodları (kişisel küçük ipuçları yalnızca, ticari lisans değil) 

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> Sponsorluk, sadece bir destek işaretidir — **ticari bir lisans değildir**. Kişisel kullanım ücretsiz kalır; işletme / platform entegrasyonu ayrı olarak `LICENSE.commercial`(LICENSE.commercial) aracılığıyla lisanslanır.

---

## Açık kaynak & ticari

**AGPL-3.0 + ticari çift lisans** (açık kaynak kısmı, `LICENSE`(LICENSE) içinde tam AGPL-3.0 metni tarafından yönetilir):

- **Bireysel kullanıcılar**: ücretsiz olarak kullanabilir, değiştirebilir ve dağıtabilir; kendiniz tarafından inşa edilmiş / kendiniz tarafından imzalanmış yaratıcı zincirler tamamen ücretsizdir ve çevrimdışı olarak kendiniz tarafından doğrulanabilir; resmi başlangıç zincirine bağlama bireysel kullanıcılara ücretsizdir;
- **Ticari olmayan kuruluşlar / küçük çevreler** (kamu veya sivil toplum kuruluşları, yazarlar / sanayi dernekleri vb., sivil toplum kaydı / yasal varlık belgesi ile doğrulanır): yalnızca iç üye kullanımı için ücretsizdir — dış ödeme hizmetleri, kamusal platform işletimi, entegrasyon sonrası yeniden satış veya yeniden dağıtım yapılmaz;
- **Şirketler / platformlar**: işbirliği lisanslanır — `LICENSE.commercial`(LICENSE.commercial) bakarak bakın.

> Kişisel kullanım ücretsizdir; işletme / platform ticari entegrasyonu için ayrı bir lisans gereklidir. Sorunlar ve Çekirdek İstekleri hoş karşılanır — zincir format uyumluluğu, doğrulama doğruluğu ve gizlilik/güvenlik sorunları önceliklidir.

---

**Sizin yaratıcılığınız. Varlık kanıtınız.**

AI'nin her şeyi taklit edebileceği bir çağda, insan yaratıcılığının gururu savunulmalıdır.
