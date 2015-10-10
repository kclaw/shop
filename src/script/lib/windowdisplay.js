define('windowdisplay', ['jquery', 'scrollcontroller'], function($, sc){
    var windowDisplay = function WindowDisplay(){
        var self = this;
        var HTMLWindowDisplay = '<div class="window-display-entry"></div>';
        var items = [];
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
                items.forEach(function(item){
                    $('#window-display').append(HTMLWindowDisplay);
                    item.display($('.window-display-entry:last'));
                });
            });
        }
        function lock(){
            sc.disableScroll($('#window-display'));
        }
        function unlock(){
            sc.enableScroll($('#window-display'));
        }
        return {
            display: display,
            addItem: addItem,
            lock: lock,
            unlock: unlock
        };
    }
    return windowDisplay;
});
