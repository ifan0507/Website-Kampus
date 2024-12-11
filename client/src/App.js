import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { BeritaProvider } from "./components/BeritaContext";
import SlideShow from "./components/SlideShow";  // Impor komponen SlideShow
import BeritaDetail from "./pages/BeritaDetail";  // Impor komponen BeritaDetail

function App() {
  // Daftar berita yang akan ditampilkan di SlideShow
  const beritaList = [
    { id: 1, name: 'Berita 1', imageUrl: 'image_url_1', content: 'Content berita 1...' },
    { id: 2, name: 'Berita 2', imageUrl: 'image_url_2', content: 'Content berita 2...' },
    { id: 3, name: 'Berita 3', imageUrl: 'image_url_3', content: 'Content berita 3...' },
    // Daftar berita lainnya
  ];

  return (
    <Router>
      <Routes>
        {/* Rute utama yang menampilkan SlideShow */}
        {/* <Route path="/" element={<SlideShow beritaList={beritaList} />} /> */}
        <Route path="/" element={<SlideShow />} />

        {/* Rute untuk menampilkan detail berita */}
        <Route path="/berita/:id" element={<BeritaDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
