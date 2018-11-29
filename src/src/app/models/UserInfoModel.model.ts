import {Questions} from "./Questions.model";

export class UserInfoModel {
  constructor(public pseudo: string, public email : string,  public isAdmin : boolean, public uid : string){
  }
}
