---
title: Pure Function In JavaScript
date: '2019-11-02'
spoiler: Pure Function এমন এক ধরণের function যেটার return value input value দেখে বলা যাই এবং যে function এর কোনো side effect থাকবে না। 
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: JavaScript
tags: 'JavaScript,Pure Function,Functional programming'
---

## Pure Function কি?

কোনো funtion `Pure Function` হওয়ার জন্যে simple 2 টা rule আছে। 

	1. Same input এর জন্যে সব সময় same output পাওয়া যাবে।
	2. কোনো side effect থাকবে না। 

একটা code করে দেখা যাক। 

```js{1}
const add = (a,b) => a + b;

add(1,2); // 3
```

এইখানে `add` function টা একটা pure function, যেকোনো 2 টা argument নিয়ে ওই argument এর জন্যে same result দিবে।

আর একটা কোড দেখি,

```js
let user = {
	firstName: "Michael",
	lastName: "Jackson",
	gender: "M"
}

function getFullName(user) {
	return `${user.firstName} ${user.lastName}`;
}
console.log(getFullName(user)); // Michael Jackson 
```

এইখানে `getFullName` একটা pure function, কারণ `getFullName` state mutate করছে না। 

## Impure Function কি?

	1. Database create/update করা। 
	2. http call করা। 
	3. file system change করা। 
	4. state mutate করা।
	etc

```js
Math.random();
```

`Math.random()` একটা impure function কারণ এইটা সব সময় একটা different output return করে। 

তাহলে `console.log` কি pure function ঐটা তো যেকোনো input এর জন্যে `undefined` return করে। 

না। `console.log` pure function না কারণ এর side effect আছে, log করার জন্যে `console.log` অন্য কোনো share environment use করছে। 

```js{2}
const add = function (a,b){
	console.log("added");
	return a + b;
} 

add(1,2); // 3
```

যদি ও আমরা same input এর জন্যে same output পাচ্ছি, এবং `console.log` আমাদের code এর জন্যে harfull না তার পর ও এইটা pure function না। 

```js
let user = {
	firstName: "Michael",
	lastName: "Jackson",
	gender: "M"
}

function getFullName(user) {
	user.firstName = user.gender === "M" ? `Mr. ${user.firstName}`: `Mrs. ${user.firstName}`;
	return `${user.firstName} ${user.lastName}`;
}
console.log(getFullName(user)); // Mr. Michael Jackson 
```
এইখানে `getFullName` একটা impure function, কারণ `getFullName` state mutate করছে। 


## Pure vs Impure

**Impure function external state mutate করে।**

```js{18,20,22,23}
let cart = {
	items: [{
		name: "X",
		price: 10,
		quantity: 1
	}]
}

function addItem(cart){
	let newCart = {...cart}
	newCart.items.push({
		name: "Y",
		price: 5,
		quantity: 2
	});
	return newCart;
}
console.log(cart); // {items: Array(1)}

let newCart = addItem(cart); // changing state

console.log(cart); // {items: Array(2)}
console.log(newCart); // {items: Array(2)}
```

**Pure function external state mutate করে না।** আমরা উপরের function টা একটু chnage করে function টা কে pure function তৈরী করতে পারি।

```js{22,24,26,27}
let cart = {
	items: [{
		name: "X",
		price: 10,
		quantity: 1
	}]
}

function deepClone(value){
  return JSON.parse(JSON.stringify(value));
}

function addItem(cart){
	let newCart = deepClone(cart);
	newCart.items.push({
		name: "Y",
		price: 5,
		quantity: 2
	});
	return newCart;
}
console.log(cart); // {items: Array(1)}

let newCart = addItem(cart); // changing state

console.log(cart); // {items: Array(1)}
console.log(newCart); // {items: Array(2)}
```

এইখানে, pure function টা cart chnage না করে cart এর একটা copy তৈরী করে সেটা কে change করে পাঠাচ্ছে। এর কারণে orginal cart এর data chnage হচ্ছে না। আপনি যদি [react], [redux] use করে থাকেন তাহলে pure function এর ব্যবহার দেখবেন। 

> Pure function সহজে predict করা যায়, এর জন্যে test করতে সুবিধা হয়। 
> Pure function state management আরো সহজ করে। 


[react]: <https://reactjs.org/>
[redux]: <https://redux.js.org/>