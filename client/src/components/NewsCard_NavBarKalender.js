import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay10";
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';



const styles = theme => ({
    card: {
        width: '100%',
        display: "flex",
        flexWrap: "wrap",
        marginRight: "20px",
        marginBottom: "20px",
        marginTop:"20px"
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '100%'
        // } 
    },
    cardImage: {
        width: '100%',
        // display: "flex",
        // flexWrap: "wrap",
        // [theme.breakpoints.down('sm')]: {
        //     maxWidth: '100%'
        // } 
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
        color: '#52535A',
        textAlign: 'justify'
    }
})



const NewsCard = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
    };
    const {
        classes,
        profileImg,
        profileImgTitle,
        linkName,
        profileLink,
        content2,
        content3,
    } = props
    return (
        <Card className={classes.card}>
                        <CardContent className={classes.cardImage}>
                        <Calendar onChange={handleDateChange} value={selectedDate} />            
                        </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
