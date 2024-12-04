import request from "@/utils/request";

export function addBerita(data) {
  // Buat objek FormData untuk mengirim data dan file
  const formData = new FormData();
  formData.append('name', data.name); // 'name' sesuai dengan field di backend
  formData.append('description', data.description); // 'description' sesuai dengan field di backend
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan field di backend
  formData.append('file', data.file.file); // Menambahkan file ke FormData jika ada
  formData.append('categoryId', data.categoryId); // 'category_id' sesuai dengan field di backend
  formData.append('galeryId', data.galeriId); // 'galery_id' sesuai dengan field di backend

  return request({
    url: "/berita",
    method: "post", // Menggunakan POST untuk menambah data
    data: formData, // Mengirim FormData
  });
}

export function getBeritas() {
  return request({
    url: "/berita",
    method: "get",
  });
}

export function editBerita(data, id) {
  // Buat objek FormData untuk mengirim data dan file
  const formData = new FormData();
  formData.append('name', data.name); // 'name' sesuai dengan field di backend
  formData.append('description', data.description); // 'description' sesuai dengan field di backend
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan field di backend
  formData.append('file', data.file.file); // Menambahkan file ke FormData jika ada
  formData.append('categoryId', data.categoryId); // 'category_id' sesuai dengan field di backend
  formData.append('galeryId', data.galleryId); // 'galery_id' sesuai dengan field di backend

  return request({
    url: `/berita/${id}`,
    method: "put", // Gunakan PUT untuk update data
    data: formData, // Mengirim FormData
  });
}

export function deleteBerita(data) {
  return request({
    url: `/berita/${data.id}`,
    method: "delete",
    data,
  });
}
