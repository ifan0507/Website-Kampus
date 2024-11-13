import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay7";


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
        content1,
        content2,
        content3,
    } = props
    return (
        <Card className={classes.card}>
             <CardContent>
                <Typography variant="display2" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', borderBottom: "2px solid #eee", paddingBottom: "7px" }} gutterBottom>
                   {profileName}
                </Typography>
                </CardContent>
            <CardContent>
                <Typography component="h2" className={classes.description}>
                    {content1}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content2}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content3}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
