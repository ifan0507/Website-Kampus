
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions'
import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay";



const styles = theme => ({
    card: {
        width: '80%',
        display: "flex",
        flexWrap: "wrap",
        marginBottom: 20
    },
    image: {
        maxWidth: '80%',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '20%',
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
        color: '#52535A'
    },
    content: {
        maxWidth: '100%',
        [theme.breakpoints.up('lg')]: {
            maxWidth: '70%',
        }
    }
})

const NewsCard = (props) => {
    const {
        classes,
        profileImg,
        profileImgTitle,
        profileName,
        content,
        profileLink,
        linkName
        
    } = props
    return (
        <Card className={classes.card}>
            
            {/* <img
            
                src={profileImg}
                title={profileImgTitle}
                className={classes.image}
                alt={profileImgTitle}
            /> */}
            <BlobImageDisplay blob={profileImg} className={classes.image}/>

            <CardContent className={classes.content}>
                {/* <Typography variant="caption" className={classes.category}>
                    {profileType}
                </Typography> */}
                <Typography variant="headline" component="h2" className={classes.title}>
                    {profileName}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content}
                </Typography>
                <Typography component="p" className={classes.description}>
                </Typography>
                <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink}>
                        <Button size="small" color="primary">
                            {linkName}
                        </Button>
                    </Link>
                </Fragment>
            </CardActions>
            </CardContent>
            {/* {profileLink && ( */}

        </Card>
    )
}

export default withStyles(styles)(NewsCard)
