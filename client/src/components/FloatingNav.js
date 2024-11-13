import React from 'react';
import { Link } from 'react-router-dom';
import '../FloatingNav.css';

const FloatingNav = () => {
  return (
    <div className="floating-nav">
      <ul>
        
        <li><Link to="/profile"><i className="fas fa-home"></i><strong><span>Profil</span></strong></Link></li>
        <li><Link to="/kalender_akademik"><i className="fas fa-search"></i><strong><span>Kalender Akademik</span></strong></Link></li>
        <li><Link to="/teknologi_informasi"><i className="fas fa-bell"></i><strong><span>Program Studi</span></strong></Link></li>
        <li><Link to="/snbp"><i className="fas fa-user"></i><strong><span>Info PMB</span></strong></Link></li>
        <li><Link to="/kegiatan_mahasiswa"><i className="fas fa-user"></i><strong><span>Kegiatan Mahasiswa</span></strong></Link></li>
        <li><Link to="/perpustakaan_polinema"><i className="fas fa-user"></i><strong><span>Fasilitas Kampus</span></strong></Link></li>
        <li><Link to="/profil_lumajang"><i className="fas fa-city"></i><strong><span>Kehidupan Lumajang</span></strong></Link></li>

      </ul>
    </div>
  );
};

export default FloatingNav;
