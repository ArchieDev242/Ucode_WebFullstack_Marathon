const num = 42;
const big_num = 9007199254740991n;
const str = "Hello, World!";
const bool = true;
const null_var = null;
let undef;
const obj = { key: "value" };
const sym = Symbol("foo");
const func = function() {};

const output = 
  `num is ${typeof num}\n` +
  `bigNum is ${typeof big_num}\n` +
  `str is ${typeof str}\n` +
  `bool is ${typeof bool}\n` +
  `nullVar is ${typeof null_var}\n` +
  `undef is ${typeof undef}\n` +
  `obj is ${typeof obj}\n` +
  `sym is ${typeof sym}\n` +
  `func is ${typeof func}`;

alert(output);