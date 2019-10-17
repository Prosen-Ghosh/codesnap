import javascript from '../assets/logos/javascript.svg';
import python from '../assets/logos/python.svg';
import apollo from '../assets/logos/apollo.svg';
import graphql from '../assets/logos/graphql.svg';
import react from '../assets/logos/react.svg';
import vue from '../assets/logos/vue.svg';
import graphene from '../assets/logos/graphene.svg';
import nodejs from '../assets/logos/nodejs.svg';
import redis from '../assets/logos/redis.svg';
import mongodb from '../assets/logos/mongodb.svg';
import mysql from '../assets/logos/mysql.svg';

export function formatReadingTime(minutes) {
  let cups = Math.round(minutes / 5);
  let bowls = 0;
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [{ day: 'numeric', month: 'long', year: 'numeric' }];
  return date.toLocaleDateString(...args);
}

export function getCategoryLogos() {
  return {
    javascript,
    python,
    apollo,
    graphql,
    react,
    vue,
    graphene,
    nodejs,
    redis,
    mongodb,
    mysql,
  };
}
