import "./App.css";

import PhoneBook from "./components/PhoneBook.js";

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <h1 className="App-title">Список контактов</h1>
        <p className="App-about">
          Чтобы пополнить свой список, необходимо заполнить все поля. 
          <br />Телефон должен иметь указанный формат.
          <br /> Свой список вы можете просмотреть ниже!
        </p>
        <PhoneBook />
      </div>
    </div>
  );
}

export default App;
