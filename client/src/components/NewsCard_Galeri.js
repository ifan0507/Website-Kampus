import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay11";


const styles = theme => ({
    card: {
        width: '130%',
        display: "flex",
        flexWrap: "wrap",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ubah angka 0.8 sesuai tingkat transparansi yang diinginkan
        // marginLeft: "5px",
        // marginBottom: "20px",
        marginLeft: "30px",
        marginRight: "10",
        marginBottom: "20px",
        marginTop:"20px", 
        textAlign:"center",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    cardImage: {
        width: '60%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "200px",
        marginBottom: "20px",
        marginTop:"20px",
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
        marginBottom: 10,
        color: '#52535A',
        textAlign: 'justify'
    },
    instagramLinkContainer: {
        position: 'absolute',
        // top: 0,
        left: '70%',
        marginTop: '15px',
        transform: 'translateX(-50%)',
    }
})

const NewsCard_Galeri = (props) => {
    const {
        classes,
        profileImg1,
        profileImg2,
        profileImg3,
        profileImg4,
        profileImg5,
        profileImg6,
        profileImg7,
        profileImg8,
        profileImg9,
        profileImg10,
        profileImg11,
        profileImg12,
        profileImg13,
        profileImg14,
        profileName
       
    } = props
    return (
        <Card className={classes.card}>
               <CardContent>
                <Typography variant="display2" style={{ color: '#ffff', textAlign: "center", marginLeft: '650px', marginBottom:"0px" }} gutterBottom>
                   {profileName}
                </Typography>
            </CardContent>
            <CardContent>
            <BlobImageDisplay blobs={[profileImg1, profileImg2, profileImg3, profileImg4, profileImg5, profileImg6, profileImg7, profileImg8, profileImg9, profileImg10, profileImg11, profileImg12, profileImg13, profileImg14]}/>
            </CardContent>
        </Card>

        
    )
}

export default withStyles(styles)(NewsCard_Galeri)
