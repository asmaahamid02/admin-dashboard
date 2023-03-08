<template>
  <FormLayout>
    <template #header>
      <v-progress-linear
        :model-value="progressValue"
        color="purple"
        :height="10"
        striped
      ></v-progress-linear>
    </template>
    <template #content>
      <v-timeline direction="horizontal" line-inset="12">
        <v-timeline-item
          v-for="(step, index) in steps"
          :key="index"
          :dotColor="activeStep === index ? 'purple' : 'grey'"          
        >
          <!-- <template #opposite v-if="index % 2 === 0">
            <v-card-text>
              {{ step.title }}
            </v-card-text>
          </template> -->
          <!-- <v-card-text v-if="index % 2 !== 0">
            {{ step.title }}
          </v-card-text> -->
          <v-card-text class="font-weight-bold">
            {{ step.title }}
          </v-card-text>
        </v-timeline-item>
      </v-timeline>
      <v-divider></v-divider>
      <!--steps-->
      <div
        v-for="(step, index) in steps"
        :key="index"
        v-show="activeStep == index"
      >
        <slot :name="'step-' + (index + 1)"> </slot>
      </div>

      <v-progress-circular
        v-if="loading"
        indeterminate
        color="purple"
      ></v-progress-circular>

      <template v-if="!loading && activeStep < steps.length - 1">
        <v-row>
          <v-col 
          cols="12"           
          :md="activeStep == 0 ? '12' : '6'"
          >
            <v-btn
              color="purple"
              class="mt-5"              
              @click="submitStep"
              :disabled="progressValue == 100"
              >{{ btnText }}</v-btn>
          </v-col>
          <v-col cols="12" md="6" v-if="activeStep > 0">
            <v-btn
              color="purple"
              class="mt-5"
              @click="backStep"              
              >Back</v-btn
            >
          </v-col>
        </v-row>
      </template>
    </template>
  </FormLayout>
</template>

<script>
import { ref, computed } from 'vue'
import FormLayout from './FormLayout.vue'
export default {
  name: 'MultiStepForm',
  components: {
    FormLayout,
  },
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    /*DATA*/
    const activeStep = ref(0)
    const loading = ref(false)
    const progressValue = ref(
      props.steps.length > 0
        ? (activeStep.value + 1 / props.steps.length) * 100
        : 0
    )

    /*COMPUTED*/
    const btnText = computed(() => {
      if (activeStep.value < props.steps.length - 2) {
        return 'Next'
      } else {
        return 'Submit'
      }
    })

    /*METHODS*/
    const submitStep = () => {
      loading.value = true

      //validate the current step
      if (!props.steps[activeStep.value].valid) {        
        context.emit('validateStep', activeStep.value)
        //create a delay to force waiting for the validation to complete
        setTimeout(() => {
          loading.value = false
        }, 1000)
        return
      }

      //go to the next step
      if (activeStep.value < props.steps.length - 1) {
        activeStep.value++
        progressValue.value =
          ((activeStep.value + 1) / props.steps.length) * 100
      }

      //submit the form
      if (activeStep.value === props.steps.length - 1) {
        //submit form and complete the progress  
        console.log('submitted')      
        progressValue.value = 100
        
        setTimeout(() => {
          //reset
          activeStep.value = 0
          progressValue.value = 0
          context.emit('onComplete')
        }, 2000)
      }
      loading.value = false
    }

    const backStep = () => {
      if (activeStep.value > 0) {
        activeStep.value--
        progressValue.value = (activeStep.value / props.steps.length) * 100
      }
    }

    return {
      activeStep,
      progressValue,
      submitStep,
      backStep,
      btnText,
      loading,
    }
  },
}
</script>

<style lang="scss" scoped></style>
