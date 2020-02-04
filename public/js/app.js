$("#scrapeButton").on("click", function () {
    $.ajax({
        type: "GET",
        url: "/articles"
    }).then(function (response) {
        console.log(response);

        const articleResults = $("#results");
        articleResults.empty();

        for (i = 0; i < response.length; i++) {
            const article = response[i];

            const saveButton = $("<button>")
                .addClass("saveButton")
                .text("Save")
                .attr("id", article._id);

            const title = $("<div>")
                .addClass("title")
                .text(article.title)
                .append(saveButton);

            const link = $("<a>")
                .addClass("link")
                .text(article.link)
                .attr("href", article.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(article.summary)

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            articleResults.append(listItem);
        }
    });
    hideContainer();
    showScrapeResults();

});

$(document).on("click", '.saveButton', function () {
    var articleId = $(this).attr('id');
    console.log("Article ID: " + articleId);

    $.ajax({
        type: "PUT",
        url: "/save-article/" + articleId,
    }).then(function (response) {
        console.log(JSON.stringify(response));

    });
});

const hideContainer = function () {
    $("#container").hide();

};

const showScrapeResults = function () {
    $("#scrapeResults").show(600);
};


