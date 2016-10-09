var models = require('../models');
var _ = require('lodash');

function getEditableMiddlewareFn(model, method) {
    return function isWordEditableMiddleware(req, res, next) {
        models[model][method](req.params.id, req.user.id)
            .then(function (data) {
            if (_.get(data,'0.exist', 0) === 1) {
                next();
            } else {
                res.sendStatus(401);
            }
        });
    };
}

var isWordEditableMiddleware = getEditableMiddlewareFn('Word'
    ,'wordBelongsToUser');
var isTextEditableMiddleware = getEditableMiddlewareFn('Text'
    ,'textBelongsToUser');
var isLangEditableMiddleware = getEditableMiddlewareFn('Language'
    ,'langBelongsToUser');

module.exports = {
    isWordEditableMiddleware: isWordEditableMiddleware,
    isTextEditableMiddleware: isTextEditableMiddleware,
    isLangEditableMiddleware: isLangEditableMiddleware,
};
