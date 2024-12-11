import request from "@/utils/request";

// Fungsi untuk mendapatkan informasi pengguna (saat ini masuk sebagai "me")
export function reqUserInfo(data) {
  return request({
    url: "/user/me",
    method: "get",
    data,
  });
}

// // Fungsi untuk mendapatkan daftar pengguna
// export function getUsers() {
//   return request({
//     url: "/user/list",
//     method: "get",
//   });
// }

// Fungsi untuk menghapus pengguna
export function deleteUser(data) {
    return request({
      url: `/users/${data.id}`,
      method: "delete",
      data,
    });
  }
  


// Fungsi untuk mengedit pengguna
export function editUser(data, id) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("oldPassword", data.oldPassword);
  formData.append("password", data.password);
  formData.append("roles", data.roles);
  formData.append("file", data.file.file);

  return request({
    url: `/users/${id}`,
    method: "put",
    data: formData,
  });
}

// Fungsi untuk memvalidasi user ID
export function reqValidatUserID(data) {
  return request({
    url: "/user/validatUserID",
    method: "post",
    data,
  });
}

// Fungsi untuk menambahkan pengguna (daftar/signup)
export function addUser(data) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("roles", data.roles);
  formData.append("file", data.file.file);

  return request({
    url: "/users",
    method: "post",
    data: formData,
  });
}

export function getUsers() {
  return request({
    url: "/users",
    method: "get",
  });
}

// Fungsi untuk mendapatkan informasi pengguna berdasarkan ID
export function reqUserInfoById(id) {
  return request({
    url: `/users/${id}`,
    method: "get",
  });
}

// // Fungsi untuk menambahkan pengguna dengan file
// export function addUserWithFile(data) {
//   const formData = new FormData();
//   formData.append("name", data.name);
//   formData.append("username", data.username);
//   formData.append("email", data.email);
//   formData.append("password", data.password);
//   formData.append("roles", data.roles);
//   formData.append("file", data.file.file);

//   return request({
//     url: "/users",
//     method: "post",
//     data: formData,
//   });
// }

// Fungsi untuk mengedit pengguna dengan file
// export function editUserWithFile(data, id) {
//   const formData = new FormData();
//   formData.append("name", data.name);
//   formData.append("username", data.username);
//   formData.append("email", data.email);
//   formData.append("oldPassword", data.oldPassword);
//   formData.append("password", data.password);
//   formData.append("roles", data.roles);
//   formData.append("file", data.file.file);

//   return request({
//     url: `/users/${id}`,
//     method: "put",
//     data: formData,
//   });
// }

// Fungsi untuk menghapus pengguna berdasarkan ID
// export function deleteUserById(id) {
//   return request({
//     url: `/users/${id}`,
//     method: "delete",
//   });
// }
