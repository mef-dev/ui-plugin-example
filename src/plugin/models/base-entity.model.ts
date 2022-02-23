export class BaseEntity {
    Id: string;
    Name: string;
    ParentId: string;
    Format: string;
    Lang: string;
    IsCoerced: boolean;
    CustomAttributes: any;
}
