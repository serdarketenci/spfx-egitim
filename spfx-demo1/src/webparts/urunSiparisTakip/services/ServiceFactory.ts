import { EnvironmentType } from "@microsoft/sp-core-library";
import { ServiceScope } from "@microsoft/sp-core-library";
import { ISPService } from "../models";
import { SPService } from "./SPService";


export class ServiceFactory {
    public static getEShopService(environmentType: EnvironmentType, serviceScope: ServiceScope): ISPService {
        var spService: ISPService;

        if (environmentType == EnvironmentType.Local) {
            console.error("Lütfen local ortamı çalışması için entegrasyon sağlayınız.");
        } else {
            spService = new SPService(serviceScope);
        }

        return spService;
    }
}