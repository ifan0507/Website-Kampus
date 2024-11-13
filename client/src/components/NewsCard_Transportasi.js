import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import AccordionItem from 'react-bootstrap/AccordionItem'
// import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay7";


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
        display: "center",
        flexWrap: "wrap",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    cardImage2: {
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "20px",
        marginRight: "150px",

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
        marginTop: 5,
        marginBottom: 5,
        color: '#52535A',
        textAlign: 'justify'
    },
    content: {
        fontSize: '14px',
        marginTop: 5,
        marginBottom: 5,
        color: '#52535A',
        textAlign: 'center'
    },
    table: {
        border: '1px solid black',
        width: '800px',
        height: '200px',
        textAlign: 'center',

    },
     
    th: {
        borderBottom: '1px solid black',
        border: '1px solid black'

    },
     
    td: {
        textAlign: 'center',
        border: '1px solid black'
    },
})

const NewsCard = (props) => {
    
    const {
        profileName,
        description1,
        description2,
        classes,

        profileName1,
        profileName2,
        profileName3,
        profileName4,

        no,
        name,
        link,
        image,

        profileImg1,
        link1,
        nomor1,
        content1,
   
        profileImg2,
        link2,
        nomor2,
        content2,
       
        profileImg3,
        link3,
        nomor3,
        content3,

        profileImg4,
        link4,
        nomor4,
        content4,

        profileImg5,
        link5,
        nomor5,
        content5,

        profileImg6,
        link6,
        nomor6,
        content6,

        profileImg7,
        link7,
        nomor7,
        content7,

        profileImg8,
        link8,
        nomor8,
        content8,

        profileImg9,
        link9,
        nomor9,
        content9,

        profileImg10,
        link10,
        nomor10,
        content10,

        profileImg11,
        link11,
        nomor11,
        content11,
        profileImg,
        profileLink,
        linkName
    } = props
    
    
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="display2" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', marginBottom:"0px", borderBottom: "2px solid #eee", paddingBottom: "7px" }} gutterBottom>
                   {profileName}
                </Typography>
            </CardContent>
            <CardContent>
                <img
                src={profileImg}
                style={{ width: '75%'}}
                className={classes.cardImage}
                />
                </CardContent>
            <CardContent>
                <Typography component="h2" className={classes.description}>
                    {description1}
                </Typography>
                <Typography component="subheading" className={classes.description}>
                    {description2}
                </Typography>
                <Typography>
                <a href={profileLink} target= "_blank">
                            {linkName}
                    </a>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
