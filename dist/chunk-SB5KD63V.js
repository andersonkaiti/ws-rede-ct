// src/app.ts
import express from "express";

// src/routes/index-routes.ts
import { Router } from "express";
var router = Router();
router.get("/", (_req, res) => {
  res.status(200).json({
    message: "Rede CT"
  });
});

// src/routes/auth-routes.ts
import { Router as Router2 } from "express";

// src/clerk.ts
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
var clerkAuth = ClerkExpressWithAuth();
var clerkMiddleware = (req, res, next) => {
  return clerkAuth(req, res, next);
};

// src/routes/auth-routes.ts
var router2 = Router2();
router2.get("/", clerkMiddleware, (req, res) => {
  const auth = req.auth;
  if (!auth || !auth.userId) {
    return res.status(401).json({ message: "N\xE3o autenticado" });
  }
  res.status(200).json({
    message: "Usu\xE1rio autenticado com Clerk",
    userId: auth.userId
  });
});

// src/app.ts
import cors from "cors";
var app = express();
var corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: ["http://localhost:3000", "https://rede-ct.vercel.app"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.use("/auth", router2);

export {
  app
};
