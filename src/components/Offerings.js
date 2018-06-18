import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { Link } from "gatsby";

export const OfferingsPageTemplate = ({ props, offering }) => {
  const { classes } = props;

  const isAlignLeft = offering.frontmatter.align === "left";
  return (
    <div style={{ background: "white" }}>
      {isAlignLeft && (
        <div name="offering" className={classes.offeringsSectionLeft}>
          <div className={classes.offeringLeft}>
            <img
              alt={offering.frontmatter.title}
              src={offering.frontmatter.image}
            />
          </div>
          <div className={classes.offeringRight}>
            <Typography component="h2" className={classes.title1}>
              {offering.frontmatter.title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              className={classes.offeringBody1}
            >
              {offering.excerpt}
            </Typography>
            <Button
              variant="flat"
              color="primary"
              to={offering.frontmatter.path}
              component={Link}
              style={{ float: "right" }}
              className={classes.button}
            >
              MORE
              <KeyboardArrowRight />
            </Button>
          </div>
        </div>
      )}
      {!isAlignLeft && (
        <div name="offering" className={classes.offeringsSectionRight}>
          <div className={classes.offeringRight}>
            <Typography component="h2" className={classes.title1}>
              {offering.frontmatter.title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              className={classes.offeringBody1}
            >
              {offering.excerpt}
            </Typography>
            <Button
              variant="flat"
              color="primary"
              to={offering.frontmatter.path}
              component={Link}
              style={{ float: "right" }}
              className={classes.button}
            >
              MORE
              <KeyboardArrowRight />
            </Button>
          </div>
          <div className={classes.offeringLeft}>
            <img
              src={offering.frontmatter.image}
              alt={offering.frontmatter.title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Offerrings = ({ offeringsData }) => {
  const { edges: offerings } = offeringsData.data.Offerings;
  return (
    <section name="offerings">
      {offerings
        .sort(compare)
        .map(({ node }) => (
          <OfferingsPageTemplate
            key={node.frontmatter.title}
            props={offeringsData}
            offering={node}
          />
        ))}
    </section>
  );
};

function compare(a, b) {
  const genreA = a.node.frontmatter.order;
  const genreB = b.node.frontmatter.order;

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

export default Offerrings;
