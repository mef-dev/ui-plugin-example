import {Deserializable} from '../interfaces/deserializable.model';

export class CustomerAccountModel implements Deserializable {

    ACCOUNT_TYPES: string;
    Total: number;
    NUM_QTY: number;
    lang: string;
    IsExternalID: number;
    CLIENT_NAME: string;
    CLIENT_CONTRACT: string;
    CLI_OKPO: string;
    ABN_ID: number;
    ACCOUNT_STATUS_CLOSED: number;
    ACCOUNT_ID: number;
    ACCOUNT: string;
    BILL_NO: string;
    CustomAttributes: any;
    Format: any;
    IDType: any;
    Id: any;
    IsCoerced: any;
    Lang: any;
    Name: any;
    ParentId: any;

    status_metadata: any;
    status: any;

    deserialize(input: any): this {
        this.ACCOUNT = input.account;
        this.ACCOUNT_ID = input.accounT_ID;
        this.ACCOUNT_STATUS_CLOSED = input.accounT_STATUS_CLOSED;
        this.ACCOUNT_TYPES = input.accounT_TYPES;
        this.CLI_OKPO = input.clI_OKPO;
        this.CLIENT_NAME = input.clienT_NAME;
        this.NUM_QTY = input.nuM_QTY;
        this.Total = input.total;
        this.ABN_ID = input.abN_ID;
        return this;
    }


}
