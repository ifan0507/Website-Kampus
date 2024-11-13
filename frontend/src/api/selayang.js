import request from "@/utils/request";

export function addSelayang(data) {
// Buat objek FormData untuk mengirim file
const formData = new FormData();
formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
formData.append('description', data.description); // 'file' sesuai dengan nama field di backend
formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

return request({
  url: "/selayang",
  method: "post",
  data: formData, // Mengirim FormData dengan file
});
}

export function getSelayangs() {
  return request({
    url: "/selayang",
    method: "get",
  });
}

export function editSelayang(data, id) {
   // Buat objek FormData untuk mengirim file
   const formData = new FormData();
   formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
   formData.append('description', data.description);
   formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend
 
   return request({
     url: `/selayang/${id}`,
     // method: "put",
     method: "post",
     data: formData, // Mengirim FormData dengan file
   });
}

export function deleteSelayang(data) {
  return request({
    url: `/selayang/${data.id}`,
    method: "delete",
    data,
  });
}
