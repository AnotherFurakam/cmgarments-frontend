import React, { DragEvent, useRef, useState } from "react";
import { StyleButton, StyleDivIcon, StyleDivDrop } from "./style";

interface InputFileInterface {
  showFiles: (files: FileList) => void;
}

const InputFile: React.FC<InputFileInterface> = ({ showFiles }) => {
  const [addStyle, setAddStyle] = useState(false);

  const input = useRef<HTMLInputElement | null>(null);
  const h3 = useRef<HTMLHeadingElement | null>(null);

  const setH3 = (text: string) => {
    if (h3 === null || h3.current === null) return;
    h3.current.textContent = text;
  };

  const handleChangeInput = () => {
    if (input === null || input.current === null) return;
    const files = input.current.files as FileList;
    setAddStyle(true);
    showFiles(files);
    setAddStyle(false);
  };

  const handleClickInput = () => {
    if (input === null || input.current === null) return;
    input.current.click();
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAddStyle(true);
    setH3("Suelta para subir los archivos");
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAddStyle(false);
    setH3("Arrastra y suelta las imágenes");
  };

  const handleDrog = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    showFiles(files);
    setAddStyle(false);
    setH3("Arrastra y suelta las imágenes");
  };

  return (
    <StyleDivDrop
      className="drog-area pb-4 mx-5"
      addStyle={addStyle}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrog}
    >
      <StyleDivIcon className={addStyle ? "text-info" : ""}>
        <i className="bi bi-images d-block text-center"></i>
      </StyleDivIcon>
      <h3
        className={`fs-5 text-center${addStyle ? " text-info" : ""}`}
        ref={h3}
      >
        Arrastra y suelta las imágenes
      </h3>
      <span className={`d-block text-center${addStyle ? " text-info" : ""}`}>
        O
      </span>
      <StyleButton
        className="mt-2"
        addStyle={addStyle}
        onClick={handleClickInput}
      >
        Selecciona del ordenador
      </StyleButton>
      <input
        type="file"
        name=""
        id="input-file"
        hidden
        multiple
        ref={input}
        onChange={handleChangeInput}
      />
    </StyleDivDrop>
  );
};

export default InputFile;
