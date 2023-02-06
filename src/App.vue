<template>
  <div v-if="widgetIsVisible" class="weather-widget-wrapper">
    <div class="widget-bg">
      <main-btns
        :viewStatus="settingIsVisible"
        @display="widgetDisplay"
        @update="setSettingsVisible"
      />
      <div class="view-area">
        <section v-if="!settingIsVisible" class="weather">
          <weather-window v-if="!isLoading" :model="myWeather"/>
        </section>
        <section v-if="settingIsVisible" class="settings">
          <settings-window
            @move="moveItem"
            @update="updateWeatherValue"
            @delete="deleteCity"
            :cityNameValidation="uniquenessValidation"
            :reqValidation="reqIsNotValid"
            :model="myWeather"
            :loading="isLoading"
          />
        </section>
      </div>
    </div>
  </div>
  <div v-if="!widgetIsVisible" class="weather-widget--closed">
    <button class="open-button" @click="widgetDisplay">
      <img
        class="closed__image"
        src="./assets/img/cloudly.png"
        alt="Иконка облака"
      />
    </button>
  </div>
</template>

<script lang="ts">

import WeatherWindow from "./components/WeatherWindow/WeatherWindow.vue";
import SettingsWindow from "./components/SettingsWindow/SettingsWindow.vue";
import MainBtns from "./components/MainBtns.vue";

import {getWeather} from "./api/getAPI";
import {defineComponent} from "vue";
import {INewWeather} from "@/api/interfaces";


export default defineComponent({
  name: "App",
  data() {
    return {
      settingIsVisible: false,
      widgetIsVisible: false,
      uniquenessValidation: true,
    };
  },
  components: {
    WeatherWindow,
    SettingsWindow,
    MainBtns,
  },
  methods: {
    setSettingsVisible() {
      this.settingIsVisible = !this.settingIsVisible;
    },
    widgetDisplay() {
      this.widgetIsVisible = !this.widgetIsVisible;
    },
    deleteCity(model: INewWeather) {
      this.myWeather = this.myWeather.filter((i) => i.id !== model.id);
      this.locations = this.locations.filter((i) => {
        const {name} = model
        name.replace(/'/g, "");
        return i !== name;
      });
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
    async updateWeatherValue(inputValue: string) {
      if (!inputValue) return;

      const isElementFound = !!(this.locations.find((e) => e === inputValue));

      this.uniquenessValidation = !isElementFound;

      if (this.uniquenessValidation) {
        const updatedWeatherName = await this.fetchWeather(inputValue);

        this.locations.push(updatedWeatherName!.trim());
        localStorage.setItem("locations", JSON.stringify(this.locations));
      }
    },
    moveItem(to: number, dragging: number) {
      this.myWeather.splice(to, 0, this.myWeather.splice(dragging, 1)[0]);
      let wrapper = this.locations[dragging];
      this.locations[dragging] = this.locations[to];
      this.locations[to] = wrapper;
      localStorage.setItem("locations", JSON.stringify(this.locations));
    },
  },
  setup() {
    const {myWeather, isLoading, fetchWeather, locations, reqIsNotValid} =
      getWeather();

    return {myWeather, isLoading, fetchWeather, locations, reqIsNotValid};
  },
});

</script>

<style lang="scss">
@import "./assets/styles/styles";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

li {
  list-style: none;
}

.weather-widget-wrapper {
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50px;
  right: 50px;

  max-width: 300px;
  width: 100%;
  height: 400px;

  box-shadow: 7px 7px 7px;
  border-radius: 15px;

  padding: 10px;
  background: url("~@/assets/img/snow.jpg") no-repeat;
  background-size: 300px 400px;

  overflow-y: scroll;
  scrollbar-width: thin;
  z-index: 99999999999;

  font-family: "Times New Roman", sans-serif ;
  h2 {
    font-size: 24px;
  }
  line-height: 1;
  color: black;

  p {
    margin-bottom: 0;
  }
  ul {
    padding: 0;
  }
}

.weather-widget-wrapper::-webkit-scrollbar {
  width: 0;
}

.widget-bg {
  height: 100%;
  padding: 10px;
  border-radius: 15px;
}

.weather-widget--closed {
  position: fixed;
  top: 80px;
  right: 25px;

  display: flex;
  justify-content: flex-end;
  padding: 10px;

  height: 60px;
  width: 60px;
  border-radius: 15px;
  background-color: var(--active_blue);
  box-shadow: 7px 7px 7px;

  cursor: pointer;
  z-index: 99999999;
}

.closed__image {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.open-button {
  border: none;
  background: none;
}

.view-area,
.settings {
  height: 100%;
}
</style>
