import s from "./Divider.module.css";

const Divider = ({ text = "OR" }) => {
  return (
    <div className={s.divider} role="separator" aria-label={text}>
      <span className={s.dividerText}>{text}</span>
    </div>
  );
};

export default Divider;
