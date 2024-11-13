import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Close from '@material-ui/icons/Close'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from "react-i18next";
import GoogleTranslate from "./GoogleTranslate";
import AppBarMenuItem from './AppBarMenuItem'
import IconId from '../components/Flag/IconId'
import IconEn from "../components/Flag/IconEn"

class ButtonAppBar extends Component {

  static defaultProps = {
    classes: PropTypes.object.isRequired
  }
  state = {
    isSearchOpen: false,
    search: '',
    language: 'ina, en'
  }
  onSearchClick = () => {
    this.state.isSearchOpen
      ? this.handleSearch()
      : this.setState({ isSearchOpen: true })
  }

  closeInput = () => {
    this.setState({ isSearchOpen: false })
  }

  handleSearch = () => {
    if (this.state.search !== '') {
      window.location = `/search?search=${this.state.search}`
    }
  }


  onSeachChange = e => this.setState({ search: e.target.value })

  render() {
    const { classes, toggleDrawer, t, i18n } = this.props
    const { isSearchOpen, search } = this.state

    const changeLanguage = (value) => {
      i18n.changeLanguage(value);
    }

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.toolbar}>
            <div className={classes.col1}>
              <IconButton
                className={classes.menuButton}
                aria-label="Menu"
                title="Menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="title"
                component="span"
                className={classes.flex}
              >
                <Link to="/">
                  <a>
                    <Hidden mdUp>
                      <img
                        className={classes.mobileHeaderImage}
                        src="./assets/images/logo-polinema.png"
                        alt="Logo Polinema"
                      />
                    </Hidden>
                    <Hidden smDown>
                      <img
                        className={classes.headerImage}
                        src="./assets/images/logo-polinema.png"
                        alt="Logo Polinema"
                      />
                    </Hidden>
                    <Grid>
                </Grid>
                  </a>
                </Link>
              </Typography>
              {/* <Hidden mdUp>
              <Typography
               variant="display1"
               style={{ textAlign: 'left', fontSize: '200%', marginTop: "20px" }}
              >
                <Link to="/" style={{ textDecoration: 'none', color: '#051d47'}}>PSDKU</Link>
              </Typography>
              <Typography
               variant="display1"
               style={{ textAlign: 'left',marginLeft:'10px', fontSize: '200%', marginTop: "20px" }}
              >
               <Link to="/" style={{ textDecoration: 'none',color: '#e77e23'}}>KAMPUS LUMAJANG</Link>
              </Typography>
              </Hidden>
              <Hidden smDown>
              <Typography
               variant="display1"
               style={{ textAlign: 'left', fontSize: '200%', marginTop: "20px" }}
              >
                <Link to="/" style={{ textDecoration: 'none', color: '#051d47'}}>POLITEKNIK NEGERI MALANG</Link>
              </Typography>
              <Typography
               variant="display1"
               style={{ textAlign: 'left',marginLeft:'10px', fontSize: '200%', marginTop: "20px" }}
              >
               <Link to="/" style={{ textDecoration: 'none',color: '#e77e23'}}>KAMPUS LUMAJANG</Link>
              </Typography>
              </Hidden> */}
=            </div>

            <Grid container className={`${classes.col2} ${classes.mobileGridContainer}`}
            >
              {/* <Grid item xs={12} className={classes.telContainer}>
                <a href="tel:18007836220" className={classes.telLink}>
                  1.800.783.6220
                </a>
              </Grid> */}
              <Hidden smDown>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <ul className={classes.menuList}>
                  <img
                        className={classes.mobileHeaderImage}
                        src="./assets/images/mbkm.PNG"
                        alt="Logo MBKM"
                      />

                    <AppBarMenuItem
                      toggleDrawer={toggleDrawer}
                      linkId="home"
                      content={t('beranda.label')}
                    />
                    {/* <AppBarMenuItem
                      toggleDrawer={toggleDrawer}
                      linkId="about"
                      content={t('tentang.label')}
                    /> */}
                    {/* <li style={{ marginRight: 20 }}>
                      <div className={classes.language}>
                        <div onClick={() => changeLanguage('ina')} style={{ height: "20px", width: "20px", marginLeft: 2, cursor: 'pointer' }}>
                          <IconId />
                        </div>
                        <div onClick={() => changeLanguage('en')} style={{ height: "20px", width: "20px", marginLeft: 15, cursor: 'pointer' }}>
                          <IconEn />
                        </div>
                      </div>
                    </li> */}
                    
                    <GoogleTranslate />

                    {/* <SvgIcon
                      viewBox="0 0 24 24"
                      className={classes.searchSVG}
                      onClick={this.onSearchClick}
                    >
                      <title>Search Franciscan</title>
                      <path
                        xmlns="http://www.w3.org/2000/svg"
                        d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                      />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </SvgIcon> */}

                    <Input
                      className={
                        isSearchOpen ? classes.searchOpen : classes.searchClosed
                      }
                      placeholder="Search"
                      classes={{ underline: classes.searchInput }}
                      inputRef={inp => {
                        this.searchInput = inp
                      }}
                      value={search}
                      onChange={this.onSeachChange}
                      onKeyPress={e => e.key === 'Enter' && this.handleSearch()}
                      endAdornment={
                        <InputAdornment
                          style={isSearchOpen ? {} : { display: 'none' }}
                          position="end"
                        >
                          <IconButton
                            aria-label="Close search input"
                            onClick={this.closeInput}
                          >
                            <Close />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </ul>

                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </AppBar >
      </div >
    )
  }
}

const styles = theme => ({
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)'
    }
  },
  Breadcrumbs: {
color: "#053070",
  },
  appBar: {
    background: '#ffffff',
  },
  toolbar: {
    minHeight: '72px',
    [theme.breakpoints.down('sm')]: {
      minHeight: '80px'
    }
  },
  menuButton: {
    color: `${theme.palette.primary[500]}`,
    marginLeft: -12,
    marginRight: 10,
    alignSelf: 'center'
  },
  mobileHeaderImage: {
    maxHeight: '3rem',
    marginLeft: 10
    // [theme.breakpoints.down('md')]: {
    //   marginTop: '13px'
    // }
  },
  headerImage: {
    maxHeight: '3rem',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '80px'
    }
  },
  mobileGridContainer: {
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'flex-start',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)'
    }
  },
  telContainer: {
    textAlign: 'right',
    marginBottom: '8px',
    marginTop: '8px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginTop: '4px'
    }
  },
  telLink: {
    padding: '8px',
    margin: '8px',
    fontSize: '18px'
  },
  searchSVG: {
    cursor: 'pointer',
    fill: `${theme.palette.primary[500]}`,
    paddingBottom: '6px'
  },
  invertedBtn: {
    color: '#21412a',
    backgroundColor: 'transparent',
    border: '2px #21412a solid',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#21412a',
      color: 'white'
    }
  },
  listStyles: {
    display: 'flex',
    margin: 0
  },
  listLi: {
    margin: '0 8px'
  },
  col1: {
    display: 'flex'
  },
  col2: {
    flex: 1
  },
  col2Top: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuList: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    listStyleType: 'none',
    margin: 0
  },
  ulLink: {
    textDecoration: 'none',
    paddingBottom: '6px'
  },
  searchOpen: {
    transition: 'all .5s',
    width: '128px',
    marginBottom: '6px'
  },
  searchClosed: {
    transition: 'all .5s',
    width: '0px',
    marginBottom: '6px'
  },
  searchInput: {
    '&:after': {
      backgroundColor: '#998643'
    }
  },
  language: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '0.5rem',
  }
})

export default withStyles(styles)(withTranslation()(ButtonAppBar))
