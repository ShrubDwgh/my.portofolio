# Ahmad Zainal A. Portfolio

Portfolio personal modern bergaya dark glassmorphism untuk menampilkan project, experiments, dan karakter sebagai web developer / creator. Project ini dibuat sebagai static website sehingga mudah dijalankan lokal dan mudah dideploy ke Vercel atau static hosting lain.

## Fitur Utama

- Desain dark glassmorphism dengan animated background yang ringan
- Struktur modular: HTML, CSS, JavaScript, data, dan assets dipisah
- Project dan experiments dirender otomatis dari file data
- Modal detail project yang responsive dan bisa ditutup dengan tombol, overlay, atau `Escape`
- Navbar sticky dengan active section indicator
- Mobile hamburger menu
- Scroll reveal dan hover interaction yang menghormati `prefers-reduced-motion`
- Foto profil lokal melalui `assets/images/profile.jpg`
- Siap dijalankan sebagai static website tanpa backend

## Struktur Folder

```text
portfolio/
├── index.html
├── pages/
│   ├── project.html
│   └── 404.html
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   ├── projects.js
│   ├── interactions.js
│   └── project-detail.js
├── data/
│   ├── projects.js
│   └── experiments.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── profile-placeholder.svg
│   │   └── projects/
│   ├── icons/
│   └── fonts/
└── README.md
```

## Menjalankan Secara Lokal

Karena ini static website, kamu bisa menjalankannya dengan server sederhana apa pun.

Contoh menggunakan Python:

```bash
cd portfolio
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

Jika tidak ingin memakai Python, kamu juga bisa memakai ekstensi Live Server atau server statis lain.

## Deploy ke Vercel

1. Upload folder project ini ke repository GitHub.
2. Login ke [Vercel](https://vercel.com/).
3. Import repository tersebut.
4. Gunakan setting default karena project ini tidak memerlukan backend atau build command khusus.
5. Deploy.

Opsional:

- Framework Preset: `Other`
- Build Command: kosongkan
- Output Directory: kosongkan

## Lokasi Foto Profil

Foto profil utama ada di:

```text
assets/images/profile.jpg
```

## Cara Mengganti Foto Profil

1. Siapkan foto dengan rasio persegi agar framing tetap bagus.
2. Ganti file:

```text
assets/images/profile.jpg
```

3. Pertahankan nama file yang sama agar tidak perlu mengubah kode.
4. Jika file belum tersedia, website otomatis punya fallback lokal ke `assets/images/profile-placeholder.svg`.

## Cara Menambahkan Project Baru

Semua project diambil dari:

```text
data/projects.js
```

Tambahkan object baru ke array `projects` dengan format seperti ini:

```js
{
  slug: "project-baru",
  title: "Project Baru",
  description: "Deskripsi project...",
  image: "assets/images/projects/project-baru.png",
  technologies: ["HTML", "CSS", "JavaScript"],
  status: "Completed",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  detail: "Detail project...",
  features: [
    "Fitur 1",
    "Fitur 2"
  ],
  extra: "Catatan tambahan..."
}
```

Catatan:

- `slug` dipakai oleh modal dan `pages/project.html?slug=...`
- Jika `liveUrl` atau `githubUrl` kosong, tombolnya tidak ditampilkan
- Jika `featured: true`, project akan masuk ke area featured

## Cara Menambahkan Screenshot Project

1. Simpan gambar project ke folder:

```text
assets/images/projects/
```

2. Isi properti `image` di `data/projects.js` dengan path yang sesuai, misalnya:

```js
image: "assets/images/projects/panelify.png"
```

3. Gunakan nama file yang ringkas dan konsisten.

## Cara Menambahkan Experiment

Semua experiments diambil dari:

```text
data/experiments.js
```

Tambahkan object baru ke array `experiments`:

```js
{
  title: "Experiment Baru",
  description: "Deskripsi experiment...",
  image: "assets/images/projects/experiment-baru.png",
  category: "UI Experiment",
  status: "Exploring",
  detail: "Catatan experiment..."
}
```

## Cara Mengganti Informasi Kontak

Informasi kontak utama ada di:

- `index.html` pada section `#contact`

Yang bisa diganti:

- WhatsApp link dan nomor
- Link GitHub
- Email `mailto:`

## Cara Mengganti Teks Portfolio

Teks utama berada di:

- `index.html` untuk hero, about, timeline, dan contact
- `data/projects.js` untuk konten project
- `data/experiments.js` untuk konten experiments

Bagian yang masih perlu kamu isi sendiri sudah ditandai dengan:

```text
[EDIT THIS]
```

## Cara Mengganti Favicon

Favicon saat ini ada di:

```text
assets/icons/favicon.svg
```

Untuk menggantinya:

1. Simpan favicon baru di folder `assets/icons/`
2. Ubah tag `<link rel="icon">` di `index.html`, `pages/project.html`, dan `pages/404.html` jika nama filenya berubah

## Customization Desain

Bagian yang paling sering diubah:

- `css/variables.css` untuk warna, radius, shadow, dan ukuran global
- `css/components.css` untuk button, navbar, modal, chip, card
- `css/sections.css` untuk layout tiap section
- `css/animations.css` untuk motion dan hover effect
- `css/responsive.css` untuk breakpoint dan perilaku mobile

Saran customization:

- Ubah `--accent` dan `--accent-secondary` untuk identitas warna baru
- Sesuaikan `--radius-*` bila ingin tampilan lebih tajam atau lebih bulat
- Kurangi intensitas blur atau shadow jika ingin tampilan lebih minimal

## Catatan Pengembangan

- Tidak ada backend pada versi awal
- Tidak ada dependency framework
- Struktur project cukup modular jika suatu saat ingin ditambah CMS atau admin panel
- Easter egg ada di `js/interactions.js` dan mudah dinonaktifkan jika tidak dibutuhkan
