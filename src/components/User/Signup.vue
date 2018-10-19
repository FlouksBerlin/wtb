<template>
	<v-container> 
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<v-card>
					<v-toolbar color="primary" dark>
						<v-toolbar-title>Sign up</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-container>
							<form @submit.prevent="onSignup">
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="username" label="Username" id="username" v-model="username" type="username" required></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-text-field name="confirmPassword" label="Confirm Password" id="confirmPassword" v-model="confirmPassword" type="password"
										 :rules="[comparePasswords]"></v-text-field>
									</v-flex>
								</v-layout>
								<v-layout row>
									<v-flex xs12>
										<v-btn type="submit">Sign up</v-btn>
									</v-flex>
								</v-layout>
							</form>
						</v-container>
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>

		<v-layout row mt-3 v-if="error">
			<v-flex xs12 sm6 offset-sm3>
				<app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
			</v-flex>
		</v-layout> 
	</v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },

  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : true;
    },

    user() {
      return this.$store.getters.user;
    },

		loading() {
			return this.$store.getters.loading
		},

		error(){
			return this.$store.getters.error
		}
  },

  watch: {
    user(value) {
      if ((value !== null) & (value !== undefined)) {
        this.$router.push("/");
      }
    }
  },

  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
				username: this.username
      });
    },

		onDismissed() {
			this.$store.dispatch('clearError')
		}
  }
};
</script>

<style>
</style>
