<template>
   <v-sheet 
   width="400" 
   rounded
    elevation="10"

   class="mx-auto pa-12"
   >
   <h1 class="text-center mb-5 text-purple">Login</h1>
   
    <!--Form-->
    <v-form>
        <v-text-field 
        label="Username"  
        :rules="usernameRules"      
        :v-model="username"
        ></v-text-field>

        <v-text-field
        type="password"
        label="Password"
        :v-model="password"
        :rules="passwordRules"
        class="mt-5"
        >
    </v-text-field>
    <v-btn 
    type="submit"
     block 
     color="purple"
     class="mt-5"
     >Login</v-btn>
    </v-form>
   </v-sheet>
</template>

<script>
    export default {
        name: 'Login',
        data(){
            return{
                username: '',
                password: '',
                usernameRules:[
                    value => {
                        //check length
                        if(value?.length < 5) return 'Username must be at least 5 characters'

                        //check for spaces
                        if(value?.includes(' ')) return 'Username cannot contain spaces'

                        //check for special characters
                        if(!value?.match(/^[a-zA-Z0-9]+$/)) return 'Username cannot contain special characters'

                        //check if starts with number
                        if(value?.match(/^[0-9]/)) return 'Username cannot start with a number'

                        //check if no letters
                        if(!value?.match(/[a-zA-Z]/)) return 'Username must contain at least one letter'

                        return true                    
                     }
                ],
                passwordRules: [
                    value => {
                        //check length
                        if(value?.length < 8) return 'Password must be at least 8 characters'

                        //check for spaces
                        if(value?.includes(' ')) return 'Password cannot contain spaces'

                        //check for uppercase
                        if(!value?.match(/[A-Z]/)) return 'Password must contain at least one uppercase letter'

                        //check for lowercase
                        if(!value?.match(/[a-z]/)) return 'Password must contain at least one lowercase letter'

                        //check for number
                        if(!value?.match(/[0-9]/)) return 'Password must contain at least one number'
                        
                        return true                    
                     }
                ]

            }
        }
        
    }
</script>

<style lang="scss" scoped>

</style>