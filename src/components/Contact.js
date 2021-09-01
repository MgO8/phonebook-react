import React, { useState } from "react";

function Contact({ id, name, phone, updateContact }) {
  const [disabled, setDisabled] = useState(false);
  const [localName, setName] = useState(name);
  const [localPhone, setPhone] = useState(phone);

  function handleEditClick() {
    setDisabled(!disabled);
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
      <button onClick={handleEditClick}>Редактировать</button>
      <button
        disabled={!disabled}
        onClick={() => {
          updateContact(id, localName, localPhone);
          setDisabled(!disabled);
        }}
      >
        Сохранить
      </button>
    </div>
  );
}

export default Contact;
