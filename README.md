# SurveyJS Theming Apps

> Want to style and theme your SurveyJS surveys, you're at the right place.

These sample apps compliments the Conductor platform applications to assist in creating and styling SurveyJS surveys without the need to connect with the platform. All surveys are loaded from local JSON files.

<img width="200" alt="image" src="https://user-images.githubusercontent.com/1082672/110259542-4cafae00-7ffc-11eb-87f2-a02e3da57df2.png"> <img width="200" alt="image" src="https://user-images.githubusercontent.com/1082672/110259547-546f5280-7ffc-11eb-90d0-54f175e71c60.png"> <img width="200" alt="image" src="https://user-images.githubusercontent.com/1082672/110259565-62bd6e80-7ffc-11eb-9ba3-e5c6ed07efdc.png"> <img width="200" alt="image" src="https://user-images.githubusercontent.com/1082672/110259570-6c46d680-7ffc-11eb-856d-122c6a365197.png">

<img width="200" src="https://user-images.githubusercontent.com/1082672/110401240-548b5300-80cd-11eb-8f7a-a824a4a9aa70.png"> <img width="200" src="https://user-images.githubusercontent.com/1082672/110401252-59500700-80cd-11eb-8832-9e6f54674fc3.png"> <img width="200" src="https://user-images.githubusercontent.com/1082672/110401268-60771500-80cd-11eb-82e4-cfb36dd24154.png"> <img width="200" src="https://user-images.githubusercontent.com/1082672/110401197-40475600-80cd-11eb-83bb-fa3e94cf7afb.png">

## Getting Started

### Android

Please download and install [Android Studio](https://developer.android.com/studio/).

### iOS

Please download and install [Xcode](https://developer.apple.com/xcode/).

## Editing the HTML/CSS/JS

For convenience, all assets used in the apps are located in the `/Assets` directory. There you will find the HTML, CSS, JavaScript and custom font files.

Subdirectories:

- Font - Contains the custom fonts
- IMAGES - Contains the images used for the Surveys
- INTERVENTIONS - Contains the subdirectories and files for interventions and modules
- SURVEYS - Contains the SurveyJS JSON files

### Index.min.js

You will note that the `index.min.js` file referenced in the `survey_container.html` is not in the `/Assets` directory. This file is unique to each platform as it includes specific JavaScript to handle the communication between the web views and the native applications.

This file can be found in each of the platforms own asset directories.

## Something not look quite right?

Take a look at the following blog post on [Debugging webviews on both Android and iOS](https://blog.vuplex.com/debugging-webviews).

## Contributing

Contributions are most welcome. Before submitting an issue or pull request, please familiarise yourself with the [Contribution Guidelines](./CONTRIBUTING.md).
