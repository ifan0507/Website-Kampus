import request from "@/utils/request";

export function addKegiatan(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name); // 'name' sesuai dengan nama field di backend
  formData.append('description', data.description); // 'description' sesuai dengan nama field di backend
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/kegiatan",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getKegiatans() {
  return request({
    url: "/kegiatan",
    method: "get",
  });
}

export function editKegiatan(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
  formData.append('description', data.description); // 'file' sesuai dengan nama field di backend
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/kegiatan/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteKegiatan(data) {
  return request({
    url: `/kegiatan/${data.id}`,
    method: "delete",
    data,
  });
}
