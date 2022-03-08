import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'UrunSiparisTakipWebPartStrings';
import UrunSiparisTakip from './components/UrunSiparisTakip';
import { IUrunSiparisTakipProps } from './components/IUrunSiparisTakipProps';
import { getSP } from '../common/utils/pnpjsConfig';
import { ServiceFactory } from './services/ServiceFactory';

export interface IUrunSiparisTakipWebPartProps {
  description: string;
}

export default class UrunSiparisTakipWebPart extends BaseClientSideWebPart<IUrunSiparisTakipWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      //Initialize our _sp object that we can then use in other packages without having to pass around the context.
      // Check out pnpjsConfig.ts for an example of a project setup file.
      getSP(this.context);
    });
  }

  public render(): void {
    const element: React.ReactElement<IUrunSiparisTakipProps> = React.createElement(
      UrunSiparisTakip,
      {
        service: ServiceFactory.getEShopService(Environment.type, this.context.serviceScope),
        context: this.context
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
