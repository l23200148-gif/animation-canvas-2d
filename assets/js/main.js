const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // --- REBOTE HORIZONTAL (Eje X) ---
    // Si choca con el borde DERECHO
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius; // Lo empujamos justo al borde
      this.dx = -this.dx; // Cambiamos dirección
    }
    // Si choca con el borde IZQUIERDO
    if (this.posX - this.radius <= 0) {
      this.posX = this.radius; // Lo empujamos justo al borde
      this.dx = -this.dx;
    }

    // --- REBOTE VERTICAL (Eje Y) ---
    // Si choca con el borde INFERIOR (suelo)
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius; // Lo empujamos justo al borde
      this.dy = -this.dy;
    }
    // Si choca con el borde SUPERIOR (techo)
    if (this.posY - this.radius <= 0) {
      this.posY = this.radius; // Lo empujamos justo al borde
      this.dy = -this.dy;
    }

    // Finalmente, aplicamos el movimiento
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// --- CREACIÓN DEL CÍRCULO 1 ---
let randomRadius1 = Math.floor(Math.random() * 100 + 30);
let randomX1 = Math.random() * (window_width - 2 * randomRadius1) + randomRadius1;
let randomY1 = Math.random() * (window_height - 2 * randomRadius1) + randomRadius1;

let miCirculo = new Circle(randomX1, randomY1, randomRadius1, "blue", "Tec1", 5);

// --- CREACIÓN DEL CÍRCULO 2 ---
let randomRadius2 = Math.floor(Math.random() * 100 + 30);
let randomX2 = Math.random() * (window_width - 2 * randomRadius2) + randomRadius2;
let randomY2 = Math.random() * (window_height - 2 * randomRadius2) + randomRadius2;

let miCirculo2 = new Circle(randomX2, randomY2, randomRadius2, "red", "Tec2", 2);

// --- BUCLE DE ANIMACIÓN ---
let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

// Iniciar la animación
updateCircle();