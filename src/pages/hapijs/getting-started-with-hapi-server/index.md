---
title: Getting Started with Hapi Server.
date: '2019-10-25'
spoiler: এইখানে, আপনি একটি নতুন hapi server তৈরি করবেন। আপনার মেশিনে একটি নতুন প্রজেক্ট ফোল্ডার someproject তৈরি করুন যাতে প্রয়োজনীয় ফাইল থাকবে।
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: HapiJS
tags: 'JavaScript,NodeJs,HapiJs'
---

## আপনার প্রথম “Hello World” সার্ভার

এইখানে, আপনি একটি নতুন hapi server তৈরি করবেন। আপনার মেশিনে একটি নতুন প্রজেক্ট ফোল্ডার `someproject` তৈরি করুন যাতে প্রয়োজনীয় ফাইল থাকবে।


আপনি যদি `linux` অথবা `mac` user হন তাহলে terminal open (`hit:`<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd>) করে নিচের command টি run করেন। command টি run করলে current directory তে একটা নতুন folder `someproject` তৈরী করবে এবং current directory change করে `someproject` directory তে চলে যাবে।
```bash
$ mkdir someproject && cd someproject
```

**project এর dependency install করার জন্যে আমরা [NPM] (node package manager) use করবো যাতে সহজে dependency গুলা install করা যাই।**

এখন, `npm init` run করতে হবে। এই command run করলে কিছু information চাইবে আমরা default information রেখেই করতে পারি পরে ইচ্ছা হলে change করা যাবে `package.json` থেকে। 
```bash
$ npm init -y # Generate it without having it ask any questions
```

এখন আপনার project folder এ `package.json` add হয়ে গেছে, আপনি এখন project dependency অ্যাড করতে পারবেন। তাহলে hapi project dependency তে অ্যাড করি এবং `package.json` এ project dependency হিসাবে save করে রাখি।

```bash
$ npm install @hapi/hapi -S # saving hapi as a dependency by adding -S to npm i
```

## বেসিক hapi সার্ভার

নীচে code snippet এ একটি খুব basic server দেখানো হয়েছে। প্রথমত, আপনাকে hapi module `require` করতে হবে এবং একটি নতুন `Hapi.Server()` শুরু করতে হবে। এরপরে, `Server` এর `server options` হিসাবে `host` এবং `port` বলে দিতে হবে ।


এইখানে, [IIFE] এর মধ্যে server run করার code লিখেছি। 

```js{10,11}
// server.js

const Hapi = require('@hapi/hapi');

(async () => {  
  // start your server
  try {
    // create a server with a host and port
    const server = new Hapi.Server({  
      host: 'localhost',
      port: 3000
    });

    await server.start();
    console.log('Server running at: ', server.info.uri);
  }catch (err) {
    console.error(err);
  }
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

server run হওয়ার পর একটা route দরকার যেখানে request করলে "Hello World" লেখাটা response হিসাবে পাবো। 

```js{1,5}
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello World!';
  }
});
```

`server.js` file এ route টা add করলে code দেখতে নিচের কোডের মতো হবে। 

```js{14,15,16,17,18,19,20,21}
// server.js

const Hapi = require('@hapi/hapi');

(async () => {  
  // start your server
  try {
    // create a server with a host and port
    const server = new Hapi.Server({  
      host: 'localhost',
      port: 3000
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        // business logic
        return 'Hello World!';
      }
    });

    await server.start();
    console.log('Server running at: ', server.info.uri);
  }catch (err) {
    console.error(err);
  }
})(); // IIFE
```
এখন, code `server.js` file এ save করে run করার পর [localhost:3000](localhost:3000) এ request করলে response এ `Hello World!` লেখা পাওয়া যাবে।

এইখানে `method` property যেকোনো valid [HTTP] method হতে পারে, method একটা array of method ও হতে পারে (`e.g: ['GET', 'POST']`)। `path` property define করে [endpoint URL] এই route এর যেখানে request করবেন । আর আপনার route এর main business logic গুলা handler এর মধ্যে লিখতে হবে। handler এ অবশ্যই return করতে হবে তা না হলে error দিবে। 

## Run the server

project folder এ গিয়ে terminal open করে নিচের command টি run করলে server start হবে। 

```bash
$ node server.js
```

অসাধারণ 🎉, আপনি আপনার প্রথম hapi server তৈরি করেছেন 😍!

See The [Full Code]

[HTTP]: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods>
[endpoint URL]: <https://stackoverflow.com/a/18768849/3290456>
[NPM]: <https://www.npmjs.com/>
[IIFE]: <https://developer.mozilla.org/en-US/docs/Glossary/IIFE>
[Full Code]: <https://gist.github.com/Prosen-Ghosh/2d27eb4f6913032be2b3578092187841>