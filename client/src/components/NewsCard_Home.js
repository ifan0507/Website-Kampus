import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay8"; // Menampilkan gambar dari backend

const styles = (theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "10px",
  },
  cardMedia: {
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  cardContent: {
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#52535A",
    marginTop: 8,
  },
  cardimg: {
    display: "block",
    margin: "0 auto",
    width: "80%",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  cardImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  // card: {
  //     margin: "10px", // Tambahkan margin untuk tata letak
  // },
  // media: {
  //     minHeight: '280px',
  //     [theme.breakpoints.up('xl')]: {
  //         minHeight: '1366px',
  //     },
  //     [theme.breakpoints.up('lg')]: {
  //         minHeight: 500,
  //     },
  // },
  // title: {
  //     fontSize: 16,
  // },
  // category: {
  //     color: 'rgb(153, 134, 67)',
  //     textTransform: 'uppercase',
  //     fontSize: '14px',
  // },
  // description: {
  //     fontSize: '14px',
  //     marginTop: 10,
  //     color: '#52535A',
  // },
  // cardimg: {
  //     display: "block", // Untuk memastikan gambar menjadi elemen blok
  //     margin: "0 auto", // Agar gambar berada di tengah horizontal
  //     width: "80%", // Atur lebar gambar secara manual (sesuaikan kebutuhan)
  //     height: "auto", // Memastikan gambar tetap proporsional
  //     maxWidth: "100%", // Batas lebar gambar
  //         maxHeight: "100%", // Batas tinggi gambar
  //     objectFit: "contain", // Membuat gambar pas dengan kotak tanpa crop
  // },
  //     cardImageContainer: {
  //         display: "flex", // Gunakan Flexbox
  //     justifyContent: "center", // Posisikan konten secara horizontal
  //     alignItems: "center", // Posisikan konten secara vertikal
  //     height: "200px", // Atur tinggi kontainer sesuai kebutuhan
  //     backgroundColor: "#f5f5f5", // Opsional: Tambahkan latar belakang untuk membantu debugging
  //     overflow: "hidden", // Agar gambar tidak keluar dari kontainer
  //     },
});

const NewsCard = (props) => {
  const {
    classes,
    Img, // Gambar yang diambil dari backend
    cardimg,
    profileName,
    content,
    profileLink,
    link,
  } = props;

  return (
    <Card className={classes.card}>
      {/* Kontainer untuk Gambar */}
      <div className={classes.cardImageContainer}>
        <BlobImageDisplay
          blob={cardimg}
          className={classes.cardimg}
          style={{
            width: props.imgWidth || "100%", // Lebar default 100%
            height: props.imgHeight || "auto", // Tinggi default auto
          }}
        />
      </div>
      {/* Konten Card */}
      <CardContent>
        <Typography variant="headline" component="h2" className={classes.title}>
          {profileName}
        </Typography>
        <Typography component="p" className={classes.description}>
          {content}
        </Typography>
      </CardContent>

      {/* Tindakan Card */}
      <CardActions>
        <Link prefetch to={profileLink}>
          <Button size="small" color="primary">
            {link}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(NewsCard);
