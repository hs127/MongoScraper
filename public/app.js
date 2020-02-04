$(document).ready(function () {
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {
        //articleContainer.empty();
        $.get("/api/articles")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                    console.log("inside init");
                    console.log(data);
                }
                articleContainer.append(data);

            });
    }

    function renderArticles(articles) {
        var articlePanels = [];
        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        console.log("inside render");
    }

    function createPanel(article) {
        var panel = $(["<div class='panel panel-default'>", "<h3>", article.title, "<a class='btn btn-success save'>", "Save Article", "</a>", "</h3>", "</div>"].join(""));
        console.log(article);
        panel.data("_id", article.id);
        console.log(panel);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert = $("<h1>Nothing to Render</h1>");

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/articles",
            data: articleToSave
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        })
    }

    function handleArticleScrape() {
        $.get("/api/fetch").then(function (data) {
            console.log("clicked" + data);
            initPage();
            // alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
        });
    }
});


