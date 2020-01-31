const argv = require('minimist')(process.argv.slice(2));
const fixtures = require("./fixtures")({
    autoLoad: argv.a,
    emptyBase: argv.e
});
