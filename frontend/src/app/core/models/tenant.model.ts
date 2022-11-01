import { TenantInterface } from "../interfaces/tenant-interface";

export class Tenant implements TenantInterface {
    /**
     * Tenant id
     */
    public id: string | undefined;
     /**
      * Date creation
      */
    public createdAt: Date | undefined;
     /**
      * Update dtae
      */
    public updateAt: Date | undefined;
}