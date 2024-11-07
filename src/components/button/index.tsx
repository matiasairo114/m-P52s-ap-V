import "./_button.scss";
import { ButtonKind, ButtonType } from "../../constants/button";
import { IconKind } from "../../constants/icons";
import { Icon } from "../icon";

interface Props {
  name: string;
  icon?: IconKind;
  type?: ButtonType;
  kind?: ButtonKind;
  isDisabled?: boolean;
  onClick?: () => void;
  onDropdownClick?: () => void;
}

export const Button = (props: Props) => {
  const {
    name,
    icon,
    type = ButtonType.PRIMARY,
    kind = ButtonKind.DEFAULT,
    isDisabled,
    onClick,
    onDropdownClick,
  } = props;

  const renderIcon = () => {
    if (icon) {
      return <Icon name={icon} />;
    }
  };

  const renderExtra = () => {
    switch (kind) {
      case ButtonKind.DROPDOWN:
        return (
          <button className={`button-chevron`} onClick={onDropdownClick}>
            <Icon name={IconKind.EXPAND_MORE} />
          </button>
        );
    }
  };

  return (
    <div className="button-container">
      <button
        className={`button button-${type} button-${kind} ${
          isDisabled ? "button-disabled" : ""
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {renderIcon()}
        {name}
      </button>
      {renderExtra()}
    </div>
  );
};
