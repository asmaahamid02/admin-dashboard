<template>
  <FormLayout>
<template #title>
     
        Form Generator
      </template>
     <template #subtitle>
        Generate Your Own Form
    </template>
    <template #content>
        <v-form @submit.prevent="addField" ref="generateFormRef">
          <v-card
            elevation="1"
            class="mb-4"
            v-for="(field, index) in formFields"
            :key="field"
          >
            <v-card-subtitle
              class="font-weight-bold text-uppercase text-left mb-2 py-2"
            >
              <div class="d-flex justify-space-between align-content-start">
                <span>Field {{ index + 1 }}</span>
                <v-btn
                  icon
                  @click="removeField(field.id)"
                  elevation="0"
                  color="red-accent-4"
                  size="small"
                  v-if="formFields.length > 1"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="12" sm="4">
                  <v-select
                    label="Select Input Type"
                    :items="inputTypes"
                    v-model="field.inputType"
                    :rules="inputTypeRules"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Label"
                    v-model="field.inputLabel"
                    :rules="inputLabelRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    label="Placeholder"
                    v-model="field.inputPlaceholder"
                    :rules="inputPlaceholderRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-switch
                    v-model="field.inputRequired"
                    label="Required"
                    color="purple"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn
                color="red-accent-4"
                class="text-uppercase v-btn--block"
                type="reset"
                @click="reset"
              >
                Reset Field
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="purple"
                class="text-uppercase v-btn--block"
                type="submit"
              >
                Add Field
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
    </template>
  </FormLayout>
</template>

<script>
import { ref , onMounted} from 'vue'
import { useStore } from 'vuex'
import FormLayout from './FormLayout.vue'
export default {
  name: 'FormGenerator',
    components: {
        FormLayout,
    },
  setup() {
    /*CONSTANTS*/
    const inputTypes = [
      'Text',
      'Number',
      'Email',
      'Password',
      'Date',
      'Time',
      'File',
      'Tel',
      'Url',
    ]
    const fieldRules = {
      inputTypeRules: [(v) => !!v || 'Input type is required'],
      inputLabelRules: [(v) => !!v || 'Label is required'],
      inputPlaceholderRules: [(v) => !!v || 'Placeholder is required'],
    }
    const store = useStore()

    
    /*DATA*/
    const generateFormRef = ref(null)
    const formFields = ref([])
    onMounted(() => {
        console.log('mounted', store.getters.formFields)
        formFields.value =
      store.getters.formFields
    })

    /*METHODS*/
    const addField = async () => {
      const { valid } = await generateFormRef.value.validate()

      if (!valid) return

      const field = {
        id: formFields.value.length + 1,
        inputType: 'Text',
        inputLabel: '',
        inputPlaceholder: '',
        inputRequired: false,
      }

      store.dispatch('addFormField', field)
    }

    const removeField = (id) => {
      store.dispatch('removeFormField', id)
    }

    const reset = () => {
      generateFormRef.value.reset()
    }

    return {
      inputTypes,
      ...fieldRules,
      generateFormRef,
      formFields,
      addField,
      removeField,
        reset,
    }
  },
}
</script>

<style scoped></style>
