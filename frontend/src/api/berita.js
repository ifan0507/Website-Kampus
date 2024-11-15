import request from "@/utils/request";

export function addBerita(data) {
  return request({
    url: "/berita",
    method: "post",
    headers: {
      "Content-Type": "application/json", // Pastikan JSON
    },
    data: JSON.stringify({
      name: data.name,
      description: data.description,
      selengkapnya: data.selengkapnya,
      category_id: data.categoryId,
      galery_id: data.galeriId,
    }),
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
  formData.append("name", data.name); // 'file' sesuai dengan nama field di backend
  formData.append("description", data.description);
  formData.append("selengkapnya", data.selengkapnya); // 'selengkapnya' sesuai dengan nama field di backend
  formData.append("file", data.file.file); // 'file' sesuai dengan nama field di backend

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
