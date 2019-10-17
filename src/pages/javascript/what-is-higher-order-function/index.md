---
title: What higher order function?
date: '2019-10-13'
spoiler: Higher-order function একটা এমন ধরণের function যেটা নিচের যে কোন একটা শর্ত পূরণ করবে, এক বা একাধিক function arguments হিসাবে নিবে। অথবা, একটা function result হিসাবে return করবে।
author: Prosen Ghosh
occupation: Full Stack Developer @ HungryNaki
twitter: prosenghosh25
gitHub: Prosen-Ghosh
stackOverflow: 3290456/prosen-ghosh
linkedin: prosen-ghosh
category: JavaScript
---

## Higher-order function কি?

[Higher-order function] একটা এমন ধরণের function যেটা নিচের যে কোন একটা শর্ত পূরণ করবে : 

- এক বা একাধিক function arguments হিসাবে নিবে। অথবা,
- একটা function result হিসাবে return করবে। 

আচ্ছা.....!! বেপারটা অনেক সহজ। 😎 একটা কোড করে দেখি...

```js{14,15}
function getherThen(x){
    return function(y){
        return x > y;
    }
}

let getherThen2 = getherThen(2);

console.log(getherThen2(3)); // false
console.log(getherThen2(1)); // true

// higher-order function নিচের মতো করে ও call করা যায়। 

let result1 = getherThen(2)(3);
let result2 = getherThen(2)(1)

console.log(result1); // false
console.log(result2); // true
```

এখানে ***`getherThen` function argument*** হিসাবে একটা value নেয় এবং একটা function return করে, ওই function টা argument হিসাবে একটা value নেয় এবং ২ টা value compare করে result return করে। তাহলে এইখানে getherThen  function একটা higher-order function।  কারণ এই function  টা result হিসাবে একটা function return করে , যার ফলে higher-order function হওয়ার ২য় শর্ত পূরণ হয়। সব কিছু ঠিক আছে, কিন্তু getherThen function execute হওয়ার পর যে function return করে ঐটা getherThen2 তে initialize  করলাম  তার মানে getherThen2 তে যে value আছে ঐটা আসলে একটা function।  getherThen2 function যখন কল করতেছি তখন argument এ y এর value  দেওয়া হয়েছে তাহলে x এর value কই থেকে আসলো ভাই...??. 

> এক কোথায় উত্তর: [closure].

এইটা আবার কি...?  সে অনেক লম্বা কাহিনী অন্য একদিন বলবো।  এখন এইটুকু জানলেই হবে function এর local variable or arguments inner function থেকে access করা যায়। কারণ inner function টা outer function এর scope এ create হয়েছে।

**উপরের `higher-order function` টা যদি `ES6` এর [arrow function] use করে লিখি তাহলে কেমন হবে:**

```js{1}
let getherThen = x => y => x > y;

let getherThen2 = getherThen(2);

console.log(getherThen2(3)); // false
console.log(getherThen2(1)); // true
```

## Higher-order function কেন দরকার?

কোডের  [abstractions] maintain করার জন্যে। Abstraction এর মাধ্যমে আমরা কোডের details এ না যেয়ে problem এর solution নিয়ে ভাবতে পারি ।
Higher-order function ব্যবহারের ফলে কোডের reusability বাড়ে কোডের reusability বাড়লে কম কোড লিখতে হবে আর কোড যদি কম line হয় তার মানে bug ও কম হবে। কিভাবে...? কোড লিখে দেখি:

কোড লেখার আগে একটা case বলি। কিছু `software developer registration` করেছে developer meetup এর জন্যে আমাদের ঐখানথেকে বের করতে হবে কতো জন `JavaScript developer` আছে এবং কতো জন `.Net developer` আছে । তো আমরা যেটা করতে পারি...

```js
let developers = [{
	name : "Mr.W",
	gender : "Male",
	age : 23,
	language : ".Net"
},{
	name : "Mr.X",
	gender : "Male",
	age : 23,
	language : "JavaScript"
},{
	name : "Mr.Y",
	gender : "Male",
	age : 32,
	language : "JavaScript"
},{
	name : "Mr.Z",
	gender : "Male",
	age : 28,
	language : "JavaScript"
},{
	name : "Mrs.A",
	gender : "Female",
	age : 22,
	language : "JavaScript"
},{
	name : "Mrs.B",
	gender : "Female",
	age : 26,
	language : ".Net"
},{
	name : "Mrs.C",
	gender : "Female",
	age : 25,
	language : ".Net"
}];

let JsDeveloper = developers.filter(function(person){
	return person.language === "JavaScript";
}).length;

let dotNetDeveloper = developers.filter(function(person){
	return person.language === ".Net";
}).length;

console.log("JsDeveloper:",JsDeveloper); // 4
console.log("dotNetDeveloper:",dotNetDeveloper); // 3
```

