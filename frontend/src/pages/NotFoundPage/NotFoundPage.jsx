import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <h1 className={s.message}>Oops! Page Not Found</h1>
      <Link to="/" className={s.link}>
        Go to HomePage
      </Link>
    </div>
  );
};

export default NotFoundPage;
