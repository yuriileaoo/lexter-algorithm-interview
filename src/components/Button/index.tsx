import React, { ButtonHTMLAttributes } from "react";

import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  children: React.ReactNode;
  variant: "primary" | "secondary";
};

const VARIANT = {
  primary:
    "bg-primary-default",
  secondary:
    "bg-secondary-default",
};

export default function ButtonComponent({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      type={rest.type || "button"}
      className={classNames(
        `w-fit text-black text-md transition duration-3 flex items-center justify-center gap-4 font-semibold rounded-md px-6 py-3 hover:opacity-80 focus:outline-none focus:ring-5`,
        {
          [VARIANT[rest.variant]]: !rest.disabled,
          "bg-primary-default opacity-30 cursor-not-allowed": rest.disabled,
        }
      )}
    >
      {children}
    </button>
  );
}
