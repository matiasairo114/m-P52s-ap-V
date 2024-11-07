import "./_persona.scss";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectBackground,
  selectName,
} from "../../config/personaSlice";
import AvatarIcon from "../avatar_icon";

export const PersonaNameCard = () => {
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);
  const background = useSelector(selectBackground);

  return (
    <div className="persona-name-card">
      <AvatarIcon name={avatar} background={background} size={80} />
      <div className="name-panel">
        <span className="label">{"Persona Name"}</span>
        <span className="name">{name}</span>
      </div>
    </div>
  );
};
