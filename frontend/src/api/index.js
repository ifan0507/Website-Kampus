export const getBeritas = () => {
    return fetch("http://localhost:8080/berita").then((res) => res.json());
  };
  
  export const getDepartments = () => {
    return fetch("http://localhost:8080/department").then((res) => res.json());
  };
  
  export const getKegiatans = () => {
    return fetch("http://localhost:8080/kegiatan").then((res) => res.json());
  };
  export const getSelayangs = () => {
    return fetch("http://localhost:8080/selayang").then((res) => res.json());
  };