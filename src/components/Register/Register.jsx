import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "./../../firebase/firebase";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    // Reset Error Message
    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    if (!regex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);

        // sendEmailVerification(auth.currentUser)
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email Verification Code Send");
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-10 mb-10">
      <Helmet>
        <title>Register | Test</title>
      </Helmet>
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="p-4 w-0 absolute left-48 top-9"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text">
                Accept our terms and conditions
              </span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      <p>
        Already have an account? Please <Link to="/login">Login</Link>
      </p>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {success && <p className="text-green-500">Successfully Registered</p>}
    </div>
  );
};

export default Register;
