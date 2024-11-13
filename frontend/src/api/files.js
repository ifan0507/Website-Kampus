import request from "@/utils/request";

export function addFiles(data) {
  return request({
    url: "/files",
    method: "post",
    data,
  });
}

export function getFiles() {
  return request({
    url: "/files",
    method: "get",
  });
}

export function editFiles(data, id) {
  return request({
    url: `/files/${id}`,
    method: "put",
    data,
  });
}

export function deleteFiles(data) {
  return request({
    url: `/files/${data.id}`,
    method: "delete",
    data,
  });
}
