import { useState } from "react";
import { userDocument, getUsersDocument } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/modal";
import { addUser } from "../../redux/slices/user-data";

const Form = ({ data }) => {
  const { id = "", name = "", email = "", gender = "", city = "" } = data || {};
  const buttonType = data ? "update" : "submit";

  const dispatch = useDispatch();
  
  const formData = {
    id,
    name,
    email,
    gender,
    city,
  };

  const [formFields, setFormFields] = useState(formData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const FormHandler = async (e) => {
    e.preventDefault();
    userDocument(formFields);
    dispatch(toggleModal());

    try {
      const users = await getUsersDocument();
      dispatch(addUser(users));
    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <form>
      <input type="hidden" name="id" id="id" value={formFields.id} />

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={changeHandler}
        value={formFields.name}
      />
      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={changeHandler}
        value={formFields.email}
      />
      <br />

      <label htmlFor="gender">Gender</label>
      <input
        type="text"
        name="gender"
        id="gender"
        onChange={changeHandler}
        value={formFields.gender}
      />
      <br />

      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        onChange={changeHandler}
        value={formFields.city}
      />
      <br />

      <button onClick={FormHandler}>
        {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
      </button>
    </form>
  );
};

export default Form;
