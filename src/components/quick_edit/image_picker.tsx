import "./_quick_edit.scss";
import AvatarIcon from "../avatar_icon";
import { persona_icons } from "../../constants/profile";
import { IconKind } from "../../constants/icons";

interface Props {
  image: IconKind | null;
  setImage: (image: IconKind | null) => void;
}

export const ImagePicker = (props: Props) => {
  const { image, setImage } = props;

  const handleClickEmpty = () => {
    setImage(null);
  };

  const handleClickImage = (icon: IconKind) => {
    setImage(icon);
  };

  return (
    <div className="image-picker">
      <span className="title">{"Image"}</span>
      <div className="wrap-list">
        <div className="item" onClick={handleClickEmpty}>
          <AvatarIcon name={IconKind.EMPTY} size={44} selected={!image} />
        </div>
        {persona_icons.map((icon) => {
          return (
            <div
              className="item"
              key={icon}
              onClick={() => handleClickImage(icon)}
            >
              <AvatarIcon
                name={icon}
                background="#F5F5F5"
                size={40}
                selected={icon === image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
