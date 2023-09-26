import { useState } from "react";
import { userDocument, getUsersDocument } from "../../services/firebase";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/slices/modal";
import { addUser } from "../../redux/slices/user-data";
import "./form.css";

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

  const [formDataErr, setFormDataErr ] = useState({});
  const [formFields, setFormFields] = useState(formData);


  const validateForm = () => {
    const newFormDataErr = {};
  
    Object.keys(formFields).forEach(key => {
      if (key !== "id" && formFields[key].trim() === '') {
        newFormDataErr[key] = "This field is required";
      }
    });
  
    setFormDataErr(newFormDataErr); 

    if (Object.keys(newFormDataErr).length > 0) {
      return false; 
    }
  
    return true; 
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const FormHandler = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    userDocument(formFields);
    dispatch(toggleModal());

    try {
      const users = await getUsersDocument();
      dispatch(addUser(users));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <input type="hidden" name="id" id="id" value={formFields.id} />

      <label htmlFor="name">Name</label>
      <input
        className="modal_form"
        type="text"
        name="name"
        id="name"
        onChange={changeHandler}
        value={formFields.name}
      />
      <span className="form_error">{formDataErr.name || ''}</span>

      <label htmlFor="email">Email</label>
      <input
        className="modal_form"
        type="email"
        name="email"
        id="email"
        onChange={changeHandler}
        value={formFields.email}
      />
      <span className="form_error">{formDataErr.email || ''}</span>

      <label htmlFor="gender">Gender</label>
      <select
        className="modal_form"
        name="gender"
        id="gender"
        onChange={changeHandler}
        value={formFields.gender}
      >
        {!formFields.gender && <option>Choose your gender</option>}
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <span className="form_error">{formDataErr.gender || ''}</span>

      <label htmlFor="city">City</label>
      <input
        className="modal_form"
        type="text"
        name="city"
        id="city"
        onChange={changeHandler}
        value={formFields.city}
      />
      <span className="form_error">{formDataErr.city || ''}</span>

      <button className="form_btn" onClick={FormHandler}>
        {buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
      </button>
    </form>
  );
};

export default Form;
