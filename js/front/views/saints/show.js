import "../../base";

document.addEventListener("DOMContentLoaded", () => {
    let searchBarContainers = document.querySelectorAll(".search-bar-container");
    
    if (searchBarContainers.length > 0) {
        searchBarContainers.forEach(function (searchBarContainer) {
            let filterButton = searchBarContainer.querySelector(".filters"),
                searchBarFilter = searchBarContainer.querySelector(".search-bar-filters"),
                filterContainersRadio = searchBarContainer.querySelectorAll(".filter-container-radio"),
                filterContainerCheckboxes = searchBarContainer.querySelectorAll(".filter-container-checkbox");
    
            filterButton.addEventListener("click", function () {
                let filtersAreShown = searchBarFilter.classList.contains("active");
                
                searchBarFilter.classList.toggle("active");
                this.classList.toggle("active");
                
                if (filtersAreShown) {
                    $(searchBarFilter).slideUp();
                } else {
                    $(searchBarFilter).slideDown();
                }
            });
            
            filterContainersRadio.forEach((filterContainerRadio, i) => {
                let filterContents = filterContainerRadio.querySelectorAll(".filter-content"),
                    filterSlide = filterContainerRadio.querySelector(".filter-slider");
        
                filterContents.forEach((filterContent, j) => {
                    let currentFilterContents = filterContainersRadio[i].querySelectorAll(".filter-content"),
                        currentRadio = filterContent.querySelector("input");
            
                    if (currentRadio.checked) {
                        setTimeout(function () {
                            setFilter(getOffset(j, currentFilterContents), filterContent, filterSlide, currentRadio.checked);
                        }, 0);
                    }
            
                    filterContent.addEventListener("click", function (e) {
                        let radio = this.querySelector("input");
                        radio.checked = !radio.checked;
    
                        let offset = getOffset(j, currentFilterContents);
                        setFilter(offset, this, filterSlide, radio.checked);
                
                        e.preventDefault();
                    });
                });
            });
    
            filterContainerCheckboxes.forEach( (filterContainerCheckbox) => {
                let filterContents = filterContainerCheckbox.querySelectorAll(".filter-content");
        
                filterContents.forEach( (filterContent) => {
                    let checkbox = filterContent.querySelector("input");
            
                    if (checkbox.checked) {
                        filterContent.classList.add("active");
                    }
            
                    filterContent.addEventListener("change", function () {
                        if (checkbox.checked) {
                            this.classList.add("active");
                        } else {
                            this.classList.remove("active");
                        }
                    });
                });
            });
        });
        
        function setFilter (offset, filterContent, filterSlide, bool) {
            let width = $(filterContent).getHiddenDimensions().width;
    
            filterSlide.style.width = width + "px";
            filterSlide.style.transform = "translateX(" + offset + "px)";
    
            if (bool) {
                filterSlide.classList.add("active");
            } else {
                filterSlide.classList.remove("active");
            }
        }
        
        function getOffset (index, siblings) {
            let offset = 0;
            
            if (index === 0) {
                return offset + 2;
            }
            
            for (let i = 0; i < index; i++) {
                offset += $(siblings[i]).getHiddenDimensions().width + 17 - (i * 2);
            }
            
            return offset;
        }
    
        $.fn.getHiddenDimensions = function (includeMargin) {
            let $item = this,
                props = { position: 'absolute', visibility: 'hidden', display: 'block' },
                dim = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 },
                $hiddenParents = $item.parents().addBack().not(':visible'),
                margin = (includeMargin == null) ? false : includeMargin;
        
            let oldProps = [];
            $hiddenParents.each(function () {
                let old = {};
            
                for (let name in props) {
                    old[name] = this.style[name];
                    this.style[name] = props[name];
                }
            
                oldProps.push(old);
            });
        
            dim.width = $item.width();
            dim.outerWidth = $item.outerWidth(margin);
            dim.innerWidth = $item.innerWidth();
            dim.height = $item.height();
            dim.innerHeight = $item.innerHeight();
            dim.outerHeight = $item.outerHeight(margin);
        
            $hiddenParents.each(function (i) {
                let old = oldProps[i];
                for (let name in props) {
                    this.style[name] = old[name];
                }
            });
        
            return dim;
        }
    }
});
