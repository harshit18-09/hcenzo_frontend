import axios from "axios";

export const loginHandler = async (number, password, setAlert) => {
  try {
    const response = await axios.post(
      "https://hcenzo-1.onrender.com/api/auth/login",
      {
        number: number,
        password: password,
      }
    );

    const { accessToken, username } = response.data;
    
    console.log("Logged IN");
    console.log({ accessToken, username });
    
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", username);
    
    setAlert({
      open: true,
      message: "Login Successful!",
      type: "success"
    });
    
    return { accessToken, username };
  } catch (err) {
    console.error("Login error:", err);
    
    setAlert({
      open: true,
      message: err.response?.data?.message || "Unable to login. Please check your credentials.",
      type: "error"
    });
    
    return { accessToken: null, username: null };
  }
};