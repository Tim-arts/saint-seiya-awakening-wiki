require("./../base");

import Tinymce from "tinymce";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/link";
import "tinymce/plugins/anchor";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/preview";
import "tinymce/plugins/hr";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autosave";
import "tinymce/plugins/template";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/save";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/colorpicker";
import "tinymce/themes/silver";

import Modal from "./../../shared/modules/ModalResponse";
import HandlerForm from "./../modules/HandlerForm";

document.addEventListener("DOMContentLoaded", () => {
    let uploadElement = document.getElementById("upload");
    let formElement = document.getElementById("update-news");
    let modalElement = document.getElementById("response-modal");
    
    let applicationsId = ["#news-fr", "#news-en"];
    let options = {
        content_css: "../../../css/back/modules/tinymce/iframe.css",
        paste_data_images: true,
        plugins: "preview searchreplace autosave save directionality visualblocks visualchars fullscreen image" +
            " link media template table hr nonbreaking anchor lists imagetools",
        toolbar: "undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |" +
            "  numlist bullist | forecolor backcolor removeformat | fullscreen preview save | insertfile image media template link anchor | ltr rtl",
        file_picker_callback: function(callback) {
            triggerUpload(callback).then(result => {
                console.log(result);
            });
        },
        file_picker_types: "image",
        images_upload_url: "",
        height: 400,
        image_caption: true,
        contextmenu: "link image imagetools table",
        templates: [
            {title: "Template 1", description: "Some desc 1", content: "My content"}
        ],
        color_map: [
            "#f6e5a1", "Gold",
            "#00EC98", "Green",
            "#822EFF", "Purple Regular",
            "#BBBBF4", "Grey Light 1",
            "#3f476e", "Grey Light 2",
            "#BEA0E7", "Purple Light",
    
            '#BFEDD2', 'Light Green',
            '#FBEEB8', 'Light Yellow',
            '#F8CAC6', 'Light Red',
            '#ECCAFA', 'Light Purple',
            '#C2E0F4', 'Light Blue',
    
            '#ECF0F1', 'Light Gray',
            '#CED4D9', 'Medium Gray',
            '#95A5A6', 'Gray',
            '#7E8C8D', 'Dark Gray',
            '#34495E', 'Navy Blue',
    
            '#000000', 'Black',
            '#ffffff', 'White'
        ]
    };
    
    /* Constructors */
    let ModalConstructor = new Modal(modalElement);
    let HandlerFormConstructor = new HandlerForm(formElement, {
        type: "news",
        modal: ModalConstructor
    });
    
    // Add event to leave fullscreen when pressing ESC
    applicationsId.forEach(id => {
        let iframeId = (id.substr(1) + "_ifr");
        
        Tinymce.init(Object.assign({selector: id}, options)).then(result => {
            result[0].editorContainer.classList.add("tinymce-initialized");
        });
        
        document.getElementById(iframeId).contentWindow.addEventListener("keydown", function (e) {
            HandlerFormConstructor.hasChanged = true;
            
            let keyCode = (e.keyCode ? e.keyCode : e.which);
            let toggleFullScreenElement = document.querySelector(".tox.tox-fullscreen button[type='button'][aria-label='Fullscreen']");
            
            if (keyCode === 27 && toggleFullScreenElement) {
                toggleFullScreenElement.click();
                
                e.preventDefault();
            }
        });
    });
    
    /* Functions */
    async function triggerUpload (callback) {
        function fetch () {
            return new Promise(resolve => {
                uploadElement.click();
                uploadElement.addEventListener("change", function () {
                    let file = this.files[0];
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        callback(e.target.result, {
                            alt: file.name
                        });
                        
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            });
        }
        
        return await fetch();
    }
});
