<template>
  <form class="settings-input-wrapper" @submit.prevent>
    <input
      @drop.prevent
      autocorrect="off"
      spellcheck="false"
      @keydown.enter="setModelValue"
      v-model="inputValue"
      class="settings-input"
      placeholder="Enter city name"
      type="text"
    />
    <button class="settings-button" @click="setModelValue">
      <img
        class="settings-input-img"
        src="../../assets/img/enter-image.png"
        alt="Иконка отправки сабмита"
      />
    </button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    setModelValue() {
      this.$emit("update", this.inputValue);
      this.inputValue = "";
    },
  },

})
</script>

};

<style lang="scss" scoped>
.settings-input-wrapper {
  display: grid;
  grid-template-columns: 1fr auto;
  height: 40px;
}

.settings-button {
  margin-left: 5px;
  cursor: pointer;
  outline: none;
  background: none;
  border: none;
}

.settings-input {
  border-radius: 15px;
  border: none;
  padding: 10px;
}

.settings-input-img {
  width: 34px;
  height: 18px;
}
</style>
