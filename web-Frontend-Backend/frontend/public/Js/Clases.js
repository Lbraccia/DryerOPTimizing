class Node {
    constructor(node, PDval, QDval, DGval) {
      this.Node = node;
      this.PD = PDval;
      this.QD = QDval;
      this.DG = [];
    }
    //Mostrar Nodo
    ShowNode() {
        console.log(`Nodo : ${this.Node}, PD: ${this.PD}, QD: ${this.QD}, con ${this.DG.length} DG`);
      }

    //Agrego DG al nodo
    agregarDG(DGval) {
        this.DG.push(DGval);
    }
    //Mostrar DG
    ShowDG() {
        console.log(`Los DG en el ${this.Node} son: ${this.DG.join(', ')}`);
      }
    
}


class Linea {
  constructor(NLineval, source, receptor, Rval, Xval) {
    this.NL = NLineval;
    this.s = source;
    this.r = receptor;
    this.R = Rval;
    this.X = Xval;
    this.Z = Math.sqrt(Math.pow(Rval,2) + Math.pow(Xval,2))
  }
  //Mostrar Nodo
  ShowLine() {
      console.log(`Line ${this.NL} from ${this.s} to ${this.r} - R: ${this.R}, X: ${this.X}, Z: ${this.X}`);
    }

}