import React from 'react';
import Layout from '../components/Layout';
import get from 'lodash/get';
import { Link } from 'gatsby';

export default class NotFoundPage extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    return (
      <Layout
        className="error"
        location={this.props.location}
        title={siteTitle}
      >
        <main>
          <div class="noise"></div>
          <div class="overlay"></div>
          <div class="terminal">
            <h1 style={{ color: 'var(--textTitle)' }}>
              [<code>404</code>] Page Not Found
            </h1>
            <p>
              আপনি যে পেজটির সন্ধান করছেন সেটি সম্ভবত রিমুভ করা হয়েছে, এর নাম
              পরিবর্তন হয়েছে বা অস্থায়ীভাবে বন্ধ রাখা হয়েছে।
            </p>
            <p>
              হোমপেজে <Link to={'/'}>ফিরে যাওয়ার চেষ্টা করুন।</Link>
            </p>
          </div>
        </main>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;
