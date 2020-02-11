// APP METHODS
module.exports = {
    htmlDisplay: html => html.replace(/\n/g, '<br>'),
    convertToSlug (string, expression) {
        return string.trim().toLowerCase().replace(expression, "-");
    },
    capitalize (string) {
        let result;
        
        if ((string.length === 2) && (string[0] === string[1])) {
            result = string.toUpperCase();
        } else {
            result = string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        return result;
    }
};
