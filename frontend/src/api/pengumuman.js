import request from "@/utils/request"; // Import utility request

/**
 * Menambahkan pengumuman baru.
 * @param {Object} data - Data pengumuman yang akan ditambahkan.
 * @returns {Promise} - Hasil permintaan HTTP.
 */
export function addPengumuman(data) {
  const formData = new FormData();
  formData.append("name", data.name);

  if (Array.isArray(data.files)) {
    data.files.forEach((file) => {
      formData.append("files", file.originFileObj); // Ambil file asli
    });
  } else {
    console.error("data.files bukan array:", data.files);
  }

  return request({
    url: "http://localhost:8080/api/pengumuman", // Sesuaikan endpoint
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data", // Pastikan header sesuai
    },
  });
}

/**
 * Mendapatkan daftar pengumuman dengan paginasi.
 * @param {number} page - Nomor halaman.
 * @param {number} size - Ukuran halaman.
 * @returns {Promise} - Hasil permintaan HTTP.
 */
export function getPengumuman(page = 0, size = 5) {
  return request({
    url: "http://localhost:8080/api/pengumuman",
    method: "get",
    params: { page, size },
  });
}

/**
 * Mendapatkan detail pengumuman berdasarkan ID.
 * @param {number} id - ID pengumuman.
 * @returns {Promise} - Hasil permintaan HTTP.
 */
export function getPengumumanById(id) {
  return request({
    url: `http://localhost:8080/api/pengumuman/${id}`,
    method: "get",
  });
}

/**
 * Memperbarui pengumuman.
 * @param {Object} data - Data pengumuman yang akan diperbarui.
 * @param {number|string} id - ID pengumuman.
 * @returns {Promise} - Hasil permintaan HTTP.
 */
export function editPengumuman(data, id) {
  const formData = new FormData();
  formData.append("name", data.name);

  if (Array.isArray(data.files)) {
    data.files.forEach((file) => {
      formData.append("files", file.originFileObj); // Ambil file asli
    });
  } else {
    console.error("data.files bukan array:", data.files);
  }

  return request({
    url: `http://localhost:8080/api/pengumuman/${id}`,
    method: "put",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * Menghapus pengumuman berdasarkan ID.
 * @param {number|string} id - ID pengumuman.
 * @returns {Promise} - Hasil permintaan HTTP.
 */
export function deletePengumuman(id) {
  return request({
    url: `http://localhost:8080/api/pengumuman/${id}`,
    method: "delete",
  });
}
