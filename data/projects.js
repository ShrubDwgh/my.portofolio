export const projects = [
  {
    slug: "panelify",
    title: "Panelify",
    description: "Project website menggunakan Firebase dan berbagai fitur web interaktif.",
    image: "assets/images/projects/panelify.svg",
    technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
    status: "Completed",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    detail: "Panelify menjadi ruang untuk menggabungkan interface yang aktif, alur web interaktif, dan eksperimen pengalaman pengguna dalam satu project yang mudah dikembangkan lagi.",
    features: [
      "Menggunakan pendekatan web interaktif untuk pengalaman yang terasa hidup.",
      "Menjadikan Firebase sebagai bagian dari implementasi fitur pada project.",
      "Struktur visual dirancang agar bisa terus diiterasi seiring kebutuhan baru."
    ],
    extra: "URL live demo dan repository belum diberikan, sehingga tombol hanya muncul jika data diisi."
  },
  {
    slug: "kbbt",
    title: "KBBT",
    description: "Project kamus bahasa Taren/Lunara dengan sistem pengelolaan kosakata.",
    image: "assets/images/projects/kbbt.svg",
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "In Progress",
    liveUrl: "",
    githubUrl: "",
    featured: true,
    detail: "KBBT difokuskan sebagai project kamus digital untuk membantu pengelolaan kosakata bahasa Taren/Lunara dengan pendekatan interface yang rapi dan mudah dipakai.",
    features: [
      "Menyusun kosakata dalam bentuk sistem yang lebih terkelola.",
      "Membuka peluang untuk eksplorasi pencarian, filtering, atau tampilan data yang lebih nyaman.",
      "Bisa terus dikembangkan tanpa mengubah struktur data utama."
    ],
    extra: "Detail fitur tambahan dan rilis publik dapat diperbarui nanti saat informasinya sudah tersedia."
  },
  {
    slug: "project-baru",
    title: "Project Baru",
    description: "Deskripsi project tambahan bisa dimulai dari object baru di file data.",
    image: "assets/images/projects/project-placeholder.svg",
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "Planning",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    detail: "Object ini berfungsi sebagai contoh struktur untuk project selanjutnya. Ganti judul, screenshot, teknologi, dan detail sesuai kebutuhan tanpa menulis ulang card HTML.",
    features: [
      "Card otomatis dirender dari data/projects.js.",
      "Tombol link hanya muncul ketika URL diisi.",
      "Halaman detail dan modal mengambil data dari sumber yang sama."
    ],
    extra: "Silakan hapus atau ganti object contoh ini saat menambahkan project baru yang sebenarnya."
  }
];
 
export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
