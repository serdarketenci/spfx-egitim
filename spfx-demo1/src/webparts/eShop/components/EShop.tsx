import * as React from 'react';
import styles from './EShop.module.scss';
import { IEShopProps } from './IEShopProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PrimaryButton, SearchBox, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import ProductItem from './product/ProductItem';
import { IEShopState } from './EShopState';
import { EShopServiceMock } from '../services/EShopServiceMock';
import { IProduct, IUrunSiparisTakip } from '../../common/models';

// IMPORT Date Range Picker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';

export default class EShop extends React.Component<IEShopProps, IEShopState> {
  private dateOffset = 120;
  constructor(props: IEShopProps) {
    super(props);
    console.error("constructor calisti");
    var endDate = new Date();
    var startDate = new Date();
    startDate.setDate(startDate.getDate() - this.dateOffset);

    this.state = {
      products: [],
      filter: "",
      isLoading: true,
      selectionDateRage: {
        startDate,
        endDate,
        key: 'selection'
      }
    }
  }

  getItems(): void {
    this.props.service.getUrunSiparisTakipKayitlari(this.state.selectionDateRage)
      .then((data: IUrunSiparisTakip[]) => {
        debugger;
        // this.setState({
        //   products: data,
        //   isLoading: false
        // })
      })
      .catch((err) => {
        console.error("err", err);
      });
  }

  componentDidMount(): void {
    console.error("componentDidMount basladi");
    this.getItems();
    console.error("componentDidMount bitti");
  }

  getContent = () => {
    if (this.state.isLoading == true) {
      return <Spinner size={SpinnerSize.medium} />
    }
    else if (this.state.products.length === 0) {
      return <div>Kayıt bulunmamaktadır.</div>
    }

    return this.state.products
      .filter(p => p.Title.toLocaleLowerCase().indexOf(this.state.filter) > -1)
      .map((product) => {
        return <ProductItem product={product} key={product.Id} />
      });
  };

  changeSearch = (newValue) => {
    this.setState({
      filter: newValue
    });
  }

  changeDateRange = (ranges: any) => {
    console.log(ranges);
    this.setState({
      selectionDateRage: ranges.selection
    });
  }

  setFilter = () => {
    this.getItems();
  }

  public render(): React.ReactElement<IEShopProps> {
    console.error("render");

    return (
      <div className={styles.eShop}>
        <SearchBox
          placeholder='Ara'
          value={this.state.filter}
          onChange={this.changeSearch}
          onSearch={(newValue) => {
            console.error(newValue);
          }}
        />

        <DateRange
          locale={locales['tr']}
          ranges={[this.state.selectionDateRage]}
          onChange={this.changeDateRange}
        />

        <PrimaryButton text="Filtrele" onClick={this.setFilter} />

        {this.getContent()}
      </div>
    );
  }
}
