import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPService } from "../models";

export interface IUrunSiparisTakipProps {
  service: ISPService;
  context: WebPartContext;
}
