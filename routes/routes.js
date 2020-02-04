
var ArticleController = require("../controllers/article");
var CommentController = require("../controllers/comment");

module.exports = function (router) {

    router.get("/home", function (req, res) {
        res.render("article");
    });

    router.get("/save", function (req, res) {
        res.render("save");
    });

    router.get("/api/fetch", function (req, res) {
        ArticleController.fetch(function (err, docs) {
            if (!docs || docs.insertCount === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                res.render("article", {
                    stories: found
                });
            }
        });
    });

    router.get("/api/articles", function (req, res) {

        var query = {};
        if (req.query.saved) {
            query = req.query;
        }
        ArticleController.get(query, function (data) {
            res.json(data);
        });
    });

    router.delete("/api/articles/:id", function (req, res) {
        var query = {};
        query._id = req.params.id;
        ArticleController.delete(query, function (err, data) {
            res.json(data);
        });
    });
    router.patch("/api/articles", function (req, res) {
        ArticleController.update(req.body, function (err, data) {
            res.json(data);
        });
    });
    router.get("/api/comments/:Article_id?", function (req, res) {
        var query = {};
        if (req.params.Article_id) {
            query._id = req.param.Article_id;
        }
        CommentController.get(query, function (err, data) {
            res.json(data);
        });
    });

    router.delete("/api/comments/:id", function (req, res) {
        var query = {};
        query._id = req.param.id;
        CommentController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.post("/api/comments", function (req, res) {

        CommentController.save(req.body, function (data) {
            res.json(data);
        });
    });
}