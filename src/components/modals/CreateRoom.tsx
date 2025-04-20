import { Component } from "solid-js";
import Button from "../ui/Button";
import { useNavigate } from "@solidjs/router";
import ShadowCard from "../ui/ShadowCard";

interface Props {
}

const CreateRoom: Component<Props> = (props) => {
  const navigate = useNavigate();

  const randomId = Math.floor(10000 + Math.random() * 90000).toString();

  const createRoom = () => {
    navigate(`/game/online?roomId=${randomId}`);
  };

  return (
    <div class="h-32 tems-center w-[80%] mx-auto flex flex-col gap-4 items-center">
      <h2 class="text-2xl font-medium">
        <span class="mr-3">ROOM:</span> #{randomId}
      </h2>
      <div class="flex gap-4 items-center">
        <Button
          onclick={createRoom}
          variant="secondary"
          class="w-72 text-lg"
        >
          GO TO ROOM
        </Button>
      </div>
    </div>
  );
};

export default CreateRoom;
