export class User {
  constructor(
    public id: number,
    public username : string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public course_of_studies: string,
    public studies_type: string,
    public semester: number,
    public phone: number,
    public email: string,
    public status: number,
  ) { }
}
