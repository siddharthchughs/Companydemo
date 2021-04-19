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

- Common - Contains any common files used between interventions and surveys
- Font - Contains the custom fonts
- GetHelp - Contains files to show Get Help page
- Interventions - Contains the subdirectories and files for interventions and modules
  - Common - Contains any common files used between intervention files
  - {Intervention-Name} - Each intervention has it's own directory, and subdirectories for modules if needed
- Overview - Contains files to show Overview page
- SurveyJS - Contains SurveyJS related files
  - Files - Contains SurveyJS JSON files
  - Images - Contains the images used for the surveys

## Something not look quite right?

Take a look at the following blog post on [Debugging webviews on both Android and iOS](https://blog.vuplex.com/debugging-webviews).

## Web view

In the web folder are wrappers for interventions and surveys. They must be
loaded in the [live-server](https://www.npmjs.com/package/live-server) to
be able to update the survey container. To run the live-server it must be
installed using npm.

`npm install`

Run the intervention frame or the survey frame.

`npm run surveys`
`npm run interventions`

The live-server will push changes to CSS to the window if the source file
changes. If an html file or js file changes it will re-load the window.

## Contributing

Contributions are most welcome. Before submitting an issue or pull request, please familiarise yourself with the [Contribution Guidelines](./CONTRIBUTING.md).
