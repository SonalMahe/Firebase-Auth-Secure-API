import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState, useEffect } from "react";

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);


  // Task B: Register with email + password
  const handleRegister = async () => {
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError(getReadableError(err.code));
    }
  };

  // Task B: Log in with email + password
  const handleLogin = async () => {
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (err) {
      setError(getReadableError(err.code));
    }
  };

  // Task A (existing): Google sign-in
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken(true);
      localStorage.setItem("token", token);
      setUser(result.user);
    } catch (err) {
      setError(getReadableError(err.code));
    }
  };

  // Task A: GitHub sign-in
  const handleGithubSignIn = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const token = await result.user.getIdToken(true);
      localStorage.setItem("token", token);
      setUser(result.user);
    } catch (err) {
      setError(getReadableError(err.code));
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      console.error("Sign out error:", err.message);
    }
  };

  const fetchSecureData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log("No user is signed in.");
        return;
      }
      const token = await currentUser.getIdToken(true);
      localStorage.setItem("token", token);
      const response = await fetch("http://localhost:5001/secure-data", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Secure data:", data);
      } else {
        console.log("Failed to fetch secure data:", response.status);
      }
    } catch (err) {
      console.log("Error fetching secure data:", err.message);
    }
  };


  return (
    <div>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName || user.email}</h3>
          <p>Email: {user.email}</p>
          <button onClick={fetchSecureData}>Fetch Secure Data</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          {/* Task B: Email / Password form */}
          <h2>Email / Password</h2>
          <input
            type= "email"
            placeholder= "Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type= "password"
            placeholder= "Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Log in</button>

          <hr />

          {/*  sign-in */}
          <button onClick={handleGoogleSignIn}>Login with Google</button>
          <button onClick={handleGithubSignIn}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
};

export default Login;
