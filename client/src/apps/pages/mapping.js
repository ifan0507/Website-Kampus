import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Layout from '../../components/Layout'
import TextSection from '../../components/TextSection'
import withRoot from '../../components/withRoot'
import SlideShow from '../../components/SlideShow'
import SlideShow_Galeri from '../../components/SlideShow_Galeri'
import NewsCard from '../../components/NewsCard_Home'
import { withTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import MarqueeText from '../../components/MarqueeText'
import ChatIcon from '../../components/ChatIcon'
import NewsCard_Galeri from '../../components/NewsCard_Galeri'
import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet CSS is imported
import FloatingNav from '../../components/FloatingNav';



  const mapping = (props) => {
    const position = [ -8.1353247, 113.2243037];
    const position1 = [ -8.2303629,112.8985706]; 
    const position2 = [ -8.1306872,113.1097889]; 
    const position3 = [ -7.985833,113.2613669]; 
    const position4 = [ -8.0229414,113.1292554]; 
    const position5 = [ -8.2856868,113.1437174]; 
    const position6 = [ -8.1397059,113.2401982]; 
    const position7 = [ -8.1393543,113.0133882]; 
    const position8 = [ -8.1077154,112.8854984]; 
    const position9 = [ -8.1295528,113.1910556]; 
    const position10 = [ -8.2894666,112.7842961]; 


  const { classes} = props
  const { t } = useTranslation();

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

    return (
      <Grid item className={classes.gridItemFix} xs={12} sm={4} lg={4}>
        <div style={{ height: '300px', zIndex: '1' }}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '319%', height: '150%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}  icon={customIcon}>
              <Popup>
                {t('Alun Alun Lumajang')}
              </Popup>
            </Marker>
            <Marker position={position1} icon={customIcon}>
              <Popup>
                <div>
                  <strong>Air Terjun Tumpak Sewu</strong> <br />
                    <a href="https://maps.app.goo.gl/ENUtYdXveZRH5itFA" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position2} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Pemandian Selokambang</strong> <br />
                    <a href="https://maps.app.goo.gl/jQEeWwt2gDGZ79tF6" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position3} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Ranu Klakah</strong> <br />
                    <a href="https://maps.app.goo.gl/ab294eSoRyAokULt7" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position4} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Kebun Teh Kertowono</strong> <br />
                    <a href="https://maps.app.goo.gl/xDAwTsNWFhsYewMt9" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position5} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Pantai Watu Pecak</strong> <br />
                    <a href="https://maps.app.goo.gl/yfPJTQdbGZrzSLVx8" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position6} icon={customIcon}>
              <Popup>
              <div>
                  <strong>PSDKU Pollinema Lumajang</strong> <br />
                    <a href="https://maps.app.goo.gl/YFBK8vBaBvQDf3F88" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position7} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Hutan Bambu</strong> <br />
                    <a href="https://maps.app.goo.gl/Gd29j6ssTnArqjFX7" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position8} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Gunung Semeru</strong> <br />
                    <a href="https://maps.app.goo.gl/xk48y7qEBFDrdS9X6" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position9} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Tumpak Selo</strong> <br />
                    <a href="https://maps.app.goo.gl/m4BWRUnHrHrj3cWr7" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
            <Marker position={position10} icon={customIcon}>
              <Popup>
              <div>
                  <strong>Pantai Dampar</strong> <br />
                    <a href="https://maps.app.goo.gl/TKZHuRBjguf7E6BF8" target="_blank">Informasi lebih lanjut</a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </Grid>
    )
  }

const styles = theme => ({
  white: {
      color: '#fff'
  },
  card: {
      width: '100%'
  },
  media: {
      minHeight: 280,
      [theme.breakpoints.up('xl')]: {
          minHeight: 1366
      },
      [theme.breakpoints.up('lg')]: {
          minHeight: '400px'
      }
  },
  gridItemFix: {
      width: '100%',
      padding: '16px',
      [theme.breakpoints.down('sm')]: {
          padding: '8px'
      }
  },
  contentContainer: {
      width: '100%',
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
          maxWidth: '85%'
      },
      [theme.breakpoints.down('sm')]: {
          maxWidth: '95%'
      }
  },
  listItem: {
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: 'start'
  },
  avatar: {
      width: '80px',
      height: '80px',
      borderRadius: 0
  },
  degreeList: {
      listStyleType: 'none'
  },
  avatarBig: {
      width: '200px',
      height: '200px',
      [theme.breakpoints.down('sm')]: {
          width: '100px',
          height: '100px'
      }
  },
  listItemTextBig: {
      fontSize: '34px',
      [theme.breakpoints.down('sm')]: {
          fontSize: '24px'
      }
  },
  videoIframe: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      border: 'none'
  },
  videoIframeContainer: {
      width: '100%',
      height: 0,
      overflow: 'hidden',
      position: 'relative',
      paddingBottom: '56.25%'
  },
  section: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '38px 0',
      textAlign: 'center'
  },
  innerContainer: {
      width: '70%',
      margin: '0 auto',
  },
  sectionText: {
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: 1.5
  },
  heroBtn: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px'
  },
  invertedBtn: {
      color: '#051d47',
      backgroundColor: 'transparent',
      border: '2px #051d47 solid',
      boxShadow: 'none'
  }
})
export default withRoot(withStyles(styles)(withTranslation()(mapping)))
