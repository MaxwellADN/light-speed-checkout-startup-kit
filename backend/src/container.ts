import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import { AuthController } from "./controllers/auth.controller";
import { RoleController } from "./controllers/role.controller";
import { UserController } from "./controllers/user.controller";
import { AuthEmailService } from "./services/auth-email.service";
import { AuthService } from "./services/auth.service";
import { BearerTokenService } from "./services/bearer-token.service";
import { EncryptionService } from "./services/encryption.service";
import { RoleService } from "./services/role.service";
import { TenantService } from "./services/tenant.service";
import { UserService } from "./services/user.service";


export const loadContainer = (app: Application) => {
    const Container = createContainer({
        injectionMode: 'CLASSIC'
    });
    Container.register({
        // Controllers 
        authController: asClass(AuthController).scoped(),
        userController: asClass(UserController).scoped(),
        roleController: asClass(RoleController).scoped(),
        
        // Services 
        userService: asClass(UserService).scoped(),
        tenantService: asClass(TenantService).scoped(),
        roleService: asClass(RoleService).scoped(),
        encryptionService: asClass(EncryptionService).scoped(),
        bearerTokenService: asClass(BearerTokenService).scoped(),
        authService: asClass(AuthService).scoped(),
        authEmailService: asClass(AuthEmailService).scoped(),
    })
    app.use(scopePerRequest(Container));
}