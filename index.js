const { createApp } = Vue

createApp({
    data() {
        return {
            hero: {life: 100},
            enemy: {life: 100},
            damage: 0,
        }
    },
    methods: {
        atacar(isHeroi) {
            var damage = Math.round(Math.random() * 100)
            console.log(damage);
            if (isHeroi) {
                this.acaoVilao();
            } else {
                console.log("Vilão atacou")
                //this.acaoVilao();
            }
        },
        defender() {

        },
        usarPocao() {

        },
        correr() {

        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },
    }
}).mount("#app")