import { Product, IEShopService, ISelectionDateRange } from "../../common/models";

export class EShopServiceMock implements IEShopService {
    private mockData: Product[] = [
        { Id: 1, Title: 'Bags', Price: 510, ImageUrl: 'https://www.kaft.com/static/images/cache/1200/canta_methonestorm_17007_1200_1200.jpg?cacheID=1636024003000' },
        { Id: 2, Title: 'T-Shirt', Price: 210, ImageUrl: 'https://www.kaft.com/static/images/cache/1200/tisort_straighten_19656_1200_1200.jpg?cacheID=1637095968000' },
        { Id: 3, Title: 'Pakaru - Ocean', Price: 910, ImageUrl: 'https://www.kaft.com/static/images/cache/1200/ceket_pakaruocean_20177_1200_1200.jpg?cacheID=1634125290000' },
        { Id: 4, Title: 'Oileka - Mint', Price: 410, ImageUrl: 'https://www.kaft.com/static/images/cache/1200/kapsonlu_oilekamint_17237_1200_1200.jpg?cacheID=1634120706000' }
    ]

    public getAll(): Promise<Product[]> {
        return new Promise<Product[]>(resolve => {
            setTimeout(() => {
                resolve(this.mockData);
            }, 1000);
        });
    }

    public buy(id: number, quantity: number): Promise<void> {
        return new Promise<void>(resolve => resolve());
    }

    public getUrunSiparisTakipKayitlari(dateRange: ISelectionDateRange): Promise<any[]> {
        return new Promise<Product[]>(resolve => {
            setTimeout(() => {
                resolve(this.mockData);
            }, 1000);
        });
    }
}