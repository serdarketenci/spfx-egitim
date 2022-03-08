import { Product, ISelectionDateRange } from "../../common/models";

import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { AadTokenProviderFactory } from "@microsoft/sp-http";
import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

import Constants from "../../common/utils/Constants";
import { IFilter, ISPFxTestItem, ISPService, IUrunSiparisTakip, SiparisDurumTipleri } from "../models";


export class SPService implements ISPService {

    private _sp: SPFI;

    constructor(serviceScope: ServiceScope) {

        serviceScope.whenFinished(() => {

            const pageContext = serviceScope.consume(PageContext.serviceKey);
            const tokenProviderFactory = serviceScope.consume(AadTokenProviderFactory.serviceKey);

            //Option 1 - with AADTokenProvider
            this._sp = spfi().using(SPFx({
                aadTokenProviderFactory: tokenProviderFactory,
                pageContext: pageContext,
            }));

        });
    }

    public get(options: IFilter): Promise<IUrunSiparisTakip[]> {
        return new Promise<IUrunSiparisTakip[]>(resolve => {

            let filter = `Created ge datetime'${options.selectionDateRange.startDate.toISOString()}' and Created le datetime'${options.selectionDateRange.endDate.toISOString()}' and SiparisDurumKontrol eq '${options.orderStatus}'`;

            this._sp
                .web
                .lists
                .getByTitle(Constants.UrunSiparisTakipListesi)
                .items
                .filter(filter)
                .top(5000)
                // .select('Id, Title, Price, ImageUrl')
                .getPaged()
                .then((data) => {
                    resolve(data.results);
                })
                .catch(() => {

                })
        });
    }

    public add(item: IUrunSiparisTakip) {
        console.error("Errrr");
    }

    public addTest(item: ISPFxTestItem) {
        return new Promise<IUrunSiparisTakip[]>((resolve, reject) => {
            this._sp
                .web
                .lists
                .getByTitle(Constants.SPFxTestListTitle)
                .items
                .add({
                    Title: item.Title,
                    Date: item.Date,
                    IsActive: item.IsActive,
                    UserId: item.User.Id,
                    ShortCodeId: item.ShortCode.Id
                })
                .then((data: any) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
}