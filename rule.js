
function comparePlayerValue(player1,player2){
    if(player1.cardsValue==player2.cardsValue){
        var player1CardsArr=player1.cardsSort(player1.cards);
        var player2CardsArr=player2.cardsSort(player2.cards);

        for(var i =1;i<player1.cards.length;i++){
            console.log(">>"+i);
            if(player1CardsArr[i-1].cardnum>player2CardsArr[i-1].cardnum){
                return player1.name;
            }else if(player1CardsArr[i-1].cardnum<player2CardsArr[i-1].cardnum){
                return player2.name;
            }
            
        }
        
        
    }
}



