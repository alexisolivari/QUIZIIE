export class Questions {
  public success : string;

  constructor( public auteur: string, public question : string, public  answers: string[], public goodAnswer : string,public questionVote : number){
    this.success = 'noAnswer';
  }

  upVote(){
    this.questionVote++;
  }

  downVote(){
    this.questionVote--;
  }



}
