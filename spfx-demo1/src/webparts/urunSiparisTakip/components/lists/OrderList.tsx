import { DetailsList, IColumn, SelectionMode } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import { IUrunSiparisTakip, SiparisDurumTipleri } from "../../models";
import styles from "./OrderList.module.scss";

export interface IOrderListProps {
    items: IUrunSiparisTakip[];

}

export const OrderList: React.FunctionComponent<IOrderListProps> = (props) => {
    const columns: IColumn[] = [
        {
            key: 'TalepEden',
            name: 'Talep Eden',
            fieldName: 'TalepEden',
            minWidth: 120,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'KategoriKodu',
            name: 'Kategori Kodu',
            fieldName: 'KategoriKodu',
            minWidth: 90,
            maxWidth: 110,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'AlimGrubu',
            name: 'Alım Grubu',
            fieldName: 'AlimGrubu',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isMultiline: true,
            isResizable: true
        },
        {
            key: 'UrunKodu',
            name: 'Ürün Kodu',
            fieldName: 'UrunKodu',
            minWidth: 60,
            maxWidth: 90,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'UrunDetayi',
            name: 'Ürün Detayı',
            fieldName: 'UrunDetayi',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isMultiline: true,
            isResizable: true
        },
        {
            key: 'TalepEden',
            name: 'Talep Eden',
            fieldName: 'TalepEden',
            minWidth: 120,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'SiparisDurumKontrol',
            name: 'Sipariş Durum Kontrol',
            fieldName: 'SiparisDurumKontrol',
            minWidth: 150,
            maxWidth: 170,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'SiparisVerilmeTarihi',
            name: 'Sipariş Verilme Tarihi',
            fieldName: 'SiparisVerilmeTarihi',
            minWidth: 120,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'TalepTarihi',
            name: 'Talep Tarihi',
            fieldName: 'TalepTarihi',
            minWidth: 120,
            maxWidth: 150,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'LogoSiparisVerilenMiktar',
            name: 'Logo Sipariş Verilen Miktar',
            fieldName: 'LogoSiparisVerilenMiktar',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true
        },
        {
            key: 'Lokasyon',
            name: 'Lokasyon',
            fieldName: 'Lokasyon',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isMultiline: true,
            isResizable: true
        },
        {
            key: 'UrunAciklama',
            name: 'Ürün Açıklama',
            fieldName: 'UrunAciklama',
            minWidth: 210,
            maxWidth: 350,
            isRowHeader: true,
            isResizable: true,
            isMultiline: true,
            onRender: (item) => {
                return <div dangerouslySetInnerHTML={{ __html: item.UrunAciklama }}></div>;
            },
        }
    ];

    return (<div className={styles.orderList}>
        <DetailsList
            items={props.items}
            columns={columns}
            onRenderRow={(props, defaultRender) => {
                let rowColorClassName;
                if (props.item.SiparisDurumKontrol == SiparisDurumTipleri.SiparisVerildi) {
                    rowColorClassName = styles.gray;
                } else {
                    rowColorClassName = styles.white;
                }
                return (<div className={styles.detailListRow}>
                    {defaultRender({ ...props, className: rowColorClassName })}
                </div>)
            }}
            selectionMode={SelectionMode.none}
            isHeaderVisible={true}
        />
    </div>
    )
}