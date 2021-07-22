import React from 'react';
// import LogoDM from './images/LogoDM.png'

export default class DesktopView extends React.Component {
  render() {
    return (
      <div className="container">
      <div className="flex space-between">
        <div>
          Logo
          {/* <img src={LogoDM}/> */}
        </div>
        <div className="flex flex-column-reverse">
          <div className="flex space-evenly">
            <div>Home</div>
            <div>Transactions</div>
            <div>Folder</div>
            <div>Chart</div>
            <div>Settings</div>
          </div>
          <div className="flex space-evenly">
            <span className="logoIcon"><i className="fas fa-home fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-list fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-folder-open fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-chart-pie fa-2x"></i></span>
            <span className="logoIcon"><i className="fas fa-cog fa-2x"></i></span>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

// export default class Home extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state == {
//       todos: []
//     }
//   }

//   getTodos() {
//     fetch('api/entries')
//     .then (res => res.json())
//     .then(todos => {
//       this.setState({todos:todos})
//     })
//     }
//   }

//   render() {
//     console.log('State:', this.state)
//     const {todos} = this.state

//    return (
//      <div className="container">
//       <h1>this is my todos!</h1>
//       <ul>
//         {
//           todos.map(todo => (
//             <li key={todo.todoId} className="x">
//               <h5>{todo.name</h5>
//               <p>{todo.details}</p>
//               <p>
//                 <small>{todo.firstName}</small>
//               </p>
//           ))
//         }

//       </ul>
//      </div>
//    )
//   }
// }
