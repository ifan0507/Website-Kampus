import request from "@/utils/request";

export function addAlumni(data) {
  const formData = new FormData();
  const formattedDate = data.tgl_lulus
    ? data.tgl_lulus.format("YYYY-MM-DD")
    : null;

  if (!formattedDate) {
    console.error("Tanggal Lulus tidak valid!");
    return;
  }
  formData.append("nim", data.nim);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("no_hp", data.no_hp);
  formData.append("program_studi", data.program_studi);
  formData.append("judul_ta", data.judul_ta);
  formData.append("tgl_lulus", formattedDate);
  formData.append("file", data.file.file);

  console.log(formattedDate);
  return request({
    url: "/alumni",
    method: "post",
    data: formData,
  });
}

export function getAlumnis() {
  return request({
    url: "/alumni",
    method: "get",
  });
}

export function editAlumni(data, id) {
  const formData = new FormData();
  const formattedDate = data.tgl_lulus
    ? data.tgl_lulus.format("YYYY-MM-DD")
    : null;

  if (!formattedDate) {
    console.error("Tanggal Lulus tidak valid!");
    return;
  }
  formData.append("nim", data.nim);
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("no_hp", data.no_hp);
  formData.append("program_studi", data.program_studi);
  formData.append("judul_ta", data.judul_ta);
  formData.append("tgl_lulus", formattedDate);
  formData.append("file", data.file.file);

  console.log(formattedDate);
  return request({
    url: `/alumni/${id}`,
    method: "put",
    data: formData,
  });
}

export function deleteAlumni(data) {
  return request({
    url: `/alumni/${data.id}`,
    method: "delete",
    data,
  });
}
