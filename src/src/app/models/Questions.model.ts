export class Questions {
  public success : string;
  constructor(public auteur: string, public question : string, public  answers: string[], public goodAnswer : string){
    this.success = 'noAnswer'
  }



}
