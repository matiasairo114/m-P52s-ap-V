import { useMemo, useRef } from "react";
import { Button } from "../button";
import { HorizontalBar } from "../horizontal_bar";
import { Popover } from "../popover";
import { ButtonKind, ButtonType } from "../../constants/button";
import { Layout, Position } from "../../constants/popover";
import { IconKind } from "../../constants/icons";

interface Props {
  parentRef: React.RefObject<HTMLElement>;
  showSubMenu: boolean;
  setShowSubMenu: (v: boolean) => void;
  addTextCard: () => void;
  addImageCard: () => void;
}

export const AddMenu = (props: Props) => {
  const { parentRef, showSubMenu, setShowSubMenu, addTextCard, addImageCard } =
    props;

  const addRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    addTextCard();
  };

  const handleDropdownClick = () => {
    setShowSubMenu(true);
  };

  const handleCloseSubMenu = () => {
    setShowSubMenu(false);
  };

  const popoverPadding = useMemo(() => {
    const parentRect = parentRef.current?.getBoundingClientRect();
    return {
      paddingTop: 36 - (parentRect?.top ?? 0) - window.scrollY,
      paddingLeft: -(parentRect?.left ?? 0) - window.scrollX,
    };
  }, [parentRef]);

  return (
    <>
      <div className="add-menu">
        <HorizontalBar color="#405cf5" />
        <div ref={addRef}>
          <Button
            icon={IconKind.TEXT_FIELDS}
            name="Add Card"
            kind={ButtonKind.DROPDOWN}
            onClick={handleClick}
            onDropdownClick={handleDropdownClick}
          />
        </div>
      </div>
      <Popover
        anchorRef={addRef}
        open={showSubMenu}
        onClose={handleCloseSubMenu}
        paddingTop={popoverPadding.paddingTop}
        paddingLeft={popoverPadding.paddingLeft}
        position={Position.TOP}
        layout={Layout.EMPTY}
        closeOnClickOutside
      >
        <div
          className="add-button-group"
          style={{ width: addRef.current?.offsetWidth || 100 }}
        >
          <Button
            icon={IconKind.TEXT_ICON}
            name="Text"
            type={ButtonType.LISTITEM}
            onClick={addTextCard}
          />
          <Button
            icon={IconKind.IMAGE_ICON}
            name="Image"
            type={ButtonType.LISTITEM}
            onClick={addImageCard}
          />
        </div>
      </Popover>
    </>
  );
};
