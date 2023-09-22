const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
    foreignKey: 'user_id'
}); 

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
});

module.exports = { User, Posts, Comments };

// plain enlgish:
// A user can have many posts, but a post can only belong to one user.
// A user can have many comments, but a comment can only belong to one user.
// A post can have many comments, but a comment can only belong to one post.
// A comment can only belong to one post, but a post can have many comments.
// A post can only belong to one user, but a user can have many posts.
// A comment can only belong to one user, but a user can have many comments.