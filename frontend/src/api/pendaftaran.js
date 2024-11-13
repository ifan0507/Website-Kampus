import request from "@/utils/request";

export function addPendaftaran(data) {
 // Buat objek FormData untuk mengirim file
 const formData = new FormData();
 formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
 formData.append('description', data.description); // 'file' sesuai dengan nama field di backend
 formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend

 return request({
   url: "/pendaftaran",
   method: "post",
   data: formData, // Mengirim FormData dengan file
 });
}

export function getPendaftarans() {
  return request({
    url: "/pendaftaran",
    method: "get",
  });
}

export function editPendaftaran(data, id) {
   // Buat objek FormData untuk mengirim file
   const formData = new FormData();
   formData.append('name', data.name); // 'file' sesuai dengan nama field di backend
   formData.append('description', data.description); // 'file' sesuai dengan nama field di backend
   formData.append('file', data.file.file); // 'file' sesuai dengan nama field di backend
 
   return request({
     url: `/pendaftaran/${id}`,
     // method: "put",
     method: "post",
     data: formData, // Mengirim FormData dengan file
   });
}

export function deletePendaftaran(data) {
  return request({
    url: `/pendaftaran/${data.id}`,
    method: "delete",
    data,
  });
}