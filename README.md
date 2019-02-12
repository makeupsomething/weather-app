# Weather app

A small weather applicatiom built with react using the [Open Weather Map API](https://openweathermap.org/api).

## How to run

To install packages
```
yarn install
```

To start the app
```
yarn start
```

To run the tests
```
yarn test
```

## Putting the app together

My guideline creating the app was the weather widgit that you get when you google the weather. I like this widgit because it is simple, clear and informative.

I decided to use `react-testing-library` for my DOM tests. This is a pretty new library that allows us to test the DOM as we intend it to be used and seen by a user. I think it replaces a lot of the tests that you would normally do with `enzyme` but is much simpler to set up and work with.

## Trade-offs

To get up an running quickly I used `create-react-app` to bootstrap the project. Ideally if I were to start again I would set up my own project from scratch.

I think in an effort to pack more information into the page the app does not look that great on all screen sizes, especially at the larger and smaller end of the scales. There is a sweet spot in the middle though where I think it looks ok.

In an effort to keep things more simple I intended to avoid newer react features such as hooks. I also did not want to use a state library like redux as this app is pretty small.

The icons and weather description in the cards are not super accurate. I take the middle value for each day forecast and display that. So it is not always representative of what that days weather will be.

## If Only I had more time

I should have used react context from the start for sending state to children. I think right now it is at the limit of maintainability for me. If I used react context the structure would be much more simple but I did not have have enough time to refactor this into the app.

If I had more time I would have liked for the home page to get the weather at the users location. I began this this process in [this branch](https://github.com/makeupsomething/weather-app/tree/feature/get-weather-from-coords) but was not able to fully implement it. I was planning to use the browsers build in geolocation API and get the users latitude and longitude from that.

I would have also liked to add more charts to show the rain and wind forecasts.

As I mentioned in the trade-offs section I icons and descriptions on the day cards are not that accurate. If I had more time I would have tried to get an average of the days weather icons and descriptions to determine the most accurate icon and description to show to the user.

I was not able to test everything, in particular the functions in the `utils` file need unit tests. I would also have liked to do some e2e tests with cypress.
