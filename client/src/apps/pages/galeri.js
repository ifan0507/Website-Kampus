import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Layout from '../../components/Layout'
import TextSection from '../../components/TextSection'
import withRoot from '../../components/withRoot'
import SlideShow from '../../components/SlideShow'
import SlideShow_Galeri from '../../components/SlideShow_Galeri'
import NewsCard from '../../components/NewsCard_Home'
import { withTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import MarqueeText from '../../components/MarqueeText'
import ChatIcon from '../../components/ChatIcon'
import NewsCard_Galeri from '../../components/NewsCard_Galeri'
import { useEffect, useState } from 'react'


const galeri = (props) => {
    const [data, setData] = useState([]);
    const { classes} = props
    const { t } = useTranslation();

    useEffect(() => {
        fetch('http://localhost:8080/api/galeri-kampus') // Pastikan URL endpoint sesuai
        .then(response => response.json())
        .then(data => {
            setData([data.content]);
            console.log(data.content);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
      <Grid item className={classes.gridItemFix} xs={12} sm={4} lg={9}>
                        {data.map((item, index) => (
                            <NewsCard_Galeri
                                 key={index}
                                 profileName={t('GALERI')}           
                                //  profileImg={item[3].data}
                                 profileImg1={item[0].data}
                                 profileImg2={item[1].data}
                                 profileImg3={item[2].data}
                                 profileImg4={item[3].data}
                                 profileImg5={item[4].data}
                                 profileImg6={item[5].data}
                                 profileImg7={item[6].data}
                                 profileImg8={item[7].data}
                                 profileImg9={item[8].data}
                                 profileImg10={item[9].data}
                                 profileImg11={item[10].data}
                                 profileImg12={item[11].data}
                                 profileImg13={item[12].data}
                                 profileImg14={item[13].data}
                                
                            />
                        ))}
                    </Grid>
    )
}


const styles = theme => ({
    white: {
        color: '#fff'
    },
    card: {
        width: '100%'
    },
    media: {
        minHeight: 280,
        [theme.breakpoints.up('xl')]: {
            minHeight: 1366
        },
        [theme.breakpoints.up('lg')]: {
            minHeight: '400px'
        }
    },
    gridItemFix: {
        width: '100%',
        padding: '16px',
        [theme.breakpoints.down('sm')]: {
            padding: '8px'
        }
    },
    contentContainer: {
        width: '100%',
        margin: '0 auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '85%'
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: '95%'
        }
    },
    listItem: {
        paddingLeft: 0,
        paddingRight: 0,
        alignItems: 'start'
    },
    avatar: {
        width: '80px',
        height: '80px',
        borderRadius: 0
    },
    degreeList: {
        listStyleType: 'none'
    },
    avatarBig: {
        width: '200px',
        height: '200px',
        [theme.breakpoints.down('sm')]: {
            width: '100px',
            height: '100px'
        }
    },
    listItemTextBig: {
        fontSize: '34px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '24px'
        }
    },
    videoIframe: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        border: 'none'
    },
    videoIframeContainer: {
        width: '100%',
        height: 0,
        overflow: 'hidden',
        position: 'relative',
        paddingBottom: '56.25%'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '38px 0',
        textAlign: 'center'
    },
    innerContainer: {
        width: '70%',
        margin: '0 auto',
    },
    sectionText: {
        fontSize: '28px',
        fontWeight: 400,
        lineHeight: 1.5
    },
    heroBtn: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px'
    },
    invertedBtn: {
        color: '#051d47',
        backgroundColor: 'transparent',
        border: '2px #051d47 solid',
        boxShadow: 'none'
    }
})

export default withRoot(withStyles(styles)(withTranslation()(galeri)))
