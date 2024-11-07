import "./_quick_edit.scss";
import { Button } from "../button";
import { ButtonType } from "../../constants/button";

interface Props {
  nameError?: boolean;
  onClose?: () => void;
  handleSave: () => void;
}

export const Footer = (props: Props) => {
  const { nameError, onClose, handleSave } = props;

  return (
    <div className="footer">
      <Button name="Cancel" type={ButtonType.SECONDARY} onClick={onClose} />
      <Button name="Save" onClick={handleSave} isDisabled={nameError} />
    </div>
  );
};
