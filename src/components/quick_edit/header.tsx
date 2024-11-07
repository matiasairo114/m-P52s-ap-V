import { IconKind } from "../../constants/icons";
import { Icon } from "../icon";
import "./_quick_edit.scss";

interface Props {
  onClose?: () => void;
}

export const Header = (props: Props) => {
  const { onClose } = props;

  return (
    <div className="header">
      <span className="title">{"Quick Edit"}</span>
      <Icon className="close" name={IconKind.CLOSE} onClick={onClose} />
    </div>
  );
};
