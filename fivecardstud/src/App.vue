<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div id="app">
    <router-view></router-view>

    <button v-on:click="getAll()">重置所有牌</button>
    <button v-on:click="getOne()"> 发牌</button>
    <p>WINNER:<span id="winner">{{winnerName}}</span></p>
    <img src="./assets/cardPic/Diamond2.jpg">
    <br/>
    <h3>Jack</h3>
    <p id="player1">
      <span v-for=" i in this.player1.cards"><img v-bind:src="i.cardSrc"> </span>
    </p>

    <br/>
    <h4>Merry</h4>
    <p id="player2">
      <span v-for=" i in this.player2.cards"><img v-bind:src="i.cardSrc"> </span>

    </p>


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
        //所有牌的一个数组
        this.cardArray = this.Card.initAll();
        this.player1.initCards();
        this.player2.initCards();
      },

      /*给2个人发牌*/
      getOne: function () {
        var lastCard = this.cardArray.shift();
        this.player1.setCards(lastCard);

        lastCard = this.cardArray.shift();
        this.player2.setCards(lastCard);

        if (this.player1.cards.length == 5) {
          //    alert(comparePlayerValue(player1, player2));
          this.winnerName = Rule(this.player1, this.player2);
          console.log(Rule(this.player1, this.player2));
        }

        if (this.player1.cards.length > 5) {
          this.getAll();
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
</style>
