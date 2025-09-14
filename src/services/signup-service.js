import axios from "axios";

export const signupHandler = async (username, number, email, password, setAlert) => {
  try {
    const response = await axios.post(
      "https://hcenzo-1.onrender.com/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password,
      }
    );
    
    console.log("Signup Response:", response.data);
    
    if (response.data) {
      setAlert({
        open: true,
        message: `Account Created Successfully! Welcome ${username}!`,
        type: "success"
      });
      return true;
    }
  } catch (err) {
    console.error("Signup Error:", err);
    const errorMessage = err.response?.data?.message || "Error creating account. Please try again.";
    setAlert({
      open: true,
      message: errorMessage,
      type: "error"
    });
    return false;
  }
};