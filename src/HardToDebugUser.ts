class HardToDebugUser {
  constructor(private id: number, private firstName: string, private lastName: string) { }
  getDebugValue() {
    return {
      id: this.id,
      name: this.firstName + " " + this.lastName,
    };
  }
}
