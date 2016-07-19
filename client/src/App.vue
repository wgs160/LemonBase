<template>
  <navbar></navbar>
  <aside></aside>
</template>

<script>
  /* 组件引入  开始=============================== */
  import navbar from "./components/navbar"
  import aside from "./components/aside"
  /* 组件引入  结束=============================== */

  /* lib文件  开始=============================== */
  import animateCSS from "./lib/animate/animate.min"
  import bootstrapCSS from "./lib/bootstrap/css/bootstrap.min"
  /* lib文件  结束=============================== */

  import lemonCSS from "./less/index"

export default {
  components:{
    navbar:navbar,
    aside:aside
  },
  data :function () {
    return {
      msg: 'Hello Vue!',
      name: '我是头部'
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
