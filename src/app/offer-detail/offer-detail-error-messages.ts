export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) { }
}
export const CommentFormErrorMessages = [
  new ErrorMessage('description', 'required', 'Zum Absenden eines Kommentars bitte einen Text eingeben.'),
  new ErrorMessage('description', 'minlength', 'Die Beschreibung muss mindestens 10 Zeichen enthalten'),
];
