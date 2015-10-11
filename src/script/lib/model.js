define('model',[],function(){
    var model = {};
    var items = [
        {"id":1,"name":"a","price":"$40","remark":"store under    4degreecelsius","image":"http://placehold.it/420x200"},
        {"id":2,"name":"b","price":"$60","remark":"hello~","image":"http://placehold.it/420x200"},
         {"id":3,"name":"c","price":"$70","remark":"hello~","image":"http://placehold.it/420x200"},
         {"id":4,"name":"d","price":"$90","remark":"yahdsa","image":"http://placehold.it/420x200"},
         {"id":5,"name":"e","price":"$120","remark":"gooad","image":"http://placehold.it/420x200"},
         {"id":6,"name":"f","price":"$85","remark":"hello~","image":"http://placehold.it/420x200"}

    ];
    var categories = [{"id":1,"name":"c1","items":[1,2,3,4,5]}];
    model.items = items;
    model.categories = categories;
    return model;
});
