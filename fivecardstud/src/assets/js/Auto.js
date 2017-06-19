/**
 * Created by Hyfd on 2017/6/19.
 */

/**
 * ======================继承Player()=======
 * @constructor
 */

export function Auto() {

  this.cards = [];
  this.oppoCards = [];
  this.P = 0;

  this.computeOwnWinnerP = function (oppoPlayer) {
    this.checkCardsType(this.cards, this);
    this.checkCardsType(this.oppoCards,oppoPlayer);

  };

  //获取对手可见的牌
  this.getOpponet = function (player) {
    var cacheArray = [];
    for (var i = 1; i < player.cards.length; i++) {
      cacheArray.push(player.cards[i]);
    }
    this.oppoCards = cacheArray;
    console.log(this.oppoCards);
    return this.oppoCards;
  }


}


