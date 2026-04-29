class Fundo {
    constructor(ctx, imagem) {
        this.ctx = ctx;
        this.imagem = imagem;
        this.x = 0;
        this.velocidade = 2;
    }

    atualizar() {
        this.x -= this.velocidade;
        if (this.x <= -this.ctx.canvas.width) {
            this.x = 0;
        }
    }

    desenhar() {
        // Desenha a imagem duas vezes para criar o efeito de loop
        this.ctx.drawImage(this.imagem, this.x, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.imagem, this.x + this.ctx.canvas.width, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
