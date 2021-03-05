function LikeButton() {
  const[liked, setLiked] = React.useState(false); //초깃값과 함께 컴포넌트의 상탯값을 정의 
  const text = liked ? '좋아요 취소' : '좋아요'; //컴포넌트의 상탯값에 따라 동적으로 버튼의 문구 결정
  return React.createElement( //createElement은 리액트 요소 반환
    'button',
    { onClick: () => setLiked(!liked) },
    text,    
  );
}
const domContainer = document.querySelector('#react-root');
ReactDom.render(React.createElement(LikeButton), domContainer); //react-dom.development.js파일에서 전역 변수로 만든 ReactDOM 변수를 사용해서 우리가 만든 컴포넌트를 react-root돔 요소에 붙임

/*
createElement 이해하기
createElement 함수의 구조는 아래와 같다.
React.createElement(component, props, _children) => ReactElement
첫 번째 매개변수 component는 일반적으로 문자열이나 리액트 컴포넌트.
component의 인수가 문자열이면 HTML 태그에 해당하는 돔 요소가 생성된다.
예를 들어 문자열 p를 입력하면 HTML p 태그가 생성된다.
*/
