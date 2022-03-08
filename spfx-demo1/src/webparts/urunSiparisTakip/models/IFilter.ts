import { SiparisDurumTipleri } from ".";
import { ISelectionDateRange } from "../../common/models";

export interface IFilter {
    selectionDateRange: ISelectionDateRange;
    orderStatus: SiparisDurumTipleri;
}