const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const inputWidth = document.getElementById("inputWidth");
const inputHeight = document.getElementById("inputHeight");
const btnResize = document.getElementById("btnResize");
const effectSelect = document.getElementById("effectSelect");
const btnLaunch = document.getElementById("btnLaunch");

// --- CONFIGURACIÓN FÍSICA ---
const gravity = 0.8;      // Aceleración hacia abajo
const friction = 0.7;     // Rebote (pierde 30% de energía al chocar)
let arrayCircles = [];

canvas.width = parseInt(inputWidth.value);
canvas.height = parseInt(inputHeight.value);

btnResize.addEventListener("click", () => {
    canvas.width = parseInt(inputWidth.value);
    canvas.height = parseInt(inputHeight.value);
});

class Circle {
    constructor(x, y, radius, color, text, dx, dy) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = dx;
        this.dy = dy;
    }

    draw(context) {
        context.beginPath();
        context.globalAlpha = 0.4; 
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.fill();

        context.globalAlpha = 1.0; 
        context.lineWidth = 2;
        context.strokeStyle = "rgba(255, 255, 255, 0.8)";
        context.stroke();
        
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold 14px Arial";
        context.fillText(this.text, this.posX, this.posY);
        context.closePath();
    }

    update(context) {
        // --- LÓGICA DE REBOTE Y GRAVEDAD ---

        // Suelo
        if (this.posY + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction; // Invierte velocidad y aplica fricción
            this.dx *= friction;           // El suelo frena el movimiento horizontal
        } else {
            this.dy += gravity;            // Aplica gravedad constante
        }

        // Paredes laterales
        if (this.posX + this.radius + this.dx > canvas.width || this.posX - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }

        // Techo
        if (this.posY - this.radius <= 0) {
            this.dy = -this.dy * friction;
        }

        this.posX += this.dx;
        this.posY += this.dy;
        this.draw(context);
    }
}

function launch() {
    arrayCircles = []; // Limpiamos la pantalla
    const effect = effectSelect.value;
    const num = 15; // Cantidad de pelotas

    for (let i = 0; i < num; i++) {
        let r = Math.floor(Math.random() * 20 + 15);
        let color = `hsl(${Math.random() * 360}, 80%, 60%)`;
        let x, y, dx, dy;

        // Definimos el punto de inicio y el impulso inicial según el selector
        switch(effect) {
            case 'top-left':
                x = r; y = r;
                dx = Math.random() * 15; dy = Math.random() * 5;
                break;
            case 'top-right':
                x = canvas.width - r; y = r;
                dx = -(Math.random() * 15); dy = Math.random() * 5;
                break;
            case 'bottom-left':
                x = r; y = canvas.height - r;
                dx = Math.random() * 12; dy = -(Math.random() * 25 + 10);
                break;
            case 'bottom-right':
                x = canvas.width - r; y = canvas.height - r;
                dx = -(Math.random() * 12); dy = -(Math.random() * 25 + 10);
                break;
            case 'top':
                x = Math.random() * canvas.width; y = -r;
                dx = (Math.random() - 0.5) * 10; dy = 5;
                break;
            case 'bottom':
                x = Math.random() * canvas.width; y = canvas.height + r;
                dx = (Math.random() - 0.5) * 10; dy = -(Math.random() * 30 + 15);
                break;
        }
        arrayCircles.push(new Circle(x, y, r, color, i + 1, dx, dy));
    }
}

btnLaunch.addEventListener("click", launch);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arrayCircles.forEach(circle => circle.update(ctx));
    requestAnimationFrame(animate);
}

animate();