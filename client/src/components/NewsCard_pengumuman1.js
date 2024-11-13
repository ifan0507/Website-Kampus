import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay7";
import EventsCard from './EventsCard_kegiatanMahasiswa'
import Grid from '@material-ui/core/Grid'



const styles = theme => ({
    card: {
        width: '97%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "5px",
        marginBottom: "20px",
        marginTop:"20px",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    cardImage: {
        width: '52%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "40px",
        marginBottom: "20px",
        marginTop:"10px",
        border: `solid 3px #eeeeee`,
        borderRadius:"5",
        boxShadow:'5px 5px 5px #999DA0',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    media: {
        minHeight: '280px',
        [theme.breakpoints.up('xl')]: {
            minHeight: '1366px'
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: 500
        }
    },
    title: {
        fontSize: 16,
    },
    category: {
        color: 'rgb(153, 134, 67)',
        textTransform: 'uppercase',
        fontSize: '14px'
    },
    description: {
        fontSize: '14px',
        marginTop: 10,
        marginBottom: 5,
        color: '#52535A',
        textAlign: 'justify'
    }
})

const NewsCard = (props) => {
    const {
        classes,
        profileImg1,
        profileImg2,
        profileName,
        link1,
        link2,
        link3,
        content1,
        content2,
        content3,
        data1,
        data2,
        data3,
        nama1,
        nama2,
        nama3,
        deskripsi1,
        deskripsi2,
        deskripsi3
    } = props
    return (
        <Card className={classes.card}>
            <CardContent>
                <EventsCard
                profileImg={data1}
                profileName={nama1}
                content={deskripsi1}
                linkName={content1}
                profileLink={link1}
                bgContain/>
                  <EventsCard
                profileImg={data2}
                profileName={nama2}
                content={deskripsi2}
                linkName={content2}
                profileLink={link2}
                bgContain/>
                  <EventsCard
                profileImg={data3}
                profileName={nama3}
                content={deskripsi3}
                linkName={content3}
                profileLink={link3}
                bgContain/>
            </CardContent>
                <Button style={{ backgroundColor: '#051d47', float: 'left',color:'white', marginLeft: "70px" }}  href="/pengumuman2" >Pos-Pos Lama</Button>
                    <Button style={{ backgroundColor: '#051d47', float: 'right' ,color:'white', marginLeft: "580px" }} href="/pengumuman" >Pos-Pos Baru</Button>
            <Grid container className={classes.Button} style={{justifyContent: "center", margin: 10, padding: 10  }}>
            </Grid>   
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
