<template>
  <div class="fill" id="login">
    <div class="fill login-overlay">
      <div class="page-content">
  
        <div class="brand">
          <h2 class="brand-text">My-medusa-is-strong</h2>
        </div>
  
        <el-form :model="signin" :rules="rules" ref="signin">
          <el-form-item prop="username">
            <el-input v-model="signin.username" placeholder="name"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="signin.password" placeholder="password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="signIn('signin')">Sign in</el-button>
        </el-form>
  
        <div class="copyright">
          <p>WEBSITE BY XIANGXIAO</p>
          <p>© 2017. All RIGHT RESERVED.</p>
        </div>
  
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      signin: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 登录
    signIn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$router.push({ path: this.$route.query.redirect || '/home' })
          Vue.http.post('/service/signin', this.signin).then(res => {
            if (res.data.type === 'success') {
                // 登录成功后重置token
              window.localStorage.setItem('medusaUser', this.signin.username)
              this.$router.push({ path: this.$route.query.redirect || '/home' })
            } else {
              this.$notify.error({
                message: res.data.message
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
#login {
  background-image: url("../assets/images/bg_login.jpg");
  text-align: center;
}

.login-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .3);
}

#login .page-content {
  width: 400px;
}

#login form {
  margin: 30px 0;
}

#login button {
  width: 100%;
  font-family: 'opensans';
}

.brand-img {
  width: 60px;
  margin-bottom: 10px;
}

.brand-text {
  font-family: 'opensans';
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 20px;
  font-family: 'opensans';
}

.copyright {
  margin-top: 60px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  font-family: 'opensans';
}
</style>
