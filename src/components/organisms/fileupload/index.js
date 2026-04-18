import { useRef } from "react";

const FileUpload = () => {
  const fileRef = useRef();
  const handleUpload = () => {
    console.log(fileRef.current.files[0]);

    const file = fileRef.current.files[0];

    if (file) {
      // Add upload logic here
      console.log(file.name);
    } else {
      console.log("No file selected");
    }
  };
  return (
    <div>
      <input type="file" ref={fileRef} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
