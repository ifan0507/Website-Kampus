import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay5";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Counter from './counter'


const styles = theme => ({
    card: {
        width: '100%',
        height: "20%",
        display: "flex",
        flexWrap: "wrap",
        color:"#051d47",
        borderColor:"#998643",
        padding:"12px 0",
        textAlign:"center",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    breadcrumb: {
        width: '70%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "20px",
    },
    cardImage: {
        width: '80%',
        display: "flex",
        flexWrap: "wrap",
        textAlign:"center",
        marginLeft: "70px",
        marginBottom: "40px",
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
    }
})

const NewsCard = (props) => {
    const {
        classes,
        profileImg,
        profileName,
        linkName,
        profileLink,
    } = props
    return (
        <Card className={classes.card}>
             <CardContent>
             <img
                src={profileImg}
                style={{ width: '100%' }}/>
                <Counter/>
                <Typography variant="headline" style={{ color: '#fff', textAlign: "center", marginLeft: '0px' }} gutterBottom>
                   {profileName}
                </Typography>
                </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
