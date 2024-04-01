import React from "react";
import axios from "axios";

import { FaDropbox } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import styles from "./Drawer.module.css";

function Drawer({
  items = [],
  onRemove,
  cartClass,
  changeClass,
  inSystem,
  emailUserInSystem,
}) {
  const handlePayment = () => {
    if (inSystem) {
      //если мы в системе, то передаём данные с почтой
      const lessonsData = [...items]; //делаем копию массива items, чтобы потом передать на бэк
      const allData = {
        lessonsData: lessonsData,
        emailUserInSystem: emailUserInSystem,
      };
      axios
        .post("http://localhost:8000/payment/", allData) //отправляем данные серверу
        .then((response) => {
          //обрабатываем ответ сервера
          console.log("Отправленные данные: ", allData);
          console.log("Ответ сервера: ", response.data);
          if (response.status === 200) {
            changeClass();
            items.splice(0, items.length);
            alert(
              "Благодарим за покупку! Информационное письмо отправлено Вам на почту."
            );
          } else if (response.status === 400) {
            console.log("Произошёл не POST-запрос при оплате... Как же так?");
          }
        })
        .catch((error) => {
          //ловим непредвиденную шелуху
          console.log("Ошибка при отправке ", allData, " на сервер: ", error);
        });
    } else {
      alert("Вы не можете оплатить курсы, пока не войдёте в аккаунт!");
    }
  };

  return (
    <div
      className={`${styles.overlay} ${
        cartClass ? styles.overAnimUp : styles.overAnimDown
      }`}
    >
      <div
        className={`${styles.drawer} ${
          cartClass ? styles.drawAnimUp : styles.drawAnimDown
        }`}
      >
        <div className={styles.cartName}>
          <h2>Корзина</h2>
          <CiSquareRemove className={styles.cartClose} onClick={changeClass} />
        </div>
        <div className={styles.cartItems}>
          {items.length === 0 ? (
            <div>
              <FaDropbox className={styles.cartBox} />
              <h4>Ваша корзина пуста, выберите хотя бы один товар!</h4>
            </div>
          ) : (
            items.map((obj, index) => (
              <div className={styles.cartItem} key={index}>
                {obj.newImg}
                <div style={{ marginRight: "20px" }}>
                  <p>{obj.newTitle}</p>
                  <b>{obj.newPrice} руб.</b>
                </div>
                <CiSquareRemove
                  className={styles.cartRemove}
                  onClick={() => onRemove(obj)}
                />
              </div>
            ))
          )}
        </div>
        {items.length !== 0 ? (
          <div>
            <div className={styles.cartDescription}>
              <span>Итоговая сумма:</span>
              <div></div>
              <b>
                {items.reduce(
                  (totalPrice, obj) => totalPrice + obj.newPrice,
                  0
                )}{" "}
                руб.
              </b>
            </div>
            <button className={styles.buttonConfirm} onClick={handlePayment}>
              Оплатить
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Drawer;
