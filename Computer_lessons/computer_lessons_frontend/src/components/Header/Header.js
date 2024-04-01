import { FaComputer } from "react-icons/fa6";
import { IoCart } from "react-icons/io5";
import styles from "./Header.module.css";

function Header({
  onClickCart,
  onClickLogIn,
  inSystem,
  emailUserInSystem,
  logOutOfSystem,
}) {
  return (
    <header>
      <div className={styles.headerLeft}>
        <FaComputer className={styles.faComputer} />
        <div>
          <h2>ТехноКод</h2>
          <p>Лучшая школа компьютерных курсов</p>
        </div>
      </div>
      <div>
        <ul className={styles.headerRight}>
          <li style={{ cursor: "pointer" }}>
            <IoCart onClick={onClickCart} />
          </li>
          <li>
            {inSystem && emailUserInSystem !== "" ? (
              <div className={styles.logOut}>
                <h6 style={{ fontSize: "18px" }}>
                  Здравствуйте, {emailUserInSystem}
                </h6>
                <button className={styles.logIn} onClick={logOutOfSystem}>
                  Log out
                </button>
              </div>
            ) : (
              <button className={styles.logIn} onClick={onClickLogIn}>
                Log in
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
