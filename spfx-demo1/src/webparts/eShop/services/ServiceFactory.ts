import { EnvironmentType } from "@microsoft/sp-core-library";
import { IEShopService } from "../../common/models";
import { EShopService } from "./EShopService";
import { EShopServiceMock } from "./EShopServiceMock";
import { ServiceScope } from "@microsoft/sp-core-library";


export class ServiceFactory {
    public static getEShopService(environmentType: EnvironmentType, serviceScope: ServiceScope): IEShopService {
        var eShopService: IEShopService;

        if (environmentType == EnvironmentType.Local) {
            eShopService = new EShopServiceMock();
        } else {
            eShopService = new EShopService(serviceScope);
        }

        return eShopService;
    }
}