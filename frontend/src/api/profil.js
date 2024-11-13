import request from "@/utils/request";

export function addProfil(data) {
  const formData = new FormData()
  formData.append("name", data.name)
  formData.append("description", data.description)
  formData.append("file", data.file.file)

  return request({
    url: "/profil",
    method: "post",
    data: formData,
  });
}

export function getProfil() {
  return request({
    url: "/profil",
    method: "get",
  });
}

export function editProfil(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
  formData.append('description', data.description); // 'file' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/profil/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteProfil(data) {
  return request({
    url: `/profil/${data.id}`,
    method: "delete",
    data,
  });
}
