---
title: What is scope?
date: '2019-10-25'
spoiler: মোটামুটি সব গুলা প্রোগ্রামিং ল্যাঙ্গুয়েজে কিছু fundamental paradigms আছে, scope তার মধ্যে একটা। Scope এর মাধ্যমে প্রোগ্রাম থেকে variables এবং functions এর কোথায় access বা visibility আছে আর কোথায় access বা visibility নাই এইটা বোঝা যাবে।
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: JavaScript
tags: 'JavaScript'
---

## Scope কি?

মোটামুটি সব গুলা প্রোগ্রামিং ল্যাঙ্গুয়েজে কিছু fundamental paradigms আছে, scope তার মধ্যে একটা। Scope এর মাধ্যমে প্রোগ্রাম থেকে variables এবং functions এর কোথায় access বা visibility আছে আর কোথায় access বা visibility নাই এইটা বোঝা যাবে। 

আর, কিভাবে এই scope কাজ করে এইটা বোঝা অনেক জরুরি। JavaScript এ ২ ধরণের scope আছে।

	- Global Scope (গ্লোবাল স্কোপ)
	- Local Scope (লোকাল স্কোপ)

## Global Scope(গ্লোবাল স্কোপ)

আপনি একটা ডকুমেন্ট open করে JavaScript code লেখা শুরু করেছেন মানে আপনি code টা global scope এ লিখছেন। NodeJs এর ক্ষেত্রে বেপার টা একটু অন্য রকম। NodeJs এর টপ লেবেল স্কোপ ব্রাউজার এর গ্লোবাল স্কোপ এর মতো না, এইটা শুধু মাত্র ওই module এর মধ্যে global। গ্লোবাল স্কোপ এ declare করা variables, functions কোডের যেকোনো জায়গা থেকে application এর লাইফ টাইম পর্যন্ত access করা যায়। 

ব্রাউজার থেকে [DevTools open] করে নিচের code টা গ্লোবাল স্কোপ এ অ্যাড করে দেখি। 

```js
var isGlobalVariable = true;
```
এখন ব্রাউজার এর global object `this` টা দেখলে আমাদের declare করা variable টা ওইখানে পাবো, যেটা সব খান থেকে accessible।

<p align="center">
  <img src="./global-this.gif" alt="global this" />
</p>


## তাহলে আমরা গ্লোবাল স্কোপ এ কখন ভ্যারিয়েবল ডিক্লেয়ার করতে পারি?

<p align="center">
  <img src="./we-do-not-do-that-here.gif" alt="we-do-not-do-that-here.gif" />
</p>
<!-- !["we-do-not-do-that-here.gif"](./we-do-not-do-that-here.gif) -->

Global scope এ আমরা কখনো variable declare করবো না, করলে অন্য developer এর declare করা variable এর সাথে collisions হতে পারে। 
> হাজার হাজার developer এর লক্ষ লক্ষ variable, collision হয়ে যেতেই পারে 😜। 


## Local Scope (লোকাল স্কোপ) 

যখনি আমরা global scope এর মধ্যে আর একটা নতুন scope তৈরী করবো ঐটা local scope হবে। local scope এর ভ্যারিয়েবল গুলা শুধু মাত্র ওই scope এ access করা যাবে, global scope কিংবা অন্য কোনো local scope এ ঐটা access করা যাবে না। 

```js{5}
function localScope(){
	var localVariable = true;
}
localScope(); // invoked at Global Scope
console.log(localVariable); // ReferenceError: localVariable is not defined
```

JavaScript এর প্রত্যেকটি ফাংশন এক একটা local scope তৈরি করে। আর ফাঙ্কশন এর কাজ শেষ হওয়ার পর এই লোকাল ভ্যারিয়েবল গুলা ডিলিট করে দেয়। 

```js{12,15}
function outerLocalScope(){
	var outerVariable = true;
	
	function innerLocalScope(){
		var innerVariable = true;
		console.log("Inside innerLocalScope: outerVariable = ",outerVariable); // Inside innerLocalScope: outerVariable =  true
		console.log("Inside innerLocalScope: innerVariable = ",innerVariable); // Inside innerLocalScope: innerVariable =  true
	}
	innerLocalScope(); // invoked at first local Scope

	console.log("Inside outerLocalScope: outerVariable = ",outerVariable); // Inside outerLocalScope: outerVariable =  true
	console.log("Inside outerLocalScope: innerVariable = ",innerVariable); // ReferenceError: innerVariable is not defined
}
outerLocalScope(); // invoked at Global Scope
console.log("Outside localScope: ", outerVariable); // This line will not be executed due to an error.
```


## Lexical Scope (লেক্সিকাল স্কোপ)

## Dynamic scope (ডাইনামিক স্কোপ)

## Block Scope (ব্লক স্কোপ)

[DevTools open]: <https://developers.google.com/web/tools/chrome-devtools/open>