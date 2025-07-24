import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import Logo from "../Logo/Logo";
import s from "./AppBar.module.css";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Logo />
        <Navigation />
        {isLoggedIn ? <UserMenu /> : null}
      </div>
    </header>
  );
};

export default AppBar;
