// article与tags关联表
'use strict';
module.exports = app => {
  const { INTEGER } = app.Sequelize;

  const ArtcileToTags = app.model.define('article_tag', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    article_id: {
      type: INTEGER,
      references: {
        model: 'article',
        key: 'id',
      },
    },
    tag_id: {
      type: INTEGER,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
  });
  return ArtcileToTags;
};
