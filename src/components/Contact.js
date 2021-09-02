import React, { useState } from "react";

import edit from "./edit.svg";
import done from "./done.svg";
import { ReactComponent as Heart} from "./heart.svg";

const red = "#FF0000";
const gray = "#DCDCDC";

function Contact({ id, name, phone, updateContact, fav }) {
  const [disabled, setDisabled] = useState(false);
  const [localName, setName] = useState(name);
  const [localPhone, setPhone] = useState(phone);
  const [bgColor, setBgColor] = useState(fav ? red : gray); 

  function handleEditClick() {
    setDisabled(!disabled);
  }

  function changeColor() {
    setBgColor(bgColor === red ? gray : red)
    updateContact(id, localName, localPhone, !fav);
  }

  return (
    <div className="contact" key={id}>
      <p className="contact-title">Имя:</p>
      <input
        type="text"
        maxLength="70"
        className="form-contacts-field"
        value={localName}
        disabled={!disabled}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <p className="contact-title">Номер телефона:</p>
      <input
        type="tel"
        maxLength="12"
        className="form-contacts-field"
        value={localPhone}
        disabled={!disabled}
        onChange={(e) => setPhone(e.currentTarget.value)}
      />
      <button onClick={handleEditClick}>
        <img src={edit} alt={edit} />
      </button>
      <button
        disabled={!disabled}
        onClick={() => {
          updateContact(id, localName, localPhone, bgColor === red ? true : false);
          setDisabled(!disabled);
        }}
      >
        <img src={done} alt={done} width="25px" height="25px" />
      </button>
      <button  onClick={changeColor} className="heart">
        <Heart style={{fill: bgColor}} width="25px" height="25px" />
      </button>
    </div>
  );
}

export default Contact;
