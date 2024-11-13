import React, { Component } from "react";
import { Row, Col, Icon } from "antd";
import CountUp from "react-countup";
import "./index.less";
import {
  getPendaftarans,
} from "@/api/pendaftaran";

let chartList = [
  {
    type: "Profil",
    icon: "smile",
    num: 0,
    color: "#40c9c6",
  },
  {
    type: "Jurusan",
    icon: "contacts",
    num: 0,
    color: "#f4516c",
  },
  {
    type: "Berita",
    icon: "book",
    num: 0,
    color: "#36a3f7",
  },
  {
    type: "Kegiatan",
    icon: "team",
    num: 0,
    color: "#f6ab40",
  },
  {
    type: "Selayang Pandang",
    icon: "gift",
    num: 0,
    color: "#40c9c6",
  },
  {
    type: "Pendaftaran",
    icon: "audit",
    num: 0,
    color: "#f4516c",
  },
  {
    type: "Kalender",
    icon: "calendar",
    num: 0,
    color: "#36a3f7",
  },
  {
    type: "Campus Life",
    icon: "heart",
    num: 0,
    color: "#f6ab40",
  },
];

const PanelGroup = (props) => {
  const {
    handleSetLineChartData,
    totalProfil,
    totalJurusan,
    totalBerita,
    totalKegiatan,
    totalSelayangPandang,
    totalPendaftaran,
    totalKalender,
    totalCampusLife,
  } = props;
  for (let i = 0; i < chartList.length; i++) {
    const item = chartList[i];
    if (item.type == 'Profil') {
      chartList[i].num = totalProfil
    }
    if (item.type == 'Jurusan') {
      chartList[i].num = totalJurusan
    }
    if (item.type == 'Berita') {
      chartList[i].num = totalBerita
    }
    if (item.type == 'Kegiatan') {
      chartList[i].num = totalKegiatan
    }
    if (item.type == 'Selayang Pandang') {
      chartList[i].num = totalSelayangPandang
    }
    if (item.type == 'Pendaftaran') {
      chartList[i].num = totalPendaftaran
    }
    if (item.type == 'Kalender') {
      chartList[i].num = totalKalender
    }
    if (item.type == 'Campus Life') {
      chartList[i].num = totalCampusLife
    }
  }

  return (
    <div className="panel-group-container">
      <Row gutter={40} className="panel-group">
        {chartList.map((chart, i) => (
          <Col
            key={i}
            lg={6}
            sm={12}
            xs={12}
            // onClick={handleSetLineChartData.bind(this, chart.type)}
            className="card-panel-col"
          >
            <div className="card-panel">
              <div className="card-panel-icon-wrapper">
                <Icon
                  className={chart.type}
                  style={{ fontSize: 55, color: chart.color }}
                  type={chart.icon}
                />
              </div>
              <div className="card-panel-description">
                <p className="card-panel-text">{chart.type}</p>
                <CountUp end={chart.num} start={0} className="card-panel-num" />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PanelGroup;
