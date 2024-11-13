import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay3";
import Accordion from 'react-bootstrap/Accordion'
import AccordionBody from 'react-bootstrap/esm/AccordionBody'


const styles = theme => ({
    card: {
        width: '100%',
        display: "flex",
        flexWrap: "wrap",
        marginRight: "20px",
        marginBottom: "20px",
        marginTop:"20px",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    cardImage: {
        width: '54%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "20px",
        marginRight: "20px",
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
        textAlign: 'center',
        color: "#fff"
    },
    titleComponent: {
       backgroundColor:"#051d47",
       width: "100%"
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
    const {
        classes,
        profileName,
        subMenu1,
        subMenu2,
        subMenu3,
        linkName1,
        linkName2,
        linkName3,
        linkName4,
        linkName5,
        linkName6,
        linkName7,
        linkName8,
        linkName9,
        profileLink1,
        profileLink2,
        profileLink3,
        profileLink4,
        profileLink5,
        profileLink6,
        profileLink7,
        profileLink8,
        profileLink9,
        
    } = props
    return (
        <Card className={classes.card}>
            <CardContent className={classes.titleComponent}>
            <Typography variant="headline" component="h2" className={classes.title}>
                    {profileName}
                </Typography>
            </CardContent>
            <CardContent>

            <Accordion flush style={{ width:"100%", marginLeft:"20px", marginBottom:"20px"}}>
    
            <Accordion.Item eventKey="0" style={{ width:"250px"}}>
                <Accordion.Header>
                    {subMenu1}
                </Accordion.Header>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink1} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName1}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink2} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName2}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                        <CardActions>
                            <Fragment>
                                <Link prefetch to={profileLink3} style={{textDecoration:"none", color:"#051d47"}}>
                                    {linkName3}
                                </Link>
                            </Fragment>
                        </CardActions>
                    </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" style={{ width:"250px"}}>
            <Accordion.Header>
                    {subMenu2}
                </Accordion.Header>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink4} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName4}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink5} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName5}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                        <CardActions>
                            <Fragment>
                                <Link prefetch to={profileLink6} style={{textDecoration:"none", color:"#051d47"}}>
                                    {linkName6}
                                </Link>
                            </Fragment>
                        </CardActions>
                    </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" style={{ width:"250px"}}>
            <Accordion.Header>
                    {subMenu3}
                </Accordion.Header>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink7} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName7}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                    <CardActions>
                <Fragment>
                    <Link prefetch to={profileLink8} style={{textDecoration:"none", color:"#051d47"}}>
                            {linkName8}
                    </Link>
                </Fragment>
            </CardActions>
                    </Accordion.Body>
                    <Accordion.Body>
                        <CardActions>
                            <Fragment>
                                <Link prefetch to={profileLink9} style={{textDecoration:"none", color:"#051d47"}}>
                                    {linkName9}
                                </Link>
                            </Fragment>
                        </CardActions>
                    </Accordion.Body>
            </Accordion.Item>

            </Accordion>
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
