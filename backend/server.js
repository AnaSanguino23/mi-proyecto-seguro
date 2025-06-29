require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      };

      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      user.token = token;

      return done(null, user);
    }
  )
);


app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Iniciar sesión con Google</a>`);
});


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const token = req.user.token;
    
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);


app.get("/auth/failure", (req, res) => {
  res.send("Fallo en la autenticación");
});


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}


app.get("/perfil", verifyToken, (req, res) => {
  res.json({
    mensaje: "Ruta protegida accedida correctamente",
    usuario: req.user,
  });
});


app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});

module.exports = app;

