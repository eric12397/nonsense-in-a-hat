import { v4 as uuidv4 } from 'uuid';

export class Player {
  public id: string;

  public name: string;

  public avatar: string;

  constructor() {
    this.id = uuidv4();
  }
}
