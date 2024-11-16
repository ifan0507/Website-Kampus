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
  return request({
    url: `/berita/${id}`,
    method: "put",
    headers: {
      "Content-Type": "application/json", // Pastikan JSON
    },
    data: JSON.stringify({
      name: data.name,
      description: data.description,
      selengkapnya: data.selengkapnya,
      category_id: data.categoryId,
      galery_id: data.galleryId,
    }),
  });
}

export function deleteBerita(data) {
  return request({
    url: `/berita/${data.id}`,
    method: "delete",
    data,
  });
}
