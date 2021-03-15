Survey
    .StylesManager
    .applyTheme();

document.querySelector("#read-button").addEventListener('click', function () {
    let file = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        window.survey = new Survey.Model(e.target.result);
        survey
            .onComplete
            .add(function (result) {
                document
                    .querySelector('#surveyResult')
            });

        $("#surveyElement").Survey({ model: survey });
        document.getElementById("load_form").style.display = "none";
    });
    reader.readAsText(file);
});