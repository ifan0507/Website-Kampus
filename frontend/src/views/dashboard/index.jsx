import React, { useState, useEffect, Tag, Table } from "react";
import { Row, Col } from "antd";
import "./index.less";
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import TransactionTable from "./components/TransactionTable";
import TransactionTable2 from "./components/TransactionTable2";
import BoxCard from "./components/BoxCard";
import {
  getProfil,
} from "@/api/profil";
import {
  getDepartments,
} from "@/api/department";
import {
  getBeritas,
} from "@/api/berita";
import {
  getKegiatans,
} from "@/api/kegiatan";
import {
  getSelayangs,
} from "@/api/selayang";
import {
  getPendaftarans,
} from "@/api/pendaftaran";
import {
  getKalender,
} from "@/api/kalender";
import {
  getCampusLifes,
} from "@/api/campus-life";

const lineChartDefaultData = {
  "Manajemen Profil": {
    expectedData: [1000, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  "Manajemen Jurusan": {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  "Manajemen Berita": {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  "Manajemen Kegiatan": {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
  "Selayang Pandang": {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
  "Pendaftaran Mahasiswa": {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
  "Kalender Akademik": {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
  "Campus Life": {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState(
    lineChartDefaultData["Manajemen Profil"]
  );

  const [profil, setProfil] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [berita, setBerita] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);
  const [selayangPandang, setSelayangPandang] = useState([]);
  const [pendaftaran, setPendaftaran] = useState([]);
  const [kalender, setKalender] = useState([]);
  const [campusLife, setCampusLife] = useState([]);

  const handleProfil = async () => {
    try {
      const result = await getProfil();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setProfil(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleJurusan = async () => {
    try {
      const result = await getDepartments();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setJurusan(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleBerita = async () => {
    try {
      const result = await getBeritas();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setBerita(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleKegiatan = async () => {
    try {
      const result = await getKegiatans();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setKegiatan(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleSelayangPandang = async () => {
    try {
      const result = await getSelayangs();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setSelayangPandang(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handlePendaftaran = async () => {
    try {
      const result = await getPendaftarans();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setPendaftaran(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleKalender = async () => {
    try {
      const result = await getKalender();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setKalender(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  const handleCampusLife = async () => {
    try {
      const result = await getCampusLifes();
      const { content, statusCode } = result.data;

      if (statusCode === 200) {
        setCampusLife(content);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    handleProfil();
    handleJurusan();
    handleBerita();
    handleKegiatan();
    handleSelayangPandang();
    handlePendaftaran();
    handleKalender();
    handleCampusLife();
  }, []);

  const handleSetLineChartData = (type) => setLineChartData(lineChartDefaultData[type]);
  // const columns1 = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  //   {
  //     title: "Nama",
  //     dataIndex: "name",
  //     key: "name",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  //   {
  //     title: "Kompetensi",
  //     dataIndex: "kompetensi",
  //     key: "kompetensi",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  // ];
  // const columns2 = [
  //   {
  //     title: "ID",
  //     dataIndex: "id",
  //     key: "id",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  //   {
  //     title: "Nama",
  //     dataIndex: "name",
  //     key: "name",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  //   {
  //     title: "Deskripsi",
  //     dataIndex: "description",
  //     key: "description",
  //     width: 195,
  //     render: text => (`$${text}`),
  //   },
  // ];

  return (
    <div className="app-container">
      <PanelGroup
        handleSetLineChartData={handleSetLineChartData}
        totalProfil={profil.length}
        totalJurusan={jurusan.length}
        totalBerita={berita.length}
        totalKegiatan={kegiatan.length}
        totalSelayangPandang={selayangPandang.length}
        totalPendaftaran={pendaftaran.length}
        totalKalender={kalender.length}
        totalCampusLife={campusLife.length}
      />

      <LineChart
        chartData={lineChartData}
        styles={{
          padding: 12,
          backgroundColor: "#fff",
          marginBottom: "25px",
        }}
      />

      <Row gutter={32}>
        <Col xs={24} sm={24} lg={12}>
          {/* <div className="chart-wrapper">
            <RaddarChart />
          </div> */}
          <div className="chart-wrapper">
            <PieChart
              totalProfil={profil.length}
              totalJurusan={jurusan.length}
              totalBerita={berita.length}
              totalKegiatan={kegiatan.length}
              totalSelayangPandang={selayangPandang.length}
              totalPendaftaran={pendaftaran.length}
              totalKalender={kalender.length}
              totalCampusLife={campusLife.length}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <div className="chart-wrapper">
            <PieChart
              totalProfil={profil.length}
              totalJurusan={jurusan.length}
              totalBerita={berita.length}
              totalKegiatan={kegiatan.length}
              totalSelayangPandang={selayangPandang.length}
              totalPendaftaran={pendaftaran.length}
              totalKalender={kalender.length}
              totalCampusLife={campusLife.length}
            />
          </div>
        </Col>
        {/* <Col xs={24} sm={24} lg={8}>
          <div className="chart-wrapper">
            <BarChart />
          </div>
        </Col> */}
      </Row>
{/* 
      <Row gutter={32}>
        <Col xs={24} sm={24} lg={12}>
          <TransactionTable />
        </Col>
        <Col xs={24} sm={24} lg={12}>
          <TransactionTable2 />
        </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;