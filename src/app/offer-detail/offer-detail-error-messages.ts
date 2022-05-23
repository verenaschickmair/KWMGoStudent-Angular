export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const CommentFormErrorMessages = [
  new ErrorMessage('description', 'required', 'Bitte ein Kommentar verfassen!'),
  new ErrorMessage('description', 'minlength', 'Die Beschreibung muss mindestens 10 Zeichen enthalten'),
];
