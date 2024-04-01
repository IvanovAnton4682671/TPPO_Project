import React from "react";

import { CiSquarePlus } from "react-icons/ci";
import { CiSquareCheck } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io5";
import { SiJavascript } from "react-icons/si";
import { FaVuejs } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { FaAngular } from "react-icons/fa6";
import { FaPython } from "react-icons/fa6";
import { FaJava } from "react-icons/fa6";
import { TbBrandCpp } from "react-icons/tb";
import { TbBrandCSharp } from "react-icons/tb";

import styles from "./Lesson.module.css";

function Lesson({
  img,
  img2,
  title,
  price,
  onClickForward,
  onClickBack,
  onPlus,
}) {
  const [isAdded, setIsAdded] = React.useState(false); //реализует добавление обычного курса в корзину

  const onClickPlus = () => {
    //лютый говнокод, но его трогать нельзя, он тут нужен для обычных курсов
    //месиво из if-else для того, чтобы корректно отображались картинки (с правильными классами)
    var newImg, newTitle, newPrice;
    if (title === "HTML") {
      newImg = <FaHtml5 className="cartImg" />;
      newTitle = "Базовый курс по изучению HTML";
      newPrice = price;
    } else if (title === "CSS") {
      newImg = <IoLogoCss3 className="cartImg" />;
      newTitle = "Базовый курс по изучению CSS";
      newPrice = price;
    } else if (title === "JavaScript") {
      newImg = <SiJavascript className="cartImg" />;
      newTitle = "Базовый курс по изучению JavaScript";
      newPrice = price;
    } else if (title === "Vue") {
      newImg = <FaVuejs className="cartImg" />;
      newTitle = "Базовый курс по изучению Vue";
      newPrice = price;
    } else if (title === "React") {
      newImg = <FaReact className="cartImg" />;
      newTitle = "Базовый курс по изучению React";
      newPrice = price;
    } else if (title === "Angular") {
      newImg = <FaAngular className="cartImg" />;
      newTitle = "Базовый курс по изучению Angular";
      newPrice = price;
    } else if (title === "Python") {
      newImg = <FaPython className="cartImg" />;
      newTitle = "Базовый курс по изучению Python";
      newPrice = price;
    } else if (title === "Java") {
      newImg = <FaJava className="cartImg" />;
      newTitle = "Базовый курс по изучению Java";
      newPrice = price;
    } else if (title === "C++") {
      newImg = <TbBrandCpp className="cartImg" />;
      newTitle = "Базовый курс по изучению C++";
      newPrice = price;
    } else if (title === "C#") {
      newImg = <TbBrandCSharp className="cartImg" />;
      newTitle = "Базовый курс по изучению C#";
      newPrice = price;
    }
    onPlus({ newImg, newTitle, newPrice });
    setIsAdded(!isAdded);
  };

  const [isAddedExp, setIsAddedExp] = React.useState(false); //реализует добавление продвинутого курса в корзину

  const onClickPlusExp = () => {
    //лютый говнокод, но его трогать нельзя, он тут нужен для продвинутых курсов
    //месиво из if-else для того, чтобы корректно отображались картинки (с правильными классами)
    var newImg, newTitle, newPrice;
    if (title === "HTML") {
      newImg = [
        <FaHtml5 className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению HTML";
      newPrice = price * 1.5;
    } else if (title === "CSS") {
      newImg = [
        <IoLogoCss3 className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению CSS";
      newPrice = price * 1.5;
    } else if (title === "JavaScript") {
      newImg = [
        <SiJavascript className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению JavaScript";
      newPrice = price * 1.5;
    } else if (title === "Vue") {
      newImg = [
        <FaVuejs className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению Vue";
      newPrice = price * 1.5;
    } else if (title === "React") {
      newImg = [
        <FaReact className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению React";
      newPrice = price * 1.5;
    } else if (title === "Angular") {
      newImg = [
        <FaAngular className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению Angular";
      newPrice = price * 1.5;
    } else if (title === "Python") {
      newImg = [
        <FaPython className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению Python";
      newPrice = price * 1.5;
    } else if (title === "Java") {
      newImg = [
        <FaJava className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению Java";
      newPrice = price * 1.5;
    } else if (title === "C++") {
      newImg = [
        <TbBrandCpp className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению C++";
      newPrice = price * 1.5;
    } else if (title === "C#") {
      newImg = [
        <TbBrandCSharp className="cartImgWithPlus" />,
        <FaPlus className={styles.cartLessonsPlus} />,
      ];
      newTitle = "Продвинутый курс по изучению C#";
      newPrice = price * 1.5;
    }
    onPlus({ newImg, newTitle, newPrice });
    setIsAddedExp(!isAddedExp);
  };

  const [isChanged, setIsChanged] = React.useState(false); //реализует смену курсов

  const onClickChange = () => {
    //отрисовывает обычный/продвинутый курс
    setIsChanged(!isChanged);
  };

  return (
    <div className={styles.card}>
      {!isChanged ? (
        <div className={styles.isChangedLeft}>
          {img}
          <button className={styles.button} style={{ marginLeft: "10px" }}>
            <IoIosArrowForward
              className={styles.lessonsArrowForward}
              onClick={onClickChange}
            />
          </button>
          <h5>Базовый курс по изучению {title}</h5>
          <div className={styles.cardDescription}>
            <div className={styles.cardLines}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <button className={styles.button} onClick={onClickPlus}>
              {isAdded ? (
                <CiSquareCheck className={styles.ciSquarePlus} />
              ) : (
                <CiSquarePlus className={styles.ciSquarePlus} />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.isChangedRight}>
          <button className={styles.button}>
            <IoIosArrowBack
              className={styles.lessonsArrowBack}
              onClick={onClickChange}
            />
          </button>
          {img2}
          <FaPlus className={styles.lessonsPlus} />
          <h5>Продвинутый курс по изучению {title}</h5>
          <div className={styles.cardDescription}>
            <div className={styles.cardLines}>
              <span>Цена:</span>
              <b>{price * 1.5} руб.</b>
            </div>
            <button className={styles.button} onClick={onClickPlusExp}>
              {isAddedExp ? (
                <CiSquareCheck className={styles.ciSquarePlus} />
              ) : (
                <CiSquarePlus className={styles.ciSquarePlus} />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lesson;
