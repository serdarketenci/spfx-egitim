import { IFilter, ISPService, IUrunSiparisTakip } from "../models";

export interface IUrunSiparisTakipState {
  isLoading:boolean;
  isShowFilter: boolean;
  isShowNewForm:boolean;
  items: IUrunSiparisTakip[];
  filter: IFilter;
}
