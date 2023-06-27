<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="oranization in UNIQUE_ORGANIZATIONS" :key="oranization" class="h-8 w-1/2">
            <input
              :id="oranization"
              v-model="selectedOrganization"
              :value="oranization"
              type="checkbox"
              class="mr-3"
              @change="selectOrganization"
            />
            <label :for="oranization">{{ oranization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs.js'

import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from '@/stores/user.js'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

export default {
  name: 'JobfilterSidebarOrganizations',
  components: {
    CollapsibleAccordion
  },

  data() {
    return {
      selectedOrganization: []
    }
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS])
  },
  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganization)
    }
  }
}
</script>
