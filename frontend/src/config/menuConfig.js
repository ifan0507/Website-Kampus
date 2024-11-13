const menuList = [
  {
    title: "Beranda",
    path: "/dashboard",
    icon: "home",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Manajemen Profil",
    path: "/profil",
    icon: "smile",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Selayang Pandang",
    path: "/selayang",
    icon: "gift",
    roles: ["ROLE_ADMINISTRATOR", "ROLE_LECTURE"],
  },
  {
    title: "Manajemen Jurusan",
    path: "/department",
    icon: "contacts",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Categori Berita",
    path: "/category-berita",
    icon: "book",
    roles: ["ROLE_ADMINISTRATOR", "ROLE_LECTURE"],
  },

  {
    title: "Manajemen Berita",
    path: "/berita",
    icon: "book",
    roles: ["ROLE_ADMINISTRATOR", "ROLE_LECTURE"],
  },

  {
    title: "Manajemen Kegiatan",
    path: "/kegiatan",
    icon: "team",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Pendaftaran Mahasiswa",
    path: "/pendaftaran",
    icon: "audit",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Struktur Organisasi",
    path: "/organisasi",
    icon: "apartment",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Kalender Akademik",
    path: "/kalender",
    icon: "calendar",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Fasilitas Kampus",
    path: "/campus_life",
    icon: "heart",
    roles: ["ROLE_ADMINISTRATOR"],
  },

  {
    title: "Galeri Kampus",
    path: "/galeri-kampus",
    icon: "picture",
    roles: ["ROLE_ADMINISTRATOR"],
  },
  {
    title: "Galeri Baru",
    path: "/galeri-baru",
    icon: "picture",
    roles: ["ROLE_ADMINISTRATOR"],
  },
];
export default menuList;
