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

> **Kreasi manusia harus tetap dapat diproses dalam era AI.**
>
> Rantai tanda tangan Ed25519 · Penstempelan real-time · Tidak ada pemberian konten · Verifikasi luring · Penyanggaan genesis-chain resmi (gratis untuk individu)

[![Lisensi: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Versi](https://img.shields.io/badge/version-v0.5.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="Demo RealTrace" width="640" />
  <br />
  <em>25 detik · dari penstempelan real-time sampai verifikasi luring (demo · tanpa audio)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Tonton demo video penuh (MP4)</a>
</p>

> Saat segalanya dapat diseludupi, keaslihan menjadi kekayaan. **Detektor memperkirakan. RealTrace membuktikan.**

RealTrace adalah sistem sertifikasi kehadiran kreasi manusia: ia menggunakan rantai tanda tangan kriptografis untuk membuktikan bahwa suatu konten "telah ditulis secara sebenarnya oleh manusia dalam waktu nyata" — bukan yang dihasilkan oleh AI, bukan yang diseludupi setelahnya, bukan yang diubah.

```text
Kreasi manusia ── penstempelan real-time ── rantai tanda tangan ── disegel & disangga ── dapat diverifikasi · dapat dicari · tak dapat diseludupi
```

---

## Manifes

Pada November 2022, ChatGPT lahir. Dari hari itu, di dunia tempat segalanya dapat diseludupi, keaslihan menjadi kekayaan.

AI dapat meniru setiap gaya — kecuali waktu pengerjaan tulisannya. Detektor memperkirakan. RealTrace membuktikan.

RealTrace adalah sistem sertifikasi kehadiran kreasi manusia: dari detik pertama Anda mulai menulis, setiap henti, setiap penghapusan, setiap ritme pengetikan tombol Anda direkam secara real-time dan disegel dengan tanda tangan Ed25519 ke dalam rantai kreasi yang tak dapat diubah. Saat Anda selesai, Anda memiliki berkas `.rt` — dapat diverifikasi, dapat dicari, tak dapat diseludupi.

**Ini bukan lagi pertanyaan pilihan ganda.** Setiap stempel merujuk kepada hash yang sebelumnya. Urutan kasual disegel dengan kriptografi; setiap modifikasi balik adalah yang dapat dideteksi secara matematika. Ini adalah bukti dari fisika dan matematika, bukan perkiraan dari model statistik.

**Anda adalah penulis. Anda berhak mendapatkan bukti.** Saat seseorang bertanya "apakah AI menulis ini?", Anda tidak perlu menjelaskan. RealTrace memberikan bukti kehadiran yang dapat diverifikasi secara independen — untuk penerbitan, untuk mempertahankan hak Anda, untuk bukti. Penulis tidak harus berkelahi dengan tangan kosong.

**Konten Anda milik Anda. Selalu.** Teks tidak pernah meninggalkan perangkat Anda; rantai hanya merekam hash dan ciri perilaku. Kami tidak berjanji untuk melindungi privasi Anda — arsitektur menjadikan hal itu tidak mungkin bagi kami untuk memiliki konten Anda. Penstempelan, verifikasi, dan pengecekan sertifikat semua terjadi luring. Rantai tetap berfungsi bahkan jika situs kami turun.

**Kepercayaan tidak boleh diutus oleh platform sendiri.** Hash root sub-rantai disangga ke rantai genesis resmi. Rantai yang ditandatangani di platform mana pun dapat dicari kembali ke anchor publik yang sama untuk audit independen.

RealTrace adalah open source. Gratis untuk individu. Setiap penulis dapat menandatangani karyanya sendiri.

**Kreasi Anda. Bukti kehadiran Anda.**

---

## Kapan kreasi manusia menjadi sesuatu yang dihimpun

Pada Juli 2026, dokumen pengadilan yang belum disegel mengungkapkan "Proyek Panama" Anthropic: pembelian berkelompok lebih dari satu juta buku fisik yang digunakan melalui penjual secondhand — leher buku disuntik dengan mesin pengerubung hidraulik, discan halaman demi halaman, lalu dihancurkan — semua untuk Claude dapat membaca lebih banyak "kata yang ditulis oleh tangan manusia." Dalam kasus terpisah, sekitar 7 juta buku yang tidak sah digunakan untuk pelatihan, berakhir dengan penyelesaian $1,5 miliar, rekor di pengadilan hak cipta Amerika Serikat.

Perusahaan AI mengumpulkan kreasi manusia. Karena mereka tahu lebih baik daripada siapa pun: model dapat menghasilkan secara tak terbatas, tetapi pikiran, pengalaman, dan pilihan manusia adalah terbatas. Buku lama akan dibeli, discan, dan dihancurkan; kata yang ditulis generasi berikutnya terdampar di banjir AI — bahkan tak dapat membuktikan "Saya menulis ini."

Ketika kreasi manusia menjadi langka, ia perlu diproses dan dilindungi.

Ini adalah yang yang dilakukan oleh RealTrace: dari detik pertama Anda mulai menulis, proses kreatif Anda disegel ke dalam rantai tanda tangan yang dapat diverifikasi dan dapat dicari. Kata-kata Anda selalu milik Anda. Kreasi Anda memiliki bukti kehadiran.

**Ketika kreasi manusia menjadi langka, RealTrace adalah bukti kehadirannya.**

---

## Mengapa RealTrace ada

Pada November 2022, ChatGPT lahir. Dari hari itu, segalanya di internet menjadi "tidak dapat dipercaya": berita, komentar, esai, puisi, kode, kontrak, gugatan — tidak seorangpun, bahkan penulis, dapat mengetahui dengan mata buta apakah suatu teks datang dari manusia atau mesin.

Lebih menakutkan daripada "AI dapat menulis hal-hal" adalah ini: **kapan segalanya dapat diseludupi, keaslihan menjadi kekayaan**. Nilai kreasi manusia sedang disilangkan secara diam-diam — pikiran, emosi, pengalaman, dan pilihan Anda menjadi teks yang tak dapat dibedakan dari output mesin.

Misi RealTrace adalah memberikan "kreasi manusia" bukti kriptografis **kehadiran**:

- **Dari detik pertama Anda menulis**: bukan klaim setelahnya "Saya menulis ini", tetapi perekam dan penandatanganan proses kreatif secara real-time;
- **Tidak bergantung pada reputasi platform**: setiap tanda tangan dapat diverifikasi secara independen luring dan dievaluasi secara matematika;
- **Tidak ada pemberian konten**: teks selalu berada di tangannya; rantai hanya merekam hash dan ciri perilaku.

> Dalam era tempat AI dapat meniru segalanya, kehormatan kreasi manusia layak untuk dipertahankan.

---

## Masalah yang kami atasi

| Masalah | Solusi RealTrace |
|:--|:--|
| Konten yang dihasilkan oleh AI tak dapat dibedakan dari kreasi manusia | Penstempelan real-time: Tanda tangan Ed25519 yang dihasilkan secara otomatis selama menulis, merekam ritme pengetikan tombol, henti, volume penghapusan, dan ciri perilaku lainnya |
| Tidak dapat mendeteksi pemalsuan atau penggantian setelahnya | Hash rantai: Setiap tanda tangan merujuk kepada hash tanda tangan sebelumnya; setiap modifikasi balik dapat dideteksi secara matematika |
| Pemberian konten mengakibatkan risiko privasi | Tidak ada pemberian konten: teks selalu berada di tempat lokal; rantai hanya merekam hash dan ciri perilaku |
| Verifikasi tergantung pada server; rantai mati saat situs turun | Luring penuh: Penstempelan, verifikasi, dan pengecekan sertifikat semua terjadi di tempat; berkas `.rt` adalah yang bersendiri |
| Tak dapat dicari "siapa yang menandatangani, versi yang ditandatangani" | Penyanggaan genesis-chain: Hash root sub-rantai disangga ke rantai genesis resmi; versi direkam bersama dengan rantai dan dapat dievaluasi publik |

---

## Prinsip inti

**Rantai tanda tangan (rantai stempel)** — setiap stempel selama menulis adalah node di rantai tanda tangan:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **Urutan kasual tak dapat diseludupi**: setiap tanda tangan hash merujuk kepada tanda tangan sebelumnya; aturannya topologis rantai ditentukan oleh `prevChainHash`, independen dari waktu sistem — tak dapat disisipkan atau diurutkan setelahnya;
- **Kunci pribadi tak dapat diseludupi**: tanda tangan Ed25519 dihasilkan oleh kunci pribadi yang dihasilkan secara lokal yang tak pernah meninggalkan perangkat Anda;
- **Tanda tangan perilaku**: setiap tanda tangan membawa ciri ritme pengetikan tombol / henti / penghapusan (rantai behavior chain HMAC) untuk analisis kepercayaan;
- **Penyanggaan genesis-chain**: kunci sub-rantai diambil secara deterministik dari biji resmi melalui HKDF-SHA256; hash root sub-rantai disangga ke rantai genesis resmi — dapat dicari ke atas dan ke bawah (gratis untuk individu);
- **Pengikatan Merkle full-text**: setiap stempel juga menghitung root Merkle teks penuh dan menulisnya ke dalam rantai, memungkinkan pengungkapan selektif setiap pasal tanpa mengungkapkan seluruh teks.

**Format berkas rantai (`.rt`)**: wadah ZIP yang mengandung `chain.json` (rantai tanda tangan) dan `meta.json` (versi, waktu, metadata sertifikat). Rantai hanya merekam bukti proses kreatif, tak pernah merekam konten.

Lihat [`docs/chain-spec.md`](docs/chain-spec.md) dan [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Awalnya

### 1. Buka penulis secara lokal (tidak memerlukan server)

Klik ganda `writer/index.html`, atau layani root repo dengan server statis apapun:

```bash
npx serve .
# buka http://localhost:3000/writer/
```

- Pilih "Menulis tanpa nama" atau "Impor .rt untuk melanjutkan" sebelum memasuki editor; konten diseludupi secara otomatis saat Anda menulis;
- Klik "Disegel & Disangga" untuk mengkonfirmasi: Anda diarahkan ke halaman verifikasi luring untuk mengunduh teks asli dan berkas `.rt` (ekspor luring, tak ada pemberian);
- Buka `verify/index.html` dan seret berkas `.rt` untuk memverifikasi integritas rantai penuh luring.

### 2. Aktifkan penyanggaan genesis-chain resmi (opsional, gratis untuk individu)

```bash
copy config.example.js config.js
```

Edit `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // gunakan alamat yang dipublikasikan resmi
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // kirim root rantai saat disegel
  }
};
```

> `config.js` diabaikan oleh `.gitignore`, jadi konfigurasi endpoint pribadi Anda tak akan disimpan secara accidentil.
> Penyanggaan karyaan pribadi Anda ke rantai adalah **gratis**; kerjasama bisnis / platform berlisensi (hubungi kami untuk kerjasama komersial).

### 3. Jalankan tes

```bash
npm test
```

## Struktur Direktori

| Path | Deskripsi |
|:--|:--|
| `core/` | Pusat front-end penuh (browser IIFE, tanpa ketergantungan build): penstempelan `stamp.js`, kriptografi `rt-crypto.js`, pemverifikasi luring `rt-verifier.js`, berkas rantai `rt-export.js`, pengungkapan Merkle `rt-merkle.js`, jalur waktu `rt-timeline.js`, unduh berkas `rt-downloader.js` |
| `writer/` | Alat tulis (HTML halaman tunggal): penstempelan otomatis + unduh stempel |
| `verify/` | Halaman verifikasi rantai luring: seret berkas `.rt` untuk diverifikasi |
| `anchor/` | Klien penyangkaran genesis-chain resmi (gratis untuk individu) |
| `docs/` | Spesifikasi rantai, format berkas rt, dokumentasi API penyangkaran |
| `test/` | Test regresi Node (24/24 lulus) |

---

## Bagaimana proyek ini tumbuh

| Tanggal | Penilaian |
|:--|:--|
| 2022.11 | **Asal**: ChatGPT diluncurkan; "Konten yang dihasilkan oleh AI tidak dapat dibedakan dengan mata" menjadi kenyataan, memberikan lahirnya ide "bukti kehadiran kreatif manusia" |
| 2026.06 | **Pengerjaan pertama yang lengkap**: penstempelan rantai → penstempel → pemverifikasi luring → sertifikat yang berisi sendiri, dari awal hingga akhir; 11 paten inovasi disusun secara paralel, kasus utama diajukan ke lembaga paten |
| 2026.07 | **Refaktor modul**: penstempelan inti `stamp.js` diambil sebagai modul, alat pemecah kriptografi `rt-crypto.js` disusun, layanan penulis / pemverifikasi / penyangkaran diserahi; dinamai secara resmi **RealTrace**; layanan penyangkaran genesis-chain resmi diluncurkan |
| 2026.08 | **MVP open-source v0.1.0 dirilis** (AGPL-3.0 + lisensi dual komersial); model lisensi perusahaan dalam perencanaan |
| 2026.08 | **v0.2.0 dirilis**: pengungkapan selektif Merkle + generasi bukti pengungkapan, antarmuka UI enam bahasa, aturan penamaan ID rantai, pemilihan mode kreatif, jalur waktu modul |
| 2026.08 | **v0.3.0 dirilis**: antrian penyangkaran genesis (antrian luring + otomatis ulang kembali + anti-hijack tanda tangan), panel antrian penyangkaran enam bahasa disinkronkan ke penulis |
| 2026.08 | **v0.4.0 dirilis**: modul identitas (.rtkey ekspor/impor, pemulihan identitas yang dienkripsi dengan sandi, identitas yang disematkan), semantik penggabungan format rantai v3 (lanjutan dengan kunci yang sama / kontainer pengumpulan kunci yang berbeda), pemverifikasi yang berlaku di browser berbeda |
| 2026.08 | **v0.5.0 dirilis**: README 14 bahasa; bahasa Inggris adalah satu-satunya sumber terjemahan (docs/i18n.md) |
## Apa yang Ada dalam rilis ini (v0.4.0)

Repository ini adalah **build open-source yang lengkap**: ia melaksanakan seluruh "menulis → menandai → menempel → memverifikasi → kontinuitas identitas → penggabungan rantai". Rilis ini termasuk:

- **Penandai waktu nyata**: stempel tanda tangan Ed25519 yang dihasilkan secara otomatis selama menulis, merekam ritme tombol, jeda, volume penghapusan dan ciri perilaku lainnya;
- **Rantai yang tak dapat disengketakan**: setiap stempel merujuk kepada hash rantai stempel sebelumnya; setiap modifikasi retrospektif dapat dideteksi secara matematika;
- **Tidak ada unggah konten**: teks tetap lokal; rantai hanya merekam hash konten dan ciri perilaku;
- **Verifikasi luring**: berkas rantai `.rt` dapat diverifikasi penuh luring, tanpa ketergantungan server;
- **Tanda jalan perilaku**: ritme tombol / jeda / ciri perilaku penghapusan (rantai tanda tangan HMAC) untuk analisis kepercayaan;
- **Penyangkaran genesis-chain (opsional, gratis untuk individu)**: setelah menempel, hash root rantai disubmit ke genesis chain resmi, membentuk asal usul yang dapat diaudit secara publik;
- **Jejak versi**: paket `.rt` merekam `appVersion` di `meta.json` dan format rantai `version` di `chain.json`; versi dibawa saat disangkarkan ke rantai;
- **Pengungkapan Merkle selektif**: setiap stempel mengikat root Merkle teks penuh, sehingga setiap bagian dapat diungkapkan tanpa mengungkapkan teks penuh;
- **Pembuatan bukti pengungkapan**: bukti tunggal untuk setiap bagian di halaman verifikasi luring, dengan visualisasi jalur Merkle dan JSON yang dapat disalin;
- **UI enam bahasa**: penulis / pemverifikasi / situs web dalam 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Aturan penamaan ID rantai**: ID rantai 23 karakter (`web-personal-…`) yang mengikat kunci publik + root hash — dapat diverifikasi, tidak dapat diurutkan kembali;
- **Pilihan mode pembuatan**: pilih "Menulis Anonim" atau "Impor .rt untuk melanjutkan" sebelum menulis; melanjutkan secara otomatis memperpanjang rantai asli;
- **Garis waktu modul**: histogram garis waktu yang dapat diperbesar diambil ke modul berbagi `core/rt-timeline.js`, membuat ritme menulis terlihat dengan sekali lihat.

- **Ankering queue genesis**: setelah menempel, metadata rantai diantarkan secara lokal pertama dan disinkronkan otomatis saat kembali online; tanda tangan Ed25519 (`chainId|rootHash`) mencegah penjarahan klaim;
- **Panel queue penyangkaran ( enam bahasa)**: ⛓ indikator status / sinkronisasi manual dengan klik tunggal / pengaturan sinkronisasi otomatis di penulis — unggah konten tanpa konten dijaga;
- **Pemberitahuan privasi pembaruan**: memperjelas bahwa setelah menempel, hanya metadata rantai yang dapat disinkronkan ke genesis chain, dan bahwa sinkronisasi otomatis dapat dinonaktifkan di panel ⛓.

- **Modul identitas**: kunci identitas yang dienkripsi dengan PBKDF2-SHA256 (600K iterasi) + AES-256-GCM; ekspor / impor berkas kunci identitas `.rtkey`; mengimpor `.rt` yang mempunyai identitas memulihkan penulis melalui sandi; penempel menggabungkan identitas yang dienkripsi sehingga kunci yang sama dapat melanjutkan rantai asli;
- **Format rantai v3 — semantik penggabungan**: melanjutkan dengan kunci yang sama secara otomatis memperpanjang rantai asli (`mergeChainsVerified` menandai dan memverifikasi); rantai yang berbeda dapat diagregasi ke dalam kontainer (`aggregateChains`), sub-rantai yang diverifikasi secara berturut-turut;
- **Pemverifikasi yang beragam**: verifikasi tanda tangan tweetnacl yang unifikasi dengan WebCrypto sebagai pilihan ganti saja — hasil yang konsisten di seluruh browser.

> Daftar perubahan penuh: [CHANGELOG.md](CHANGELOG.md).

Seluruh fitur tetap kompatibel ke belakang: berkas rantai `.rt` yang dihasilkan oleh versi yang lama harus tetap dapat diverifikasi dan dapat jejak di versi yang lebih baru.

---
## Bagaimana kami berbeda dari solusi yang ada

| | RealTrace | Tanda tangan elektronik biasa | Stempel Waktu TSA | Pendaftaran hak cipta |
|:--|:--|:--|:--|:--|
| Memuktarkan "konten ditulis oleh manusia secara nyata" | ✅ bukti rantai bukti tingkat proses | ❌ hanya memuktarkan identitas penandatangan | ❌ hanya memuktarkan waktu | ❌ pendaftaran setelah kejadian |
| Mencegah pemalsuan setelah kejadian | ✅ penggabungan hashing + tanda tangan | ⚠️ hanya objek tanda tangan | ⚠️ hanya objek hashing | ❌ |
| Meliputi seluruh proses kreatif | ✅ dari pengetikan pertama sampai stempel | ❌ | ❌ | ❌ |
| Verifikasi luring | ✅ berisi `.rt` yang terpisah | ⚠️ bergantung PKI | ⚠️ bergantung layanan online | ❌ bergantung badan pendaftaran |
| Privasi (tidak ada unggah konten) | ✅ unggah konten nol | — | — | ❌ konten harus disubmit |

---

## Kegunaan

- **Penyusun mengirimkan kerja**: ketika kerja Anda disangka dengan "apakah AI menulis ini?", bukti `.rt` tentang proses kreatif menjelaskan proses kreatif — hitungan kata, waktu yang dihabiskan, ritme kreatif, dapat diverifikasi oleh siapa saja;
- ** Pertahanan hak cipta**: bukti tidak lagi hanya klaim lisan. Imprint perilaku dan rantai tanda tangan di rantai menyediakan bukti auditable tentang proses kreatif asli;
- **Penerbit / komunitas konten**: verifikasi apakah pengiriman benar-benar dibuat secara nyata dalam waktu nyata oleh manusia, bukan disisipkan setelahnya atau dibuat secara massal oleh mesin;
- **Situasi akademis**: bukti proses asli untuk naskah, proyek dan dokumen teknis, jadi "saya menulis ini" memiliki dasar yang kuat.

> Penyusun tidak harus menghadapi kecurigaan tanpa senjata.

---

## Privasi & keamanan

- **Unggah konten nol** secara baku: tulisan Anda tetap lokal; rantai hanya merekam hashing konten dan ciri perilaku;
- Berkas rantai `.rt` sepenuhnya di bawah kontrol Anda — simpannya secara lokal atau cadangkan dengan pengenkripsi pribadi;
- Penyangkaran resmi hanya mengirimkan root hashing rantai dan metadata tanda tangan, tidak konten;
- Semua logika verifikasi adalah sumber terbuka dan dapat diaudit;
- Jika Anda menemukan kelemahan keamanan, kirim pesan kepada pemeliharaan secara pribadi; jangan discantumkan publik sebelum perbaikan siap.

---

---

## Pendanaan · Beri saya kopi

Menikmati proyek ini? Beri saya kopi ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- Cina: kode QR Alipay / WeChat Pay (tips kecil pribadi saja, bukan lisensi komersial)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> Pendanaan hanya simbol dukungan — **tidak adalah lisensi komersial**. Penggunaan pribadi tetap gratis; integrasi komersial / platform memerlukan lisensi terpisah melalui [`LICENSE.commercial`](LICENSE.commercial).

---

## Sumber terbuka & komersial

**Lisensi ganda AGPL-3.0 + komersial** (bagian sumber terbuka diatur oleh teks lengkap AGPL-3.0 di dalam [`LICENSE`](LICENSE)):

- **Individu**: bebas digunakan, diubah dan disebarkan; rantai kreatif yang dibangun / ditandatangani sendiri sepenuhnya gratis dan dapat diverifikasi secara luring; penyangkaran ke rantai genesis resmi gratis untuk individu;
- **Organisasi non-komersial / kelompok kecil** (sekolah publik / non-publik, asosiasi penulis / asosiasi industri, dll., yang diverifikasi oleh pendaftaran non-publik / sertifikat entitas hukum): gratis untuk penggunaan internal anggota saja — tanpa layanan berbayar eksternal, tanpa operasi platform publik, tanpa penjualan ulang atau pemberikan ulang setelah integrasi;
- **Perusahaan / platform**: kerjasama berlisensi — lihat [`LICENSE.commercial`](LICENSE.commercial).

> Gratis untuk penggunaan pribadi; integrasi komersial / platform memerlukan lisensi terpisah. Isu dan Pull Requests sangat diharapkan — kompatibilitas format rantai, korrectan verifikasi dan masalah privasi/keamanan mendapatkan prioritas.

---

**Kreatan Anda. Bukti kehadiran Anda.**

Dalam zaman dimana AI dapat meniru segalanya, kehormatan kreatan manusia layak untuk dipertahankan.
