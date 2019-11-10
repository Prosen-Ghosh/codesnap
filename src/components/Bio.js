import React from 'react';
import Twitter from '../assets/twitter.svg';
import GitHub from '../assets/github.svg';
import StackOverflow from '../assets/stack-overflow.svg';
import Linkedin from '../assets/linkedin.svg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    const socials = [
      {
        image: Linkedin,
        profile: `https://www.linkedin.com/in/${this.props.linkedin}`,
      },
      {
        image: Twitter,
        profile: `https://twitter.com/${this.props.twitter}`,
      },
      {
        image: GitHub,
        profile: `https://github.com/${this.props.gitHub}`,
      },
      {
        image: StackOverflow,
        profile: `https://stackoverflow.com/users/${this.props.stackOverflow}`,
      },
    ];
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={`https://avatars.io/twitter/${this.props.twitter}`}
          alt={this.props.author || 'Unknown'}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(3),
            height: rhythm(3),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          <a
            className="nounderline"
            target="_blanck"
            href={`https://twitter.com/${this.props.url}`}
          >
            {this.props.author}
          </a>
          <br />
          <small>{this.props.occupation}</small>
          <br />
          {socials.map(social => (
            <a
              key={social.profile}
              className="nounderline"
              target="_blanck"
              href={social.profile}
            >
              <img
                src={social.image}
                style={{
                  marginRight: rhythm(1 / 2),
                  marginBottom: 0,
                  marginTop: rhythm(0.2),
                  width: rhythm(0.8),
                  height: rhythm(0.8),
                  cursor: 'pointer',
                }}
              />
            </a>
          ))}
        </p>
      </div>
    );
  }
}

export default Bio;
