import UserTable from './components/Table/userTable';
import Modal from './components/Modal/modal';
import "./App.css";

const App = () => {

  return (
    <div className="container">
      <Modal modalType="add" />
      <UserTable/>
    </div>
  )
}

export default App;
