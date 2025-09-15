import "./Auth.css";
import { validateNumber, validatePassword } from "../../utils";
import { loginHandler } from "../../services";
import { useAuth, useAlert } from "../../context";

let isNumberValid, isPasswordValid;

export const AuthLogin = () => {
  const { authDispatch, number, password } = useAuth();
  const { setAlert } = useAlert();

  const handleNumberChange = (event) => {
    isNumberValid = validateNumber(event.target.value);
    if (isNumberValid) {
      console.log("Valid Input");
      authDispatch({
        type: "NUMBER",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Number");
    }
  };

  const handlePasswordChange = (event) => {
    isPasswordValid = validatePassword(event.target.value);
    if (isPasswordValid) {
      console.log("Valid Input");
      authDispatch({
        type: "PASSWORD",
        payload: event.target.value,
      });
    } else {
      console.log("Invalid Password");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isNumberValid && isPasswordValid) {
      const { accessToken, username } = await loginHandler(number, password, setAlert);
      authDispatch({
        type: "SET_ACCESS_TOKEN",
        payload: accessToken,
      });
      authDispatch({
        type: "SET_USER_NAME",
        payload: username,
      });

    }
    authDispatch({
      type: "CLEAR_USER_DATA",
    });
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  const handleTestCredentialsClick = () => {
    // Set fixed test user credentials
    const testAccessToken = "test-token-12345";
    const testUsername = "Test User";

    // Set test credentials in local storage
    localStorage.setItem("token", testAccessToken);
    localStorage.setItem("username", testUsername);

    // Update auth state
    authDispatch({
      type: "SET_ACCESS_TOKEN",
      payload: testAccessToken,
    });
    authDispatch({
      type: "SET_USER_NAME",
      payload: testUsername,
    });

    // Clear form data
    authDispatch({
      type: "CLEAR_USER_DATA",
    });

    // Close the auth modal
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });

    // Show success message
    setAlert({
      open: true,
      message: "Logged in successfully with test account!",
      type: "success"
    });
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleFormSubmit}>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Mobile Number <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={number}
            type="number"
            className="auth-input"
            maxLength="10"
            placeholder="Enter Mobile Number"
            required
            onChange={handleNumberChange}
          />
        </div>
        <div className="d-flex direction-column lb-in-container">
          <label className="auth-label">
            Password <span className="asterisk">*</span>{" "}
          </label>
          <input
            defaultValue={password}
            className="auth-input"
            placeholder="Enter Password"
            type="password"
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button className="button btn-primary btn-login cursor">Login</button>
        </div>
      </form>
      <div className="cta">
        <button
          className="button btn-outline-primary cursor-pointer"
          onClick={handleTestCredentialsClick}
        >
          Login with Test Credentials
        </button>
      </div>
    </div>
  );
};