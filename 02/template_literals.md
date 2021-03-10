# 템플릿 리터럴로 동적인 문자열 생성하기
ES6에 추가된 템플릿 리터럴은 변수를 이용해서 동적으로 문자열을 생성할 수 있는 문법이다.
#### ES6 이전에 동적인 문자열을 생성하는 코드
```javascript
var name = 'mike';
var score = 80;
var msg = 'name: ' + name + ', score/100: ' + score / 100;
```
#### 템플릿 리터럴을 사용한 코드
```javascript
const msg = `name: ${name}, score/100: ${score / 100}`;
```
템플릿 리터럴은 백틱(``)을 이용한다. 표현식을 사용할 때는 ${expression} 형식으로 입력한다.
### 여러 줄의 문자열을 입력하기
#### ES5에서 여러 줄의 문자열을 생성하는 코드
```javascript
const msg = 'name: ' + name + '\n'+
'age: ' + age + '\n' +
'score: ' + score + '\n';
```
#### 템플릿 리터럴을 이용해서 여러 줄의 문자열을 생성하는 코드
```javascript
const msg = `name: ${name}
age: ${age}
score: ${score}`;
```
### 태그된 템플릿 리터럴
태그된 템플릿 리터럴(tagged template literals)은 템플릿 리터럴을 확장한 기능이다.
태그된 템플릿 리터럴은 함수로 정의된다.
#### 태그된 템플릿 리터럴의 함수 구조
```javascript
function taggedFunc(strings, ...expressions) { //1
  return 123;
}
const v1 = 10;
const v2 = 20;
const result = taggedFunc`a ${v1} b ${v2}`; //2
console.log(result);
```
taggedFunc 태그된 템플릿 리터럴 함수이다.
taggedFunc 함수를 호출한다. 태그된 템플릿 리터럴 함수는 함수명과 함께 템플릿 리터럴을 붙여서 사용한다.
함수명 오른쪽의 템플릿 리터럴을 파싱한 결과가 1의 strings, expressions 매개변수로 들어간다.
#### 태그된 템플릿 리터럴의 파싱결과 분석
```javascript
const v1 = 10;
const v2 = 20;
taggedFunc`a-${v1}-b-${v2}-c`;
taggedFunc`a-${v1}-b-${v2}`;
taggedFunc`${v1}-b-${v2}`;
// expressions = [10, 20]
function taggedFunc(strings, ...expressions) {
  console.log(`============================================================================`);
  console.log(`strings: ${strings}, expressions: ${expressions}`);
  console.log(`string length : ${strings.length}, expressions length: ${expressions}`);
  console.log(`============================================================================`);
  console.log(strings.length === expressions.length + 1);
}
```
위 세 가지 예제 모두 expressions 매개 변수의 값이 같다.
#### 일부 문자열을 강조하는 태그된 템플릿 리터럴 함수
```javascript
function highlight(strings, ...expressions) {
  return strings.reduce(
    (preValue, str, i) =>
      expressions.length === i
        ? `${preValue}${str}`
        : `${preValue}${str}<strong>${expressions[i]}</strong>`,
        '',
  );
}

const v1 = 10;
const v2 = 20;
const result = highlight`a ${v1} b ${v2}`;
console.log(result);
```
