export class Player {
  public Id: string;
  public Nome: string;
  public Atk: number;
  public IsMonset: Boolean;
  public Int: Number;
  public Vida: Number;
  public ID_Player: Number;

  constructor(
    Id: string,
    Nome: string,
    Atk: number,
    IsMonset: boolean,
    Int: number,
    Vida: number,
    ID_Player: number
  ) {
    this.Id = Id;
    this.Nome = Nome;
    this.Atk = Atk;
    this.IsMonset = IsMonset;
    this.Int = Int;
    this.Vida = Vida;
    this.ID_Player = ID_Player;
  }
}
