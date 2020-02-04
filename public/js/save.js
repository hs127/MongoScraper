var articleIdFromNote;

const clearTextField = function () {
    document.getElementById('noteTextInput').value = "";
};

const deleteSavedArticle = function (articleId) {

    $.ajax({
        type: "PUT",
        url: "/delete-from-saved/" + articleId,
    }).then(function (response) {
        console.log(JSON.stringify(response));
        displaySaved();
    });
};

const saveNewNote = function (articleId) {
    var newNoteText = $("#noteTextInput").val();
    console.log(newNoteText);
    $.ajax({
        type: "POST",
        url: "/create-note/" + articleId,
        data: { body: newNoteText, article: articleId }
    }).then(function (response) {
        console.log(response);
        displayNotes(articleId);
    });
};

var displayNotes = function (articleId) {
    $.ajax({
        type: "GET",
        url: "/show-article-notes/" + articleId
    }).then(function (response) {
        console.log(response);
        document.getElementById("saved").style.display = "none";
        document.getElementById("notes").style.display = "block";

        const saveNoteInput = $("#button-addon4");
        saveNoteInput.empty();

        const saveNewNoteButton = $("<button>")
            .attr("id", articleId)
            .addClass("saveNoteButton")
            .attr("type", "button")
            .text("Save");

        saveNoteInput.append(saveNewNoteButton);

        const savedNotes = $("#savedArticleNotes");
        savedNotes.empty();

        console.log(response);

        for (i = 0; i < response.note.length; i++) {
            var savedNote = response.note[i];;
            console.log(savedNote);

            const deleteNoteButton = $("<button>")
                .addClass("deleteNoteButton")
                .text("Delete")
                .attr("id", savedNote._id);

            const noteText = $("<p>")
                .addClass("noteText")
                .text(savedNote.body);

            const listItem = $("<li>")
                .addClass("articleNote")
                .append(noteText, deleteNoteButton);

            savedNotes.append(listItem);

        }

        $("#hideNotes").on("click", function () {
            document.getElementById("notes").style.display = "none";
            document.getElementById("saved").style.display = "block";
        });

        $(".saveNoteButton").on("click", function () {
            var articleId = $(this).attr('id');
            saveNewNote(articleId);
        });

        $(".deleteNoteButton").on("click", function () {
            var noteId = $(this).attr('id');
            articleIdFromNote = savedNote.article;
            console.log("deleteNoteButton clicked.");
            console.log(articleIdFromNote);
            deleteNote(noteId);
        });

        clearTextField();
    });
};

const deleteNote = function (noteId) {
    $.ajax({
        type: "DELETE",
        url: "/delete-note/" + noteId
    }).then(function (response) {
        displayNotes(articleIdFromNote);
    });
};

const displaySaved = function () {
    $.ajax({
        type: "GET",
        url: "/display-saved/"
    }).then(function (response) {
        console.log(response);

        const savedArticleResults = $("#savedArticles");
        savedArticleResults.empty();

        for (i = 0; i < response.length; i++) {
            const savedArticle = response[i];

            const deleteButton = $("<button>")
                .addClass("deleteButton")
                .text("Delete")
                .attr("id", savedArticle._id);

            const notesButton = $("<button>")
                .addClass("notesButton")
                .text("Notes")
                .attr("id", savedArticle._id);

            const title = $("<div>")
                .addClass("title")
                .text(savedArticle.title)
                .append(deleteButton)
                .append(notesButton);

            const link = $("<a>")
                .addClass("link")
                .text(savedArticle.link)
                .attr("href", savedArticle.link)
                .attr("target", "_blank");

            const summary = $("<p>")
                .addClass("summary")
                .text(savedArticle.summary);

            const listItem = $("<li>")
                .addClass("article")
                .append(title, link, summary);

            savedArticleResults.append(listItem);
        }


        $(".deleteButton").on("click", function () {
            console.log("deleteButton clicked");
            var articleId = $(this).attr('id');
            deleteSavedArticle(articleId);
        });

        $(".notesButton").on("click", function () {
            console.log("notesButton clicked");
            var articleId = $(this).attr('id');
            displayNotes(articleId);
        });
    });
};

$(document).ready(function () {
    displaySaved();
});
