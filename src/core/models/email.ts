export class Email {
  constructor(
    FromEmail: string,
    FromName: string,
    Subject: string,
    TextPart: string,
    ToEmail: string,
    ToName: string,
    Body: string
  ) {
    this.FromEmail = FromEmail;
    this.FromName = FromName;
    this.Subject = Subject,
    this.TextPart = TextPart,
    this.ToEmail = ToEmail,
    this.ToName = ToName,
    this.Body = Body
  }
  FromEmail!: string;
  FromName!: string;
  Subject!: string;
  TextPart!: string;
  ToEmail!: string;
  ToName!: string;
  Body!: string;
}
