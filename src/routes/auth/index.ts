import { PrismaClient } from "@prisma/client";
import express, { Router, Request, Response } from "express";
import tokenToCookie from "../../helpers/auth/tokenToCookie";
import AuthService from "../../services/auth";
import { AuthResponse } from "../../types/auth";

const authRouter = (app: express.Application) => {
  const authService: AuthService = new AuthService();

  const router: express.IRouter = Router();
  app.use("/api/auth", router);

  router.post("/register", async (req: Request, res: Response) => {
    const user = await authService.register(req.body);
    return res.json(user);
  });

  router.post("/login", async (req: Request, res: Response) => {
    const response: AuthResponse = await authService.login(req.body);
    if (response.success) {
      return tokenToCookie(res, response, 200);
    }
    return tokenToCookie(res, response, 400);
  });
};

export default authRouter;
