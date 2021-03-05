/*
createElement 함수를 사용하지 않고 JSX 문법을 사용
JSX는 HTML에서 태그를 사용하는 방식과 유사함
createElement 함수를 사용해서 생성하는 것보다는 JSX 문법을 사용하는 게 간결하고 가독성도 좋다.
HTML 태그와의 가장 큰 차이는 속성값을 작성하는 방법에 있다.

JSX 문법은 자바스크립트 표준이 아니기 떄문에 simple4.js 파일을 그대로 실행하면 에러가 발생하기 때문에
바벨을 이용해서 JSX문법으로 작성된 파일을 createElement 함수로 작성된 파일로 변환.
변환하기 위해서는 다음 패키지가 설치되어야함

npm install @babel/core @babel/cli @babel/preset-react
*/
function Container() {
  const [count, setCount] = React.useState(0);
  return(
    <div>
        <LikeButton />
        <div style={{ marginTop: 20 }}>
          <span>현재 카운트 : </span>
          <span>{count }</span>
          <button onClick={()=> setCount(count + 1)}>증가</button>
          <button onClick={()=> setCount(count - 1)}>감소</button>
        </div>
    </div>
  );
}