export class Element {
  constructor(col, value) {
    this.col = col;
    this.value = value;
  }
  get(sel) {
    switch (sel) {
      case "col":
        return this.col;
      case "val":
        return this.value;
      default:
        break;
    }
  }
}
