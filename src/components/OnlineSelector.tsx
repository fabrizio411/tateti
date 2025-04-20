import { Component, createSignal } from "solid-js";
import Popup from "./ui/Popup";
import Button from "./ui/Button";
import NewOnlineGame from "./modals/NewOnlineGame";

const OnlineSelector: Component = (props) => {
  const [open, setOpen] = createSignal<boolean>(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <Popup
      open={open()}
      onClose={onClose}
      modal={<NewOnlineGame onClose={onClose} />}
      class="w-full grid place-items-center"
    >
      <Button onclick={onOpen} variant="invert" class="w-full">
        <h3 class="text-lg">
          NEW GAME <span class="ml-1">(ONLINE)</span>
        </h3>
      </Button>
    </Popup>
  );
};

export default OnlineSelector;
