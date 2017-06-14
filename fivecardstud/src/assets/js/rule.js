export function Rule(player1,player2){
    player2.checkCardsType(player2.cards,player2);
    player1.checkCardsType(player1.cards,player1);
    if(player1.cardsValue>player2.cardsValue){
        return player1.name;
    }
    if(player1.cardsValue<player2.cardsValue){
        return player2.name;
    }

    if(player1.cardsValue==player2.cardsValue){
        console.log("----same value---");
        var player1CardsArr=player1.cardsSort(player1.cards);
        var player2CardsArr=player2.cardsSort(player2.cards);

        //比较数字
        for(var i =0;i<player1.cards.length;i++){
            if(player1CardsArr[i].cardnum>player2CardsArr[i].cardnum){
                return player1.name;
            }else if(player1CardsArr[i].cardnum<player2CardsArr[i].cardnum){
                return player2.name;
            }
        }

        //比较花色
        player1.cardsetStringToNum(player1.cards);
        player2.cardsetStringToNum(player2.cards);
        for(var i =0;i<player1.cards.length;i++){
            if(player1CardsArr[i].cardset>player2CardsArr[i].cardset){
                return player1.name;
            }else if(player1CardsArr[i].cardset<player2CardsArr[i].cardset){
                return player2.name;
            }
        }

    }

}
