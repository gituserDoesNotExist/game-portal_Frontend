const R = require('ramda');

console.log("hello world");

res=R.map(x => 2*x, [1,2,3]);
console.log(res);