function LikeButton() {
  const[liked, setLiked] = React.useState(false); //초깃값과 함께 컴포넌트의 상탯값을 정의 
  const text = liked ? '좋아요 취소' : '좋아요'; //컴포넌트의 상탯값에 따라 동적으로 버튼의 문구 결정
  return React.createElement( //createElement은 리액트 요소 반환
    'button',
    { onClick: () => setLiked(!liked) },
    text,    
  );
}
ReactDOM.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root1'),
);
ReactDOM.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root2'),
);
ReactDOM.render(
  React.createElement(LikeButton),
  document.querySelector('#react-root3'),
);
