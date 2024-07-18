import * as BaseResponse from "./baseResponse";

export interface MemberEntity {
    id: number,
    name: string,
    email: string,
    password: string,
    api_token: string,
    address: string,
    city: string,
    country: string,
    point: number,
}

export default interface Member extends BaseResponse {
    data: MemberEntity
}