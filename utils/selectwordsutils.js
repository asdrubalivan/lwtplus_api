var squel = require('squel')
    .useFlavour('postgres');
var _ = require('lodash');

function generateSquelFunction(callbacks) {
    return function (values) {
        var squelObj = squel.select()
            .from('"Words"', 'w');
        if (_.has(callbacks, 'selectCb')) {
            squelObj = callbacks.selectCb(squelObj, values);
        }
        squelObj = squelObj
            .join('"Texts"', 't', 'w.id_language = t.id_language')
            .where('t.content ilike \'%\' || w.word || \'%\'');
        if (_.has(callbacks, 'whereCb')) {
            squelObj = callbacks.whereCb(squelObj, values);
        }
        return squelObj;
    };
}

function whereTEqualsIdCb(squelObj, values) {
    return squelObj.where('t.id = ?', values.textid);
}

var generateCountWordsTextSQL = generateSquelFunction({
    selectCb: function (squelObj) {
       return squelObj.field('COUNT(w.id)', 'c');
    },
    whereCb: whereTEqualsIdCb
});

var generateSelectWordsTextSQL = generateSquelFunction({
    selectCb: function (squelObj) {
       return squelObj
            .field('w.word')
            .field('w.meaning')
            .field('w.grade');
    },
    whereCb: whereTEqualsIdCb
});

module.exports = {
    generateCountWordsTextSQL: generateCountWordsTextSQL,
    generateSelectWordsTextSQL: generateSelectWordsTextSQL
};
