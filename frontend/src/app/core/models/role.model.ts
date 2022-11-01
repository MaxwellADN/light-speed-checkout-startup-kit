import { RoleInterface } from "../interfaces/role.interface";

export class Role implements RoleInterface {
    /**
     * Role id
     */
    public id: string | undefined;
    /**
     * Date creation
     */
    public createdAt: Date | undefined;
    /**
     * Updated date
     */
    public updateAt: Date | undefined
    /**
     * Role name
     */
    public name: string | undefined;

    constructor(role?: RoleInterface) {
        if (role) {
            this.id = role.id;
            this.createdAt = role.createdAt;
            this.updateAt = role.updateAt;
            this.name = role.name;
        }
    }
}