const Button = ({ handleUpload, label }) => {
  const handleUploadFile = (e) => {
    handleUpload(e);
  };
  return <button onClick={handleUploadFile}>{label}</button>;
};
export default Button;
