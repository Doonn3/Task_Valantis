import style from "./style.module.css";

type PropsType = {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

export function Button(props: Readonly<PropsType>) {
  return (
    <button
      className={`${style.btn} ${props.className}`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
