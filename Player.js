/**
 * Created by Zillion on 2017/6/10.
 */


function Player() {
    //手上的牌
    this.cards = [];

    //手上的筹码,初始化设置合适的值
    this.chips = 0;


    this.setCards = function (card) {
        this.cards.push(card);
    };                                                                   

    this.getCards = function () {
        return this.cards;
    }

    this.setChips = function (chips) {
        this.chips+=chips;
    };

    this.getChips = function () {
        return this.chips;
    };

}

var player1 = new Player();
player1.setCards({cardnum: "A", cardset: "Club"});
console.log(player1.cards);
player1.setChips(32);
console.log(player1.getChips());