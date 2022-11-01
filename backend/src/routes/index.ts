import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { RoleController } from "../controllers/role.controller";

export default class Routes {
    public router = Router();

    constructor(
        private readonly authController: AuthController,
        private readonly roleController: RoleController
    ) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.use('/auth/sign-up', this.authController.signUp);
        this.router.use('/role/create', this.roleController.create);
    }
}