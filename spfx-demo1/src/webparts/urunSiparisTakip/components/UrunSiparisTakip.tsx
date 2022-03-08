import * as React from 'react';
import styles from './UrunSiparisTakip.module.scss';
import { IUrunSiparisTakipProps } from './IUrunSiparisTakipProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { CommandBar, CompoundButton, DetailsList, getIconContent, IColumn, Panel, SelectionMode, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { IUrunSiparisTakipState } from './IUrunSiparisTakipState';
import { IFilter, IUrunSiparisTakip, SiparisDurumTipleri } from '../models';
import { FilterPanel } from './filters/FilterPanel';
import { OrderList } from './lists/OrderList';
import { NewForm } from './forms/NewForm';

export default class UrunSiparisTakip extends React.Component<IUrunSiparisTakipProps, IUrunSiparisTakipState> {
  private readonly dateOffset = 120;
  private readonly selectionKey = "selection";


  constructor(props: IUrunSiparisTakipProps) {
    super(props);

    var endDate = new Date();
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - this.dateOffset);


    this.state = {
      isLoading: true,
      isShowFilter: false,
      isShowNewForm: false,
      items: [],
      filter: {
        selectionDateRange: {
          startDate,
          endDate,
          key: this.selectionKey
        },
        orderStatus: SiparisDurumTipleri.SiparisVerildi
      }
    }
  }

  onDismissPanel = (filter: IFilter) => {
    console.log(filter);
    if (filter != null) {
      this.setState({
        filter
      }, () => {
        this.setState({
          isLoading: true
        });

        this.getItems();
      });
    }
    this.togglePanel();
  }

  onDismissModal = (filter: IFilter) => {
    console.log(filter);
    // if (filter != null) {
    //   this.setState({
    //     filter
    //   }, () => {
    //     this.setState({
    //       isLoading: true
    //     });

    //     this.getItems();
    //   });
    // }
    this.toggleModal();
  }

  componentDidMount(): void {
    this.getItems();
  }

  getItems(): void {
    this.props.service.get(this.state.filter)
      .then((data: IUrunSiparisTakip[]) => {
        this.setState({
          items: data,
          isLoading: false
        })
      })
      .catch((err) => {
        console.error("err", err);
      });
  }


  getContent = () => {
    if (this.state.isLoading == true) {
      return <Spinner size={SpinnerSize.medium} />
    }
    else if (this.state.items.length === 0) {
      return <div>Kayıt bulunmamaktadır.</div>
    }

    return <OrderList items={this.state.items} />
  }

  /// private methods
  private togglePanel = () => {
    this.setState({
      isShowFilter: !this.state.isShowFilter
    });
  }

  private toggleModal = () => {
    this.setState({
      isShowNewForm: !this.state.isShowNewForm
    });
  }

  public render(): React.ReactElement<IUrunSiparisTakipProps> {
    return (
      <div className={styles.urunSiparisTakip}>
        <CommandBar
          items={[{
            key: 'newItem',
            text: 'Yeni',
            iconProps: { iconName: 'Add' },
            split: true,
            ariaLabel: 'Yeni',
            onClick: () => {
              this.toggleModal();
            }
          }, {
            key: 'filter',
            text: 'Filtre Uygula',
            iconProps: { iconName: 'filter' },
            ariaLabel: 'Filtre Uygula',
            onClick: () => {
              this.togglePanel();
            }
          }]}
        />
        {this.getContent()}


        <FilterPanel
          isOpen={this.state.isShowFilter}
          filter={this.state.filter}
          onDismiss={this.onDismissPanel}
        />

        <NewForm
          isOpen={this.state.isShowNewForm}
          onDismiss={this.onDismissModal}
          context={this.props.context}
          service={this.props.service}
        />
      </div>

    );
  }
}
