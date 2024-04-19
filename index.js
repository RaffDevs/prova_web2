const { createApp } = Vue;

createApp({
    data() {
        return {
            hero: { life: 100, defenseMultiplier: 1 },
            enemy: { life: 100, defenseMultiplier: 1 },
            damage: 0,
            battleLog: [],
            potionAmount: 3,
            enemyPotionAmount: 3,
            winner: null
        };
    },
    methods: {
        atacar(isHero) {
            if (isHero) {
                this.damage = Math.round(Math.random() * 20);
                this.battleLog.push('Herói ataca e causa ' + this.damage + ' de dano ao vilão!');

                if (this.enemy.life > 0) {
                    this.enemy.life -= this.damage;
                    if (this.enemy.life <= 0) {
                        this.winner = 'Herói';
                        this.battleLog.push('O vilão foi derrotado! Você venceu!');
                    } else {
                        this.acaoVilao();
                    }
                } else {
                    this.battleLog.push('O vilão já foi derrotado!');
                }
            } else {
                this.damage = Math.round(Math.random() * 20);
                this.battleLog.push('Vilão ataca e causa ' + this.damage + ' de dano ao herói!');

                if (this.hero.life > 0) {
                    this.hero.life -= this.damage * this.hero.defenseMultiplier;
                    if (this.hero.life <= 0) {
                        this.winner = 'Vilão';
                        this.battleLog.push('O herói foi derrotado! Você perdeu!');
                    }
                } else {
                    this.battleLog.push('O herói já foi derrotado!');
                }
            }
        },
        acaoVilao() {
            const actions = ['atacar', 'defender', 'usarPocao'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            console.log("Ação vilão", randomAction);
            this[randomAction](false);
        },
        defender() {
            this.hero.defenseMultiplier = 0.5;
            this.battleLog.push('Herói defende!');
        },
        usarPocao(isHero) {
            if (isHero && this.potionAmount > 0 && this.hero.life < 100) {
                this.potionAmount--;
                this.hero.life += 50;
                this.hero.life = Math.min(100, this.hero.life);
                this.battleLog.push('Herói usa uma poção, curando 50 pontos!');

            }
            else if (this.enemyPotionAmount > 0 && this.enemy.life < 100) {
                this.enemyPotionAmount--;
                this.enemy.life += 50;
                this.enemy.life = Math.min(100, this.enemy.life);
                this.battleLog.push('Vilão usa uma poção, curando 50 pontos!');
            }
            else {
                this.battleLog.push(isHero ? 'Herói está com a vida cheia ou sem poções!' : 'Vilão está com a vida cheia ou sem poções!');
            }

        },
        correr() {
            this.battleLog.push('Herói foge!');
            this.winner = 'Vilão';
        },
        reiniciarJogo() {
            this.hero.life = 100;
            this.enemy.life = 100;
            this.potionAmount = 3;
            this.enemyPotionAmount = 3;
            this.winner = null;
            this.battleLog = [];
        }
    },
    computed: {
        isGameOver() {
            return this.hero.life <= 0 || this.enemy.life <= 0 || this.winner;
        },
    },
}).mount("#app");
