import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

export default ({ isLogin, setLogin }) => {
  const [clientUrl, setclientUrl] = useState("");
  useEffect(() => {
    const fetchClientUrl = async () => {
      const res = await axios.get("/clienturl");
      setclientUrl(res.data.url);
    };
    fetchClientUrl();
  }, []);
  const googleResponse = res => {
    localStorage.setItem("username", res.profileObj.name);
    localStorage.setItem("email", res.profileObj.email);
    localStorage.setItem("image", res.profileObj.imageUrl);
    setLogin(true);
  };
  const onFailure = error => {
    alert(error);
  };
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    setLogin(false);
  };
  return !isLogin ? (
    clientUrl ? (
      <GoogleLogin
        clientId={clientUrl}
        buttonText="Login/Signup"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    ) : (
      ""
    )
  ) : (
    <Button variant="contained" color="primary" onClick={logout}>
      LogOut
    </Button>
  );
};
