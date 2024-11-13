import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay9";


const styles = theme => ({
    card: {
        width: '97%',
        display: "flex",
        flexWrap: "wrap",
        // marginLeft: "5px",
        // marginBottom: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "20px",
        marginTop:"20px", 
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

const NewsCard = (props) => {
    const {
        classes,
        profileImg,
        profileImg1,
        profileImg2,
        profileImg3,
        profileName,
        content1,
        content2,
        content3,
        title1,
        title2,
        title3,
        instagramLink,
    } = props
    return (
        <Card className={classes.card}>
             <CardContent>
             <div className={classes.instagramLinkContainer}>
                                {instagramLink}
                            </div>
                <Typography variant="display2" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', borderBottom: "2px solid #eee", paddingBottom: "7px" }} gutterBottom>
                   {profileName}
                </Typography>
                </CardContent>
             
            <CardContent>
                <Typography variant="title" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', borderBottom: "1px solid #eee", paddingBottom: "7px"}} >
                   {title1}
                </Typography>
                <Typography component="h2" className={classes.description}>
                    {content1}
                </Typography>
                <Typography variant="title" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', borderBottom: "1px solid #eee", paddingBottom: "7px" }} >
                   {title2}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content2}
                </Typography>
                <Typography variant="title" style={{ color: '#051d47', textAlign: "left", marginLeft: '0px', borderBottom: "1px solid #eee", paddingBottom: "7px" }} >
                   {title3}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content3}
                </Typography>
                <Card className={classes.cardImage}>
            {/* <BlobImageDisplay blob={profileImg}/> */}
            <BlobImageDisplay blobs={[profileImg1, profileImg2, profileImg3]} />
            
                </Card>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
