import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@redux/auth/selectors";
import HeroContent from "./components/HeroContent/HeroContent";
import PhoneMockup from "./components/PhoneMockup/PhoneMockup";
import s from "./HomePage.module.css";

export default function HomePage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={s.hero}>
      <div className={s.container}>
        <HeroContent isLoggedIn={isLoggedIn} />
        <div className={s.visual}>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
