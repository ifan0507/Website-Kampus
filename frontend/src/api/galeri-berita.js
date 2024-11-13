import request from "@/utils/request";
import { List } from "antd";

export function addGaleriBaru(data) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (Array.isArray(data.files)) {
    data.files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
  } else {
    console.error("data.files bukan array:", data.files);
  }

  return request({
    url: "/galeri-berita",
    method: "post",
    data: formData, // Mengirim FormData dengan file
  });
}

// export function getGaleriBaru() {
//   return request({
//     url: "/galeri-baru",
//     method: "get",
//   });
// }

export function getGaleriBaru(page = 0, size = 5) {
  return request({
    url: `/galeri-berita?page=${page}&size=${size}`,
    method: "get",
  });
}

export function getGaleryBaruById(id) {
  return request({
    url: `/galeri-berita/${id}`,
    method: "get",
  });
}

export function editGaleriBaru(data, id) {
  // Buat objek FormData untuk mengirim file
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  if (Array.isArray(data.files)) {
    data.files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
  } else {
    console.error("data.files bukan array:", data.files);
  }
  console.log(formData);
  return request({
    url: `/galeri-berita/${id}`,
    // method: "put",
    method: "put",
    data: formData, // Mengirim FormData dengan file
  });
}

export function deleteGaleriBaru(data) {
  return request({
    url: `/galeri-berita/${data.id}`,
    method: "delete",
    data,
  });
}
