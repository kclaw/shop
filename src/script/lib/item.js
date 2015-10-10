define('item',['jquery','model'],function($, model){
    var item = function Item(id){
        var HTMLItem = '<div class="item" id="%id%">%col1%<section>%col2%</section></div>';
        var HTMLItemName = '<div class="item-name">%data%</div>';
        var HTMLItemRemark = '<div class="item-remark">%data%</div>';
        var HTMLItemPrice = '<div class="item-price">%data%</div>';
        var HTMLAddToCartButton = '<button class="item-button">Add</button>';
        var HTMLItemQuantity = '<input type="text" class="item-quantity" value="1" size="1"></input>';
        var HTMLItemImage = '<figure><img src="%image%"><figcaption>%name%</figcaption></figure>';
        var data;

        function loadDataFromModel(){
            console.log('item loadDataFromModel is called');
            console.log(model);
            for(var i=0;i<model.items.length;i++)
                if(id===model.items[i].id){
                    data = model.items[i];
                    return true;
                }
            return false;
        }

        function createHTML(){
            console.log('Item createHTML is called');
            console.log(data);
            if(!data)
                return false;
            HTMLItemName = HTMLItemName.replace('%data%', data.name);
            HTMLItemPrice = HTMLItemPrice.replace('%data%', data.price);
            HTMLItemRemark = HTMLItemRemark.replace('%data%',data.remark);
            HTMLItemImage = HTMLItemImage.replace('%image%',data.image).replace('%name%', data.name);
            HTMLItem = HTMLItem.replace('%col2%',HTMLItemName+HTMLItemPrice+HTMLItemRemark+HTMLItemQuantity+HTMLAddToCartButton).replace('%col1%', HTMLItemImage);
            HTMLItem = HTMLItem.replace('%id%', data.id);
            return true;
        }

        function display(container){
            console.log('item display is called');
            if(loadDataFromModel()){
                if(createHTML()){
                    console.log(HTMLItem);
                    console.log($(container));
                    $(container).append(HTMLItem);
                }else
                    console.error('cannot display');
            }else{
                console.error('cannot display');
            }
        }

        return {
            display: display
        };
    }
    return item;
});
