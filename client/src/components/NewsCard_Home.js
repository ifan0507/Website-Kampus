import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from '../apps/pages/BlobImageDisplay8'

const styles = theme => ({
    card: {
        width: '100%'
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
    }
})

const NewsCard = (props) => {
    const {
        classes,
        Img,
        profileImgTitle,
        profileType,
        profileName,
        content,
        profileLink,
        link
    } = props
    return (
        <Card className={classes.card}>
            {/* <img
                src={profileImg}
                title={profileImgTitle}
                style={{ width: '100%' }}
            /> */}
                <BlobImageDisplay blob={Img}/>
            <CardContent>
                {/* <Typography variant="caption" className={classes.category}>
                    {profileType}
                </Typography> */}
                <Typography variant="headline" component="h2" className={classes.title}>
                    {profileName}
                </Typography>
                <Typography component="p" className={classes.description}>
                    {content}
                </Typography>
            </CardContent>
            {/* {profileLink && ( */}
            <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink}>
                        <Button size="small" color="primary">
                        {link}  
                        </Button>
                    </Link>
                </Fragment>
            </CardActions>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
