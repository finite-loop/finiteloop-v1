import React from "react";

import Card, { CardContent, CardMedia } from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { Link } from "gatsby";

export const CaseStudiesTemplate = ({ props, casestudy }) => {
  const { classes } = props;
  return (
    <div key={casestudy.title}>
      <Grid className="" xs item style={{ paddingBottom: "10px" }}>
        <Card className={classes.caseStudycard}>
          <CardMedia
            className={classes.caseStudymedia}
            image={casestudy.frontmatter.image}
            title={casestudy.frontmatter.title}
          />
          <CardContent className={classes.caseStudycontent}>
            <Typography
              style={{ color: "white" }}
              variant="subheading"
              component="p"
            >
              {casestudy.excerpt}
            </Typography>
            <Button
              variant="flat"
              color="inherit"
              to={casestudy.frontmatter.path}
              component={Link}
              style={{ color: "white" }}
              className={classes.button}
            >
              MORE
              <i className="material-icons">keyboard_arrow_right</i>
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

const CaseStudies = ({ caseStudiesData }) => {
  const { classes } = caseStudiesData;
  const { edges: casestudies } = caseStudiesData.data.Casestudies;
  return (
    <div>
      <Typography component="h1" className={classes.teamsTitle}>
        Some of our work
      </Typography>
      <div style={{ background: "white" }}>
        <Grid container spacing={0} className={classes.teams}>
          {casestudies
            .filter(casestudies => casestudies.node.frontmatter.homepage)
            .map(({ node: casestudy }) => (
              <CaseStudiesTemplate
                key={casestudy.frontmatter.title}
                props={caseStudiesData}
                casestudy={casestudy}
              />
            ))}
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            variant="flat"
            color="inherit"
            to="/case-studies"
            component={Link}
            style={{ color: "#70A999" }}
            className={classes.button}
          >
            See All Case Studies
            <i className="material-icons">keyboard_arrow_right</i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
