/**
 * Created by Zillion on 2017/6/10.
 */


function Player() {
    this.name;
    //手上的牌
    this.cards = [];

    //手上的筹码,初始化设置合适的值
    this.chips = 0;

    this.cardsValue;

    this.setCards = function (card) {
        this.cards.push(card);
    };

    this.getCards = function () {
        return this.cards;
    };
    this.initCards=function () {
       this.cards=[];
    };

    this.setChips = function (chips) {
        this.chips += chips;
    };

    this.getChips = function () {
        return this.chips;
    };


//先对持有的牌 排序
    this.cardsSort = function (playerCardsArray) {
        stringToNum(playerCardsArray);
        //对双方牌排序
        bubbleSort(playerCardsArray);

        playerCardsArray.reverse();
   //     console.log(playerCardsArray);
        return playerCardsArray;
    };

//相应牌转为数字
    function stringToNum(playerCardsArray) {
        for (var k = 0; k < playerCardsArray.length; k++) {
            if (playerCardsArray[k].cardnum == "J") {
                playerCardsArray[k].cardnum = 11;
            }
            if (playerCardsArray[k].cardnum == "Q") {
                playerCardsArray[k].cardnum = 12;
            }
            if (playerCardsArray[k].cardnum == "K") {
                playerCardsArray[k].cardnum = 13;
            }
            if (playerCardsArray[k].cardnum == "A") {
                playerCardsArray[k].cardnum = 14;
            }
        }
    }

//相应牌转为字符串
    function numToString(playerCardsArray) {
        for (var k = 0; k < playerCardsArray.length; k++) {
            if (playerCardsArray[k].cardnum == 11) {
                playerCardsArray[k].cardnum = "J";
            }
            if (playerCardsArray[k].cardnum == 12) {
                playerCardsArray[k].cardnum = "Q";
            }
            if (playerCardsArray[k].cardnum == 13) {
                playerCardsArray[k].cardnum = "K";
            }
            if (playerCardsArray[k].cardnum == 14) {
                playerCardsArray[k].cardnum = "A";
            }
        }
    }

//相应牌转为数字
    this.cardsetStringToNum = function (playerCardsArray) {
        for (var k = 0; k < playerCardsArray.length; k++) {
            if (playerCardsArray[k].cardset == "Spade") {
                playerCardsArray[k].cardset = 10;
            }
            if (playerCardsArray[k].cardset == "Heart") {
                playerCardsArray[k].cardset = 9;
            }
            if (playerCardsArray[k].cardset == "Club") {
                playerCardsArray[k].cardset = 8;
            }
            if (playerCardsArray[k].cardset == "Diamond") {
                playerCardsArray[k].cardset = 7;
            }
        }
    };

//冒泡排序
    function bubbleSort(array) {
        var n = array.length;
        for (var i = 0; i < n - 1; ++i) {
            for (var j = 0; j < n - i - 1; ++j) {
                if (array[j].cardnum > array[j + 1].cardnum) {
                    var tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
            }
        }
    }


//检查牌 所属类型
    this.checkCardsType = function (array, player) {
        this.cardsSort(array);
        //花色
        var cardSameSet = 1;
        var cardStraight = 1;
        var cardSameNum = 1;
        var x;

        for (var i = 1; i < array.length; i++) {
            //判断同花
            if (array[i].cardset == array[i - 1].cardset) {
                cardSameSet++;
            }
            //判断顺子
            if (array[i].cardnum - 1 == array[i - 1].cardnum) {
                cardStraight++;
            }
            //判断相同数字
            if (array[i].cardnum == array[i - 1].cardnum) {
                cardSameNum += 1;
                x=array[i].cardnum;
            }

        }
        //判断为同花
        if (cardSameSet == 5) {
            //判断为同花+顺子
            if (cardStraight == 5) {
                if (array[4].cardnum == 14) {
                    console.log("同花大顺");
                    player.cardsValue = 999;
                    numToString(array);
                    return;
                }
                console.log("同花顺");
                player.cardsValue = 900;
                numToString(array);
                return;
            }
            console.log("同花");
            player.cardsValue =600;
            numToString(array);
            return;
        }

//判断为顺子
        if (cardStraight == 5) {
            console.log("顺子");
            player.cardsValue = 500;
            numToString(array);
            return;
        }

        //相同数字>2 ； 判断满堂红，三条，两对
        if (cardSameNum > 2) {
            console.log(">>" + cardSameNum);

            if (cardSameNum == 4) {
                //判断为四条
                if ((array[0].cardnum == array[1].cardnum)
                    && (array[0].cardnum == array[2].cardnum)
                    && (array[0].cardnum == array[3].cardnum)
                    || (array[1].cardnum == array[2].cardnum)
                    && (array[1].cardnum == array[3].cardnum)
                    && (array[1].cardnum == array[4].cardnum)) {
                    console.log("四条");
                    player.cardsValue = 800+array[1].cardnum;
                    numToString(array);
                    return;
                }
                //判断为满堂红
                console.log("满堂红");
                player.cardsValue = 700+array[2].cardnum;
                numToString(array);
                return;
            }

            //判断为三条
            if (cardSameNum == 3) {
                if ((array[0].cardnum == array[1].cardnum)
                    && (array[0].cardnum == array[2].cardnum)
                    || (array[1].cardnum == array[2].cardnum)
                    && (array[1].cardnum == array[3].cardnum)
                    || (array[2].cardnum == array[3].cardnum)
                    && (array[2].cardnum == array[4].cardnum)) {
                    console.log("三条");
                    player.cardsValue = 400+ array[2].cardnum;
                    numToString(array);
                    return;
                }

                //判断为两对
                console.log("两对");
                player.cardsValue = 200;
                numToString(array);
                return;
            }

        }


        //判断为一对
        if (cardSameNum == 2) {
            console.log("一对");
            player.cardsValue = 100+x;
            numToString(array);
            return;
        }
        player.cardsValue = 0;
        numToString(array);
        return;
    }

}




var player1 = new Player();
player1.name = "Jack";
player1.cards = [{cardset: "Heart", cardnum:10},
    {cardset: "Heart", cardnum: 'J'},
    {cardset: "d", cardnum: 9},
    {cardset: "Spade", cardnum: 8},
    {cardset: "Spade", cardnum: 3}];

var player2 = new Player();
player2.name = "Merry";
player2.cards = [{cardset: "Club", cardnum: 10},
    {cardset: "Heart", cardnum: 7},
    {cardset: "d", cardnum: 9},
    {cardset: "Club", cardnum: 8},
    {cardset: "Spade", cardnum: 'J'}];



player1.checkCardsType(player1.cards,player1);
console.log(player1.cardsValue);

player2.checkCardsType(player2.cards,player2);
console.log(player2.cardsValue);

