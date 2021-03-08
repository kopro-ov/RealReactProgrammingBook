import React, { useEffect, useState } from 'react';

export default function App() {

  const [pageName, setPageName] = useState('');  
  useEffect(() => {
    window.onpopstate = event => {
      setPageName(event.state); // popstate이벤트가 발생하면 페이지를 전환한다는 의미로 pageName 상탯값을 수정한다.
    };
  }, []);
  function onClick1() {
    const pageName ='page1';
    window.history.pushState('v1', '', '/page1');
    setPageName(pageName);
  }
  function onClick2() {
    const pageName ='page2';
    window.history.pushState('v2', '', '/page2');
    setPageName(pageName);
  }  
  return (
    <div>
      <button onClick={onClick1}>
        page1
      </button>
      <button onClick={onClick2}>
        page2
      </button>
      {!pageName && <Home />}
      {pageName == 'page1' && <Page1 />}
      {pageName == 'page2' && <Page2 />}
    </div>
  );
}
function Home() {
  return <h2>여기는 홈페이지입니다. 원하는 페이지 버튼을 클릭하세요.</h2>;
}
function Page1(){
  return <h2>여기는 Page1입니다.</h2>;
}
function Page2() {
  return <h2>여기는 Page2입니다.</h2>;
}