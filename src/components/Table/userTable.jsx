import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersDocument } from "../../services/firebase";
import { addUser } from "./../../redux/slices/user-data";
import Modal from "../Modal/modal";
import "./userTable.css";

const UserRow = ({ data }) => {
  const { id, name, email, gender, city } = data;
  return (
    <tr id={id}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{city}</td>
      <td className="actions">
        <Modal modalType="update" data={data} />
        <Modal modalType="delete" />
      </td>
    </tr>
  );
};

const UserTable = () => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUsersDocument();
        dispatch(addUser(users));
      } catch (error) {
        console.error(error);
      }
      
    };
    fetchUserData();
  }, [dispatch]);

  return (
    <table id="users">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userData &&
          userData.map((data) => <UserRow key={data.id} data={data} />)}
      </tbody>
    </table>
  );
};

export default UserTable;
