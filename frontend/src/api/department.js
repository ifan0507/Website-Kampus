import request from "@/utils/request";

export function addDepartment(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('kompetensi', data.kompetensi)
  formData.append('peluang', data.peluang)
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/department",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getDepartments() {
  return request({
    url: "/department",
    method: "get",
  });
}

export function editDepartment(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('kompetensi', data.kompetensi)
  formData.append('peluang', data.peluang)
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/department/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteDepartment(data) {
  return request({
    url: `/department/${data.id}`,
    method: "delete",
    data,
  });
}
