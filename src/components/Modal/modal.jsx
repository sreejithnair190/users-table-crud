import { useSelector, useDispatch } from "react-redux";
import { toggleModal, setModalType } from "./../../redux/slices/modal";
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
    dispatch(toggleModal());
    if (modalTypes.includes(targetId)) {
      setType(targetId);
    }
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button id={modalType} onClick={handleButtonClick}>
        {modalType}
      </button>
      {modal && type && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              {console.log("rendered")}
              {type === modalTypes[0] && <Form data={data} />}
              {type === modalTypes[1] && <Form data={data} />}
              {type === modalTypes[2] && <div>Delete</div>}

              <button
                className="close-modal"
                onClick={() => dispatch(toggleModal())}
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
