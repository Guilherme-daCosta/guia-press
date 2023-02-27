const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});


Category.hasMany(Article); // UMA categoria tem MUITOS artigos - RELACIONAMENTO 1-P-N
Article.belongsTo(Category); // UM artigo pertence a UMA categoria - RELACIONAMENTO 1-P-1


module.exports = Article;