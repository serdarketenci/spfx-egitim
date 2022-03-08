import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'EShopWebPartStrings';
import EShop from './components/EShop';
import { IEShopProps } from './components/IEShopProps';
import { getSP } from '../common/utils/pnpjsConfig';
import { EShopService } from './services/EShopService';
import { ServiceFactory } from './services/ServiceFactory';

export interface IEShopWebPartProps {
  description: string;
}

export default class EShopWebPart extends BaseClientSideWebPart<IEShopWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      //Initialize our _sp object that we can then use in other packages without having to pass around the context.
      // Check out pnpjsConfig.ts for an example of a project setup file.
      getSP(this.context);
    });
  }


  public render(): void {
    const element: React.ReactElement<IEShopProps> = React.createElement(
      EShop,
      {
        service: ServiceFactory.getEShopService(Environment.type, this.context.serviceScope)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
