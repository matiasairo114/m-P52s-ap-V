import { Layout, Position } from "../../constants/popover";
import "./_popover.scss";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
  closeOnClickOutside?: boolean;
  paddingTop?: number;
  paddingLeft?: number;
  position?: Position;
  layout?: Layout;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Popover = (props: Props) => {
  const {
    anchorRef,
    open,
    onClose,
    children,
    closeOnClickOutside,
    paddingTop = 0,
    paddingLeft = 0,
    position = Position.BOTTOM,
    layout = Layout.DEFAULT,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const popoverRef = useRef<HTMLDivElement>(null);
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({
    top: -1000,
    left: -1000,
  });

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!closeOnClickOutside) {
        return;
      }

      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose, anchorRef, closeOnClickOutside]);

  useEffect(() => {
    if (open && anchorRef.current && popoverRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const popoverWidth = popoverRef.current.offsetWidth;

      let top = 0,
        left = 0,
        width,
        height;

      switch (position) {
        case Position.BOTTOM:
          top = rect.bottom + window.scrollY + 12;
          left = rect.left + window.scrollX;
          break;
        case Position.TOP:
          top = rect.top + window.scrollY + 4;
          left = rect.left + window.scrollX;
          break;
        case Position.TOP_CENTER:
          top = rect.top + window.scrollY + 4;
          left = rect.left + window.scrollX + rect.width / 2 - popoverWidth / 2;
          break;
        case Position.HIT:
          top = rect.top + window.scrollY;
          left = rect.left + window.scrollX;
          width = rect.right - rect.left;
          height = rect.bottom - rect.top;
          break;
      }

      top += paddingTop;
      left += paddingLeft;

      setPopoverStyle({ top, left, minWidth: width, minHeight: height });
    }
  }, [open, anchorRef, position, paddingTop, paddingLeft]);

  return (
    <>
      {open && (
        <div
          ref={popoverRef}
          style={popoverStyle}
          className={`no-drag popover-${layout}`}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {React.cloneElement(children, { onClose })}
        </div>
      )}
    </>
  );
};
