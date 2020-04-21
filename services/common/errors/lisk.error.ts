
export class InsufficientFunds extends Error {

  status = 401;

  constructor(message: string) {
    super(message);
    console.log(this.message)
    this.name = 'InsufficientFunds';
    this.message = message;
  }

}