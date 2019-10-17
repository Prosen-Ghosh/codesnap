const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const topicIndex = path.resolve('./src/templates/topic-index.js');
  const blogIndex = path.resolve('./src/templates/blog-index.js');
  const post = path.resolve('./src/templates/blog-post.js');
  return new Promise((resolve, reject) => {
    createPage({
      path: '/',
      component: topicIndex,
      // context: {
      //   category: 'JavaScript'
      // }
    });

    resolve(
      graphql(`
        {
          allMarkdownRemark(
            sort: { fields: frontmatter___category, order: ASC }
          ) {
            edges {
              node {
                frontmatter {
                  category
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(res => {
        if (res.errors) {
          return reject(res.errors);
        }
        const nodes = res.data.allMarkdownRemark.edges;
        const groupByCategory = _.groupBy(
          nodes,
          ({ node }) => node.frontmatter.category
        );
        // console.log("groupByCategory",JSON.stringify(groupByCategory, null, 4))
        Object.keys(groupByCategory).forEach(key => {
          createPage({
            path: key.toLowerCase(),
            component: blogIndex,
            context: {
              category: key,
              // previous,
              // next
            },
          });

          groupByCategory[key].forEach(({ node }) => {
            createPage({
              path: node.fields.slug,
              component: post,
              context: {
                slug: node.fields.slug,
                // previous,
                // next
              },
            });
          });
        });
      })
    );
  });
};

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;

//   if (_.get(node, 'internal.type') === `MarkdownRemark`) {
//     createNodeField({
//       node,
//       name: 'directoryName',
//       value: path.basename(path.dirname(_.get(node, 'fileAbsolutePath'))),
//     });
//   }
// };
