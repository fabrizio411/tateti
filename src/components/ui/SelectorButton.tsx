import { Component, JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const SelectorButton: Component<Props> = (props) => {
  const [local, attrs] = splitProps(props, ["class"]);

  return (
    <button
      class={twMerge(
        local.class,
        props.selected
          ? "hover:bg-muted-foreground bg-muted-foreground fill-muted-background animate-shake"
          : "hover:bg-muted-foreground/10 fill-muted-foreground",
        " flex-1 grid place-items-center py-2 cursor-pointer rounded-lg",
      )}
      {...attrs}
    >
      {props.children}
    </button>
  );
};

export default SelectorButton;
