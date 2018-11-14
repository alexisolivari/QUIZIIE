import {Questions} from "./Questions.model";

export class UserInfoModel {
  constructor(public email : string, public  questionAnswered: Questions[], public isAdmin : boolean, public uid : string){
  }
}
