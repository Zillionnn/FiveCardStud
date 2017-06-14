export  function Card() {
  this.cardset=["Spade","Heart","Diamond","Club"];
  this.number=['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];

  this.cardArray=[];

  //生成所有牌
  this.initAll=function () {
    this.cardArray=[];
    var cacheArray=[];

    for(var i=0;i<4;i++){
      for(var j=0;j<13;j++){
        var signCard={
          cardset:this.cardset[i],
          cardnum:this.number[j],
          cardSrc:require("../../assets/cardPic/" + this.cardset[i]+this.number[j] + ".jpg")
        };
        cacheArray.push(signCard);
      }
    }


    //随机取牌，重新推入数组
    for(var i=0;i<52;i++){
      var cardPosition=parseInt(Math.random()*cacheArray.length);
      this.cardArray.push(cacheArray[cardPosition]);
      cacheArray.splice(cardPosition,1);
    }
    //倒叙排列
    this.cardArray=this.cardArray.reverse();

    console.log(this.cardArray);
    return this.cardArray;
  };

  //随机一张牌
  this.getOneCard=function (cardArray) {
    //var cardPosition=parseInt(Math.random()*cardArray.length);

    var lastCard=cardArray.shift();
    console.log(lastCard);
    return lastCard;
  };

//移除已取出的牌
 this. removePreCard=function (cardArray,prePosition) {
    cardArray.splice(prePosition,1);
    return cardArray;
  };

  //和图片匹配
  this.getCardPic=function (card) {
    var cardPicName=card.cardset+    card.cardnum;
 //   var cardSrc="./assets/cardPic/" + cardPicName + ".jpg";
   console.log(cardPicName);

    return cardPicName;
  };
  
}

