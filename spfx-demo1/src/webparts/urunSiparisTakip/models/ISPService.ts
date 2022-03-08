import { IFilter, SiparisDurumTipleri, ISPFxTestItem } from ".";
import { ISelectionDateRange, IUrunSiparisTakip } from "../../common/models";

export interface ISPService {
    get(filter: IFilter): Promise<IUrunSiparisTakip[]>;
    add(item: IUrunSiparisTakip);
    addTest(item: ISPFxTestItem);
}