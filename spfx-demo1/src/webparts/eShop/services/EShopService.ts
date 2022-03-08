import { Product, IEShopService, ISelectionDateRange } from "../../common/models";

import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { AadTokenProviderFactory } from "@microsoft/sp-http";
import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

import Constants from "../../common/utils/Constants";


export class EShopService implements IEShopService {

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

    public getAll(): Promise<Product[]> {
        return new Promise<Product[]>(resolve => {
            this._sp
                .web
                .lists
                .getByTitle(Constants.ProductsListName)
                .items
                .select('Id, Title, Price, ImageUrl')
                .getPaged()
                .then((data) => {
                    var products = data.results.map((p) => {
                        return new Product({
                            Id: p.Id,
                            Title: p.Title,
                            Price: p.Price,
                            ImageUrl: p.ImageUrl
                        });
                    });

                    resolve(products);
                })
                .catch(() => {

                })
        });
    }

    public buy(id: number, quantity: number): Promise<void> {
        return new Promise<void>(resolve => resolve());
    }

    public getUrunSiparisTakipKayitlari(dateRange: ISelectionDateRange): Promise<any[]> {
        return new Promise<Product[]>(resolve => {
            let filter = `Created ge datetime'${dateRange.startDate.toISOString()}' and Created le datetime'${dateRange.endDate.toISOString()}' and SiparisDurumKontrol eq 'Sipariş Verildi'`;

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
                    // var products = data.results.map((p) => {
                    //     return new Product({
                    //         Id: p.Id,
                    //         Title: p.Title,
                    //         Price: p.Price,
                    //         ImageUrl: p.ImageUrl
                    //     });
                    // });

                    resolve(data.results);
                })
                .catch(() => {

                })
        });
    }
}