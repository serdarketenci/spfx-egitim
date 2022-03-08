import { IProduct, ISelectionDateRange } from "../../common/models";

export interface IEShopState {
    products: IProduct[];
    filter: string;
    isLoading: boolean;
    selectionDateRage: ISelectionDateRange;
}
