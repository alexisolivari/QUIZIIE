export class Questions {
  public success : string;
  constructor(public question : string, public  answers: string[], public goodAnswer : string){
    this.success = 'noAnswer'
  }
}
