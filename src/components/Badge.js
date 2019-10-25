import React from 'react';
import { rhythm } from '../utils/typography';

export default function Badge({ data }) {
  return data.map(v => {
    return (
      <span
        key={v}
        style={{
          backgroundColor: '#0000001f',
          padding: '1px 3px 1px 3px',
          margin: '3px 3px',
          borderRadius: '4px',
          color: '#0000008a',
          fontSize: rhythm(0.4),
          textAlign: 'center',
          lineHeight: 1.2,
          display: 'inline-block',
        }}
      >
        {v}
      </span>
    );
  });
}
