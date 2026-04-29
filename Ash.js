// Classe que representa o personagem Ash com seus estados e animações
class Ash {
    constructor(ctx, teclado, imagem) {
        this.ctx = ctx;
        this.teclado = teclado;
        
        // Posição
        this.x = 960;
        this.y = 540;
        this.largura = 100;
        this.altura = 100;
        
        // Velocidade
        this.velocidade = 5;
        this.vx = 0;
        this.vy = 0;
        
        // Vida e Dano
        this.vida = 5;
        this.invulneravel = 0;
        // 1 1 

        // Mapeamento de direções na spritesheet (padrão)
        // Se o seu novo sprite for 4x4 por exemplo, você pode alterar os números na criação do Spritesheet logo abaixo.
        this.DIREITA = { linha: 1, coluna: 1 };
        this.ESQUERDA = { linha: 1, coluna: 0 };
        this.CIMA = { linha: 0, coluna: 1 };
        this.BAIXO = { linha: 0, coluna: 0 };
        
        // Criar spritesheet. Se o novo png for 4 linhas e 4 colunas, mude o 2, 2 para 4, 4.
        this.spritesheet = new Spritesheet(ctx, imagem, 2, 2);
        this.spritesheet.setIntervalo(150); // 150ms entre frames
        
        // Direção atual
        this.direcaoAtual = this.DIREITA;
    }

    // Obter direção baseada na entrada
    obterDirecao() {
        const movimento = this.teclado.getMovimento();
        
        if (movimento.vx > 0) {
            return this.DIREITA;
        } else if (movimento.vx < 0) {
            return this.ESQUERDA;
        }
        
        if (movimento.vy < 0) {
            return this.CIMA;
        } else if (movimento.vy > 0) {
            return this.BAIXO;
        }
        
        return this.direcaoAtual;
    }

    // Atualizar posição e estado baseado na entrada
    atualizar() {
        // Reduzir tempo de invulnerabilidade
        if (this.invulneravel > 0) {
            this.invulneravel--;
        }

        const movimento = this.teclado.getMovimento();
        
        // Atualizar velocidade
        this.vx = movimento.vx * this.velocidade;
        this.vy = movimento.vy * this.velocidade;
        
        // Obter direção e atualizar frame
        this.direcaoAtual = this.obterDirecao();
        this.spritesheet.setFrame(this.direcaoAtual.linha, this.direcaoAtual.coluna);
        
        // Atualizar posição
        this.x += this.vx;
        this.y += this.vy;
        
        // Manter dentro da tela
        this.x = Math.max(0, Math.min(this.x, 1920 - this.largura));
        this.y = Math.max(0, Math.min(this.y, 1080 - this.altura));

        // Atirar pokebola
        if (this.teclado.estaPressionada(' ')) {
            if (this.atirarCallback) {
                this.atirarCallback();
            }
        }
    }

    // Desenhar o personagem no canvas
    desenhar() {
        // Se estiver invulnerável (tomou dano), pisca a cada 100ms
        if (this.invulneravel > 0 && Math.floor(performance.now() / 100) % 2 === 0) {
            return; // Pula o desenho para causar o efeito de piscar
        }

        // Desenhar sombra
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.ellipse(
            this.x + this.largura / 2,
            this.y + this.altura - 5,
            this.largura / 3,
            this.largura / 8,
            0, 0, Math.PI * 2
        );
        this.ctx.fill();
        this.ctx.restore();

        this.spritesheet.desenhar(
            this.x,
            this.y,
            this.largura,
            this.altura,
            performance.now()
        );
    }
}
