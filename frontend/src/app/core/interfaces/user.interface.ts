import { Role } from "../models/role.model";
import { Tenant } from "../models/tenant.model";
import { User } from "../models/user.model";

export interface UserInterface {
    id?: string | undefined;
    /**
     * Creation date
     */
    createdAt?: Date | undefined;
    /**
     * Update date
     */
    updateAt?: Date | undefined;
    /**
     * Fullname
     */
    fullname: string | undefined;
    /**
     * Email
     */
    email: string | undefined;
    /**
     * Password 
     */
    password?: string | undefined;
    /**
     * New pasword
     * this field will use to be compare 
     * to the password field when the user 
     * is trying to update his password
     */
    newPassword?: string | undefined;
    /**
     * Generated token
     */
    token?: string | undefined;
    /**
     * Verified email boolean
     */
    verifiedEmail: boolean | undefined;
    /**
     * Agree with terms and conditons boolean
     */
    agreeWithTerms: boolean | undefined;
    /**
     * Use social login
     */
    useSocialLogin: boolean | undefined;
    /**
     * Remember me
     */
    rememberBe?: boolean | undefined;
    /**
     * Change password boolean
     */
    changePassword?: boolean | undefined;
    /**
     * Website base url
     */
    originUrl?: string | undefined;
    /**
     * User role
     */
    role?: Role | undefined;
    /**
     * Tenant
     */
    tenant?: Tenant | undefined;
    /**
     * The use who invited
     */
    createdBy?: User | undefined;
}