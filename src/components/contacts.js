import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneBook, setPhoneBook] = useState([]);
  const [search, setSearch] = useState("");

  const getPhoneBookStorage = () => {
    return JSON.parse(localStorage.getItem("phoneBook")) || [];
  };

  const setPhoneBookStorage = (val) => {
    localStorage.setItem("phoneBook", JSON.stringify(val));
    setPhoneBook(val);
  };

  const addContact = () => {
    if ((phone.match(/\+7[0-9]{10,}/) !== null) & (name !== "")) {
      const newContact = { phone, name, id: uuidv4() };
      setPhoneBookStorage([newContact, ...phoneBook]);
    }
  };

  const clearPhoneBook = () => {
    setPhoneBookStorage([]);
  };

  const filteredBooks = useMemo(
    () =>
      phoneBook.filter((item) => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.phone.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [search, phoneBook]
  );

  useEffect(() => {
    const phoneBook = getPhoneBookStorage();
    setPhoneBook(phoneBook);
  }, []);

  return (
    <div className="form-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addContact();
        }}
        className="form-name"
      >
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
        <input type="submit" value="Отправить" />
      </form>
      <div className="form-contacts">
        <div className="form-contacts-wrap">
          <h2>Ваши контакты</h2>
          <input
            type="text"
            placeholder="Поиск по контактам"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={clearPhoneBook}>Очистить список</button>
        </div>
        {!filteredBooks.length ? (
          <p>Ничего не найдено</p>
        ) : (
          filteredBooks.map((item) => (
            <div key={item.id}>
              <p className="form-contacts-name">ФИО: {item.name}</p>
              <p>Номер телефона: {item.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Contacts;