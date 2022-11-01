import { UserInterface } from "../interfaces/user.interface";
import { Role } from "./role.model";
import { Tenant } from "./tenant.model";

export class User implements UserInterface {
    /**
     * User id
     */
    public id: string | undefined;
    /**
     * Creation date
     */
    public createdAt: Date| undefined;
    /**
     * Update date
     */
    public updateAt: Date | undefined;
    /**
     * Fullname
     */
    public fullname: string | undefined;
    /**
     * Email
     */
    public email: string | undefined;
    /**
     * Password 
     */
    public password: string | undefined;
    /**
     * New pasword
     * this field will use to be compare 
     * to the password field when the user 
     * is trying to update his password
     */
    public newPassword: string | undefined;
    /**
     * Generated token
     */
    public token: string | undefined;
    /**
     * Verified email boolean
     */
    public verifiedEmail: boolean| undefined;
    /**
     * Agree with terms and conditons boolean
     */
    public agreeWithTerms: boolean| undefined;
    /**
     * Use social login
     */
    public useSocialLogin: boolean| undefined;
    /**
     * Remember me
     */
    public rememberBe: boolean| undefined;
    /**
     * Change password boolean
     */
    public changePassword: boolean| undefined;
    /**
     * Website base url
     */
    public originUrl: string | undefined;
    /**
     * User role
     */
    public role: Role  | undefined;
    /**
     * Tenant
     */
    public tenant: Tenant | undefined;
    /**
     * The use who invited
     */
    public createdBy?: User | undefined;

    /**
     * It's a constructor that takes an optional parameter of type UserInterface. If the parameter is
     * passed, it assigns the values of the parameter to the properties of the class.
     * @param {UserInterface} [user] - UserInterface
     */
    constructor(user?: UserInterface){
        if (user){
            this.id = user.id;
            this.createdAt = user.createdAt;
            this.updateAt = user.updateAt;
            this.fullname = user.fullname;
            this.email = user.email;
            this.password = user.password; 
            this.newPassword = user.newPassword;
            this.token = user.token;
            this.agreeWithTerms = user.agreeWithTerms;
            this.useSocialLogin = user.useSocialLogin;
            this.rememberBe = user.rememberBe;
            this.changePassword = user.changePassword;
            this.originUrl = user.originUrl;
            this.role = user.role;
            this.tenant = user.tenant;
            this.createdBy = user.createdBy;
        }
    }
}