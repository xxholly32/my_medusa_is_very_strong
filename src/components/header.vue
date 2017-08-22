<template>
  <header class="header">
      <div class="header-brand">MEDUSA IS STRONG</div>
      <ul class="nav">
          <li class="nav-item">
            <span>账号 ： {{ user }}</span>
          </li>
        </ul>
  </header>  
</template>


<script>

export default {
  name: 'header',
  data () {
    return {
      user: window.localStorage.medusaUser
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.header-brand{
  float: left;
}
.nav {
  float: right;
  height: 100%;
  line-height: 60px;
  background: transparent;
  padding: 0 20px;
  margin: 0;
}
.nav-logo,
.nav-logo-small {
  vertical-align: sub;
}
.nav-logo-small {
  display: none;
}
.nav-item {
  margin: 0;
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
  margin-left: 20px;

  &:last-child {
    cursor: default;
    margin-left: 34px;
    span {
      opacity: .8;
    }

    .nav-lang {
      cursor: pointer;
      display: inline-block;
      height: 100%;
      &:hover {
        opacity: 1;
      }
      &.active {
        font-weight: 700;
        opacity: 1;
      }
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    display: block;
    padding: 0 20px;
    opacity: .8;
    &.active,
    &:hover {
      opacity: 1;
    }

    &.active {
      font-weight: 700;
    }

    &.active::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #99d2fc;
    }
  }
}
</style>
