export default class Modal {
    /**
     * Construct Modal instance
     * @return {Object}
     * @param el
     * @constructor
     */
    constructor (el) {
        this.el = el;
        this.title = this.el.querySelector(".modal-title");
        this.content = this.el.querySelector(".modal-content-to-replace");
        this.submitButton = this.el.querySelector(".submit");
        this.closeButton = this.el.querySelector(".dismiss");
        this.messages = {
            errorValidation: "There was an error in the attempt to add the entity, please refer to the administrator and check the logs.",
            selectMissing: "One or more select have no selected option <span class='text-green'>OR</span> one of the default option is selected!",
            noChanges: "You haven't changed any data!",
            successfullyAdded: "The item has been successfully added!",
            successfullyUpdated: "The item has been successfully updated!",
            deleteConfirmation: "Do you really want to delete this item?",
            pendingTranslation: "You cannot edit an item with a pending translation, please restart the server to build all the associated translations, in order to be able to edit this item."
        };
        this.options = {};
        
        $(document).on("click", this.submitButton, (e) => {
            if (e.target === this.submitButton) {
                this.submit(this.options.submit);
            }
        });
        
        return this;
    }
    
    show (options) {
        if (options.title) this.changeTitle(options.title);
        if (options.message) this.changeContent(options.message);
        if (options.submitContent) this.changeSubmitButton(options.submitContent);
        if (options.closeContent) this.changeCloseButton(options.closeContent);
        if (options.hideCloseButton) this.hideCloseButton();
        
        this.options = options;
        
        $(this.el).modal({
            show: true,
            backdrop: options.backdrop ? "static" : true
        });
    }
    
    changeTitle (title) {
        this.title.innerHTML = title;
    }
    
    changeContent (message) {
        this.content.innerHTML = this.messages[message];
    }
    
    changeSubmitButton (content) {
        this.submitButton.innerHTML = content;
    }
    
    changeCloseButton (content) {
        this.closeButton.innerHTML = content;
    }
    
    hideCloseButton () {
        this.closeButton.classList.add("hide");
    }
    
    submit (submit) {
        if (typeof submit === "function") {
            submit();
        }
    }
}
