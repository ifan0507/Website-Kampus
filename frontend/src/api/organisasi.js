import request from "@/utils/request";

export function addOrganisasi(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/organisasi",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getOrganisasi() {
  return request({
    url: "/organisasi",
    method: "get",
  });
}

export function editOrganisasi(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/organisasi/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteOrganisasi(data) {
  return request({
    url: `/organisasi/${data.id}`,
    method: "delete",
    data,
  });
}
