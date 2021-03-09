/*
const, let은 블록 스코프이다.
함수 스코프의 단점 대부분이 블록 스코프에는 없다.
*/


// 블록 스코프에서는 블록을 벗어나면 변수를 사용할 수 없다.
if (true) {
  const i = 0;
}
console.log(i) //참조 에러

// 블록 스코프에서 같은 이름을 갖는 변수의 사용 예
let foo = 'bar1';
console.log(foo) //bar1
if (true) {
  let foo = 'bar2';
  console.log(foo) //bar2
}
console.log(foo) //같은 블록에 정의된 변수를 참조한다.

//const, let에서의 호이스팅
/*
const 또는 let으로 정의된 변수도 호이스팅된다.
하지만 const 또는 let으로 변수를 정의하기 전에 그 변수를 사용하려고 하면 참조 에러가 발생한다.
*/

//변수가 정의된 시점보다 먼저 변수를 사용할 수 없다.
console.log(foo);  //Uncaught SyntaxError: Identifier 'foo' has already been declared
const foo = 1;

/*
const, let로 정의된 변수는 호이스팅이 되지 않는다고 생각하기 쉬우나 정의된 변수도 호이스팅이 된다.
다만 변수가 정의된 위치와 호이스팅된 위치 사이에서 변수를 사용하려고 하면 에러가 발생한다.
이 구간을 임시적 사각지대(temporal dead zone)라고 한다.
*/

//const에서 호이스팅의 역할을 설명하기 위한 예
const foo = 1;
{
  console.log(foo) //참조 에러
  const foo = 2;
}

//var에서 호이스팅의 효과를 확인하는 코드
var foo = 1;
(function(){
  console.log(foo); //undefined
  var foo = 2;
})();

/*
const는 변수를 재할당 불가능하게 만든다.
반대로 let, var로 정의된 변수는 재할당할 수 있다.
재할당 불가능한 변수는 프로그램의 복잡도를 상당히 낮춰주기 때문에 
되도록이면 재할당 불가능한 변수를 사용하는 게 좋다.
*/

//const로 정의된 변수만 재할당 불가능하다
const bar = 'a'; 
bar = 'b'; //에러 발생
var foo = 'a';
foo = 'b'; //에러 없음
let value = 'a';
value = 'b'; //에러 없음.

//다만 const로 정의된 객체의 내부 속성값은 수정 가능하다는 점을 주의

//const로 정의해도 객체의 내부 속성값은 수정 가능하다.
const bar = { prop1: 'a' };
bar.prop1 = 'b';
bar.prop2 = 'b';

const arr = [10, 20];
arr[0] = 100;
arr.push(300);
/*
객체의 내부 속성값도 수정 불가능하게 만들고 싶다면 immer, immutable.js등의 외부 패키지를 활용하는 게 좋다.
이러한 외부 패키지는 객체를 수정하려고 할 때 기존 객체는 변경하지 않고 새로운 객체를 생성한다.
새로운 객체를 생성하는 편의 기능은 필요 없고 단지 수정만 할 수 없도록 차단하고 싶다면
다음과 같은 자바스크립트 내장 함수를 이용하면 된다.
*/
/*
Object.preventExtensions
Object.seal
Objec.freeze
*/

//const로 정의한 객체를 참조하는 변수 자체를 변경하는 것은 불가능 하ㅏㄷ.
const bar = { prop1: 'a'};
bar = { prop2: 123 };