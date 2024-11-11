import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { auth } from "../../firebase/firebase";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [showLog, setShowLog] = useState(false);
  const emailRef = useRef();

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Reset error
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        // EmailVerification checked
        if (!result.user.emailVerified) {
          setLoginError("Please Verifiyed Your Email addresh");
        } else {
          toast.success("Successfully logged in!");
        }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setLoginError(error.message);
      });
  };
  const handleForgotPassword = () => {
    console.log("sent me Email", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please current Email Address");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          setLoginError("Please Try aging Letter",error);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login | Test</title>
      </Helmet>
      <h2 className="text-2xl font-bold">Login</h2>

      <div className="card mx-auto mt-10 mb-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
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
              type={showLog ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              type="button"
              onClick={() => setShowLog(!showLog)}
              className="absolute right-5 top-12 text-gray-500"
            >
              {showLog ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label onClick={handleForgotPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        {loginError && (
          <p className="text-red-600">Login Failed: {loginError}</p>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default Login;
