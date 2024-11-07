import { IconKind } from "../../constants/icons";
import { Icon } from "../icon";
import "./_avatar_icon.scss";

interface Props {
  size?: number;
  background?: string;
  name?: IconKind | null;
  selected?: boolean;
}

const AvatarIcon = (props: Props) => {
  const { size = 24, background, name, selected } = props;

  return (
    <div
      className={`avatar ${selected ? "selected" : ""}`}
      style={{ background: background, width: size, height: size }}
    >
      {name && <Icon name={name} size={size - 8} />}
    </div>
  );
};

export default AvatarIcon;
