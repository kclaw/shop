requirejs.config({
    "locale" : "zh-hk",
    "baseUrl": "src/script/lib",
    "paths": {
      "jquery": "https://code.jquery.com/jquery-1.11.3.min",
      "knockout" : "https://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min"
    }
});

requirejs(["program","hiddenscrolldownmenu"]);
