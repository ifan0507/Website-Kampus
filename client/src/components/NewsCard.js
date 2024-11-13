import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'

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
        profileImg,
        profileImgTitle,
        profileType,
        profileName,
        content,
        profileLink
    } = props
    return (
        <Card className={classes.card}>
            <img
                src={profileImg}
                title={profileImgTitle}
                style={{ width: '100%' }}
            />
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
                            Read More
                        </Button>
                    </Link>
                </Fragment>
            </CardActions>
            {/* )} */}

            {/* <a href="https://franciscan.edu/franciscan-university-of-steubenville-pays-tribute-to-pope-emeritus-benedict-xvi/" class="post-details details-type-link" aria-label="Read more about Franciscan University of Steubenville Pays Tribute to Pope Emeritus Benedict XVI">Read more<i class="dt-icon-the7-arrow-03" aria-hidden="true"></i></a> */}
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
