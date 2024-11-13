import request from "@/utils/request";

export function addCampusLife(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/campus_life",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getCampusLifes() {
  return request({
    url: "/campus_life",
    method: "get",
  });
}

export function editCampusLife(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/campus_life/${id}`,
    // method: "put",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteCampusLife(data) {
  return request({
    url: `/campus_life/${data.id}`,
    method: "delete",
    data,
  });
}
