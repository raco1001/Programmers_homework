import './App.css'
import Clock from './Timer'
import TodoLists from './Todolists'
{
  /* 
  작성자: KJH 
  작성일: 2025-04-06
  내용: 기능에 대한 내용
*/
}

// function App() {
//   const name: string = 'JSX'
//   const style = {
//     backgroundColor: 'red',
//     color: 'white',
//     fontSize: '48px',
//     fontWeight: 'bold',
//     padding: '20px',
//   }

//   return (
//     <div className="container">
//       <h1 style={style}>
//         Hello, {name == '리액트' ? <h1>YES</h1> : <h1>NO</h1>}!!
//       </h1>
//       <p>반갑습니다.</p>
//       <div>
//         <ClassCom />
//         <FuncCom />
//       </div>
//       {/*주석문*/}
//     </div>
//   )
// }

// function App() {
//   return React.createElement(
//     'div',
//     { className: 'App-header' },
//     'Hello 리액트!!',
//     React.createElement('h1', null, 'Todo List'),
//     React.createElement('p', null, '반갑습니다.'),
//   )
// }

// function App() {
//   const port = undefined
//   return <div>{port || '포트를 설정하지 않았습니다.'}</div>
// }

function App() {
  return (
    <div className="container">
      <div>
        <TodoLists />
        <Clock />
      </div>
    </div>
  )
}

export default App
