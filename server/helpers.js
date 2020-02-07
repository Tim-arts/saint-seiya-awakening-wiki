// APP METHODS
module.exports = {
    htmlDisplay: html => html.replace(/\n/g, '<br>'),
    capitalize (string) {
        let result;
        
        if ((string.length === 2) && (string[0] === string[1])) {
            result = string.toUpperCase();
        } else {
            result = string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        return result;
    },
    convertToName (slug) {
        let name = [];
        slug = slug.split("-");
        
        for (let i = 0, count = slug.length; i < count; i++) {
            if (slug[i] !== "") {
                name.push(this.capitalize(slug[i]));
            }
        }
        
        name = name.join(" ");
        
        return name;
    }
};
