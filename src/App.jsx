import UserTable from './components/Table/userTable';
import Modal from './components/Modal/modal';

const App = () => {

  return (
    <div className="App">
      <Modal modalType='add' />
      <UserTable/>
    </div>
  )
}

export default App;
