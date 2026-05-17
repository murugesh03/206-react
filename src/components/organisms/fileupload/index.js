import { useRef, useState } from "react";
import Button from "./button";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const handleUpload = (e) => {
    console.log(fileRef.current.files[0]);

    const file = fileRef.current.files[0];

    if (file) {
      // Add upload logic here
      setFile(file);
      console.log(file.name);
    } else {
      console.log("No file selected");
    }
  };
  return (
    <div>
      <input type="file" ref={fileRef} />
      <Button handleUpload={handleUpload} label="Upload" />
    </div>
  );
};

export default FileUpload;
