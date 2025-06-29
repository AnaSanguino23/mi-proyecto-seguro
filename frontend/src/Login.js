// frontend/src/Login.js
import React from "react";

function Login() {
  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <button onClick={loginWithGoogle}>Login con Google</button>
    </div>
  );
}

export default Login;
