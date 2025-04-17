import { Component, JSX, splitProps } from "solid-js";
import ShadowCard from "./ShadowCard";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "invert";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  shadowClass?: string;
  variant: Variant;
}

const Button: Component<Props> = (props) => {
  const [local, attrs] = splitProps(props, ["class"]);

  let shadowClass = "bg-accent-1/60";
  if (props.variant === "secondary") shadowClass = "bg-accent-2/50";
  if (props.variant === "invert") shadowClass = "bg-muted-foreground/40";

  return (
    <ShadowCard shadowClass={twMerge(shadowClass, props.shadowClass)}>
      <button
        class={twMerge(
          "relative select-none active:top-[8px] top-0 transition-all p-3 rounded-2xl text-background font-bold cursor-pointer",
          props.variant === "primary" &&
            "hover:after:bg-accent-1-light/50 bg-accent-1 hover:bg-accent-1-light",
          props.variant === "secondary" &&
            "hover:after:bg-accent-2-light/45 bg-accent-2 hover:bg-accent-2-light",
          props.variant === "invert" &&
            "hover:after:bg-foreground/30 bg-muted-foreground hover:bg-foreground",
          local.class,
        )}
        {...attrs}
      >
        {props.children}
      </button>
    </ShadowCard>
  );
};

export default Button;
