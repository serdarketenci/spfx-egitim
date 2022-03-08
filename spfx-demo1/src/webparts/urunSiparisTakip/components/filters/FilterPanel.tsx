import * as React from "react";
import { useState } from "react";
import { ComboBox, DefaultButton, IComboBoxOption, Label, Panel, PanelType, PrimaryButton } from "office-ui-fabric-react"
import { IFilter, SiparisDurumTipleri } from "../../models";
import styles from "./FilterPanel.module.scss";

// IMPORT Date Range Picker
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import { ISelectionDateRange } from "../../../common/models";

export interface IFilterPanelProps {
    isOpen: boolean;
    filter: IFilter;
    onDismiss: Function;
}

export const FilterPanel: React.FunctionComponent<IFilterPanelProps> = (props) => {
    const [selectionDateRange, setSelectionDateRange] = useState<ISelectionDateRange>(props.filter.selectionDateRange);
    const [orderStatus, setOrderStatus] = useState<SiparisDurumTipleri>(props.filter.orderStatus);
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

    const getOrderStatus = () => {
        var data: IComboBoxOption[] = [];

        for (const key in SiparisDurumTipleri) {
            if (Object.prototype.hasOwnProperty.call(SiparisDurumTipleri, key)) {
                const element = SiparisDurumTipleri[key];
                data.push({
                    key: element,
                    text: element
                });
            }
        }

        return data;
    }

    const dismissPanel = (applyFilter: boolean) => {
        if (applyFilter == true) {
            props.onDismiss({
                selectionDateRange,
                orderStatus
            });
        } else {
            props.onDismiss(null);
        }

    }

    const onRenderFooterContent = () => {
        return <div>
            <PrimaryButton onClick={dismissPanel.bind(this, true)}>
                Kaydet
            </PrimaryButton>
            <DefaultButton onClick={dismissPanel.bind(this, false)}>Çıkış</DefaultButton>
        </div>
    }

    return <Panel
        headerText="Filtre Ekranı"
        isOpen={props.isOpen}
        type={PanelType.medium}
        onDismiss={() => {
            // TO DOO
        }}
        closeButtonAriaLabel="Kapat"
        isFooterAtBottom={true}
        onRenderFooterContent={onRenderFooterContent}
    >
        <div className={styles.filterPanel}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <Label>Sipariş Baş. ve Bit. Tarihi:</Label>
                    <DateRange
                        locale={locales['tr']}
                        ranges={[selectionDateRange]}
                        onChange={(ranges: any) => { setSelectionDateRange(ranges.selection) }}
                    />
                </div>
            </div>
            <hr />
            <div className={styles.row}>
                <div className={styles.column}>
                    <Label>Sipariş Durumu:</Label>
                    <ComboBox
                        defaultSelectedKey={orderStatus}
                        selectedKey={orderStatus}
                        options={getOrderStatus()}
                        onChange={(event, options) => {
                            let value: any = options.key;
                            setOrderStatus(value);
                        }}
                    />
                </div>
            </div>
        </div>
    </Panel>
}