

import { Checkbox, DatePicker, FontWeights, getIconContent, getTheme, IButtonStyles, IconButton, IIconProps, Label, mergeStyleSets, MessageBar, MessageBarType, Modal, PrimaryButton, Spinner, SpinnerSize, TextField } from "office-ui-fabric-react";
import * as React from "react";
import { useState } from "react";
import { DayPickerStrings } from "../../../common/utils/DayPickerStrings";
import * as moment from 'moment';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListItemPicker } from '@pnp/spfx-controls-react/lib/ListItemPicker';
import { FormStateType, IFormState, ISPFxTestItem, ISPService } from "../../models";

export interface INewFormProps {
    isOpen: boolean;
    onDismiss: Function;
    context: WebPartContext;
    service: ISPService;
}



export const NewForm: React.FunctionComponent<INewFormProps> = (props) => {
    const [formState, setFormState] = useState<IFormState>({
        FormStateType: FormStateType.Loading,
        Message: ''
    });

    const defaultItem = {
        Title: '',
        Id: null,
        Date: null,
        ShortCode: null,
        User: null,
        Created: null,
        CreatedBy: null,
        Modifed: null,
        ModifiedBy: null,
        IsActive: false
    };

    const [item, setItem] = useState<ISPFxTestItem>(defaultItem);

    const titleId = 'NewFormTitleId';
    const theme = getTheme();
    const cancelIcon: IIconProps = { iconName: 'Cancel' };
    const contentStyles = mergeStyleSets({
        container: {
            display: 'flex',
            flexFlow: 'column nowrap',
            alignItems: 'stretch',
        },
        header: [
            // eslint-disable-next-line deprecation/deprecation
            theme.fonts.xLargePlus,
            {
                flex: '1 1 auto',
                borderTop: `4px solid ${theme.palette.themePrimary}`,
                color: theme.palette.neutralPrimary,
                display: 'flex',
                alignItems: 'center',
                fontWeight: FontWeights.semibold,
                padding: '12px 12px 14px 24px',
            },
        ],
        body: {
            flex: '4 4 auto',
            padding: '0 24px 24px 24px',
            overflowY: 'hidden',
            selectors: {
                p: { margin: '14px 0' },
                'p:first-child': { marginTop: 0 },
                'p:last-child': { marginBottom: 0 },
            },
        },
    });

    const iconButtonStyles: Partial<IButtonStyles> = {
        root: {
            color: theme.palette.neutralPrimary,
            marginLeft: 'auto',
            marginTop: '4px',
            marginRight: '2px',
        },
        rootHovered: {
            color: theme.palette.neutralDark,
        },
    };

    React.useEffect(() => {
        setFormState({
            FormStateType: FormStateType.Loaded,
            Message: ''
        });
    }, []);

    const dismissPanel = (applyFilter: boolean) => {
        props.onDismiss(null);
    }

    const isValidForm = () => {
        if (!item.Title || item.Title.trim() === "") {
            return false;
        }

        if (!item.Date || !item.User || !item.ShortCode) {
            return false;
        }

        return true;
    }

    const getMessageBarContent = () => {
        if (formState.FormStateType == FormStateType.Fail) {
            return <MessageBar
                messageBarType={MessageBarType.error}
                isMultiline={true}
            >
                {formState.Message}
            </MessageBar>
        }
        else if (formState.FormStateType == FormStateType.Success) {
            return <MessageBar
                messageBarType={MessageBarType.success}
                isMultiline={true}
            >
                {formState.Message}
            </MessageBar>
        }
        else if (formState.FormStateType == FormStateType.InvalidForm) {
            return <MessageBar
                messageBarType={MessageBarType.severeWarning}
                isMultiline={true}
            >
                {formState.Message}
            </MessageBar>
        }

        return null;
    }

    const getContent = () => {
        if (formState.FormStateType == FormStateType.Loading) {
            return <Spinner size={SpinnerSize.medium} />
        }

        return <div>
            {getMessageBarContent()}
            <div>
                <TextField
                    label="Başlık"
                    value={item.Title}
                    onChange={(event, newValue) => { setItem({ ...item, Title: newValue }) }}
                />
            </div>
            <div>
                <DatePicker
                    placeholder="Tarih seçiniz..."
                    label="Tarih"
                    ariaLabel="Tarih seçiniz"
                    value={item.Date}
                    formatDate={(date) => {
                        return moment(date).format("DD.MM.YYYY");
                    }}
                    onSelectDate={(date) => { setItem({ ...item, Date: date }) }}
                    strings={DayPickerStrings}
                />
            </div>
            <div>
                <Checkbox
                    checked={item.IsActive}
                    label="Aktif Mi?"
                    onChange={(ev, checked) => {
                        setItem({ ...item, IsActive: checked });
                    }} />
            </div>
            <div>
                <PeoplePicker
                    context={props.context as any}
                    titleText="Personel"
                    personSelectionLimit={1}
                    showtooltip={true}
                    required={true}
                    onChange={(items: any[]) => {
                        if (items.length > 0) {
                            setItem({
                                ...item, User: {
                                    Id: items[0].id,
                                    Title: items[0].text,
                                    Username: items[0].loginName,
                                    PictureUrl: items[0].imageUrl
                                }
                            });
                        }
                        else {
                            setItem({ ...item, User: null });
                        }
                    }}
                    showHiddenInUI={false}
                    ensureUser={true}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={500} />
            </div>
            <div>
                <ListItemPicker
                    listId='6f0cc844-a396-46d4-8f89-b7bf98a0f3b6'
                    columnInternalName='AltBolumAdi'
                    keyColumnInternalName='Id'
                    defaultSelectedItems={item.ShortCode ? [{
                        key: item.ShortCode.Id,
                        name: item.ShortCode.Title
                    }] : []}
                    orderBy={"AltBolumAdi"}
                    label="Alt Bölüm Kodu"
                    itemLimit={1}
                    onSelectedItem={(items) => {
                        if (items.length > 0) {
                            setItem({
                                ...item, ShortCode: {
                                    Id: items[0].key,
                                    Title: items[0].name
                                }
                            });
                        }
                        else {
                            setItem({ ...item, ShortCode: null });
                        }
                    }}
                    context={props.context as any} />
            </div>
        </div>
    }

    return (<Modal
        isOpen={props.isOpen}
        titleAriaId={titleId}
        containerClassName={contentStyles.container}
        isModeless={true}
        onDismiss={() => { dismissPanel(null) }}
    >
        <div className={contentStyles.header}>
            <span id={titleId}>Yeni Kayıt Ekranı</span>
            <IconButton
                styles={iconButtonStyles}
                iconProps={cancelIcon}
                ariaLabel="Kapat"
                onClick={() => { dismissPanel(null) }}
            />
        </div>
        <div className={contentStyles.body}>
            {getContent()}
            <div>
                <PrimaryButton text="Kaydet"
                    disabled={formState.FormStateType == FormStateType.Loading}
                    onClick={() => {
                        if (isValidForm() == true) {
                            setFormState({
                                FormStateType: FormStateType.Loading,
                                Message: ''
                            });

                            props.service.addTest(item)
                                .then((data) => {
                                    setItem(defaultItem);
                                    setFormState({
                                        FormStateType: FormStateType.Success,
                                        Message: 'Kayıt başarıyla oluşturuldu.'
                                    });
                                })
                                .catch((err) => {
                                    setFormState({
                                        FormStateType: FormStateType.Fail,
                                        Message: `Hata oluştu, lütfen tekrar deneyiniz. Hata detayı: ${err.toString()}`
                                    });
                                });
                        }
                        else{
                            setFormState({
                                FormStateType: FormStateType.InvalidForm,
                                Message: 'Lütfen tüm alanları doldurunuz.'
                            });
                        }


                    }} />
            </div>
        </div>
    </Modal>);
}