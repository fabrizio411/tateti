import { Component, createSignal } from "solid-js";
import Popup from "./ui/Popup";
import RestartModal from "./modals/RestartModal";
import RestartIcon from "~/assets/icon-restart.svg";
import Icon from "./ui/Icon";
import Button from "./ui/Button";

interface Props {
  onRestart: () => void;
}

const Restart: Component<Props> = (props) => {
  const [open, setOpen] = createSignal<boolean>(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  const handleRestart = () => {
    props.onRestart();
    toggleOpen();
  };

  return (
    <Popup
      class="w-full"
      open={open()}
      onClose={toggleOpen}
      modal={<RestartModal onClose={toggleOpen} onReset={handleRestart} />}
    >
      <div class="w-full h-full flex items-center justify-end relative">
        <Button
          onclick={toggleOpen}
          class="rounded-xl bottom-1"
          shadowClass="rounded-xl"
          variant="invert"
        >
          <Icon icon={RestartIcon} />
        </Button>
      </div>
    </Popup>
  );
};

export default Restart;
