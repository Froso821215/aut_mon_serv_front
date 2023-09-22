export interface IInstance{
    id:number;
    typeInstance:string;
    nameInstance:string;
    ip:string;
    status:number;
}

export interface IReportGen{
    ip:string;
    instance:string;
    status:string;
    targetDisplayName:string;
    full_path:string;
}