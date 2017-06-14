<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="app">
    <router-view></router-view>

    <button v-on:click="getAll()">重置所有牌</button>
    <button v-on:click="getOne()" id="sendCard"> 发牌</button>
    <button v-on:click="checkValue()">check</button>
    <p>WINNER:<span id="winner">{{winnerName}}</span></p>


    <br/>
    <p>

    </p>
    <div class="playerDesk">
      <h3>{{player1.name}}</h3>
      <button v-on:click="follow()" id="player1Bet" >Bet</button>
      <button v-on:click="follow()" id="player1Follow" v-show="followStatus1">follow</button>
      <button v-on:click="drop()">drop</button>
      <p id="player1">

      <span v-for="( card ,i) in this.player1.cards">
        <div v-bind:class="{hide: i==0}" style="float: left"></div>
        <!--<img v-bind:src="card.cardSrc" v-bind:class="{small:i==0}">-->
        <img v-bind:src="card.cardSrc" v-if="i>0 &&i<5 &&x==false ">
        <img v-bind:src="card.cardSrc" v-if="x ">
      </span>
      </p>
    </div>


    <br/>

    <div class="playerDesk">
      <h4>{{player2.name}}</h4>
      <button v-on:click="follow()" id="player2Bet"  >Bet</button>
      <button v-on:click="follow()" id="player2Follow" v-show="followStatus2">follow</button>
      <button v-on:click="drop()">drop</button>
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

  export default {
    data(){
      return {
        cardArray: [],
        lastCardPosition: 0,
        player1: {},
        player2: {},
        Card: {},
        winnerName: '',
        x: false,

        followStatus1:true,
        followStatus2:true
      }
    },

    created(){
      this.initPlayer()
    },
    methods: {
      initPlayer: function () {
        console.log(123);

        this.player1 = new Player();
        this.player2 = new Player();

        this.player1.name = "Jack";
        this.player2.name = "Merry";

        this.Card = new Card();

      },


      /*初始化所有牌*/
      getAll: function () {
        document.getElementById('sendCard').removeAttribute("disabled");
        this.x = false;
        //所有牌的一个数组
        this.cardArray = this.Card.initAll();
        this.player1.initCards();
        this.player2.initCards();
      },

      /*给2个人发牌*/
      getOne: function () {
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

              this.followStatus1=false;

            this.followStatus2=true;

          } else if (lastCard2.cardnum > lastCard1.cardnum) {
            this.followStatus2=false;
            this.followStatus1=true;
          } else {
            if (lastCard1.cardset > lastCard2.cardset) {
              this.followStatus1=false;
              this.followStatus2=true;
            } else {
              this.followStatus2=false;
              this.followStatus1=true;

            }
          }
        }


        if (this.player1.cards.length == 5) {
          document.getElementById('sendCard').setAttribute("disabled", true);
        }

      },

      //比较牌的大小
      checkValue: function () {
        document.getElementById("player1").firstChild.firstChild.removeAttribute('class', 'hide');
        this.x = true;
        this.winnerName = Rule(this.player1, this.player2);
        console.log(this.winnerName);

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

      }


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
    margin-top: 3em;
  }
</style>
