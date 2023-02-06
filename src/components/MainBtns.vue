<template>
  <div class="wrapper-btns">
    <img v-if="!viewStatus" @click="setSettingsVisible" class="widget-btns settings-btn"
         src="../assets/img/settings.png" alt="">
    <img v-if="!viewStatus" @click="widgetDisplay" class="widget-btns close-btn"
         src="../assets/img/close.png" alt="">
    <img v-if="viewStatus" @click="setSettingsVisible" class="widget-btns close-btn"
         src="../assets/img/close.png" alt="">
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  props: {
    viewStatus: {
      type: Boolean
    }
  },
  methods: {
    setSettingsVisible() {
      this.$emit('update')
    },
    widgetDisplay() {
      this.$emit('display')
    }
  }
})
</script>

<style lang="scss" scoped>
.widget-btns {
  position: absolute;

  margin: 0 3px;
  border: none;

  width: 20px;
  height: 20px;
  padding: 0;

  cursor: pointer;
}

.settings-btn {
  left: 14em;
}

.close-btn {
  left: 16em;
}
</style>
