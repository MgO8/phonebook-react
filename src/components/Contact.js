import React from "react";

function Contact({ id, name, phone }) {
  return (
  <div key={id}>
  <p className="form-contacts-name">ФИО: {name}</p>
  <p>Номер телефона: {phone}</p>
</div>
  );
}

export default Contact;
