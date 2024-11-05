export class LoginForm {
  username: string;
  password: string;
  constructor() {
    this.username = "";
    this.password = "";
  }
}

export class Item  {
  id?: number;
  name?: string;
  sellPrice?: number;
  quantity?: number;
  max_qty?: number;
  category?: string;
};
