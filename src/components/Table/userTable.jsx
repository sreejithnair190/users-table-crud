import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersDocument } from "../../services/firebase";
import { addUser } from "./../../redux/slices/user-data";
import Modal from "../Modal/modal";


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
  // console.log(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await getUsersDocument();
        console.log(users);
        dispatch(addUser(users));
      } catch (error) {
        console.error(error);
      }
      
    };
    fetchUserData();
  }, [dispatch]);

  return (
    <table>
      <tbody>
        {userData &&
          userData.map((data) => <UserRow key={data.id} data={data} />)}
      </tbody>
    </table>
  );
};

export default UserTable;
