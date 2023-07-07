export class Feature {
  constructor(applicationId: string, name: string, value: string) {
    this.ApplicationId = applicationId;
    this.Name = name;
    this.Value = value;
  }
  ApplicationId!: string;
  Name!: string;
  Value!: string;
}
