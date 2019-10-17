import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import _ from 'lodash';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';
import { getCategoryLogos } from '../utils/helpers';
import '../fonts/fonts-post.css';
const GITHUB_USERNAME = 'Prosen-Ghosh';
const GITHUB_REPO_NAME = 'codesnap.io';

export default class Topic extends React.Component {
  render() {
    const { previous, next, category } = this.props.pageContext;
    const topic = get(this, 'props.data.allMarkdownRemark.edges');
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    const allTopic = _.reduce(
      topic,
      (result, post) => {
        result.add(post.node.frontmatter.category);
        return result;
      },
      new Set()
    );
    const categoryLogo = getCategoryLogos();
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h2
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: rhythm(1),
            color: 'var(--textTitle)',
            fontWeight: 900,
          }}
        >
          Browse by Technology
        </h2>
        {[...allTopic]
          .filter(v => v)
          .map(v => {
            return (
              <Link to={v.toLowerCase()} className="nounderline">
                <button className="show-card nounderline">
                  <img
                    alt={v.toLowerCase()}
                    src={categoryLogo[v.toLowerCase()]}
                  />
                  {v}
                </button>
              </Link>
            );
          })}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query($catagory: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $catagory } } }
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
`;