এইখানে [filter] একটা higher-order function ( JavaScript এ এইরকম অনেক built in higher-order function আছে । যেমন: [map],[reduce] etc..)। [filter] function এ argument হিসাবে একটা function পাঠানো হয়েছে । [callback function] টা predicate যেটা Array এর সব element test করে এবং `true` হইলে `true` না হলে `false` return করে। সব ঠিক আছে কিন্তু একি রকম কাজের জন্যে function এর argument এ ২ বার একি কোড লেখা লাগছে, reusability তো হলো না। :/ তা হলে কোডটা কে re-use করা যাবে এমন ভাবে লিখি ।

```js
let getDeveloperByLanguage = function(language){
    return function(person){
		return person.language === language;
    }
}
let JsDeveloper = developers
    .filter(getDeveloperByLanguage("JavaScript"))
    .length;

let dotNetDeveloper = developers
    .filter(getDeveloperByLanguage(".Net"))
    .length;

console.log("JsDeveloper:",JsDeveloper); // 4
console.log("dotNetDeveloper:",dotNetDeveloper); // 3
```
 এইখানে কোড re-use করার জন্যে আমরা একটা getDeveloperByLanguage নামে  function লিখেছি যেটা argument  হিসাবে একটা value নেই এবং একটা function result হিসাবে return করে, যে function টা return পাবো ওই টা filter function এর callback function হিসাবে array প্রতিটা element এর জন্যে test করবে এবং একটা নতুন result return করবে ।
 
***এইখানে `getDeveloperByLanguage` function এবং `filter` function ২ টাই `higher-order function`।***

এই কোডটা ES6 এর arrow function দিয়ে Convert করলে কোডটা দেখতে অনেক সুন্দর লাগবে :stuck_out_tongue_winking_eye:
```js
let getDeveloperByLanguage = language 
    => person 
    => person.language === language;

let JsDeveloper = developers
    .filter(getDeveloperByLanguage("JavaScript"))
    .length;

let dotNetDeveloper = developers
    .filter(getDeveloperByLanguage(".Net"))
    .length;

console.log("JsDeveloper:",JsDeveloper); // 4
console.log("dotNetDeveloper:",dotNetDeveloper); // 3
```
## callback function-ই কি Higher-order function?

ভাই আমি তো অনেক জায়গায় পড়েছি  callback function কে  higher-order function বলে । ভুল... একটা higher-order function, callback function হতে পারে  উপরের কোড টা তে এইরকম-ই হয়েছে, একটা higher-order function getDeveloperByLanguage কে filter function এর argument এ callback function হিসাবে পাঠানো হয়েছে কিন্তু সব callback function higher-order function না। higher-order function হইতে গেলে উপরে লেখা ওই ২টা শর্তের যে কোন একটা পূরণ হইতে হবে। 

> একটা  higher-order function callback function হতে পারে কিন্তু সব  callback function higher-order function না ।

<!-- [//]: #These are reference links used in the body of this note and get stripped out when the markdown processor does its job. -->

[Higher-order function]: <https://en.wikipedia.org/wiki/Higher-order_function?fbclid=IwAR3mPZo0FuBPMvJ6g4ptrS9DPxE6yEfMpvMKb9AwpPumnI5S33o7A5tobzE>
[closure]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures?fbclid=IwAR06fwVZdKCA7MlgexjjHhxCnmniwSvd7lB8XSycxe_fp7sbTHFnParXm6I>
[arrow function]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions?fbclid=IwAR1reI6WMjYmFr-jrVdO8vn88HG3EAS74SZwZcppJbf_3kcO8mBW4BFwOn4>
[abstractions]: <https://en.wikipedia.org/wiki/Abstraction?fbclid=IwAR3cCeoCcLJbJQYaVsCQPKqYewVnlK73Wc7mL-pY7O4dTVWUtuIvzDXmRUw>
[filter]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter?fbclid=IwAR1XzfAF7ynk66-i2F3SR4cSdTFz2UsKlS-Z4dzGltqcIdeyf4RZDDq31lM>
[map]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?fbclid=IwAR3WPlerR66Icvr4Y64VUZyk7EfoiktFpKKEv1PFPhQIKz1e4oaEk-8o5Kg>
[reduce]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce?fbclid=IwAR0HCZ4CAZ3BmDUi_ck7ahV5d2kS2lQ8l445gLXqK1UjDb-oeYOFs-jzU3Y>
[callback function]: <../what-is-callback-function>