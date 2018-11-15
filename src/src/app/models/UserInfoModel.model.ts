import {Questions} from "./Questions.model";

export class UserInfoModel {
  constructor(public email : string,  public isAdmin : boolean, public uid : string){
  }
}
