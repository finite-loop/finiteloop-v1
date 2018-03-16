import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from "material-ui/Button";
import { navigateTo } from "gatsby-link";
import Helmet from 'react-helmet'

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';

import Keys from '../../config/APIKeys';

import { compose, withProps, withStateHandlers } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";

const styles = theme => ({
    root: {
        marginLeft: '20px',
        marginRight: '20px',
    },
    container: {
        display: 'flex',
        flex: 1,
        marginTop: '10px',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingTop: '20px',
    },
    form: {
        width: 600,
    },
    submit: {
        display: 'flex',
        margin: "3em 0",
        alignItems: 'center',
        color: 'white',
    },
    multilineInput: {
        lineHeight: 1.4,
        fontSize: "1.2em",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    singleLineInput: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 600,
        lineHeight: 1.4,
        fontSize: "1.2em",
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    submitError: {
        background: "red",
        color: "white"
    },
    maps: {
        width: '800px',
    },
});

const MapWithAMakredInfoWindow = compose(
    withStateHandlers(() => ({
        isOpen: true,
    }), {
            onToggleOpen: ({ isOpen }) => () => ({
                isOpen: !isOpen,
            })
        }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.contactData.map.center.lat, lng: props.contactData.map.center.long }}
    >
        <Marker
            position={{ lat: props.contactData.map.position.lat, lng: props.contactData.map.position.long }}
            onClick={props.onToggleOpen}
        >
            {props.isOpen &&
                <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>
                        <Typography component="h3" variant="headline" style={{
                            color: '#70A999',
                        }}>
                            {props.siteTitle}
                        </Typography>
                        <Divider style={{ backgroundColor: '#70A999', marginTop: '5px' }} />
                        <Typography component="span" variant="body1">
                            {props.contactData.address1}<br />
                            {props.contactData.address2}<br />
                            {props.contactData.cityPIN}, {props.contactData.stateCountry}<br />
                            {props.contactData.phone} | {props.contactData.email}
                        </Typography>
                    </div>
                </InfoWindow>}
        </Marker>
    </GoogleMap>
);

const GoogleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=" + Keys.googleMapsAPIKey + "&v=3.exp&libraries=geometry,drawing,places";

function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}

class ContactForm extends React.Component {
    state = {
        open: false,
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        company: "",
        submitError: "",
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    };

    handleNetworkError = e => {
        this.setState({ submitError: "There was a network error." });
    };

    handleSubmit = (e, state) => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "Contact", ...this.state })
        })
            .then(() => {
                console.log("Form submission success");
                this.setState({ open: true, ...state });
            })
            .catch(error => {
                console.error("Form submission error:", error);
                this.handleNetworkError();
            });

        e.preventDefault();
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { contactus, global } = this.props.data;
        const { open, email, firstname, lastname, message, company, submitError } = this.state;

        return (
            <div className={classes.root}>
                <Helmet title={global.frontmatter.siteTitle + " | " + contactus.frontmatter.title} />
                <Typography style={{ lineHeight: 1.5, letterSpacing: 1.25, textAlign: 'center' }} variant="headline" component="h1">
                    {contactus.frontmatter.heading}
                </Typography>
                <Typography style={{ lineHeight: 1.5, letterSpacing: 1.25, textAlign: 'center' }} variant="subheading" component="h2">
                    {contactus.frontmatter.subheading}
                </Typography>
                <div className={classes.container}>
                    <ValidatorForm
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                        name="Contact"
                        ref={f => (this.form = f)}
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        className={classes.form}
                    >
                        {submitError && <p className={classes.submitError}>{submitError}</p>}
                        <TextValidator
                            id="firstname"
                            name="firstname"
                            label="First Name"
                            value={firstname}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            fullWidth
                            margin="normal"
                            className={classes.singleLineInput}
                        />
                        <TextValidator
                            id="lastname"
                            name="lastname"
                            label="Last Name"
                            value={lastname}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            fullWidth
                            margin="normal"
                            className={classes.singleLineInput}
                        />
                        <TextValidator
                            id="email"
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={this.handleChange}
                            validators={["required", "isEmail"]}
                            errorMessages={["This field is required", "E-mail is not valid"]}
                            fullWidth
                            margin="normal"
                            className={classes.singleLineInput}
                        />
                        <TextValidator
                            id="company"
                            name="company"
                            label="Company Name"
                            value={company}
                            onChange={this.handleChange}
                            fullWidth
                            margin="normal"
                            className={classes.singleLineInput}
                        />
                        <TextValidator
                            id="message"
                            name="message"
                            label="Message"
                            value={message}
                            onChange={this.handleChange}
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            multiline
                            fullWidth
                            margin="normal"
                            className={classes.multilineInput}
                        />
                        <input name="bot-field" style={{ display: "none" }} />
                        <br />
                        <div style={{ alignItems: 'center' }}>
                            <Button
                                variant="raised"
                                color="primary"
                                size="large"
                                type="submit"
                                className={classes.submit}
                            >
                                Submit
                        </Button>
                        </div>
                    </ValidatorForm>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={open}
                        onClose={this.handleClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{contactus.frontmatter.submitMsg}</span>}
                    />
                    <div className={classes.maps}>
                        <MapWithAMakredInfoWindow
                            googleMapURL={GoogleMapsUrl}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            contactData={contactus.frontmatter}
                            siteTitle={global.frontmatter.siteTitle}
                        />
                    </div>
                </div >
            </div>
        );
    }
}

ContactForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactForm);


export const pageQuery = graphql`
  query ContactUsQuery($path: String!) {
    contactus: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        heading
        subheading
        title
        address1
        address2
        cityPIN
        stateCountry
        phone
        email
        submitMsg
        map{
            position{
                lat
                long
            }
            center{
                lat
                long
            }
        }
      }
    }
    global: markdownRemark(frontmatter: {templateKey: {eq: "global-settings"}}) {
        frontmatter {
          siteTitle
        }
      }
  }
`