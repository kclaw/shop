define('scrollcontroller', ['jquery'], function($){
    var ScrollController = (function ScrollController(arg){
        var arg1 = arg||document;
        var scrollUpCallBack = [];
        var scrollDownCallBack = [];
        var scrollTopCallBack = [];
        var scrollEndCallBack = [];
        var currentScrollTop = 0;
        var lastScrollTop = 0;
        var cachedItems = [];

        $(document).ready(function(){
            $(arg1).scroll(function(){
                lastScrollTop = currentScrollTop;
                currentScrollTop = $(this).scrollTop();
                executeCallBacks();
            });
        });
        //not optimized
        function executeCallBacks(){
            if(isScrollUp())
                scrollUpCallBack.forEach(function(callback){callback();});
            else if (isScrollDown())
                scrollDownCallBack.forEach(function(callback){callback();});
            scrollTopCallBack.forEach(function(item){
                if(item.top===currentScrollTop){
                    item.callback();
                }
            });
            scrollTopCallBack.forEach(function(callback){
                if(withinScrollRange(currentScrollTop, callback)){
                    callback.callback();
                }
            });
            scrollEndCallBack.forEach(function(callback){
                console.log(isScrollEnd());
                if(isScrollEnd())
                    callback();
            });
        }
        function withinScrollRange(value, elem){
            if(elem.top <= value + 50 && elem.top >= value - 50)
                return true;
            return false;
        }
        function getFromCached(selector){
            /*var filtered = cachedItems.filter(function(item){
              return item.selector===selector.selector;
            });
            if(filtered && filtered.length > 0){
                return filtered[0].item;
            }else{
                var item = (function(arg1){
                    var currentScrollTop = 0;
                    var lastScrollTop = 0;
                    arg1.scroll(function(){
                        lastScrollTop = currentScrollTop;
                        currentScrollTop = $(this).scrollTop();
                    });
                    return {
                        isScrollUp: function(){
                            return lastScrollTop > currentScrollTop;
                        },
                        isScrollDown: function(){
                            return lastScrollTop < currentScrollTop;
                        }
                    };
                })(arguments[0]);
                cachedItems.push({'selector':selector.selector,'item':item});
                return item;
            }*/
            var filtered = cachedItems.filter(function(item){
                return item.arg1.selector===selector.selector;
            });
            if(filtered && filtered.length > 0){
                return filtered[0];
            }else{
                var item = new ScrollController(selector);
                cachedItems.push(item);
                return item;
            }
        }
        function isScrollUp(){
            if(arguments.length==0){
                return lastScrollTop > currentScrollTop;
            }else if(arguments.length==1){
                var item = getFromCached(arguments[0]);
                return item.isScrollUp();
            }
        }
        function isScrollDown(){
            if(arguments.length==0)
                return lastScrollTop < currentScrollTop;
            else if(arguments.length==1){
                var item = getFromCached(arguments[0]);
                return item.isScrollDown();
            }
        }
        function isScrollEnd(){
            console.log('isScrollEnd is called '+arg1);
            if(arguments.length==0){
                if(arg1===document){
                    var scrollHeight = $(document).height();
                    var scrollPosition = $(window).scrollTop() + $(window).height();
                    return ((scrollHeight - scrollPosition)/scrollHeight) === 0;
                } else {
                    console.log('isScrollEnd');
                    return (arg1.scrollTop() + arg1.innerHeight() >= arg1[0].scrollHeight);
                }
            } else if(arguments.length==1){
                var item = getFromCached(arguments[0]);
                return item.isScrollEnd();
            }
        }
        function addScrollUpCallBack(){
            if(arguments.length==0){
                return;
            }else if(arguments.length==1)
                scrollUpCallBack.push(arguments[0]);
            else if(arguments.length==2){
                var item = getFromCached(arguments[0]);
                item.addScrollUpCallBack(arguments[1]);
            }
        }
        function addScrollDownCallBack(callback){
            scrollDownCallBack.push(callback);
        }
        function addScrollPositionCallBack(scrollTop,callback){
            scrollTopCallBack.push({
                'top': scrollTop,'callback':callback
            });
        }
        function addScrollEndCallBack(){
            if(arguments.length==0){
                return;
            }else if(arguments.length==1){
                scrollEndCallBack.push(arguments[0]);
            }else if(arguments.length==2){
                var item = getFromCached(arguments[0]);
                item.addScrollEndCallBack(arguments[1]);
            }
        }
        function disableScroll(elem) {
            console.log('disableScroll');
            if(elem)
                elem.css('overflow','hidden');
            else
                $('body').css('overflow','hidden');
        }
        function enableScroll(elem) {
            console.log('enableScroll');
            if(elem)
                elem.css('overflow', 'auto');
            else
                $('body').css('overflow', 'auto');
        }
        return {
            isScrollUp: isScrollUp,
            isScrollDown: isScrollDown,
            isScrollEnd: isScrollEnd,
            enableScroll: enableScroll,
            disableScroll: disableScroll,
            addScrollUpCallBack: addScrollUpCallBack,
            addScrollDownCallBack: addScrollDownCallBack,
            addScrollPositionCallBack: addScrollPositionCallBack,
            addScrollEndCallBack: addScrollEndCallBack,
            arg1:arg1
        };
    })();
    return ScrollController;
});
