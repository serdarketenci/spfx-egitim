import { IProduct, ISelectionDateRange, IUrunSiparisTakip } from ".";

export interface IEShopService {
    getAll(): Promise<IProduct[]>;
    buy(id: number, quantity: number);
    getUrunSiparisTakipKayitlari(dateRange: ISelectionDateRange): Promise<IUrunSiparisTakip[]>;
}