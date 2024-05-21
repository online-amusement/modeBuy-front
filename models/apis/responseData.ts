import * as ModeBuy from '../../vendor/apis/modeBuy';
//import { Member } from '../entitis/member';

export default class ResponseData { 
  
  //仮登録
   public static temporaryRegistration(email: string): Promise<any> {
    return new Promise(() => {
      const response = ModeBuy.temporaryRegistration({
        email: email
      });
      try {
        Promise.resolve(response)
      }catch(error) {
        Promise.reject(error)
      }
    })
  }

  //本登録
  public static officialRegistration(name: string, password: string, token: string, address: string, city: string, country: string): Promise<any> {
    return new Promise(() => {
      const response = ModeBuy.officialRegistration({
        name: name,
        password: password,
        token: token,
        address: address,
        city: city,
        country: country
      });
      try {
        Promise.resolve(response)
      }catch(error) {
        Promise.reject(error)
      }
    })
  }

  //ログイン
  public static login(email: string, password: string)
  {
    return new Promise(() => {
      const response = ModeBuy.login({
        email: email,
        password: password
      });
      try {
        Promise.resolve(response)
      }catch(error) {
        Promise.reject(error)
      }
    });
  }

  //ログアウト
  public static logout(member_id: string)
  {
    return new Promise(() => {
      const response = ModeBuy.logout({
        member_id,
      });
      try {
        Promise.resolve(response)
      } catch(error) {
        Promise.reject(error)
      }
    })
  }
}