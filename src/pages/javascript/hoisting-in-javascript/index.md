---
title: Hoisting in JavaScript
date: '2019-10-30'
spoiler: Hoisting একটি JavaScript mechanism যেখানে code execution করার আগে variable এবং function declarations তাদের scope এ সবার উপরে নিয়ে যাওয়া হয়।
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: JavaScript
tags: 'JavaScript,Hoisting'
---

## Undefined vs ReferenceError

Hoisting নিয়ে কিছু বলার আগে আমরা কিছু ছোট ছোট code দেখবো এবং output guess করবো। 

```js
// Global Scope

console.log(guess); // ??
```

যদি আপনি `ReferenceError` guess করে থাকেন তাহলে ঠিক আছে, যেহেতু `guess` নামে কোন variable declare করা হয়নি সেহেতু `ReferenceError` দিবে। এবার নিচের code টা guess করবো। 

```js
// Global Scope

console.log(guess); // ??
var guess;
```
আবার ও যদি আপনি `ReferenceError` guess করে থাকেন তাহলে ভুল। একটু পরে বলছি কেন ভুল। আর একটা কোড দেখি...

```js
guess = 28;
function localScope(){
    // local scope
    console.log(guess); // ??
    var guess;
}
localScope();
```
এই কোড টা থেকে কি আউটপুট এক্সপেক্ট করেছিলেন? **`28`**?? যদি করে থাকেন তাহলে ও আপনি ভুল। 

<p align="center">
  <img src="./giphy.gif" alt="giphy.gif" />
</p>

## Hoisting কি?

Hoisting একটি JavaScript mechanism যেখানে code execution করার আগে variable এবং function declarations তাদের [scope] এ সবার উপরে নিয়ে যাওয়া হয়। আরো ভালো ভাবে বলতে গেলে শুধু মাত্র declaration part টুকু ওই scope এ সবার উপরে চলে যাবে কিন্তু assignment part টুকু ওই জায়গাতেই থাকবে যেখানে variable কে assign করা হয়েছে। 

এই কাজ টা আপনি না করলে ও JavaScript engine করে নেই, কিন্তু good practice হচ্ছে variable অথবা function আগে declare করে তার পর use করা। 

## Variables Hoisting (ভেরিএবলেস হইস্টিং)

উপরের code গুলা যদি JavaScript এর এই mechanism follow করে লিখি তাইলে কোড গুলা দেখতে নিচের code গুলার মতো হবে। 

```js{3}
// Global Scope

var guess;
console.log(guess); // "undefined"
```
এবং 

```js{6}
// Global Scope

guess = 28;
function localScope(){
    // local scope
    var guess;
    console.log(guess); // "undefined"
}
localScope();
```

variable যে host হয়েছে এইটা নিচের এই code টা ভালো ভাবে লক্ষ্য করলে দেখা যাবে global scope এ একটা variable `guess` এর assignment আছে (`guess = 28;`), আবার local scope এর মধ্যে `guess` variable এর  declaration আছে (` var guess;`)।  যেহেতু local scope এ declaration আছে সেহেতু `console.log` ওই scope এর variable-ই আগে পাবে এবং `guess` variable এর referance খোঁজা বন্ধ করে দিবে এবং console এ `"undefined"` print করবে। 


যদি কোনো variable এর declaration না থাকে, কিন্তু assignment আছে তাহলে সেটা global scope এ declare হয়। 

```js
// Glocal Scope
function isHoisted() {
    a = 20;
}
isHoisted();

console.log(a); // ??
```
বেপার টা আরো ভালো ভাবে বোঝার জন্যে আমরা local scope এর মধ্যে আরো একটা local scope তৈরী করবো এবং **`a`** কে ওই local scope এ `20` assign করবো। 

```js
// Glocal Scope
function isHoisted() {
    function innerLocalScope(){
        a = 20;
    }
    innerLocalScope()
}
isHoisted();

console.log(a); // 20
```

তাহলে এখন guess করে বলতে হবে নিচের code এর first `console.log` এ কি print হবে?

```js{8}
// Glocal Scope
function isHoisted() {
    function innerLocalScope(){
        a = 20;
    }
    innerLocalScope()
}
console.log(a); // ??
isHoisted();

console.log(a);
```

আমি জানি আপনি ঠিক ধরেছেন এইটা `ReferenceError` হবে কারণ function কে invoke করার আগে `console.log` দেয়া ছিল, যেহেতু function invoke হয়নি সেহেতু assignment ও হয়নি আর এইকারণে engine এর global scope এ **`a`** কে declare ও করতে হয়নি আর আপনি `console.log` এ `ReferenceError` পেয়েছেন। 

**`let` আর `const` block scoped** এই ২টা keyword দিয়ে variable declare করলে ওই variable hoist হয় না। `const` এর ক্ষত্রে তো declaration আর assignment একসাথেই হতে হবে তা না হলে error দেবে। এই ২ টা বেপার code লিখে দেখি। 

**`let`**
```js
console.log(a); // ReferenceError
let a = 10;
```

**`const`**
```js
const a; // SyntaxError
console.log(a);
a = 10;
```

## Functions Hoisting (ফাঙ্কশনস হইস্টিং)

আমরা যদি JavaScript এর function কে ২ ভাগে ভাগ করি সেটা হবে:

    - Function declarations
    - Function expressions

Function declarations hoisted কিন্তু function expressions hoisted না। আমরা ২ টার code করে দেখবো কি ভাবে বেপারটা হয়। 

```js{1}
callMe(); // Hoisted

function callMe(){
    console.log("Hoisted");
}
```

এই function টা hoisted হওয়ার পর আসলে যেমন হবে। 

```js{4}
function callMe(){
    console.log("Hoisted");
}
callMe(); // Hoisted
```

আর একটা example দেখি function expressions নিয়ে। 

```js{1}
callMe(); // TypeError

var callMe = function (){
    console.log("Hoisted");
}
```

এই function টা hoisted হওয়ার পর আসলে যেমন হবে।

```js{1,4,5,6}
var callMe;
callMe(); // TypeError

callMe = function (){
    console.log("Hoisted");
}
```

## Variable vs Function Hoisting

    1. function declaration থেকে variable assignment এর precedence সব সময় বেশি হবে। 
    2. variable declaration এর থেকে function declaration এর precedence সব সময় বেশি হবে। 

```js{1}
var sum = 10;
function sum(){
	return 200;
}
console.log(typeof sum); // "number"
```

function declaration hoisted হয় variable declaration উপর কিন্তু variable assignment এর উপর হয় না। 

এখন নিচের code এর output টা ঠিকঠাক মতো guess করার চেষ্টা করি। 

```js{4,14}
var alpha = 'alpha';
var beta = 'beta';

log(); // ??

var log = function() {
    console.log(beta);
};

function log() {
    console.log(alpha);
}

log(); // ??
```

এই code টা hoisted হওয়ার পর আসলে যেমন হবে।

```js{9,15}
var alpha = 'alpha';
var beta = 'beta';

function log() {
    console.log(alpha);
}

var log; // ignored because log is already defined
log(); // alpha

log = function() {
    console.log(beta);
};

log(); // beta
```

<p align="center">
  <img src="./tenor.gif" alt="tenor.gif" />
</p>

[scope]: </javascript/understanding-scope-in-javascript>