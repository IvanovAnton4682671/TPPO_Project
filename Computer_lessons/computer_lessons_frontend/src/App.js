import React from "react";

import Drawer from "./components/Drawer/Drawer";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import Lesson from "./components/Lesson/Lesson";

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

const lessonsArray = [
  {
    img: <FaHtml5 className="lessonsImg" />,
    img2: <FaHtml5 className="lessonsImg2" />,
    title: "HTML",
    price: 3000,
  },
  {
    img: <IoLogoCss3 className="lessonsImg" />,
    img2: <IoLogoCss3 className="lessonsImg2" />,
    title: "CSS",
    price: 3000,
  },
  {
    img: <SiJavascript className="lessonsImg" />,
    img2: <SiJavascript className="lessonsImg2" />,
    title: "JavaScript",
    price: 3000,
  },
  {
    img: <FaVuejs className="lessonsImg" />,
    img2: <FaVuejs className="lessonsImg2" />,
    title: "Vue",
    price: 4000,
  },
  {
    img: <FaReact className="lessonsImg" />,
    img2: <FaReact className="lessonsImg2" />,
    title: "React",
    price: 4000,
  },
  {
    img: <FaAngular className="lessonsImg" />,
    img2: <FaAngular className="lessonsImg2" />,
    title: "Angular",
    price: 4000,
  },
  {
    img: <FaPython className="lessonsImg" />,
    img2: <FaPython className="lessonsImg2" />,
    title: "Python",
    price: 5000,
  },
  {
    img: <FaJava className="lessonsImg" />,
    img2: <FaJava className="lessonsImg2" />,
    title: "Java",
    price: 5000,
  },
  {
    img: <TbBrandCpp className="lessonsImg" />,
    img2: <TbBrandCpp className="lessonsImg2" />,
    title: "C++",
    price: 5000,
  },
  {
    img: <TbBrandCSharp className="lessonsImg" />,
    img2: <TbBrandCSharp className="lessonsImg2" />,
    title: "C#",
    price: 5000,
  },
]; //массив с курсами, которые превращаются в карточки в Lessons

function App() {
  const [cartItems, setCartItems] = React.useState([]); //при нажатии на + добавляем курс в массив и передаём в Drawer
  const [cartClass, setCartClass] = React.useState(false); //реализует открытие и закрытие корзины
  const [logInClass, setLogInClass] = React.useState(false); //реализует открытие и закрытия формы
  const [inSystem, setInSystem] = React.useState(false); //реализует обработку входа в систему
  const [emailUserInSystem, setEmailUserInSystem] = React.useState(""); //реализует запоминание почты при входе в систему

  const enteringInSystem = (email) => {
    //обновляет флаг входа в систему и запоминает почту
    setInSystem(true);
    setEmailUserInSystem(email);
  };

  const logOutOfSystem = () => {
    //реализуем выход из системы
    setInSystem(false);
    setEmailUserInSystem("");
    alert("Вы вышли из системы!");
  };

  const changeClassLogIn = () => {
    //меняет класс для показа/скрытия формы
    setLogInClass(!logInClass);
  };

  const changeClass = () => {
    //меняет класс для показа/скрытия корзины
    setCartClass(!cartClass);
  };

  const onAddToCart = (obj) => {
    //добавление в корзину не более одного одинакового курса
    if (!cartItems.some((item) => item.newTitle === obj.newTitle)) {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveCart = (obj) => {
    //удаление их корзины курса
    setCartItems((prev) => prev.filter((item) => item !== obj));
  };

  return (
    <div className="wrapper">
      <Drawer
        items={cartItems}
        onRemove={onRemoveCart}
        cartClass={cartClass}
        changeClass={changeClass}
        inSystem={inSystem}
        emailUserInSystem={emailUserInSystem}
      />
      <Form
        logInClass={logInClass}
        changeClassLogIn={changeClassLogIn}
        enteringInSystem={enteringInSystem}
      />
      <Header
        onClickCart={() => changeClass()}
        onClickLogIn={() => changeClassLogIn()}
        inSystem={inSystem}
        emailUserInSystem={emailUserInSystem}
        logOutOfSystem={logOutOfSystem}
      />
      <div className="content">
        <h2>Все курсы</h2>
        <div className="lessons">
          {lessonsArray.map((lesson, index) => (
            <Lesson
              key={index}
              img={lesson.img}
              img2={lesson.img2}
              title={lesson.title}
              price={lesson.price}
              onClickForward={() => console.log("Нажали на стрелочку вперёд")}
              onClickBack={() => console.log("Нажали на стрелочку назад")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
