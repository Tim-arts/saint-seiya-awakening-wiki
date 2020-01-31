export default class SelectVerification {
    /**
     * Construct SelectVerification instance
     * @constructor
     * @return {Array}
     * @param elements
     */
    constructor (elements) {
        this.result = (() => {
            let check = [];
            
            for (let i = 0, count = elements.length; i < count; i++) {
                let select = elements[i],
                    selectedOption = select.options[select.selectedIndex];
        
                if (selectedOption.hasAttribute("disabled")) {
                    check.push(false);
                } else {
                    check.push(true);
                }
            }
            
            return check;
        })();
        
        return this.result;
    }
}
