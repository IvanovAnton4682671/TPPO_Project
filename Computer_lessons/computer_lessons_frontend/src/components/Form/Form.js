import React from "react";
import axios from "axios";
import { SHA256 } from "crypto-js";

import { CiSquareRemove } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import styles from "./Form.module.css";

function Form({ logInClass, changeClassLogIn, enteringInSystem }) {
  const [isChanged, setIsChanged] = React.useState(false); //реализует смену форм

  const onClickChange = () => {
    //меняет формы с авторизации на регистрацию
    setIsChanged(!isChanged);
  };

  const [formRegData, setFormRegData] = React.useState({
    //реализует хранение данных из input формы регистрации
    surnameReg: "",
    nameReg: "",
    patronymicReg: "",
    birthDateReg: "",
    phoneReg: "",
    emailReg: "",
    passwordReg: "",
    formRegErrors: {},
  });

  const validateFormReg = () => {
    //валидирует данные из input формы регистрации и создаёт массив ошибок
    const errors = {};
    const nameRegex = /^[А-ЯЁA-Z][а-яёa-z]{1,29}$/;
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,50}$/;

    if (!nameRegex.test(formRegData.surnameReg)) {
      errors.surnameReg = true;
    }
    if (!nameRegex.test(formRegData.nameReg)) {
      errors.nameReg = true;
    }
    if (!nameRegex.test(formRegData.patronymicReg)) {
      errors.patronymicReg = true;
    }
    if (new Date(formRegData.birthDateReg) > new Date()) {
      errors.birthDateReg = true;
    }
    if (!phoneRegex.test(formRegData.phoneReg)) {
      errors.phoneReg = true;
    }
    if (!emailRegex.test(formRegData.emailReg)) {
      errors.emailReg = true;
    }
    if (!passwordRegex.test(formRegData.passwordReg)) {
      errors.passwordReg = true;
    }

    setFormRegData({ ...formRegData, formRegErrors: errors });

    return Object.keys(errors).length === 0;
  };

  const handleInputRegChange = (event) => {
    //реализует изменение массива данных input формы регистрации
    const { name, value } = event.target;
    setFormRegData({ ...formRegData, [name]: value });
  };

  const handleSubmitReg = (event) => {
    //если форма регистрации корректна - отправлять данные на бэк
    event.preventDefault();
    const isFormValid = validateFormReg();
    if (isFormValid) {
      const newPass = SHA256(formRegData.passwordReg).toString(); //хэшируем пароль перед отправкой на бэк
      formRegData.passwordReg = newPass;
      console.log(newPass);
      axios
        .post("http://localhost:8000/registration/", formRegData) //отправляем данные серверу
        .then((response) => {
          //обрабатываем ответ сервера
          console.log("Отправленные данные: ", formRegData);
          console.log("Ответ сервера: ", response.data);
          if (response.status === 200) {
            enteringInSystem(formRegData.emailReg); //входим в систему, чтобы могли покупать курсы, и запоминаем почту
            console.log("Вошли в систему: ", formRegData.emailReg);
            changeClassLogIn(); //закрываем форму, чтобы глаза не мозолила
            alert("Вы успешно зарегистрировались, поздравляем!");
          } else if (response.status === 201) {
            alert(
              "Пользователь с такой почтой уже существует. Пожалуйста, укажите другую почту!"
            );
          } else if (response.status === 400) {
            console.log(
              "Серверу пришёл не POST-запрос при регистрации... Как же так?"
            );
          }
        })
        .catch((error) => {
          //ловим непредвиденную шелуху
          console.log(
            "Ошибка при отправке ",
            formRegData,
            " на сервер: ",
            error
          );
        });
    }
  };

  const [formAutData, setFormAutData] = React.useState({
    //реализует хранение данных из формы авторизации
    emailAut: "",
    passwordAut: "",
    formAutErrors: {},
  });

  const validateFormAut = () => {
    //валидирует данные из input формы авторизации и составляет массив ошибок
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,50}$/;

    if (!emailRegex.test(formAutData.emailAut)) {
      errors.emailAut = true;
    }
    if (!passwordRegex.test(formAutData.passwordAut)) {
      errors.passwordAut = true;
    }

    setFormAutData({ ...formAutData, formAutErrors: errors });

    return Object.keys(errors).length === 0;
  };

  const handleInputAutChange = (event) => {
    //реализует изменение массива данных input формы авторизации
    const { name, value } = event.target;
    setFormAutData({ ...formAutData, [name]: value });
  };

  const handleSubmitAut = (event) => {
    //если форма авторизации корректна - отправляем данные на бэк
    event.preventDefault();
    const isFormValid = validateFormAut();
    if (isFormValid) {
      const newPass = SHA256(formAutData.passwordAut).toString(); //хэшируем пароль перед отправкой на бэк
      formAutData.passwordAut = newPass;
      console.log(newPass);
      axios
        .post("http://localhost:8000/authorization/", formAutData) //отправляем данные серверу
        .then((response) => {
          //обрабатываем ответ сервера
          console.log("Отправленные данные: ", formAutData);
          console.log("Ответ сервера: ", response.data);
          if (response.status === 200) {
            enteringInSystem(formAutData.emailAut); //входим в систему, чтобы могли покупать курсы, и запоминаем почту
            console.log("Вошли в систему: ", formAutData.emailAut);
            changeClassLogIn(); //закрываем форму, чтобы глаза не мозолила
            alert("Вы успешно авторизовались, поздравляем!");
          } else if (response.status === 201) {
            alert("Такой записи не существует. Пожалуйста, проверьте данные!");
          } else if (response.status === 400) {
            console.log(
              "Серверу пришёл не POST-запрос при авторизации... Как же так?"
            );
          }
        })
        .catch((error) => {
          //ловим непредвиденную шелуху
          console.log(
            "Ошибка при отправке ",
            formAutData,
            " на сервер: ",
            error
          );
        });
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        logInClass ? styles.overAnimUp : styles.overAnimDown
      }`}
    >
      <div
        className={`${styles.form} ${
          logInClass ? styles.formAnimUp : styles.formAnimDown
        }`}
      >
        {!isChanged ? (
          <form className={styles.isChangedLeft} onSubmit={handleSubmitAut}>
            <div className={styles.headName}>
              <CiSquareRemove
                className={styles.formClose}
                onClick={changeClassLogIn}
              />
            </div>
            <div className={styles.formBody} style={{ marginTop: "100px" }}>
              <h3>Форма авторизации</h3>
              <input
                placeholder="Почта"
                type="email"
                name="emailAut"
                value={formAutData.emailAut}
                onChange={handleInputAutChange}
                style={
                  formAutData.formAutErrors.emailAut
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Пароль"
                type="password"
                name="passwordAut"
                value={formAutData.passwordAut}
                onChange={handleInputAutChange}
                style={
                  formAutData.formAutErrors.passwordAut
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <button type="submit" className={styles.signUp}>
                Sign up
              </button>
              <div className={styles.formFooter}>
                <h3>Ещё не зарегистрировались?</h3>
                <IoIosArrowForward
                  className={styles.footerIcon}
                  onClick={onClickChange}
                />
              </div>
            </div>
          </form>
        ) : (
          <form className={styles.isChangedRight} onSubmit={handleSubmitReg}>
            <div className={styles.headName}>
              <CiSquareRemove
                className={styles.formClose}
                onClick={changeClassLogIn}
              />
            </div>
            <div className={styles.formBody}>
              <h3>Форма регистрации</h3>
              <input
                placeholder="Фамилия"
                name="surnameReg"
                value={formRegData.surnameReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.surnameReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Имя"
                name="nameReg"
                value={formRegData.nameReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.nameReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Отчество"
                name="patronymicReg"
                value={formRegData.patronymicReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.patronymicReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Дата рождения"
                type="date"
                name="birthDateReg"
                value={formRegData.birthDateReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.birthDateReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Телефон"
                name="phoneReg"
                value={formRegData.phoneReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.phoneReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Почта"
                type="email"
                name="emailReg"
                value={formRegData.emailReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.emailReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <input
                placeholder="Пароль"
                type="password"
                name="passwordReg"
                value={formRegData.passwordReg}
                onChange={handleInputRegChange}
                style={
                  formRegData.formRegErrors.passwordReg
                    ? { border: "2px solid #ff0000" }
                    : null
                }
              />
              <button type="submit" className={styles.signUp}>
                Sign up
              </button>
              <div className={styles.formFooter} style={{ marginTop: "-10px" }}>
                <IoIosArrowBack
                  className={styles.footerIcon}
                  onClick={onClickChange}
                />
                <h3>Уже зарегистрировались?</h3>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
