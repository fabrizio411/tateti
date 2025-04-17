import { Component, JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  icon: JSX.Element;
}

const Icon: Component<Props> = (props) => {
  const [local, attrs] = splitProps(props, ["icon", "class"]);

  return (
    <div
      class={twMerge("[&>svg]:h-full [&>svg]:w-full", local.class)}
      {...attrs}
    >
      {props.icon}
    </div>
  );
};

export default Icon;
