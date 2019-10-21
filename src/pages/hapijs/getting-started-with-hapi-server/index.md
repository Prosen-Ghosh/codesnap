---
title: Getting Started with Hapi Server.
date: '2019-10-22'
spoiler: এইখানে, আপনি একটি নতুন হাপি সার্ভার তৈরি করবেন। আপনার মেশিনে একটি নতুন প্রজেক্ট ফোল্ডার someproject তৈরি করুন যাতে প্রয়োজনীয় ফাইল থাকবে।
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: HapiJS
---

## আপনার প্রথম “Hello World” সার্ভার

এইখানে, আপনি একটি নতুন hapi server তৈরি করবেন। আপনার মেশিনে একটি নতুন প্রজেক্ট ফোল্ডার `someproject` তৈরি করুন যাতে প্রয়োজনীয় ফাইল থাকবে।


আপনি যদি `linux` অথবা `mac` user হন তাহলে terminal open করে নিচের command টি run করেন। command টি run করলে current directory তে একটা নতুন folder `someproject` তৈরী করবে এবং current directory change করে `someproject` directory তে চলে যাবে।
```bash
$ mkdir someproject && cd someproject
```

**project এর dependency install করার জন্যে আমরা NPM package manager use করবো যাতে সহজে dependency গুলা install করা যাই।**

এখন, `npm init` run করতে হবে। এই command run করলে কিছু information চাইবে আমরা default information রেখেই করতে পারি পরে ইচ্ছা হলে change করা যাবে `package.json` থেকে। 
```bash
$ npm init -y # Generate it without having it ask any questions
```

এখন আপনার project folder এ `package.json` add হয়ে গেছে, আপনি এখন project dependency অ্যাড করতে পারবেন। তাহলে hapi project dependency তে অ্যাড করি এবং `package.json` এ project dependency হিসাবে save করে রাখি।

```bash
$ npm i hapi -S # saving hapi as a dependency by adding -S to npm i
```

## বেসিক hapi সার্ভার

নীচে code snippet এ একটি খুব basic server দেখানো হয়েছে। প্রথমত, আপনাকে hapi module `require` করতে হবে এবং একটি নতুন `Hapi.Server()` শুরু করতে হবে। এরপরে, `Server` এর `server options` হিসাবে `host` এবং `port` বলে দিতে হবে ।

```js{7,8}
// server.js

const Hapi = require('hapi');

// create a server with a host and port
const server = new Hapi.Server({  
  host: 'localhost',
  port: 3000
});

(async () => {  
  // start your server
  try {
    await server.start();
  }catch (err) {
    console.error(err);
  }
  console.log('Server running at: ', server.info.uri);
})(); // IIFE
```
প্রকৃতপক্ষে, এটি একটি খুব basic hapi server। `server.js` নামে একটি file create করুন এবং কোড ওই file এ লিখুন।
```markdown
# file stracture

|-- node_modules
|-- package.json
|-- server.js
```
## Hello World Route

