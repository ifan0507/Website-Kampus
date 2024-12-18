import request from "@/utils/request";

export function addDosen(data) {
  const formData = new FormData();
  formData.append("nip", data.nip);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("no_hp", data.no_hp);
  formData.append("program_studi", data.program_studi);
  formData.append("bidang_minat", data.bidang_minat);
  formData.append("file", data.file.file);

  return request({
    url: "/dosen",
    method: "post",
    data: formData,
  });
  }

export function getDosens() {
    return request({
      url: "/dosen",
      method: "get",
    });
  }

  export function editDosen(data, id) {
    const formData = new FormData();
    formData.append("nip", data.nip);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("no_hp", data.no_hp);
    formData.append("program_studi", data.program_studi);
    formData.append("bidang_minat", data.bidang_minat);
    formData.append("file", data.file.file);

    return request({
      url: `/dosen/${id}`,
      method: "put",
      data: formData,
    });
  }

  export function deleteDosen(data) {
    return request({
      url: `/dosen/${data.id}`,
      method: "delete",
      data,
    });
  }


  