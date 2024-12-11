import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const Footer = ({ classes }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Grid container className={classes.subFooter}>
        {/* Logo & Program Studi */}
        <Grid item xs={12} sm={6} md={3}>
          <div className={classes.rootImage}>
            <img
              src="./assets/images/logo-polinema-footer.png"
              alt="Polinema"
              style={{ marginBottom: 20, width: "100%" }}
            />
          </div>
        </Grid>

        {/* Program Studi Links */}
        <Grid item xs={12} sm={6} md={3}>
          <div className="menu-footer-program-studi-container">
            <ul className="menu" style={{ padding: 0, listStyleType: "none" }}>
              <a style={{ color: "white" }}>{t("Program.label")}</a>
              <br />
              <li>
                <a href="/otomotif" style={{ color: "white" }}>
                  {t("Item1.label")}
                </a>
              </li>
              <li>
                <a href="/teknologi_sipil" style={{ color: "white" }}>
                  {t("Item2.label")}
                </a>
              </li>
              <li>
                <a href="/akuntansi" style={{ color: "white" }}>
                  {t("Item3.label")}
                </a>
              </li>
              <li>
                <a href="/teknologi_informasi" style={{ color: "white" }}>
                  {t("Item4.label")}
                </a>
              </li>
            </ul>
          </div>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12} sm={6} md={3}>
          <ul
            className="menu"
            style={{
              padding: 0,
              listStyleType: "none",
              display: "flex",
              gap: "10px",
            }}
          >
            <a href="https://wa.link/wuglb5">
              <img src="/assets/images/whatsapp.png" width="30" alt="Icon" />
            </a>
            <a href="https://www.facebook.com/aknlumajang.ID/?locale=id_ID">
              <img src="./assets/images/fb.png" width="40" alt="Icon" />
            </a>
            <a href="https://www.instagram.com/polinema.lumajang.official/">
              <img src="./assets/images/ig.png" width="30" alt="Icon" />
            </a>
          </ul>
        </Grid>

        {/* Additional Info */}
        <Grid item xs={12} sm={6} md={3}>
          <ul className="menu" style={{ padding: 0, listStyleType: "none" }}>
            <a style={{ color: "white" }}>
              {t("Pro1.label")}
              <br />
              {t("Pro2.label")}
              <br />
              {t("Pro3.label")}
              <br />
              {t("Pro4.label")}
            </a>
            <br />
            <a style={{ color: "white" }}>
              {t("alamat1.label")}
              <br />
              {t("alamat2.label")}
            </a>
          </ul>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Grid className={classes.subFooter1} item xs={12}>
        <div className={classes.rootImage}>
          <Typography
            className={classes.white}
            variant="subheading"
            component={"span"}
            style={{ fontSize: 14, textAlign: "center" }}
          >
            © {currentYear} by PSDKU POLITEKNIK NEGERI MALANG DI KABUPATEN
            LUMAJANG. All rights reserved.
          </Typography>
        </div>
      </Grid>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    backgroundColor: "#051d47",
    paddingTop: "16px",
    overflowX: "hidden",
    paddingBottom: "20px", // Add padding at the bottom for better spacing
  },
  subFooter: {
    backgroundColor: "#051d47",
    padding: "8px 16px",
    marginTop: "8px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subFooter1: {
    backgroundColor: "#051d47",
    padding: "8px 16px",
    marginTop: "8px",
    display: "flex",
    justifyContent: "center", // Centered text for small screens
    flexDirection: "column",
    alignItems: "center",
  },
  white: {
    color: "#ffffff",
  },
  rootImage: {
    textAlign: "center", // Center image for smaller screens
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
});

export default withStyles(styles)(Footer);
