<template>
  <div class="column">
    <div class="column-text">
      <div class="column-text-box tx-jp">中古でスニーカーを買うのに抵抗があるって人は多いと思う。けど、中古でかつ格安になっているスニーカーを見ると人気がないんだなぁと思いつつ、自分が買ってあげないと燃えるゴミになってしまうの考えてしまう。まだ履けるのに...俺が引き取ってあげよう！ってなってつい買ってしまう。そして履き潰してあげる。もう履けない状態になってもなんか捨てられない。せっかくだから写真に撮ってから捨てよう。ということでこのサイトを作成した。web制作の勉強にもなるしい自分のスマホに保存しておくだけだとなんか勿体ないし、SNSに上げるのはちょっと恥ずかしい。</div>
      <div class="column-text-box tx-en">Basically, I buy used sneakers. And wear it out. If I don't buy these sneakers, they'll just become combustible garbage. Sneakers are athletic shoes. It would be a waste to decorate it, and I don't think it would be a good idea for sneakers.</div>
    </div>
    <div class="column-image">
      <img src="~/assets/images/s_1.png"/>
      <div class="bg-circle"></div>
    </div>
  </div>
</template>
<script setup>
</script>
<style lang="scss">
.column {
  display: flex;
  padding: 4vw 8vw;
  background-color: #FFF;
}
.column-text{
  width: 50%;
  line-height: 2;
  .tx-jp{
    color: #202020;
    font-size: 0.75rem;
    margin-bottom: 1rem;
  }
  .tx-en{
    color: #787878;
    font-size: 0.6rem;
  }
}
.column-image{
  width: 50%;
  margin: 0 0 0 4vw;
  img{
    width: 100%;
    position: absolute;
    top: 3vw;
    left: 0;
    z-index: 10;
  }
  .bg-circle{
    width: 30vw;
    height: 30vw;
    border-radius: 100vw;
    background-color: #949494;
    z-index: 1;
    margin:auto;
  }
}
</style>