const basicInfo = require('./basicInfo')
const components = require('./components');
const users = require('./users');
const posts = require('./posts');

const paths = { paths: {...users.paths, ...posts.paths} };

module.exports = {
    ...paths,
    ...basicInfo,
    ...components
};
