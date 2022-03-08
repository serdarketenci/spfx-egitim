import { SiparisDurumTipleri } from ".";
import { IItem } from "../../common/models/IItem";

export interface IUrunSiparisTakip extends IItem {
    SayTalepID: number;
    TalepEden: string;
    KategoriKodu: string;
    AlimGrubu: string;
    UrunKodu: string;
    UrunDetayi: string;
    SiparisDurumKontrol: SiparisDurumTipleri;
    SiparisVerilmeTarihi: string;
    TalepTarihi: string;
    LogoSiparisVerilenMiktar: string;
    Lokasyon: string;
    UrunAciklama: string;
}