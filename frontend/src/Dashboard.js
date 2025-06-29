import React from "react";
import useUser from "./useUser";

function Dashboard() {
  const { user, loading } = useUser();

  if (loading) return <p>Cargando perfil...</p>;
  if (!user) return <p>No se encontró el perfil.</p>;

  return (
    <div>
      <h1>Bienvenida, {user.name}</h1>
      <p>Correo: {user.email}</p>
      <img src={user.photo} alt="Foto de perfil" width="150" />
    </div>
  );
}

export default Dashboard;
