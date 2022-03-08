import { IBaseItem, IPerson } from ".";

export interface IItem extends IBaseItem {
    Created: Date;
    CreatedBy: IPerson;
    Modifed: Date;
    ModifiedBy: IPerson;
}