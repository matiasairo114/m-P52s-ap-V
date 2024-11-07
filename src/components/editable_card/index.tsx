import "./_editable_card.scss";
import * as Y from "yjs";
import { useEffect, useRef, useState } from "react";
import { WebrtcProvider } from "y-webrtc";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { CardKind } from "../../constants/card";

Quill.register("modules/cursors", QuillCursors);

interface Props {
  id?: number;
  type?: CardKind;
  isEditable?: boolean;
  roomName: string;
  initialContent?: string;
  openEdit?: boolean;
}

export const EditableCard = (props: Props) => {
  const { id, type, isEditable, roomName, initialContent, openEdit } = props;

  const [isEdit, setIsEdit] = useState(openEdit);

  const quillRef = useRef<Quill | null>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(roomName, ydoc);
    ydocRef.current = ydoc;
    providerRef.current = provider;

    const quill = new Quill(editorRef.current, {
      modules: {
        cursors: true,
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ size: ["small", false, "large"] }],
          ["link"],
          [{ color: [] }, { background: [] }],
        ],
      },
      theme: "snow",
    });

    quillRef.current = quill;

    if (initialContent) {
      setTimeout(() => {
        if (quillRef.current) {
          quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
        }
      }, 0);
    }

    const ytext = ydoc.getText("quill");
    new QuillBinding(ytext, quill, provider.awareness);

    window.addEventListener("blur", () => quill.blur());

    return () => {
      window.removeEventListener("blur", () => quill.blur());
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomName, initialContent]);

  useEffect(() => {
    quillRef.current?.enable(isEdit);
    quillRef.current?.focus();
  }, [isEdit]);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    if (
      editorContainerRef.current &&
      !editorContainerRef.current.contains(target)
    ) {
      setIsEdit(false);
    }
  };

  const handleEditorClick = () => {
    if (isEditable) {
      setIsEdit(true);
    }
  };

  return (
    <div
      data-id={id}
      data-type={type}
      className={`editor ${isEdit ? "selected no-drag" : ""}`}
      onClick={handleEditorClick}
      ref={editorContainerRef}
    >
      <div className="content" ref={editorRef} />
    </div>
  );
};
