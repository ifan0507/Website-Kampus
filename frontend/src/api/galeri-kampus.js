import request from "@/utils/request";

export function addGaleriKampus(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/galeri-kampus",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getGaleriKampus() {
  return request({
    url: "/galeri-kampus",
    method: "get",
  });
}

export function editGaleriKampus(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/galeri-kampus/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteGaleriKampus(data) {
  return request({
    url: `/galeri-kampus/${data.id}`,
    method: "delete",
    data,
  });
}
