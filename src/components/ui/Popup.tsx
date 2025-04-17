import { Component, JSX, Show } from "solid-js";
import { twMerge } from "tailwind-merge";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
  modal: JSX.Element;
  open: boolean;
  onClose: () => void;
}

const Popup: Component<Props> = (props) => {
  return (
    <>
      {props.children}

      {/* MODAL */}
      <Show when={props.open}>
        <div class="z-40 fixed top-0 left-0 h-full w-full grid place-items-center">
          <div class={twMerge("z-50", props.class)}>
            {props.modal}
          </div>

          {/* OVERLAY */}
          <div
            onclick={props.onClose}
            class="z-40 fixed top-0 left-0 h-full w-full bg-black/40 animate-opacity"
          >
          </div>
        </div>
      </Show>
    </>
  );
};

export default Popup;
