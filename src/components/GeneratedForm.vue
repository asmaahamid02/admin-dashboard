<template>
  <FormLayout>
    <template #title> Generated Form View </template>
    <template #subtitle v-if="!isShowForm || !isShowInput()">
      Your generated from will appear here
    </template>
    <template #content>
      <v-form @submit.prevent="submit" ref="generatedFormRef">
        <v-row>
          <v-col cols="12" v-for="(field, index) in formFields" :key="field.id">
            <v-text-field
              v-if="isShowInput(index)"
              :label="field.inputLabel"
              :placeholder="field.inputPlaceholder"
              :type="field.inputType?.toLowerCase()"
              :rules="
                field.inputRequired
                  ? [(v) => !!v || `${field.inputLabel} is required`]
                  : []
              "
              :dense="true"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              v-if="isShowForm && isShowInput()"
              color="purple"
              class="text-uppercase v-btn--block"
              type="submit"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </FormLayout>
</template>

<script>
import FormLayout from './FormLayout.vue'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'GeneratedForm',
  components: { FormLayout },
  setup() {
    /*STORE*/
      const store = useStore()
    /*DATA*/
    const generatedFormRef = ref(null)
    const formFields = ref([])

    /*MOUNTED*/
    onMounted(() => {
      formFields.value = store.getters.formFields
    })

    /*COMPUTED*/
    const isShowForm = computed(() => {
      return formFields.value.length > 0
    })

    /*METHODS*/
    const isShowInput = (index = 0) => {
      return (
        formFields.value[index].inputLabel != '' &&
        formFields.value[index].inputLabel != null &&
        formFields.value[index].inputType != '' &&
        formFields.value[index].inputType != null &&
        formFields.value[index].inputPlaceholder != '' &&
        formFields.value[index].inputPlaceholder != null
      )
    }

    const submit = async () => {
      const { valid } = await generatedFormRef.value.validate()
      if (!valid) return

      console.log(formFields.value)
    }

    return {
      formFields,
      isShowForm,
      isShowInput,
      submit,
      generatedFormRef,
    }
  },
}
</script>

<style scoped></style>
