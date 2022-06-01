export class Comment {
  constructor(
    public id: number,
    public description: string,
    public offer_id: number,
    public user_id: number,
    public offer_name? : string,
    public created_at? : Date,
    public updated_at? : Date
  ) { }
}
