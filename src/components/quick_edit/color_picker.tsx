import "./_quick_edit.scss";
import AvatarIcon from "../avatar_icon";
import { persona_backgrounds } from "../../constants/profile";
import { ColorType } from "../../constants/color";
import { IconKind } from "../../constants/icons";
import { Icon } from "../icon";

interface Props {
  color: ColorType;
  setColor: (color: string) => void;
}

export const ColorPicker = (props: Props) => {
  const { color, setColor } = props;

  const handleColorPick = (color: string) => {
    setColor(color);
  };

  return (
    <div className="color-picker">
      <span className="title">{"Color"}</span>
      <div className="wrap-list">
        {persona_backgrounds.map((item) => {
          return (
            <div
              className={`item`}
              key={item}
              onClick={() => handleColorPick(item)}
            >
              <AvatarIcon
                background={item}
                size={40}
                selected={item === color}
              />
              {item === color && (
                <Icon name={IconKind.CHECK} className="check" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
