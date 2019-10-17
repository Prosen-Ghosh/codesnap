import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { Card, Avatar, Row, Col, Layout as antLayout } from 'antd';
import _ from 'lodash';
import Layout from '../components/Layout';
import { rhythm } from '../utils/typography';
import { getCategoryLogos } from '../utils/helpers';
import '../fonts/fonts-post.css';

const { Meta } = Card;
const { Content } = antLayout;
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
        <Content>
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
          <Row gutter={12} type="flex" justify="space-between" align="middle">
            {[...allTopic]
              .filter(v => v)
              .map(v => {
                return (
                  <Col
                    style={{ marginTop: rhythm(1) }}
                    xs={{ span: 12 }}
                    sm={{ span: 12 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    key={v}
                  >
                    <Link to={v.toLowerCase()}>
                      <Card hoverable>
                        <Meta
                          avatar={
                            <Avatar
                              alt={v.toLowerCase()}
                              src={categoryLogo[v.toLowerCase()]}
                              size={32}
                            />
                          }
                          title={v}
                          // description={v}
                        />
                      </Card>
                    </Link>
                  </Col>
                );
              })}
          </Row>
        </Content>
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
