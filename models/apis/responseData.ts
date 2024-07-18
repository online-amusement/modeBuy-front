import * as ModeBuy from '../../vendor/apis/modeBuy';
import Basic from './basic';
import * as Member from '../entitis/member';

export default class ResponseData extends Basic { 
  
  //仮登録
  public static temporaryRegistration(email:string):Promise<any> {
    return this.createPromise(ModeBuy.temporaryRegistration, {
        email: email
    })
  }

  //本登録
  public static officialRegistration(name: string, password: string, token: string, address: string, city: string, country: string):Promise<any> {
    return this.createPromise(ModeBuy.officialRegistration, {
      name: name,
      password: password,
      token: token,
      address: address,
      city: city,
      country: country
    })
  }

  //ログイン
  public static login(email: string, password: string):Promise<any> {
    return this.createPromise(ModeBuy.officialRegistration, {
        email: email,
        password: password
    })
  }

  //ログアウト
  public static logout(member_id: string):Promise<any> {
    return this.createPromise(ModeBuy.officialRegistration, {
      member_id,
    })
  }
}