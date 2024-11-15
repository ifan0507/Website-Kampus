import request from "@/utils/request";
import { message } from "antd"; // Import message dari antd

export function addBerita(data) {
  // Cek apakah data.category_berita dan data.galery_berita adalah array
  const categoryId = Array.isArray(data.category_berita) ? data.category_berita[0] : data.category_berita;
  const galeryId = Array.isArray(data.galery_berita) ? data.galery_berita[0] : data.galery_berita;

  return request({
    url: "/berita", // Endpoint untuk menambah berita
    method: "post",
    data: {
      name: data.name,
      description: data.description,
      selengkapnya: data.selengkapnya, // Pastikan sesuai dengan nama field di backend
      categoryId: categoryId, // Pastikan hanya mengirimkan satu ID kategori atau null
      galeryId: galeryId || null, // Pastikan hanya mengirimkan satu ID galeri atau null
    },
    headers: {
      "Content-Type": "application/json", // Pastikan menggunakan JSON
    },
  }) 
}

export function getBeritas() {
  return request({
    url: "/berita",
    method: "get",
  });
}



export function editBerita(data, id) {
  const formData = new FormData();
  formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
  formData.append('description', data.description)
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/berita/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteBerita(data) {
  return request({
    url: `/berita/${data.id}`,
    method: "delete",
    data,
  });
}
