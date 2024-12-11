import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// function BeritaDetail() {
const BeritaDetail = () => {
  const { id } = useParams(); // Mengambil ID berita dari URL
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data berita berdasarkan ID dari API atau data lokal
    fetch(`/api/berita/${id}`)
      .then((response) => response.json())
      .thensetLoading(data => { 
        setBerita(data);
        setLoading(false);
      })
      .catch(error => { 
        console.log("Error fetching detail:", error);
        setLoading(false);
      });
  }, [id]); // Efek ini berjalan setiap kali `id` berubah

  if (loading) return <p>Loading...</p>;
  if (!berita) return <p>Berita tidak ditemukan. -/\-</p>

  return (
    <div>
      {/* {berita ? (
        <div> */}
          <h2>{berita.name}</h2>
          {/* <img
            src={berita.imageUrl || '/assets/placeholder.jpg'}
            alt={berita.name}
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
          /> */}
          <p>{berita.content}</p> {/* Menampilkan konten berita */}
        {/* </div>
      ) : (
            <p>Loading...</p>  //Menampilkan loading saat data sedang diambil
      )} */}
    </div>
  );
}

export default BeritaDetail;
 