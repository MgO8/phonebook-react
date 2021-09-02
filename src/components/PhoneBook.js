import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import Contact from "./Contact.js";

const getPhoneBookStorage = () => {
  return JSON.parse(localStorage.getItem("phoneBook")) || [];
};

const setPhoneBookStorage = (phoneBook) => {
  localStorage.setItem("phoneBook", JSON.stringify(phoneBook));
};

function PhoneBook() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneBook, setPhoneBook] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    setPhoneBookStorage(phoneBook);
  }, [phoneBook]);

  const addContact = () => {
    if ((phone.match(/\+7[0-9]{10,}/) !== null) & (name !== "")) {
      const newContact = { phone, name, id: uuidv4(), fav: false };
      setPhoneBook([newContact, ...phoneBook]);
    }
  };

  const updateContact = (id, name, phone, fav) => {
    const phoneBookIndex = phoneBook.findIndex((c) => c.id === id);
    phoneBook.splice(phoneBookIndex, 1, { id, name, phone, fav });
    setPhoneBook([...phoneBook]);
  };

  const clearPhoneBook = () => {
    setPhoneBook([]);
  };

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
      {/* вынести в компонент */}
      <div className="form-contacts">
        <div className="form-contacts-wrap">
          <h2>Ваши контакты</h2>
          <input
            type="text"
            placeholder="Поиск по контактам"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={clearPhoneBook}>Очистить список контактов</button>
        </div>
        {/* вынести в компонент */}
        {!filteredBooks.length ? (
          <p>Ничего не найдено</p>
        ) : (
          filteredBooks.map(({ id, name, phone, fav }) => (
            <Contact
              fav={fav}
              key={id}
              id={id}
              name={name}
              phone={phone}
              updateContact={updateContact}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PhoneBook;
