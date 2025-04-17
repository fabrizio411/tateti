import { Component, createSignal } from "solid-js";
import Popup from "./ui/Popup";
import Button from "./ui/Button";
import { Mark } from "~/global";

interface Props {
  mark: Mark;
}

const OnlineSelector: Component<Props> = (props) => {
  const [open, setOpen] = createSignal<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <Popup
      open={open()}
      onClose={toggleOpen}
      modal={<div class="p-8 rounded-xl bg-accent-1">Hola</div>}
    >
      <Button onclick={toggleOpen} variant="invert" class="w-full">
        <h3 class="text-lg">
          NEW GAME <span class="ml-1">(ONLINE)</span>
        </h3>
      </Button>
    </Popup>
  );
};

export default OnlineSelector;
