// APP METHODS
module.exports = {
    htmlDisplay: html => html.replace(/\n/g, '<br>'),
    convertToSlug (string, expression) {
        return string.trim().toLowerCase().replace(expression, "-");
    }
};
