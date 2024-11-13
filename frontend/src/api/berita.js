import request from "@/utils/request";

export function addBerita(data) {
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('selengkapnya', data.selengkapnya); // 'selengkapnya' sesuai dengan nama field di backend
  formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

  return request({
    url: "/berita",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
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
