// Classe para gerenciar entrada de teclado
class Teclado {
    constructor(document) {
        this.teclasPressionadas = {};
        this.document = document;
        this.setup();
    }

    setup() {
        this.document.addEventListener('keydown', (e) => {
            const tecla = e.key.toLowerCase();
            if (this.isTeclaValida(tecla)) {
                this.teclasPressionadas[tecla] = true;
                e.preventDefault();
            }
        });

        this.document.addEventListener('keyup', (e) => {
            const tecla = e.key.toLowerCase();
            if (this.isTeclaValida(tecla)) {
                this.teclasPressionadas[tecla] = false;
                e.preventDefault();
            }
        });
    }

    isTeclaValida(tecla) {
        return ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(tecla);
    }

    estaPressionada(tecla) {
        return this.teclasPressionadas[tecla] || false;
    }

    temMovimento() {
        return this.estaPressionada('w') || this.estaPressionada('s') ||
               this.estaPressionada('a') || this.estaPressionada('d') ||
               this.estaPressionada('arrowup') || this.estaPressionada('arrowdown') ||
               this.estaPressionada('arrowright') || this.estaPressionada('arrowleft');
    }

    getMovimento() {
        let vx = 0;
        let vy = 0;

        if (this.estaPressionada('w') || this.estaPressionada('arrowup')) vy -= 1;
        if (this.estaPressionada('s') || this.estaPressionada('arrowdown')) vy += 1;
        if (this.estaPressionada('a') || this.estaPressionada('arrowleft')) vx -= 1;
        if (this.estaPressionada('d') || this.estaPressionada('arrowright')) vx += 1;

        return { vx, vy };
    }
}
