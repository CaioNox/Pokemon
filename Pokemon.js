class Pokemon {
    constructor(ctx, imagem, x, y) {
        this.ctx = ctx;
        this.imagem = imagem;
        this.x = x;
        this.y = y;
        // Tamanho diminuído
        this.largura = 90;
        this.altura = 90;
        // Velocidade ajustada para perseguição
        this.velocidade = 2 + Math.random() * 3; // Entre 2 e 3.9
        this.excluir = false;
    }

    atualizar(alvo) {
        if (!alvo) return;

        // Calcular vetor de direção para o alvo (centro do Ash)
        const dx = (alvo.x + alvo.largura / 2) - (this.x + this.largura / 2);
        const dy = (alvo.y + alvo.altura / 2) - (this.y + this.altura / 2);
        const distancia = Math.sqrt(dx * dx + dy * dy);

        // Mover na direção do alvo
        if (distancia > 0) {
            this.x += (dx / distancia) * this.velocidade;
            this.y += (dy / distancia) * this.velocidade;
        }
    }

    desenhar() {
        // Desenha a imagem inteira (sem recortes de grid)
        this.ctx.drawImage(
            this.imagem,
            this.x,
            this.y,
            this.largura,
            this.altura
        );
    }
}
