define('windowdisplay', ['jquery', 'scrollcontroller','model','item'], function($, sc, model,item){
    var windowDisplay = function WindowDisplay(categoryId){
        var self = this;
        var HTMLWindowDisplay = '<div class="window-display-entry"></div>';
        var HTMLWindowDisplayWrapper = '<div class="window-display-wrapper"></div>';
        var HTMLWindowDisplayHeader = '<header class="window-display-header">%data%</header>';
        var items = [];
        var categoryName;

        function loadItemsFromCategory(){
            console.log('loadItemsFromCategoryc' + categoryId);
            if(categoryId){
                var matched = model.categories.filter(function(c){
                    return c.id === categoryId;
                });
                if (matched && matched.length > 0){
                    matched[0].items.forEach(function(itemId){
                        addItem(new item(itemId));
                    });
                    console.log('items: '+items);
                    HTMLWindowDisplayHeader = HTMLWindowDisplayHeader.replace('%data%' , matched[0].name);
                    categoryName = matched[0].name;
                }
            }
        }

        function addItem(item){
            items.push(item);
        }
        function removeItem(item){
            var matched = items.filter(function(a){
                return a === item;
            });
            items.remove(matcheds);
        }
        function display(){
            $(document).ready(function(){
                if(categoryId){
                    loadItemsFromCategory();

                    if(items)
                        $('#'+categoryName).append(HTMLWindowDisplayWrapper);
                    items.forEach(function(item){
                        $('#'+categoryName + ' .window-display-wrapper').append(HTMLWindowDisplay);
                        item.display($('#'+categoryName +' .window-display-entry:last'));
                    });

                }
            });
        }
        function lock(){
            sc.disableScroll($('#window-display'));
        }
        function unlock(){
            sc.enableScroll($('#window-display'));
        }
        return {
            display: display
            //addItem: addItem,
            //lock: lock,
            //unlock: unlock
        };
    }
    return windowDisplay;
});
