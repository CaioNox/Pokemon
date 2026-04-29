// Classe Spritesheet para gerenciar animações com clipping
class Spritesheet {
    constructor(ctx, imagem, linhas, colunas) {
        this.ctx = ctx;
        this.imagem = imagem;
        this.linhas = linhas;
        this.colunas = colunas;
        
        // Dimensões de cada frame
        this.larguraFrame = this.imagem.width / colunas;
        this.alturaFrame = this.imagem.height / linhas;
        
        // Controle de animação
        this.linhaAtiva = 0;
        this.colunaAtiva = 0;
        this.intervalo = 100; // ms entre frames
        this.tempoUltimoFrame = 0;
    }

    // Avançar para o próximo quadro
    proximoQuadro(tempoAtual) {
        if (tempoAtual - this.tempoUltimoFrame > this.intervalo) {
            this.colunaAtiva++;
            if (this.colunaAtiva >= this.colunas) {
                this.colunaAtiva = 0;
            }
            this.tempoUltimoFrame = tempoAtual;
        }
    }

    // Definir linha ativa (estado)
    setLinha(linha) {
        if (linha !== this.linhaAtiva) {
            this.linhaAtiva = linha;
            this.colunaAtiva = 0;
            this.tempoUltimoFrame = 0;
        }
    }

    // Definir coluna ativa (para controle específico de frame)
    setColuna(coluna) {
        this.colunaAtiva = coluna;
    }

    // Definir linha e coluna (para frame específico)
    setFrame(linha, coluna) {
        this.linhaAtiva = linha;
        this.colunaAtiva = coluna;
    }

    // Resetar coluna para primeira
    resetarColuna() {
        this.colunaAtiva = 0;
    }

    // Desenhar frame no canvas
    desenhar(x, y, largura, altura, tempoAtual) {
        if (!this.imagem) return;

        // Salvar estado do canvas
        this.ctx.save();

        // Calcular posição de recorte
        const xRecorte = this.colunaAtiva * this.larguraFrame;
        const yRecorte = this.linhaAtiva * this.alturaFrame;

        // Desenhar no canvas usando drawImage com 9 parâmetros
        this.ctx.drawImage(
            this.imagem,
            xRecorte,
            yRecorte,
            this.larguraFrame,
            this.alturaFrame,
            x,
            y,
            largura,
            altura
        );

        // Restaurar estado do canvas
        this.ctx.restore();

        // Avançar animação
        this.proximoQuadro(tempoAtual);
    }

    // Definir intervalo de animação
    setIntervalo(ms) {
        this.intervalo = ms;
    }
}
