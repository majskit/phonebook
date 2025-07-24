import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import s from "./Button.module.css";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      to,
      href,
      type = "button",
      disabled = false,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = `${s.button} ${s[variant]} ${s[size]} ${className}`;

    if (to) {
      return (
        <NavLink ref={ref} to={to} className={baseClasses} {...props}>
          {children}
        </NavLink>
      );
    }

    if (href) {
      return (
        <a ref={ref} href={href} className={baseClasses} {...props}>
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
