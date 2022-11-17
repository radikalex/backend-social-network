const basicInfo = require('./basicInfo')
const components = require('./components');
const users = require('./users');

module.exports = {
    ...users,
    ...basicInfo,
    ...components
};
