const basicInfo = require('./basicInfo')
const components = require('./components');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

const paths = { paths: {...users.paths, ...posts.paths, ...comments.paths} };

module.exports = {
    ...paths,
    ...basicInfo,
    ...components
};
