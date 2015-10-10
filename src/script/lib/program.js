define('program',['windowdisplay','item','jquery','scrollcontroller','shoppingcart'],function(windowdisplay,item, $,scrollcontroller,shoppingcart){
    //var scrollcontroller = new scrollcontroller();
    var wd = new windowdisplay();
    var sh = new shoppingcart();
    wd.addItem(new item(1));
    wd.addItem(new item(2));
    wd.addItem(new item(3));
    wd.addItem(new item(4));
    wd.addItem(new item(5));
    wd.addItem(new item(6));
    wd.display();
    wd.lock();
    sh.display();
    //setInterval(function(){console.log('hihi');},300);
    //setInterval(function(){check3();},300);
    function main() {
        scrollcontroller.addScrollPositionCallBack($('#window-display').offset().top, function(){
            console.log('scrollposition is called');
            if(scrollcontroller.isScrollDown()){
                $('#window-display').scrollTop(0);
                lock();
                wd.unlock();
            }
        });
        scrollcontroller.addScrollEndCallBack($('#window-display'),function(){
            unlock();
            wd.lock();
        });
    }

    main();

    function lock() {
        scrollcontroller.disableScroll();
    }


    function unlock() {
        scrollcontroller.enableScroll();
    }
    function check() {
        if(isElementReachesAboveScrollTop($(window),$('#main')) && isElementConsistOfVerticalScrollBar($('#window-display'))){
            console.log('screen is locked');
            lockScroll(true);
            if(isElementReachesScrollEnd($('#window-display'))){
                console.log('stop screen lock');
                lockScroll(false);
            }
        }
    }

    function check2(){
        //console.log(scrollcontroller.isScrollUp($('#window-display')));
        if(scrollcontroller.isScrollEnd($('#window-display')))
            console.log('end');
    }
    function check3(){
        console.log($('#main').offset().top + '/ss'+$('body').scrollTop());
        scrollcontroller.addScrollPositionCallBack($('#main').offset().top , function(){$('body').scrollTop($('#main').offset().top);console.log('call');});
    }
    //check3();
    function isElementScrollingDown(elem){}
    function isElementConsistOfVerticalScrollBar(elem){
        return elem.get(0).scrollHeight !== elem.get(0).clientHeight;
    }
    function isElementReachesAboveScrollTop(container,elem) {
        if(container.scrollTop()>=elem.offset().top)
            return true;
        return false;
    }

    function isElementReachesScrollEnd(elem){
        if(elem.scrollTop() + elem.innerHeight()>=elem.get(0).scrollHeight)
            return true;
        return false;
    }
});
