import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState, useEffect } from "react";

const Login = () => {
  const auth = getAuth(app);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  //Keep user logged in after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  //Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      console.log("User:", loggedInUser);

      // Retrieve the token
      const token = await loggedInUser.getIdToken(true);
      console.log("Token:", token);

      // Save token to localStorage (or secure storage)
      localStorage.setItem("token", token);

      // Set the user in your application state
      setUser(loggedInUser);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  // GitHub Login
  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  // Register User
  const handleRegister = async () => {
    if (!email || !password) {
      console.log("Enter email & password");
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registered:", result.user);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  // Login User
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      console.log("Enter email & password");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  // Logout
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("token");
      console.log("Signed out");
    } catch (error) {
      console.log(error.message);
    }
  };

  // Fetch Secure API
  const fetchSecureData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5001/secure-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Secure Data:", data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName || "User"} </h2>
          <p>Email: {user.email}</p>

          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={fetchSecureData}>Fetch Secure Data</button>
        </>
      ) : (
        <>
          <h2>Login</h2>

          <button onClick={handleGoogleSignIn}>Login with Google</button>
          <button onClick={handleGithubSignIn}>Login with GitHub</button>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button type="submit">Login</button>
          </form>

          <button onClick={handleRegister}>Register</button>
        </>
      )}
    </div>
  );
};

export default Login;