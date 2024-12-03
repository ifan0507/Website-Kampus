import React from 'react';
import { Slide } from 'react-slideshow-image';
import Hero from './Hero';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';

const SlideShow = () => {
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
                <Col sm={3} style={{ padding: 0 }}>
                    <Container fluid style={{ padding: 0, backgroundColor: '#FFf' }}>
                        <Row>
                            <Col>
                                <Card
                                    className="mb-4"
                                    style={{
                                        backgroundColor: '#003366',
                                        color: 'white',
                                        borderRadius: 0,
                                    }}
                                >
                                    <Card.Header
                                        style={{
                                            backgroundColor: '#FFA500',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            borderRadius: 0,
                                        }}
                                    >
                                        BERITA
                                    </Card.Header>
                                    <Card.Body>
                                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                            <li>- POLINEMA Gelar Wisuda ke-68 Tahap IV 2024</li>
                                            <li>
                                                - POLINEMA Hibahkan Peralatan PEF – Fermentasi
                                            </li>
                                            <li>- Polinema Gelar Expo Pendidikan</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card
                                    className="mb-4"
                                    style={{
                                        backgroundColor: '#003366',
                                        color: 'white',
                                        borderRadius: 0,
                                    }}
                                >
                                    <Card.Header
                                        style={{
                                            backgroundColor: '#FFA500',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            borderRadius: 0,
                                        }}
                                    >
                                        PENGUMUMAN
                                    </Card.Header>
                                    <Card.Body>
                                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                            <li>- Jadwal Lelang Gedung AK POLINEMA</li>
                                            <li>- Informasi Sarpras</li>
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default SlideShow;