const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {
        res.render("admin/articles/index.ejs", { articles: articles });
    });
});


router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new.ejs", {categories: categories})
    })    
});


router.post("/articles/save", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });

});


router.post("/articles/delete", (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        } else { // Não for número
            res.redirect("/admin/articles");
        }

    } else { // Null
        res.redirect("/admin/articles");
    }
});


router.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id;

    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit.ejs", {article: article, categories: categories})
            });  
        } else {
            res.redirect("/admin/articles");
        }               
    }).catch(erro => {
        res.redirect("/admin/articles");
    });
});


router.post("/articles/update", (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category;

    Article.update({title: title, slug: slugify(title), body: body, categoryId: categoryId}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(erro => {
        res.redirect("/admin/articles");
    });
});


router.get("/articles/page/:num", (req, res) => {
    let page = req.params.num;
    let offset = 0;

    if(isNaN(page) || page == 1) {
        offset = 0 ;
    } else {
        offset = (parseInt(page) - 1) * 4;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: offset
    }).then(articles => {
        let next;
        if(offset + 4 > articles.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            offset: offset,
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            //res.json(result)
            res.render("admin/articles/page.ejs", {result: result, categories: categories})
        });
    });
});


module.exports = router;