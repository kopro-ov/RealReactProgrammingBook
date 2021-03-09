# 향상된 비동기 프로그래밍 2: async await
async await는 비동기 프로그래밍을 동기 프로그래밍처럼 작성할 수 있도록 함수에 추가된 기능이다.
async await를 이용해서 비동기 코드를 작성하면 프로미스의 then 메서드를 체인 형식으로 호출하는 것보다 가독성이 좋아진다.
하지만, async await이 프로미스를 완전히 대체하는 것은 아니다.
프로미스는 비동기 상태를 값으로 다룰 수 있기 때문에 async await보다 큰 개념이다.

## async await 이해하기
### async await 함수는 프로미스를 반환한다.
```javascript
async function getData() { //1
  return 123; 
}
getData().then(data => console.log(data)); //2
```
(1) async 키워드를 이용해서 정의된 함수는 async await 함수이고, 항상 프로미스를 반환한다.
(2) 따라서 함수 호출 후 then메서드를 사용할 수 있다.<br>
#### 프로미스를 반환하는 async await 함수
```javascript
async function getData() {
  return Promise.resolve(123); //1
}
getData().then(data => console.log(data));
```
(1)프로미스의 then메서드와 마찬가지로 async await 함수 내부에서 반환하는 값이 프로미스라면 그 객체를 그대로 반환한다.<br>
#### async await 함수에서 예외가 발생하는 경우 
```javascript
async function getData() {
  throw new Error('123');
}
getData().catch(error => console.log(err)); 
```
다음과 같이 async await 함수 내부에서 예외가 발생하는 경우에는 거부됨 상태인 프로미스가 반환된다.<br>
### await 키워드를 사용하는 방법
await 키워드는 async await 함수 내부에서 사용되는데 await 키워드 오른쪽에 프로미스를 입력하면 그 프로미스가 처리됨 상태가 될 때까지 기다린다.  
#### await 키워드 사용 예
```javascript
function requestData(value) {
  return new Promise(resolve=>
    setTimeout(()=>{
      console.log('requestData', value);
      resolve(value);
    }, 1000),
  );
}
async function getData() {
  const data1 = await requestData(10); //1
  const data2 = await requestData(20); //2
  console.log (data1, data2);
  return [data1, data2];
}
getData();
```
1이 함수가 반환하는 프로미스 처리됨 상태가 될 때까지 2의 코드는 실행되지 않는다.
이렇게 awiat 키워드로 비동기 처리를 기다리면서 순차적으로 코드를 작성할 수 있다.<br>
#### await키워드는 async키워드 없이 사용할 수 없다.
```javascript
function getData() {
  const data = await requestData(10);
  console.log(data);
}
```
Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules 에러 발생.<br>
### async await는 프로미스보다 가독성이 좋다
#### async await와 프로미스 비교하기
```javascript
function getDataPromise() { //1
  asyncFunc1()
    .then(data => {
      console.log(data);
      return asyncFunc2();
    })
    .then(data => {
      console.log(data);
    })
}
async function getDataAsync() {
  const data1 = await asyncFunc1();
  console.log(data1);
  const data2 = await asyncFunc2();
  console.log(data2);  
}
```
이처럼 async await는 then메서드를 호출할 필요가 없기 때문에 더 간결하다.
비동기 함수 간에 의존성이 높아질수록 async await와 프로미스의 가독성 차이는 더 선명하게 드러난다.<br>
#### 의존성이 높은 코드에서 가독성 비교하기
```javascript
function getDataPromise() {
  return asyncFunc1()
    .then(data => Promise.all([data1, asyncFunc2(data1)]))
    .then([data1, data2] => {
      return asyncFunc3(data1, data2);
    });
}
async function getDataAsync() {
  const data1 = await asyncFunc1();
  const data2 = await asyncFunc2(data1);
  return asyncFunc3(data1, data2);
}
```
두 반환값을 asynFunc3 함수에 전달하기 위해 Promise.all을 사용했다.  
async await 함수는 복잡한 의존성이 존재함에도 코드가 직관적이다.  
## async await 활용하기
### 비동기 함수를 병렬로 실행하기
여러 비동기 함수에 각각 await 키워드를 사용해서 호출하면 순차적으로 실행된다.
#### 순차적으로 실행되는 비동기 코드
```javascript
async function getData() {
  const data1 = await asyncFunc1();
  const data2 = await asyncFunc2();
}
```
#### await 키워드를 나중에 사용해서 병렬로 실행되는 비동기 코드
```javascript
async function getData() {
  const p1 = asyncFunc1();
  const p2 = asyncFunc2();
  const data1 = await p1;
  const data2 = await p2;
}
```


