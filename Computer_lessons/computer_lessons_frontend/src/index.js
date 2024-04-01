import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //крайне не рекомендуем использовать StrictMode при разработке, потому что в этом режиме компоненты рендерятся 2 раза (в рот мне ноги, почему?)
  //но без него приложение не запускается)))!11)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
