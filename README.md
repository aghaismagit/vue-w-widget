 Weather Widget.

<br/>
![gif](https://user-images.githubusercontent.com/49817117/217030701-7b9bb60b-be3d-4c96-8b89-9483c037d818.gif)


<br/>

## 📍 Demo.


> https://aghaismagit.github.io/

<br/>

## 📍 Setup (for users).

Just paste this code in <head>:

```
    <link
      href="https://cdn.jsdelivr.net/gh/aghaismagit/w-w.vue/css/app.e9810ab7.css"
      rel="stylesheet"
    />
```
and this in And this one at the end of the document before </body>
```
    <script src="https://cdn.jsdelivr.net/gh/aghaismagit/w-w.vue/js/app.1554ed08.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/aghaismagit/w-w.vue/js/chunk-vendors.ee0eda03.js"></script>
```

<br/>

## 📍 Setup (for developers).

1. Download the repository.

2. Create `.env` file in the root folder.

3. Add the variable to `.env` file: <br/>
   `VUE_APP_OPEN_WEATHER_API_KEY` - [OpenWeather API](https://openweathermap.org/api) key.<br/>

4. Run `npm install` from the root folder.

5.1. To launch in development mode, run `npm run serve`.

5.2. To build for production, run `npm run build`.
