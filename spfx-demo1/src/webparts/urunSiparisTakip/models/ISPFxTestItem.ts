import { IBaseItem, IItem, IPerson } from "../../common/models";


export interface ISPFxTestItem extends IItem {
    User: IPerson;
    Date: Date;
    ShortCode: IBaseItem;
    IsActive: boolean;
}