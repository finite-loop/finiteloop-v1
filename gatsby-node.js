const path = require("path");
const elasticlunr = require("elasticlunr");
const fs = require("fs");

var index = elasticlunr(function() {
  this.addField("title");
  this.addField("body");
});

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            html
            frontmatter {
              path
              templateKey
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }
    var id = 0;
    return fs.readFile("src/data/search-index.json", function(err, data) {
      if (err) throw err;

      var raw = JSON.parse(data);
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const pagePath = node.frontmatter.path;
        id = id + 1;
        if (
          node.frontmatter.templateKey != "global-settings" &&
          node.frontmatter.templateKey != "nav-links"
        ) {
          var doc = {
            id: id,
            title: node.frontmatter.title,
            body: node.html
          };
          index.removeDoc(doc);
          index.addDoc(doc);
          createPage({
            path: pagePath,
            component: path.resolve(
              `src/templates/${String(node.frontmatter.templateKey)}.js`
            ),
            // additional data can be passed via context
            context: {}
          });
        }
      });
      fs.writeFile(
        "src/data/search-index.json",
        JSON.stringify(index),
        function(err) {
          if (err) throw err;
          console.log("done");
        }
      );
    });
  });
};
