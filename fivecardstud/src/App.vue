<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="app">
    <router-view></router-view>

    <button v-on:click="getAll()">重置所有牌</button>
    <button v-on:click="getP()">getP</button>
<!--
    <button v-on:click="getOne()" id="sendCard"> 发牌</button>
-->
    <button v-on:click="checkValue()">check</button>
    <p>
      {{totalBet}}
    </p>
    <p>WINNER:<span id="winner">{{winner.name}}</span></p>

    <br/>

    <div class="playerDesk">
      <h3>{{player1.name}}</h3><h4>{{player1.chips}}</h4>
      <div class="buttons" v-show="betStatus1">
        <button v-on:click="player1Bet(500)">500</button>
        <button v-on:click="player1Bet(1000)">1000</button>
        <button v-on:click="player1Bet(2000)">2000</button>
        <button v-on:click="player1Bet(5000)">5000</button>
        <button v-on:click="player1Bet('max')">ALL IN</button>
        <br/></div>
        <button v-on:click="player1Follow()" id="player1Follow" v-show="followStatus1">follow</button>
        <button v-on:click="drop(1)" v-show="betStatus1">drop</button>


      <p id="player1">

      <span v-for="( card ,i) in this.player1.cards">
        <div v-bind:class="{hide: i==0 && x==false}" style="float: left"></div>
        <img v-bind:src="card.cardSrc" v-if="i>0 &&i<5 &&x==false ">
        <img v-bind:src="card.cardSrc" v-if="x ">
      </span>
      </p>
    </div>


    <br/>

    <div class="playerDesk">
      <h3>{{player2.name}}</h3><h4>{{player2.chips}}</h4>
      <div class="buttons" v-show="betStatus2">
        <button v-on:click="player2Bet(500)">500</button>
        <button v-on:click="player2Bet(1000)">1000</button>
        <button v-on:click="player2Bet(2000)">2000</button>
        <button v-on:click="player2Bet(5000)">5000</button>

        <button v-on:click="player2Bet('max')">ALL IN</button>
      </div>
        <br/>
        <button v-on:click="player2Follow()" id="player2Follow" v-show="followStatus2">follow</button>
        <button v-on:click="drop(2)" v-show="betStatus2">drop</button>


      <p id="player2">

      <span v-for="( card , i) in this.player2.cards">
        <img v-bind:src="card.cardSrc">
      </span>

      </p>
    </div>


  </div>
</template>

<script>
  import {Card} from './assets/js/Card.js';
  import {Player} from './assets/js/Player.js';
  import {Rule} from './assets/js/Rule.js';
