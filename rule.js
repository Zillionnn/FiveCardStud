
function Player() {
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

    this.setChips = function (chips) {
        this.chips+=chips;
    };

    this.getChips = function () {
        return this.chips;
    };

}


//先对持有的牌 排序
function cardsSort(playerCardsArray) {
    stringToNum(playerCardsArray);
    //对双方牌排序
    bubbleSort(playerCardsArray);

    console.log(playerCardsArray);
}

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
function checkCardsType(array,player) {
    cardsSort(array);
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
            if (cardSameNum == 2) {
                x = array[i].cardnum;
            }

            //相同数字>2 ； 判断满堂红，三条，两对
            if (cardSameNum > 2) {
                if (cardSameNum == 3) {
                    if(array[0].cardnum==array[1].cardnum==array[2].cardnum  || array[2].cardnum==array[2].cardnum==array[3].cardnum==array[4].cardnum){
                        console.log("满堂红");
                        player.cardsValue=90;
                        numToString(array);
                        return;
                    }

                }

                if (x != array[i].cardnum) {
                    x = array[i].cardnum;
                    cardSameNum -= 1;
                    console.log("两对");
                    player.cardsValue=9;
                    return;
                }

                console.log("三条");
                player.cardsValue=10;
                numToString(array);
                return;
            }


        }

    }
    //判断为同花
    if (cardSameSet == 5) {
        //判断为同花+顺子
        if (cardStraight == 5) {
            if(array[4].cardnum==14){
                console.log("同花大顺");
                player.cardsValue=999;
                numToString(array);
                return;
            }
            console.log("同花顺");
            player.cardsValue=900;
            numToString(array);
            return;
        }
        console.log("同花");
        player.cardsValue=80;
        numToString(array);
        return;
    }
    //判断为四条
    if (cardSameNum == 4) {
        console.log("四条");
        player.cardsValue=100;
        numToString(array);
        return;
    }

//判断为顺子
    if (cardStraight == 5) {
        console.log("顺子");
        player.cardsValue=70;
        numToString(array);
        return;
    }

//判断为三条
    if (cardSameNum == 3) {
        console.log("三条");
        player.cardsValue=7;
        numToString(array);
        return;
    }
    //判断为一对
    if (cardSameNum == 2) {
        console.log("一对");
        player.cardsValue=5;
        numToString(array);
        return;
    }

}


var array = [{cardset: "Heart", cardnum: 9},
    {cardset: "s", cardnum: 10},
    {cardset: "Heart", cardnum: 7},
    {cardset: "Heart", cardnum: 'K'},
    {cardset: "Heart", cardnum: 'K'}];

var player1=new Player();
checkCardsType(array,player1);
console.log(player1.cardsValue);
console.log(array);

