define('shoppingcart',['jquery'],function($){
  var ShoppingCart = function ShoppingCart(){
        var HTMLShoppingCart = '<div id="shoppingCartItem">%data%</div>';

        var HTMLSCIcon = '<figure><img src="%image%"></figure>';
        var HTMLSCIconItemCounter = '<div class="shopping-cart" id="itemCounter">%data%</div>';
        var HTMLSCIconWrapper = '<div class="shopping-cart" id="iconWrapper">%data%</div>';

        var totalItems = 0;
        var totalPrice = 0;
        var itemList = [];

        function addItem(item){}
        function removeItem(item){}
        function increasePrice(value){}
        function reducePrice(value){}

        function createHTML(){
            HTMLSCIcon = HTMLSCIcon.replace('%image%', 'dist/image/shopping122.svg');
            HTMLSCIconItemCounter = HTMLSCIconItemCounter.replace('%data%', 3);

            HTMLSCIconWrapper = HTMLSCIconWrapper.replace('%data%', HTMLSCIcon+HTMLSCIconItemCounter);
            return true;
        }

        function display(){
            if(createHTML()){
                $('#shoppingCartIcon').append(HTMLSCIconWrapper);
            }
        }

        return {
            display: display
        }
    }
    return ShoppingCart;
});
