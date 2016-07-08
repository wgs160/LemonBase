<template>
  <navbar></navbar>
  <aside></aside>
</template>

<script>
import navbar from "./components/navbar"
import aside from "./components/aside"

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
