import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { Link as GatsbyLink } from "gatsby";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon
} from "react-share";

const styles = theme => ({
  root: {
    flex: 0,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: theme.spacing.unit,
    flexWrap: "wrap",
    backgroundColor: "#70A999",
    color: "white"
  },
  socialIcons: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    cursor: "pointer"
  },
  footerLinks: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
});

class FooterNew extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.footerLinks}>
          {this.props.links.map(({ item: footerLinks }) => (
            <div key={footerLinks.title}>
              {!footerLinks.newwindow && (
                <Button
                  color="inherit"
                  to={footerLinks.url}
                  component={GatsbyLink}
                  className={classes.button}
                >
                  {footerLinks.title}
                </Button>
              )}
              {footerLinks.newwindow && (
                <Button
                  color="inherit"
                  href={footerLinks.url}
                  target="_new"
                  className={classes.button}
                >
                  {footerLinks.title}
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className={classes.socialIcons}>
          Share
          <TwitterShareButton
            url={this.props.url}
            title={this.props.title}
            via="_finiteloop"
            hashtags={[this.props.hashTag]}
          >
            <TwitterIcon round size={48} />
          </TwitterShareButton>
          <LinkedinShareButton url={this.props.url} title={this.props.title}>
            <LinkedinIcon round size={48} />
          </LinkedinShareButton>
          <EmailShareButton
            url={this.props.url}
            subject={"Enquire about " + this.props.title}
          >
            <EmailIcon round size={48} />
          </EmailShareButton>
          <FacebookShareButton
            url={this.props.url}
            quote={this.props.title}
            hashtag={"#" + this.props.hashTag}
          >
            <FacebookIcon round size={48} />
          </FacebookShareButton>
          <WhatsappShareButton url={this.props.url} title={this.props.title}>
            <WhatsappIcon round size={48} />
          </WhatsappShareButton>
        </div>
      </div>
    );
  }
}

FooterNew.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FooterNew);
