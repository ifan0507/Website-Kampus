import request from "@/utils/request";

export function addCategory(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append("name", data.name); // 'file' sesuai dengan nama field di backend
  formData.append("description", data.description); // 'file' sesuai dengan nama field di backend
  // formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/category-berita",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

export function getCategorys() {
  return request({
    url: "/category-berita",
    method: "get",
  });
}

export function editCategory(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append("name", data.name); // 'file' sesuai dengan nama field di backend
  formData.append("description", data.description);
  //    formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: `/category-berita/${id}`,
    // method: "put",
    method: "put",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteCategory(data) {
  return request({
    url: `/category-berita/${data.id}`,
    method: "delete",
    data,
  });
}
