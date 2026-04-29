class Pokebola {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.raio = 10;
        this.velocidade = 15;
        this.excluir = false;
    }

    atualizar() {
        this.x += this.velocidade;
        if (this.x > this.ctx.canvas.width) {
            this.excluir = true;
        }
    }

    desenhar() {
        this.ctx.save();
        
        // Sombra da pokebola
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y + this.raio + 2, this.raio, this.raio/3, 0, 0, Math.PI*2);
        this.ctx.fill();

        // Parte Vermelha (Cima)
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.raio, Math.PI, 0);
        this.ctx.fill();

        // Parte Branca (Baixo)
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.raio, 0, Math.PI);
        this.ctx.fill();

        // Linha Preta (Meio)
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - this.raio, this.y);
        this.ctx.lineTo(this.x + this.raio, this.y);
        this.ctx.stroke();

        // Círculo Central
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.raio/3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        this.ctx.restore();
    }
}
