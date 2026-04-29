class EfeitoSparkle {
    constructor(ctx, x, y, gif) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.gif = gif;
        this.tempoVida = 30; // frames
        this.excluir = false;
    }

    atualizar() {
        this.tempoVida--;
        if (this.tempoVida <= 0) {
            this.excluir = true;
        }
    }

    desenhar() {
        // Como o Canvas não anima GIFs, vamos apenas desenhar o GIF (primeiro frame)
        // com uma animação de escala e transparência para simular o efeito
        this.ctx.save();
        this.ctx.globalAlpha = this.tempoVida / 30;
        const escala = 1 + (30 - this.tempoVida) / 10;
        const tam = 150 * escala;
        this.ctx.drawImage(this.gif, this.x - tam/2, this.y - tam/2, tam, tam);
        this.ctx.restore();
    }
}
