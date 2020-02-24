require("./../base");

import Tinymce from "tinymce";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/autolink";
import "tinymce/plugins/link";
import "tinymce/plugins/anchor";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/hr";
import "tinymce/plugins/imagetools";
import "tinymce/plugins/autosave";
import "tinymce/plugins/template";
import "tinymce/plugins/help";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/save";
import "tinymce/plugins/lists";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/directionality";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textpattern";

import "tinymce/themes/silver";

document.addEventListener("DOMContentLoaded", () => {
    let uploadElement = document.getElementById("upload");
    
    Tinymce.init({
        selector: "#news-fr",
        content_css: "../../../css/back/modules/tinymce/iframe.css",
        paste_data_images: true,
        plugins: 'preview searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image' +
            ' link media template table hr nonbreaking anchor insertdatetime lists wordcount ' +
            ' imagetools textpattern help autolink',
        toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |' +
            '  numlist bullist | forecolor backcolor removeformat | fullscreen preview save | insertfile image media template link anchor | ltr rtl',
        image_advtab: true,
        file_picker_callback: function(callback) {
            triggerUpload(callback).then(result => {
                console.log(result);
            });
        },
        file_picker_types: "image",
        images_upload_url: "",
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        toolbar_drawer: 'sliding',
        contextmenu: "link image imagetools table"
    });
    Tinymce.init({
        selector: "#news-en",
        content_css: "../../../css/back/modules/tinymce/iframe.css",
        paste_data_images: true,
        plugins: 'preview searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image' +
            ' link media template table hr nonbreaking anchor insertdatetime lists wordcount ' +
            ' imagetools textpattern help autolink',
        toolbar: 'undo redo | bold italic underline strikethrough | fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |' +
            '  numlist bullist | forecolor backcolor removeformat | fullscreen preview save | insertfile image media template link anchor | ltr rtl',
        image_advtab: true,
        file_picker_callback: function(callback) {
            triggerUpload(callback).then(result => {
                console.log(result);
            });
        },
        file_picker_types: "image",
        images_upload_url: "",
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        toolbar_drawer: 'sliding',
        contextmenu: "link image imagetools table"
    });
    
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
