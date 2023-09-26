import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./../../redux/slices/modal";
import "./modal.css";
import Form from "../Form/form";
import { useState } from "react";

const Modal = ({ modalType, data }) => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const [type, setType] = useState("");
  const modalTypes = ["add", "update", "delete"];

  const handleButtonClick = (e) => {
    const targetId = e.target.id;
    if (modalTypes.includes(targetId)) {
      setType(targetId);
    }
    dispatch(toggleModal());
  };

  const handleCloseModal = (e) => {
    setType("");
    dispatch(toggleModal());
  }

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button type="button" id={modalType} onClick={handleButtonClick}>
        {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
      </button>
      {modal && type && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              {type === modalTypes[0] && <Form  />}
              {type === modalTypes[1] && <Form data={data} />}
              {type === modalTypes[2] && <div>Delete</div>}

              <button
                type="button"
                className="close-modal"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
