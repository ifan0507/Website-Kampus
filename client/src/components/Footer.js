import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import InvertedButton from './InvertedButton'
import { useTranslation } from 'react-i18next'

const Footer = ({classes}) => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
    return (
      <div className={classes.root}>
        <Grid className={classes.subFooter} item xs={12}>
          <div className={classes.rootImage}>
              <img src='./assets/images/logo-polinema-footer.png' alt='Polinema' style={{ marginBottom: 20, width: '300px' }} />
            </div>
            <div class="menu-footer-program-studi-container">
            <ul id="secondary-menu" class="menu">
              <a style={{ color: 'white'}}>{t('Program.label')}</a><br></br>
              <li id="menu-item-682" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-682"><a href="/otomotif" style={{ color: 'white'}}>{t('Item1.label')}</a></li>
              <li id="menu-item-680" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-680"><a href="/teknologi_sipil" style={{ color: 'white'}}>{t('Item2.label')}</a></li>
              <li id="menu-item-326" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-326"><a href="/akuntansi" style={{ color: 'white'}}>{t('Item3.label')}</a></li>
              <li id="menu-item-325" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-325"><a href="/teknologi_informasi" style={{ color: 'white'}}>{t('Item4.label')}</a></li>
              </ul>
              <ul id="secondary-menu" class="menu">
              <a href="https://wa.link/wuglb5"><img src="/assets/images/whatsapp.png" width="30" alt="Icon"/></a>   <a href="https://www.facebook.com/aknlumajang.ID/?locale=id_ID"><img src="./assets/images/fb.png" width="40" alt="Icon"/></a>  <a href="https://www.instagram.com/polinema.lumajang.official/"><img src="./assets/images/ig.png" width="30" alt="Icon"/></a>  
              </ul>
           </div>
           <div>
           <ul id="secondary-menu" class="menu">
           <a style={{color:'white'}}>{t('Pro1.label')}<br></br>{t('Pro2.label')}<br></br>{t('Pro3.label')}<br></br>{t('Pro4.label')}</a>
           <br></br>
           <br></br>
           <a style={{color:'white'}}>{t('alamat1.label')}<br></br>{t('alamat2.label')}</a>
           </ul>
           </div>
         
        </Grid>
        <Grid className={classes.subFooter1} item xs={12}>
        <div className={classes.rootImage}>
           <Typography
                className={classes.white}
                variant="subheading"
                component={'span'}
                style={{ fontSize: 14}}
              >
                © {currentYear} by PSDKU POLITEKNIK NEGERI MALANG DI KABUPATEN LUMAJANG. All rights reserved.
              </Typography>
</div>
</Grid>
      </div>
    )
  }

const styles = theme => ({
  root: {
    backgroundColor: `#051d47`,
    paddingTop: '16px',
    overflowX: 'hidden'
  },

  subFooter: {
    backgroundColor: '#051d47',
    padding: '8px 16px 8px 16px',
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subFooter1: {
    backgroundColor: '#051d47',
    padding: '8px 16px 8px 16px',
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection:'column',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: '18px',
    lineHeight: 1.5
  },
  invertedBtnDark: {
    color: '#fff',
    backgroundColor: 'transparent',
    border: '2px #fff solid',
    boxShadow: 'none',
    margin: '8px'
  },
  white: {
    color: '#ffffff'
  },
  flexContainer: {
    display: 'flex'
  },
  childFooter: {
    maxWidth: '50%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      textAlign: 'center'
    },
    marginTop: 10,
    marginBottom: 100
  },
  rootImage: {
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      textAlign: 'center'
    },
  }
})

export default withStyles(styles)(Footer)
