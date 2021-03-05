/*
createElement 함수를 사용하지 않고 JSX 문법을 사용
JSX는 HTML에서 태그를 사용하는 방식과 유사함
createElement 함수를 사용해서 생성하는 것보다는 JSX 문법을 사용하는 게 간결하고 가독성도 좋다.
HTML 태그와의 가장 큰 차이는 속성값을 작성하는 방법에 있다.
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