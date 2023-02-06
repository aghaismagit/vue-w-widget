<template>
  <div class="settings-window">
    <div>
      <h2 class="settings-title">Settings</h2>
      <h3 class="empty-data" v-if="model.length < 1">
        City not selected. Please select the city
      </h3>
      <ul class="weather-list">
        <settings-item
          :key="item.name"
          v-for="(item, i) in model"
          draggable="true"
          @dragstart="dragStart(i, $event)"
          @dragover.prevent
          @drop="dragFinish(i, $event)"
          @delete="deleteCity"
          :model="item"
        />
      </ul>
    </div>
    <div>
      <p class="alert" v-if="reqValidation">
        City is not found, please try again
      </p>
      <p class="alert" v-if="!cityNameValidation">
        This location has already been added.
      </p>
      <div v-if="loading" id="loading"></div>
      <settings-input v-else @update="updateModelValue"/>
    </div>
  </div>
</template>
<script lang="ts">
import SettingsItem from "./SettingsItem.vue";
import SettingsInput from "./SettingsInput.vue";
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      dragging: -1,
    };
  },
  props: {
    model: {
      type: Array,
    },
    cityNameValidation: {
      type: Boolean,
    },
    reqValidation: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },
  components: {
    SettingsItem,
    SettingsInput,
  },
  methods: {
    deleteCity(model: object) {
      this.$emit("delete", model);
    },
    updateModelValue(inputValue: string) {
      this.$emit("update", inputValue);
    },
    dragStart(which: number, event: DragEvent) {
      event.dataTransfer!.setData("Text", (event.target as HTMLElement).id);
      event.dataTransfer!.dropEffect = "move";
      this.dragging = which;
    },
    dragFinish(to: number) {
      this.$emit("move", to, this.dragging);
    },
  },
})
</script>


<style lang="scss" scoped>
@import "src/assets/styles/styles";

.settings-title {
  margin-bottom: 25px;
}

.empty-data {
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
}

.alert {
  margin-bottom: 10px;
}

#loading {
  width: 30px;
  height: 30px;
  border: 3px solid var(--black_05);
  border-radius: 50%;
  border-top-color: var(--white);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

.settings-window {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
