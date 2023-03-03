<template>
  <v-sheet width="400" rounded elevation="10" class="mx-auto pa-12">
    <h1 class="text-center mb-5 text-purple">Login</h1>

    <!--Form-->
    <v-form @submit.prevent="submitForm" ref="form">
      <v-text-field
        label="E-mail"
        :rules="emailRules"
        v-model="email"
      ></v-text-field>

      <v-text-field
        type="password"
        label="Password"
        v-model="password"
        :rules="passwordRules"
        class="mt-5"
      >
      </v-text-field>
      <v-btn type="submit" block color="purple" class="mt-5">Login</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      emailRules: [
        (value) => {
          //check length
          if (!value) return 'E-mail is required'

          //check valid email
          if (!value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))
            return 'E-mail must be valid'

          return true
        },
      ],
      passwordRules: [
        (value) => {
          //check length
          if (value?.length < 8) return 'Password must be at least 8 characters'

          //check for spaces
          if (value?.includes(' ')) return 'Password cannot contain spaces'

          //check for uppercase
          if (!value?.match(/[A-Z]/))
            return 'Password must contain at least one uppercase letter'

          //check for lowercase
          if (!value?.match(/[a-z]/))
            return 'Password must contain at least one lowercase letter'

          //check for number
          if (!value?.match(/[0-9]/))
            return 'Password must contain at least one number'

          return true
        },
      ],
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()
      this.valid = valid
    },
    async submitForm() {
      await this.validate()
      if (!this.valid) return

      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })

      //check if user is logged in
      if (this.$store.getters.isLoggedIn) {
        this.$router.push('/')
      } else if (this.$store.getters.loginError) {
        alert(this.$store.getters.loginError)
      } else {
        alert('Something went wrong')
      }
    },
  },
}
</script>

<style scoped></style>
