import { useEffect, useState } from "react";
const Auth = (props) => {
  console.log(props);
  const { admin, children } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (admin) {
      setIsAuthenticated(true);
    }
  }, [admin]);

  if (!isAuthenticated) {
    return (
      <div>
        <p> Unauthorized kindly contact admin!</p>
      </div>
    );
  }
  return <>{children}</>;
};
export default Auth;
