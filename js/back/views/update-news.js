import TinyMce from "tinymce";
import 'tinymce/themes/silver';

document.addEventListener("DOMContentLoaded", () => {
    TinyMce.init({
        selector: "#news"
    });
});
