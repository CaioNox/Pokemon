// Classe Sprite para gerenciar objetos no canvas
class Sprite {
    constructor(x, y, largura, altura, velocidadeX = 0, velocidadeY = 0, imagem = null) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidadeX = velocidadeX;
        this.velocidadeY = velocidadeY;
        this.imagem = imagem;
    }

    // Carregar imagem
    carregarImagem(caminhoOuFile) {
        if (caminhoOuFile instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    this.imagem = img;
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(caminhoOuFile);
        } else {
            const img = new Image();
            img.src = caminhoOuFile;
            this.imagem = img;
        }
    }

    // Atualizar posição com rebote
    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Colisão com as bordas da tela (rebote)
        if (this.x < 0 || this.x + this.largura > 1920) {
            this.velocidadeX *= -1;
        }   
        if (this.y < 0 || this.y + this.altura > 1080) {
            this.velocidadeY *= -1;
        }

        // Manter dentro da tela
        this.x = Math.max(0, Math.min(this.x, 1920 - this.largura));
        this.y = Math.max(0, Math.min(this.y, 1080 - this.altura));
    }

    // Atualizar posição sem rebote (apenas limita)
    atualizarSemRebote() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Manter dentro da tela (sem rebote)
        this.x = Math.max(0, Math.min(this.x, 1920 - this.largura));
        this.y = Math.max(0, Math.min(this.y, 1080 - this.altura));
    }

    // Desenhar imagem no canvas
    desenhar(ctx) {
        if (this.imagem) {
            ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
        }
    }

    // Mudar velocidade
    setVelocidade(vx, vy) {
        this.velocidadeX = vx;
        this.velocidadeY = vy;
    }
}
