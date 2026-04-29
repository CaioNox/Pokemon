// Classe para gerenciar o loop de animação
class Animacao {
    constructor(ctx) {
        this.ctx = ctx;
        this.sprites = [];
        this.callback = null;
    }

    // Adicionar um novo sprite para renderizar
    novoSprite(sprite) {
        this.sprites.push(sprite);
    }

    // Definir callback que será chamado a cada frame
    setCallback(callback) {
        this.callback = callback;
    }

    // Iniciar o loop de animação
    ligar() {
        const gameLoop = () => {
            // Limpar canvas
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            // Chamar callback se existe
            if (this.callback) {
                this.callback();
            }

            // Renderizar todos os sprites
            this.sprites.forEach(sprite => {
                sprite.desenhar();
            });

            requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }
}
