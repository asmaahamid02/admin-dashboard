<template>
  <v-row justify="end" class="my-4">
    <v-dialog v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="purple" v-bind="props" class="text-uppercase">
          Add New User
        </v-btn>
      </template>
      <v-form @submit.prevent="submit" ref="addFormRef">
        <v-card>
          <v-card-title>
            <span class="text-h5">New User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="First Name*"
                    required
                    v-model="firstName"
                    :rules="firstNameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Last Name*"
                    v-model="lastName"
                    :rules="lastNameRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="email"
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Phone Number*"
                    type="tel"
                    v-model="phone"
                    :rules="phoneRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Address*"
                    v-model="address"
                    :rules="addressRules"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small class="text-red">* indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="purple-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </v-btn>
            <v-btn color="purple-darken-1" variant="text" type="submit">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  name: 'Modal',
  setup(props, context) {
    const dialog = ref(false)
    const addFormRef = ref(null)

    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    })

    //validation rules
    const fieldsRules = reactive({
      firstNameRules: [
        (value) => {
          //check length
          if (!value) return 'First Name is required'
          return true
        },
      ],
      lastNameRules: [
        (value) => {
          //check length
          if (!value) return 'Last Name is required'
          return true
        },
      ],
      emailRules: [
        (value) => {
          //check length
          if (!value) return 'E-mail is required'

          //check valid email
          if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value))
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
      phoneRules: [
        (value) => {
          //check length
          if (!value) return 'Phone Number is required'

          //check valid phone number
          if (!/^[0-9]{10}$/.test(value)) return 'Phone Number must be valid'
          return true
        },
      ],
      addressRules: [
        (value) => {
          //check length
          if (!value) return 'Address is required'
          return true
        },
      ],
    })

    //submit form
    const submit = async () => {
      const { valid } = await addFormRef.value.validate()

        if (valid) {                       
            context.emit('addUser', formData)
            
            //reset form
            addFormRef.value.reset()
            
            dialog.value = false
        }else {
            console.log('invalid')
        }
    }

    return {
      dialog,
      submit,
      ...toRefs(formData),
      addFormRef,
      ...toRefs(fieldsRules),
    }
  },
}
</script>

<style scoped></style>
