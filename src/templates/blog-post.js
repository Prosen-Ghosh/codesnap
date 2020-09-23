import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import { rhythm, scale } from '../utils/typography';
import '../fonts/fonts-post.css';
import Badge from '../components/Badge';
const GITHUB_USERNAME = 'Prosen-Ghosh';
const GITHUB_REPO_NAME = 'codesnap';
const SITE_NAME = 'https://prosen-ghosh.github.io/codesnap';
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext;

    let html = post.html;
    const gitHub = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}`;
    const twitterShareContent = `text=${siteTitle}:: ${
      post.frontmatter.title
    } by @${post.frontmatter.twitter}&url=${SITE_NAME}${
      post.fields.slug
    }&hashtags=${post.frontmatter.tags}&related=${'Programming,Blog'}`;

    const tags = post.frontmatter.tags || '';
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          author={post.frontmatter.author}
          authorTwitter={post.frontmatter.twitter}
          slug={post.fields.slug}
        />
        <main>
          <article>
            <header>
              <h1 style={{ color: 'var(--textTitle)' }}>
                {post.frontmatter.title}
              </h1>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(1),
                  marginTop: rhythm(-4 / 5),
                }}
              >
                {formatPostDate(post.frontmatter.date)}
                {` • ${formatReadingTime(post.timeToRead)}`}
                {` • `}
                <Badge data={tags ? tags.split(',') : []} />
              </p>
            </header>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <footer>
              <p
                style={{
                  marginBottom: '0px',
                  fontSize: '13px',
                  display: 'flex',
                }}
              >
                {/* <a
                  style={{ color: '#86ddf9' }}
                  href={`${gitHub}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss on Github
                </a> */}
                {` • `}
                <a
                  style={{ color: '#86ddf9' }}
                  href={`${gitHub}/tree/master/src/pages${post.fields.slug}index.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Edit on GitHub
                </a>
                {/* <span>Share this post on</span> */}
                <span style={{ marginLeft: rhythm(1 / 4) }}>
                  <iframe
                    src={`https://www.facebook.com/plugins/share_button.php?href=${`${SITE_NAME}/${post.fields.slug}`}&layout=button_count&size=small&width=88&height=20&appId`}
                    width="88"
                    height="20"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allow="encrypted-media"
                  ></iframe>
                </span>
                <span>
                  <a
                    className="twitter-share-button"
                    target="_blank"
                    href={`https://twitter.com/intent/tweet?${twitterShareContent}`}
                  >
                    Tweet
                  </a>
                </span>
              </p>
            </footer>
          </article>
        </main>
        <aside>
          <div
            style={{
              margin: '90px 0 40px 0',
              fontFamily: systemFont,
            }}
          ></div>
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              marginTop: rhythm(0.25),
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'var(--blue)',
              }}
              to={'/'}
            >
              Codesnap
            </Link>
          </h3>
          <aside>
            <Bio
              author={post.frontmatter.author}
              url={post.frontmatter.twitter}
              occupation={post.frontmatter.occupation}
              avatar={post.frontmatter.avatar}
              twitter={post.frontmatter.twitter}
              gitHub={post.frontmatter.gitHub}
              stackOverflow={post.frontmatter.stackOverflow}
              linkedin={post.frontmatter.linkedin}
            />
          </aside>
          <nav>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li>
                {previous && (
                  <Link
                    to={previous.fields.slug}
                    rel="prev"
                    style={{ marginRight: 20 }}
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </aside>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
        author
        occupation
        avatar
        twitter
        gitHub
        stackOverflow
        linkedin
        tags
      }
      fields {
        slug
      }
    }
  }
`;
