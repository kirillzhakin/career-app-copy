<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="value in uniqueValue" :key="value" class="h-8 w-1/2">
          <input
            :id="value"
            v-model="selectedValue"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/stores/user'

const props = defineProps({
  uniqueValue: {
    type: [Set<string>, Array<string>],
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})
const selectedValue = ref<string[]>([])
const router = useRouter()

const selectValue = () => {
  props.action(selectedValue.value)
  router.push({ name: 'JobResults' })
}

const userStore = useUserStore()
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValue.value = []
    }
  })
})
</script>
