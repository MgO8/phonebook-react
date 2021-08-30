import "./App.css";

import Contacts from "./components/contacts.js";

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
        <Contacts />
      </div>
    </div>
  );
}

export default App;
