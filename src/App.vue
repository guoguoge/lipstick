<template>
<div id="app">
  <router-view />
  <audio id="music" src="http://47.106.116.138/music.mp3" autoplay loop></audio>

</div>
</template>

<script>
export default {
  methods: {
    playMusic() {
      const _audio = document.getElementById('music');
      if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        _audio.play();
      } else {
        if (document.addEventListener) {
          document.addEventListener("WeixinJSBridgeReady", function() {
            _audio.play();
          }, false);
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", function() {
            _audio.play();
          });
          document.attachEvent("onWeixinJSBridgeReady", function() {
            _audio.play();
          });
        }
      }
    }
  },
  mounted() {
    this.playMusic()
    document.addEventListener("touchstart", function(e) {
      const _audio = document.getElementById('music');
      _audio.play();
    }, false);
  }
}
</script>

<style lang="less">
body,
html {
    margin: 0;
    padding: 0;
}
* {
    text-decoration: none;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    text-decoration: none;
}
</style>
