<template>
  <MultiStepForm
    :steps="steps"
    ref="multiStepFormRef"
    @validateStep="validateStep"
    @onComplete="onComplete"
  >
    <template #step-1>
      <v-form ref="step1FormRef">
        <v-text-field
          label="First Name"
          v-model="firstName"
          :rules="firstNameRules"
        ></v-text-field>
        <v-text-field
          label="Last Name"
          v-model="lastName"
          :rules="lastNameRules"
        ></v-text-field>
        <v-text-field
          label="Email"
          v-model="email"
          :rules="emailRules"
        ></v-text-field>
        <v-text-field
          label="Phone"
          v-model="phone"
          :rules="phoneRules"
        ></v-text-field>
      </v-form>
    </template>
    <template #step-2>
      <v-form ref="step2FormRef">
        <v-text-field
          label="Address"
          v-model="address"
          :rules="addressRules"
        ></v-text-field>
        <v-text-field
          label="City"
          v-model="city"
          :rules="cityRules"
        ></v-text-field>
        <v-text-field
          label="State"
          v-model="state"
          :rules="stateRules"
        ></v-text-field>
        <v-text-field
          label="Zip"
          v-model="zip"
          :rules="zipRules"
        ></v-text-field>
      </v-form>
    </template>
    <template #step-3>
      <v-card-text>
        <v-icon color="green-accent-4"
        size="100"
        
        >
         mdi-check-circle-outline
        </v-icon>
                <h1 class="mt-5">Thank you for your submission!</h1>       
      </v-card-text>
    </template>
  </MultiStepForm>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import MultiStepForm from '../components/MultiStepForm.vue'
export default {
  name: 'StepFormPage',
  components: {
    MultiStepForm,
  },
  setup() {
    /*CONSTANTS*/
    const validationRules = {
      firstNameRules: [
        (v) => !!v || 'First name is required',
        (v) =>
          (v && v.length <= 10) || 'First name must be less than 10 characters',
      ],
      lastNameRules: [
        (v) => !!v || 'Last name is required',
        (v) =>
          (v && v.length <= 10) || 'Last name must be less than 10 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) ||
          'E-mail must be valid',
      ],
      phoneRules: [
        (v) => !!v || 'Phone is required',
        (v) => (v && v.length <= 10) || 'Phone must be less than 10 characters',
      ],
      addressRules: [
        (v) => !!v || 'Address is required',
        (v) =>
          (v && v.length <= 10) || 'Address must be less than 10 characters',
      ],
      cityRules: [
        (v) => !!v || 'City is required',
        (v) => (v && v.length <= 10) || 'City must be less than 10 characters',
      ],
      stateRules: [
        (v) => !!v || 'State is required',
        (v) => (v && v.length <= 10) || 'State must be less than 10 characters',
      ],
      zipRules: [
        (v) => !!v || 'Zip is required',
        (v) => (v && v.length <= 10) || 'Zip must be less than 10 characters',
      ],
    }

    /*DATA*/
    const multiStepFormRef = ref(null)
    const step1FormRef = ref(null)
    const step2FormRef = ref(null)

    const steps = ref([
      {
        title: 'Step 1',
        valid: false,
      },
      {
        title: 'Step 2',
        valid: false,
      },
      {
        title: 'Step 3',
      },
    ])

    const formData = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    })

    /*METHODS*/
    const validateStep = async (stepIndex) => {
      switch (stepIndex) {
        case 0:
          {                   
            const { valid } = await step1FormRef.value.validate()                  
            steps.value[stepIndex].valid = valid

            if(valid){
              multiStepFormRef.value.submitStep()
            }
          }
          break
        case 1:
          {
            const { valid } = await step2FormRef.value.validate()
            steps.value[stepIndex].valid = valid

            if(valid){
              multiStepFormRef.value.submitStep()
            }            
          }
          break
        default:
          break
      }
    }

    const onComplete = () => {
      step1FormRef.value.reset()
      step2FormRef.value.reset()

      steps.value.forEach((step) => {
        step.valid = false
      })

    }

    return {
      steps,
      ...validationRules,
      ...toRefs(formData),
      validateStep,
      multiStepFormRef,
      step1FormRef,
      step2FormRef,
      onComplete,
    }
  },
}
</script>

<style scoped></style>
