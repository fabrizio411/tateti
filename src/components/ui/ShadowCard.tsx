import { Component, JSX, splitProps } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  shadowClass?: string;
}

const ShadowCard: Component<Props> = (props) => {
  const [local, attrs] = splitProps(props, ["class"]);

  return (
    <div
      class={twMerge(
        "relative rounded-2xl top-2 left-0 bg-black",
        props.shadowClass,
      )}
    >
      <div
        class={twMerge(
          "relative bottom-2 left-0 rounded-2xl",
          local.class,
        )}
        {...attrs}
      >
        {props.children}
      </div>
    </div>
  );
};

export default ShadowCard;
