/*
ES5까지의 자바스크립트에서는 var을 이용해서 변수를 정의했고, 그게 유일한 방법이었다.
ES6에서는 const와 let을 이용한 새로운 변수 정의 방법이 생겼다.
왜 var가 문제가 있는지 알아본다.
*/

//var의 첫 번째 문제 : 함수 스코프

//스코프를 벗어나서 변수를 사용하면 에러가 발생한다.
function example() {
  var i = 1;
}
console.log(i); //참조 에러

//var 키워드 없이 변수를 정의하면 전역 변수가 된다.
function example1() {
  i = 1;
}

function example2() {
  console.log(i);
}

example1();
example2(); //1이 출력됨.

//for문을 벗어나도 변수가 사라지지 않는다.
for (var i = 0; i< 10; i++) {
  console.log(i);
}
console.log(i); //10 

/*
var 변수의 스코프를 제한하기 위해 즉시 실행 함수를 사용하기도 한다.
즉시 실행 함수는 함수를 정의하는 시점에 바로 실행되고 사라진다.
var 변수는 함수 스코프이므로 즉시 실행 함수로 묶으면 변수의 스코프를 제한할 수 있다.
그러나 즉시 실행 함수는 작성하기 번거롭고 가독성도 떨어진다.
*/


//var의 두 번째 문제 : 호이스팅

//정의되지 않은 변수 사용하기
console.log(myVar);

//변수가 정의된 시점보다 먼저 변수 사용하기
console.log(myVar);
var myVar = 1;

//변수를 정의하지 않아도 에러가 발생하지 않고 undefined가 출력된다.  이것은 해당 변수의 정의가 위쪽으로 끌어올려졌기 때문이다.

// 호이스팅의 결과
var myVar = undefined;
console.log(myVar); //undefined
myVar = 1;


//변수가 정의된 시점보다 먼저 변수에 값을 할당하기
console.log(myVar); //undefined
myVar = 2;
console.log(myVar) //2
myVar = 1;

//호이스팅은 직관적이지 않다.

