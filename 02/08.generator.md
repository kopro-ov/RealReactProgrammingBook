# 실행을 멈출 수 있는 제너레이터
제너레이터(generator)는 함수의 실행을 중간에 멈추고 재개할 수 있는 독특한 기능이다.<br>
실행을 멈출 때 값을 전달할 수 있기 때문에 반복문에서 제너레이터가 전달하는 값을 하나씩 꺼내서 사요할 수 있다.<br>
다만, 제너레이터는 보통의 컬렉션과 달리 값을 미리 만들지 않는다.<br>
값을 미리 만들어 놓으면 불필요하게 메모리를 사용하는 단점이 있다.<br>
제너레이터를 사용하면 필요한 순간에 값을 계산해서 전달할 수 있기 때문에 메모리 측면에서 효율적이다.<br>
제너레이터는 값을 전달하는 용도 외에도 다른 함수와 협업 멀티태스킹을 할 수 있다.
## 제너레이터 이해하기
#### 간단한 제너레이터 함수
```javascript
function* f1() {
  yield 10;
  yield 20;
  return 'finished';  
}
const gen = f1();
```
별표와 함께 정의된 함수는 제너레이터 함수다.<br>
yield키워드를 사용하면 함수의 실행을 멈출 수 있다.<br>
제너레이터 객체는 next, return, throw 메서드를 가지고 있다.
#### 제너레이터 객체의 next메서드 사용하기
```javascript
function* f1() {
  console.log('f1-1');
  yield 10;
  console.log('f1-2');
  yield 20;
  console.log('f1-3');  
  return 'finished';  
}
const gen = f1(); //1
console.log(gen.next()); //2
console.log(gen.next());
console.log(gen.next());
```
(1) 제너레이터 함수를 실행하면 제너레이터 객체만 반환되고 실제로 함수 내부코드는 실행되지 않는다.<br>
-> f1 {<suspended>}<br>
(2) next 메서드를 호출하면 yield 키워드를 만날 때 까지 실행되고 데이터 객체를 반환한다.<br>
yield 키워드를 만나면 데이터 객체의 done 속성값은 false이 되고, 만나지 못하면 true이 된다.<br>
제너레이터 객체가 next 메서드를 갖고 있다는 사실은 제너레이터 객체가 반복자(iterator)라는 것을 암시한다.
#### 제너레이터 객체의 return 메서드 호출하기
```javascript
const gen = f1();
console.log(gen.next());
console.log(gen.return('abc'));
console.log(gen.next());
```
return 메서드를 호출하면 데이터 객체의 done 속성값은 참이 된다. 이후에 next 메서드를 호출해도 done 속성값은 참이 된다.
#### 제너레이터 객체의 throw 메서드 호출하기
```javascript
function* f1() {
  try { //(1)
    console.log('f1-1');
    yield 10;
    console.log('f1-2');
    yield 20;
  } catch (e) {
    console.log('f1-catch', e);
  }
}
const gen = f1();
console.log(gen.next());
console.log(gen.throw('some error')); //(2)
```
try catch 문을 사용해서 예외 처리를 할 수 있도록 수정했다.  
throw 메서드를 호출하면 예외가 발생한 것으로 처리되기 때문에 catch문으로 들어간다.  
이때 데이터 객체의 done 속성값은 참이된다.
### 반복 가능하면서 반복자인 제너레이터 객체
제너레이터 객체는 반복 가능하면서 반복자이다.  
다음 조건을 만족하는 객체는 **반복자**이다.
- next 메서드를 갖고 있다.
- next 메서드는 value와 done 속성값을 가진 객체를 반환한다.
- done 속성값은 작업이 끝났을 때 참이 된다.  
제너레이터 객체는 반복자라는 것은 알고 있다.   
다음 조건을 만족하면 **반복 가능**한 객체이다
- Symbol.iterator 속성값으로 함수를 가지고 있다.
- 해당 함수를 호출하면 반복자를 반환한다.
#### 배열은 대표적인 반복 가능한 객체다
```javascript
const arr = [10, 20, 30];
const iter = arr[Symbol.iterator](); //1
console.log(iter.next()); //2
```
배열은 Symbol.iterator 속성값으로 함수를 갖고 있으므로 첫 번째 조건을 만족한다.  
함수가 반환한 iter 변수는 반복자이므로 두 번째 조건도 만족한다.
#### 제너레이터 객체는 반복 가능한 객체다
```javascript
function* f1() {
  
}
const gen = f1();
console.log(gen[Symbol.iterator]() === gen); 
```
Symbol.iterator 속성값을 호출한 결과가 자기 자신(반복자)이다.  
따라서 제너레이터 객체는 반복 가능한 객체이다.
#### 반복 가능한 객체를 이용하는 코드
```javascript
function* f1() {
  yield 10;
  yield 20;
  yield 30;
}
for (const v of f1()) { //1
  console.log(v);  
}
const arr = [...f1()]; //2
console.log(arr); //[10, 20, 30];
```
(1)  
for of 문은 반복 가능한 객체로부터 반복자를 얻는다.<br>
그리고 반복자의 next 메서드를 호출하면서 done 속성값이 참이 될 때까지 반복한다.
(2)  
전개 연산자도 done 속성값이 참이 될 때까지 값을 펼친다.
## 제너레이터 활용하기
제너레이터, 반복자, 반복 가능한 객체를 이용하면 함수형 프로그래밍의 대표적인 함수를 쉽게 구현할 수 있다.  
함수형 프로그래밍의 대표적인 함수인 map, filter, take 함수를 구현한 코드다.
```javascript
function* map(iter, mapper) { //1
  for (const v of iter) {
    yield mapper(v);
  }
}
function* filter(iter, test) {
  for (const v of iter) {
    if(test(v)) {
      yield v;
    }
  }
}

function* take(n, iter) {
  for (const v of iter) {
    if (n <= 0) return;
    yield v;
    n--;
  }
}

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = take(3, map(filter(values, n=> n % 2 === 0), n => n*10)); //2
console.log([...result]); //3
```
(1) 제너레이터 함수 내부에서 반복 가능한 객체를 이용하고 있다.  
세 함수는 제너레이터 덕분에 새로운 배열 객체를 생성하지 않는다.  
주목할 것은 세 함수가 연산이 필요한 순간에만 실행된다.
(2) 함수를 호출하면 제너레이터 객체만 생성되고 실제 연산은 수행되지 않는다.
(3) 값이 필요한 순간에 제너레이터 객체를 통해서 다음 값을 요청한다.  
**필요한 순간에만 연산하는 방식**을 **지연 평가(lazy evaluation)**라고 부른다<br>
제너레이터를 사용해서 얻게 되는 또 다른 장점은 필요한 연산만 수행한다는 점이다.  
(3)이 실행될 때 values 배열의 모든 값이 연산에 사용되지 않는다.  
숫자 1~6까지 연산하고 take 함수는 종료된다.<br>
필요한 연산만 수행하기 떄문에 무한대로 값을 표현하는 것도 가능하다
#### 제너레이터 함수로 자연수의 집합 표현
```javascript
function* map(iter, mapper) { //1
  for (const v of iter) {
    yield mapper(v);
  }
}
function* filter(iter, test) {
  for (const v of iter) {
    if(test(v)) {
      yield v;
    }
  }
}

function* take(n, iter) {
  for (const v of iter) {
    if (n <= 0) return;
    yield v;
    n--;
  }
}
function* naturalNumbers() { //1
  let v = 1;
  while (true) {
    yield v++;
  }
}
const values = naturalNumbers();
const result = take(3, map(filter(values, n => n % 2 === 0), n => n*10));
console.log([...result]);
```
(1) 자연수의 집합을 제너렐이터 함수로 표현했다.  
(2) 전개 연산자를 실행한다면 자연수 1부터 6까지만 연산에 사용된다.
### 제너레이터 함수끼리 호출하기
제너레이터 함수에서 다른 제너레이터 함수를 호출할 때는 yield* 키워드를 이용한다.
#### 제너레이터 함수가 다른 제너레이터 함수 호출하기
```javascript
function* g1() {
  yield 2;
  yield 3;
}
function* g2() {
  yield 1;
  yield* g1();
  yield 4;
}
console.log(...g2());
```
yield* 키워드는 오른쪽에는 반복 가능한 객체가 올 수 있도록 설계되었다.
#### 반복 가능한 객체를 처리하는 yield* 키워드
```javascript
function* g2_second() {
  yield 1;
  for (const value of g1()) { //1
    yield value;
  }
  yield 4;
}
function* g2_third() {
  yield 1;
  yield* [2, 3]; //2
  yield 4;
}
```
yield* g1()이 (1) 코드처럼 해석될 수 있다.  
yield* 키워드 오른쪽에는 제너레이터 객체뿐만 아니라 반복 가능한 모든 객체가 올 수 있다.
### 제너레이터 함수로 데이터 전달하기
제너레이터 함수는 외부로 부터 데이터를 받아서 소비할 수 있는데 next 메서드를 호출하는 쪽에서 제너레이터 함수로 데이터를 전달할 수 있다.
#### next메서드를 이용해서 제너레이터 함수로 데이터 전달하기
```javascript
function* f1() {
  const data1 = yield; //3
  console.log(data1);
  const data2 = yield;
  console.log(data2);
}
const gen = f1();
gen.next(); //1
gen.next(10); //2
gen.next(20); //2
```
(1) 첫 번째 next 메서드의 호출은 제너레이터 함수의 실행이 시작되도록 하는 역할만 수행한다.<br>
(2) next 메서드의 인수로 데이터를 전달할 수 있다 <br>
(3) next 메서드를 통해서 전달된 인수는 yield 키워드의 결괏값으로 받을 수 있다.
### 협업 멀티태스킹
제너레이터는 다른 함수와 협업 멀티태스킹을 할 수 있는데, 제너레이터는 실행을 멈추고 재개할 수 있기 때문이다.
멀티태스킹은 여러개의 데스크를 실행할 때 하나의 태스크가 종료되기 전에 멈추고 다른 태스크가 실행되는 것을 말한다.  
협업이라는 단어가 붙는 이유는 제너레이터가 실행을 멈추는 시점을 자발적(non-preemptive)으로 선택하기 때문이다.  
반대로 실행을 멈추는 시점을 자발적으로 선택하지 못하면 선점형(preemptive)멀티 태스킹이라고 부른다.
#### 제너레이터 함수를 이용한 협업 멀티태스킹
```javascript
function* minsu() {
  const myMsgList = [
    '안녕 나는 민수야',
    '만나서 반가워',
    '내일 영화 볼래?',
    '시간 안 되니?',
    '내일모레는 어때?',
  ];
  for (const msg of myMsgList) {
    console.log('수지:', yield msg); //1
  }  
}
function suji() {
  const myMsgList = [
    '',
    '안녕 나는 수지야',
    '그래 반가워',
    '...'
  ];
  const gen = minsu();
  for (const msg of myMsgList) {
    console.log('민수:', gen.next(msg).value); //2
  }
}
suji();
```
(1) 제너레이터 함수는 yield 키워드를 통해서 자발적으로 자신의 실행을 멈춘다.  
(2) 일반 함수에서는 제너레이터 객체의 next 메서드를 호출해서 제너레이터 함수가 다시 실행되도록 한다.  
이는 일반 함수가 자신의 실행을 멈춘다고 볼 수 있다.
### 제너레이터 함수의 예외 처리
제너레이터 함수에서 발생한 예외는 next 메서드를 호출하는 외부 함수에 영향을 준다.
#### 제너레이터 함수에서 예외가 발생한 경우
```javascript
function* genFunc() {
  throw new Error('some error'); //1
}
function func() {
  const gen = genFunc(); //2 
  try {
    gen.next(); //3
  } catch (e) {
    console.log('in catch:', e);
  }
}
func();
```
제너레이터 객체가 만들어지는 시점에는 아직 예외가 발생하지 않고 next 메서드가 호출되면 제너레이터 함수의 예외가 일반 함수에 영향을 준다.  
따라서 일반 함수의 실행은 catch 문으로 이동한다.



