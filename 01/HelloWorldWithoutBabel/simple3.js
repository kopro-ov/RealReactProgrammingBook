/*
바벨은 자바스크립트 코드를 변환해 주는 컴파일러
바벨을 사용하면 최신 자바스크립트 문법을 지원하지 않는 환경에서도 최신 문법을 사용할 수 있다.
*/
function LikeButton() {
  const[liked, setLiked] = React.useState(false); //초깃값과 함께 컴포넌트의 상탯값을 정의 
  const text = liked ? '좋아요 취소' : '좋아요'; //컴포넌트의 상탯값에 따라 동적으로 버튼의 문구 결정
  return React.createElement( //createElement은 리액트 요소 반환
    'button',
    { onClick: () => setLiked(!liked) },
    text,    
  );
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(LikeButton),
      React.createElement(
        'div',
        { style: { marginTop: 20 } },
        React.createElement('span', null, '현재 카운트: '),
        React.createElement('span', null, this.state.count),
        React.createElement(
          'button',
          { onClick: () => this.setState({ count: this.state.count + 1 }) },
          '증가',
        ),
        React.createElement(
          'button',
          { onClick: () => this.setState({ count: this.state.count - 1 }) },
          '감소',
        ),
      ),
    );
  }
}

const domContainer = document.querySelector('#react-root');
ReactDOM.render(React.createElement(Container), domContainer);