import {Auto} from './assets/js/Auto';


  export default {
    data(){
      return {
        cardArray: [],
        lastCardPosition: 0,
        player1: {},
        player2: {},
        Card: {},
        winner: {},
        x: false,

        doStatus1: false,
        doStatus2: false,
        betStatus1:true,
        betStatus2:true,
        followStatus1: false,
        followStatus2: false,

        player1CurrentBet: 0,
        player2CurrentBet: 0,

        totalBet: 0
      }
    },

    created(){
      /**
       *   ===========机器人继承player=============
       */
      Auto.prototype=new Player();

      this.initPlayer();

    },
    mounted(){
    },
    methods: {
      initPlayer: function () {
        console.log("init");

        this.player1 = new Auto();
        this.player2 = new Player();

        this.player1.name = "Robot";
        this.player2.name = "Merry";

        this.Card = new Card();

      },


      /*初始化所有牌*/
      getAll: function () {
        if(this.player1.chips!=0 && this.player2.chips!=0){
        this.x = false;


        this.player1CurrentBet=0;
          this.player2CurrentBet=0;


        //所有牌的一个数组
        this.cardArray = this.Card.initAll();

        this.player1.initCards();
        this.player2.initCards();
        this.getOne();
        this.getOne();

        this.totalBet = 0;
        this.player1.chips-=500;
          this.player2.chips-=500;
          this.totalBet+=1000;

        }
        else{
          alert("SOME ONE HAS NO  CHIPS");
        }
      },

      /*给2个人发牌*/
      getOne: function () {
        this.player1CurrentBet = 0;
        this.player2CurrentBet = 0;
        this.doStatus1 = false;
        this.doStatus2 = false;

        var lastCard1 = this.cardArray.shift();
        this.player1.setCards(lastCard1);
        this.cardsetStringToNum(lastCard1);
        this.stringToNum(lastCard1);

        var lastCard2 = this.cardArray.shift();
        this.player2.setCards(lastCard2);
        this.cardsetStringToNum(lastCard2);
        this.stringToNum(lastCard2);

        //判断牌面，决定谁能下注
        if (this.player1.cards.length >= 2) {
          if (lastCard1.cardnum > lastCard2.cardnum) {
            this.betStatus1=true;
            this.betStatus2=false;
            this.followStatus1=false;
            this.followStatus2=false;
            this.doStatus1=false;
            this.doStatus2=false;
          } else if (lastCard2.cardnum > lastCard1.cardnum) {
            this.betStatus1=false;
            this.betStatus2=true;
            this.followStatus1=false;
            this.followStatus2=false;
            this.doStatus1=false;
            this.doStatus2=false;
          } else {
            if (lastCard1.cardset > lastCard2.cardset) {
              this.betStatus1=true;
              this.betStatus2=false;
              this.followStatus1=false;
              this.followStatus2=false;
              this.doStatus1=false;
              this.doStatus2=false;
            } else {
              this.betStatus1=false;
              this.betStatus2=true;
              this.followStatus1=false;
              this.followStatus2=false;
              this.doStatus1=false;
              this.doStatus2=false;
            }
          }
        }


  /*      if (this.player1.cards.length == 5) {
          document.getElementById('sendCard').setAttribute("disabled", true);
        }*/
   /*     if(this.player1.chips==0 || this.player2.chips==0){
          this.getOne();
      }*/
      },

      //比较胜负
      checkValue: function () {
        //    document.getElementById("player1").firstChild.firstChild.removeAttribute('class', 'hide');
        this.x = true;
        this.winner = Rule(this.player1, this.player2);

        console.log(this.winner);
        this.winner.chips += this.totalBet;
        this.doStatus1=false;
        this.doStatus2=false;
          this.betStatus1=false;
        this.betStatus2=false;
          this.followStatus1=false;
          this.followStatus2=false;

      },

      cardsetStringToNum: function (card) {

        if (card.cardset == "Spade") {
          card.cardset = 10;
        }
        if (card.cardset == "Heart") {
          card.cardset = 9;
        }
        if (card.cardset == "Club") {
          card.cardset = 8;
        }
        if (card.cardset == "Diamond") {
          card.cardset = 7;
        }
      },


      stringToNum: function (card) {

        if (card.cardnum == "J") {
          card.cardnum = 11;
        }
        if (card.cardnum == "Q") {
          card.cardnum = 12;
        }
        if (card.cardnum == "K") {
          card.cardnum = 13;
        }
        if (card.cardnum == "A") {
          card.cardnum = 14;
        }

      },

      player1Bet: function (chips) {
        if(chips>this.player1.chips) {
          chips = this.player1.chips;
        }
          if (chips > this.player2CurrentBet &&(this.player2CurrentBet!=0) ) {
          this.player1CurrentBet=chips;
          this.player1.setChips(this.player1.chips - chips);
          this.totalBet += chips;

          this.betStatus1=false;
          this.betStatus2=false;
          this.followStatus2 = true;
          this.followStatus1 = false;

          this.doStatus2=false;
          this.doStatus1=true;
          return ;
        }
        if (chips == 'max') {
          chips = this.player1.chips;
        }
          this.player1.setChips(this.player1.chips - chips);
          this.player1CurrentBet = chips;
          this.totalBet += chips;
          this.betStatus1=false;
          this.betStatus2=true;
        this.followStatus1=false;
        this.followStatus2=true;

        this.doStatus1 = true;
        this.checkStatusSendCard();

      },

      player2Bet: function (chips) {
        if(chips>this.player2.chips) {
          chips = this.player2.chips;
        }

          if (chips > this.player1CurrentBet && (this.player1CurrentBet != 0)) {
            this.player2CurrentBet = chips;
            this.player2.setChips(this.player2.chips - chips);
            this.totalBet += chips;

            this.betStatus2 = false;
            this.betStatus1 = false;
            this.followStatus1 = true;
            this.followStatus2 = false;

            this.doStatus1 = false;
            this.doStatus2 = true;
            return;
          }
          if (chips == 'max') {
            chips = this.player2.chips;
          }
          this.player2.setChips(this.player2.chips - chips);
          this.player2CurrentBet = chips;
          this.totalBet += chips;
          this.betStatus2 = false;
          this.betStatus1 = true;
          this.followStatus1 = true;
          this.followStatus2 = true;

          this.doStatus2 = true;
          this.checkStatusSendCard();

      },

      player1Follow: function () {
        var followChips = this.player2CurrentBet-this.player1CurrentBet;
        this.player1Bet(followChips);
        this.followStatus1 = false;

        this.checkStatusSendCard();

      },

      player2Follow: function () {
        var followChips = this.player1CurrentBet-this.player2CurrentBet;
        this.player2Bet(followChips);

        this.followStatus2 = false;
        this.checkStatusSendCard();
      },

      checkStatusSendCard: function () {
        if (this.doStatus1==true && this.doStatus2==true) {
          this.player1CurrentBet=0;
          this.player2CurrentBet=0;

          if (this.player1.cards.length == 5) {
            this.checkValue();
          }else{
            this.getOne();
          }
        }
      },

      drop:function (i) {
        if(i==1){
          this.player2.chips+=this.totalBet;
          this.winner=this.player2;
        }
        if(i==2){
          this.player1.chips+=this.totalBet;
          this.winner=this.player1;
        }

        alert(this.winner.name+"WIN");
        this.getAll();

      },

      getP:function () {
        this.player1.getOpponet(this.player2);
        console.log(this.player1.computeOwnWinnerP());
      },

    },
    components: {}

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    margin-top: 60px;
  }

  .hide {
    background-color: black;
    z-index: 99;
    width: 94px;
    height: 137px;
    float: left;
  }

  .small {
    width: 0;
    height: 0;
  }

  .playerDesk {
    width: 100%;
    height: 210px;
    margin-top: 5em;

  }
</style>
