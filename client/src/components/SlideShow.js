import React from 'react';
import { Slide } from 'react-slideshow-image';
import Hero from './Hero';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import '../App.css';

const SlideShow = (props) => {
  const [data, setData] = useState([]);
  const { classes } = props;
  const { t } = useTranslation();
  const [beritaData, setBeritaData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:8080/api/berita?page=0&size=3") // Parameter sesuai kebutuhan
      .then((response) => response.json())
      .then((res) => {
        setData(res.content); // Akses ke properti "content"
        console.log(res.content); // Pastikan data sesuai
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowPopup(true);
    }
  }, []);

  const hidePopup = () => {
    setShowPopup(false);
  };

    return (
        <div style={{ margin: 0, padding: 0 }}>
            <Row className="g-0" style={{ margin: 0 }}>
                {/* Slideshow Section */}
                <Col sm={9} style={{ padding: 0 }}>
                    <Slide autoplay={true} easing="cubic-out">
                        <div className="each-slide-effect">
                            <Hero
                                backgroundImg="./assets/images/depan1.jpeg"
                                titleText="PSDKU POLINEMA KAMPUS LUMAJANG"
                                subtitleText={<span>Politeknik Negeri Malang</span>}
                            />
                        </div>
                        <div className="each-slide-effect">
                            <Hero
                                backgroundImg="./assets/images/gedung.jpeg"
                                titleText="PSDKU POLINEMA KAMPUS LUMAJANG"
                                subtitleText={<span>Politeknik Negeri Malang</span>}
                            />
                        </div>
                        <div className="each-slide-effect">
                            <Hero
                                backgroundImg="./assets/images/gedung1.jpeg"
                                titleText="PSDKU POLINEMA KAMPUS LUMAJANG"
                                subtitleText={<span>Politeknik Negeri Malang</span>}
                            />
                        </div>
                        <div className="each-slide-effect">
                            <Hero
                                backgroundImg="./assets/images/otomotif2.jpeg"
                                titleText="PSDKU POLINEMA KAMPUS LUMAJANG"
                                subtitleText={<span>Politeknik Negeri Malang</span>}
                            />
                        </div>
                    </Slide>
                </Col>

                {/* News and Announcements Section */}
                <Col sm={3} style={{ padding: 0, backgroundColor: '#003366' }}>
  <Container fluid style={{display: 'flex', flexDirection: 'column', padding: 0 }}>
    
    {/* Berita */}
    <div style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column' }}>
      <Card style={{ backgroundColor: 'transparent', color: 'white', border: 'none', height: '253px' }}>
        <Card.Header
          style={{
            backgroundColor: '#FFA500',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          BERITA
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto' }}>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {data.map((item, index) => (
              <li
                key={index}
                Img={item.data} // URL atau base64 dari backend
                profileName={item.name} // Judul berita
                content={item.description} // Deskripsi atau link berita
                profileLink={`/item_pengumuman${index + 1}`} // Link dinamis
                link={t("selengkapnya →")}
                bgContain
              />
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>

    {/* Pengumuman */}
    <div style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column' }}>
    <Card style={{ backgroundColor: 'transparent', color: 'white', border: 'none', height: '252px' }}>
        <Card.Header
          style={{
            backgroundColor: '#FFA500',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          PENGUMUMAN
        </Card.Header>
        <Card.Body style={{ overflowY: 'auto' }}>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li> Jadwal Lelang Gedung AK POLINEMA</li>
            <li> Informasi Sarpras</li>
            <li> Lomba Ngoding</li>
          </ul>
        </Card.Body>
      </Card>
    </div>
    
  </Container>
</Col>

            </Row>
        </div>
    );
};

export default SlideShow;