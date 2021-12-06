export class Teacher {
  public initials: string | null;
  public href: string | null;

  public toString(): string {
    return this.initials!;
  }

  constructor(initials: string, href: string) {
    this.initials = initials;
    this.href = href;
  }
}
