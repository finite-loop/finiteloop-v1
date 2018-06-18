import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery } from "gatsby";
import withRoot from "../withRoot";

import withWidth from "@material-ui/core/withWidth";
import Hidden from "@material-ui/core/Hidden";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "../components/Navbar";

import "../layouts/global.sass";
import FooterNew from "../components/footerNew";

const TemplateWrapper = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SettingsQuery {
          global: markdownRemark(
            frontmatter: { templateKey: { eq: "global-settings" } }
          ) {
            frontmatter {
              logo
              logoTitle
              templateKey
              siteUrl
              siteTitle
              siteDescription
              socialMediaCard {
                hashTag
                twtrUrl
                lnkdnUrl
                githubUrl
              }
            }
          }
          links: markdownRemark(
            frontmatter: { templateKey: { eq: "nav-links" } }
          ) {
            frontmatter {
              headerlinks {
                item {
                  title
                  url
                  newwindow
                }
              }
              footerlinks {
                item {
                  title
                  url
                  newwindow
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <CssBaseline />
          <Helmet title={data.global.frontmatter.siteTitle} />
          <Hidden implementation="css">
            <Navbar
              title={data.global.frontmatter.logoTitle}
              logo={data.global.frontmatter.logo}
              social={data.global.frontmatter.socialMediaCard}
              links={data.links.frontmatter.headerlinks}
            />
            <div style={{ marginTop: "90px" }}>{children}</div>
          </Hidden>
          <Hidden mdDown implementation="css">
            <FooterNew
              url={data.global.frontmatter.siteUrl}
              title={data.global.frontmatter.siteTitle}
              hashTag={data.global.frontmatter.socialMediaCard.hashTag}
              links={data.links.frontmatter.footerlinks}
            />
          </Hidden>
          <Hidden lgUp implementation="css">
            <FooterNew
              url={data.global.frontmatter.siteUrl}
              title={data.global.frontmatter.siteTitle}
              hashTag={data.global.frontmatter.socialMediaCard.hashTag}
              links={data.links.frontmatter.footerlinks}
            />
            {
              //<BottomBar logo={data.global.frontmatter.logo} />
            }
          </Hidden>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.any
};

export default (withWidth(), withRoot(TemplateWrapper));

// export const query = graphql`
//   query SettingsQuery {
//     global: markdownRemark(
//       frontmatter: { templateKey: { eq: "global-settings" } }
//     ) {
//       frontmatter {
//         logo
//         logoTitle
//         templateKey
//         siteUrl
//         siteTitle
//         siteDescription
//         socialMediaCard {
//           hashTag
//           twtrUrl
//           lnkdnUrl
//           githubUrl
//         }
//       }
//     }
//     links: markdownRemark(frontmatter: { templateKey: { eq: "nav-links" } }) {
//       frontmatter {
//         headerlinks {
//           item {
//             title
//             url
//             newwindow
//           }
//         }
//         footerlinks {
//           item {
//             title
//             url
//             newwindow
//           }
//         }
//       }
//     }
//   }
// `;
