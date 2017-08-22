<template>
  <nav class="site-menubar">
    <ul class="site-menu">
      <li>
        <router-link to="/home/datalist">
          <i class="glyphicon glyphicon-send"></i>
          <span>数据处理</span>
        </router-link>
      </li>
    </ul>
    <div class="site-menubar-footer">
      <a class="site-menubar-action" @click="logout">
        <i class="glyphicon glyphicon-off"></i>
      </a>
    </div>
  </nav>
</template>

<script>

export default {
  methods: {
    logout () {
      window.localStorage.removeItem('medusaUser')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
