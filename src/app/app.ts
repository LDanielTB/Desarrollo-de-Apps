import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  num1 = 0;
  num2 = 0;
  operacion: '+' | '-' | '*' | '/' = '+';
  resultado: number | null = null;
  historial: string[] = [];

  calcular(): void {
    const n1 = Number(this.num1);
    const n2 = Number(this.num2);
    let valor = 0;

    switch (this.operacion) {
      case '+':
        valor = n1 + n2;
        break;
      case '-':
        valor = n1 - n2;
        break;
      case '*':
        valor = n1 * n2;
        break;
      case '/':
        valor = n2 === 0 ? NaN : n1 / n2;
        break;
      default:
        valor = 0;
    }

    this.resultado = valor;

    const texto = `${n1} ${this.operacion} ${n2} = ${Number.isNaN(valor) ? 'Error' : valor}`;
    this.historial.unshift(texto);
  }
}
