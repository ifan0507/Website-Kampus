import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import React, { Component, Fragment } from 'react'
import { BlobImageDisplay } from "../apps/pages/BlobImageDisplay5";
import { BlobImageDisplayMandiri } from "../apps/pages/BlobImageDisplayMandiri";
import Accordion from 'react-bootstrap/Accordion'
import AccordionItem from 'react-bootstrap/AccordionItem'


const styles = theme => ({
    card: {
        width: '100%',
        display: "flex",
        flexWrap: "wrap",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "20px",
        marginTop:"20px",
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%'
        } 
    },
    cardImage: {
        display: "flex",
        marginLeft:"350px",
        marginBottom:"20px",
        flexWrap: "wrap",
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
        marginBottom: 10,
        color: '#52535A',
        textAlign: 'justify'
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
        classes,
        profileImg1,
        profileImg2,
        profileImg3,
        profileImg4,
        profileImg5,
        profileImg6,
        profileName,
        content1,
        content2,
        content3,
        content4,
        content5,
        content6,
        title1,
        title2,
        title3,
        no,
        name,
        link,
        profileName1,
        image,
        nomor1,
        profileLink,
        linkName

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
                <Typography component="h2" className={classes.description}>
                    {content2}
                </Typography>
                 <a href={profileLink} target= "_blank">
                            {linkName}
                    </a>
            </CardContent>


             <Accordion style={{ width:"90%", marginLeft:"20px", marginBottom:"20px"}}>
                
            <Accordion.Item eventKey="0">
            <Accordion.Header>
                <Typography variant="subheading" style={{color: '#051d47', textAlign: "left", marginLeft: '0px', marginBottom:"0px" }} gutterBottom>
                   {profileName1}
                </Typography>
            </Accordion.Header>
                <Accordion.Body>
                    <CardContent>

                <table className={classes.table}>
                    <tr>
                        <th className={classes.th}>{name}</th>
                        <th className={classes.th}>{image}</th>
                    </tr>

                    <tr>
                        <td className={classes.td}>  
                            <Typography component="h2" className={classes.content}>
                                {content4}
                            </Typography>
                        </td>
                        <td className={classes.td}>
                            <CardContent>
                                    <BlobImageDisplayMandiri blob={profileImg3}/>
                            </CardContent>
                        </td>
            
                    </tr>

                    <tr>
                        <td className={classes.td}>  
                            <Typography component="h2" className={classes.content}>
                                {content4}
                            </Typography>
                        </td>
                        <td className={classes.td}>
                            <CardContent>
                                <BlobImageDisplayMandiri blob={profileImg4}/>
                            </CardContent>
                        </td>
                    </tr>

                    <tr>
                        <td className={classes.td}>  
                            <Typography component="h2" className={classes.content}>
                                {content5}
                            </Typography>
                        </td>
                        <td className={classes.td}>
                            <CardContent>
                                <BlobImageDisplayMandiri blob={profileImg5}/>
                            </CardContent>
                        </td>
                    </tr>

                    <tr>
                        <td className={classes.td}>  
                            <Typography component="h2" className={classes.content}>
                                {content6}
                            </Typography>
                        </td>
                        <td className={classes.td}>
                            <CardContent>
                                <BlobImageDisplayMandiri blob={profileImg6}/>
                            </CardContent>
                        </td>
                    </tr>
                   
                </table>
                    </CardContent>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
                <Card className={classes.cardImage}>
            <BlobImageDisplayMandiri blob={profileImg1}/>
                </Card>
                <Card className={classes.cardImage}>
            <BlobImageDisplayMandiri blob={profileImg2}/>
                </Card>
            
        </Card>
    )
}

export default withStyles(styles)(NewsCard)
