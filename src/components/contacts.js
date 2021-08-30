import React, { useState, useEffect } from "react";

function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const getPhoneBookStorage = () => {
    return JSON.parse(localStorage.getItem("phoneBook")) || [];
  };

  const setPhoneBookStorage = (val) => {
    localStorage.setItem("phoneBook", JSON.stringify(val));
  };

  const handleSubmit = () => {
    const phoneBook = getPhoneBookStorage();
    if ((phone !== "") & (name !== "")) {
      phoneBook.push({ phone, name, id: phoneBook.length });
      setPhoneBookStorage(phoneBook);
    }
    setName("");
    setPhone("");
  };

  const clearLocalStorage = () => {
    localStorage.clear("phoneBook");
  };

  return (
    <div className="form-input">
      <form className="form-name">
        ФИО:
        <input
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          type="text"
          maxLength="70"
          required
        />
        Номер телефона:
        <input
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          type="tel"
          maxLength="12"
          pattern="\+7[0-9]{10,}"
          required
        />
        <small>Формат: +79999999999</small>
        <input type="submit" value="Отправить" onClick={handleSubmit} />
      </form>
      <div className="form-contacts">
        <div className="form-contacts-wrap">
          <h2>Ваши контакты</h2>
          <button onClick={clearLocalStorage}>Очистить список</button>
        </div>
        {getPhoneBookStorage().map((item) => (
          <div key={item.id}>
            <p className="form-contacts-name">ФИО: {item.name}</p>
            <p>Номер телефона: {item.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
