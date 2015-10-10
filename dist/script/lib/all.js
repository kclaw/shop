define('hiddenscrolldownmenu', [
  'jquery',
  'scrollcontroller'
], function ($, sc) {
  $(document).ready(function () {
    setInterval(function () {
      if (sc.isScrollDown()) {
        window.setTimeout(hideNav, 300);
      } else {
        window.setTimeout(showNav, 300);
      }
    }, 200);
  });
  function hideNav() {
    $('nav').removeClass('is-visible').addClass('is-hidden');
  }
  function showNav() {
    $('nav').removeClass('is-hidden').addClass('is-visible');
  }
});
define('item', [
  'jquery',
  'model'
], function ($, model) {
  var item = function Item(id) {
    var HTMLItem = '<div class="item" id="%id%">%col1%<section>%col2%</section></div>';
    var HTMLItemName = '<div class="item-name">%data%</div>';
    var HTMLItemRemark = '<div class="item-remark">%data%</div>';
    var HTMLItemPrice = '<div class="item-price">%data%</div>';
    var HTMLAddToCartButton = '<button class="item-button">Add</button>';
    var HTMLItemQuantity = '<input type="text" class="item-quantity" value="1" size="1"></input>';
    var HTMLItemImage = '<figure><img src="%image%"><figcaption>%name%</figcaption></figure>';
    var data;
    function loadDataFromModel() {
      console.log('item loadDataFromModel is called');
      console.log(model);
      for (var i = 0; i < model.items.length; i++)
        if (id === model.items[i].id) {
          data = model.items[i];
          return true;
        }
      return false;
    }
    function createHTML() {
      console.log('Item createHTML is called');
      console.log(data);
      if (!data)
        return false;
      HTMLItemName = HTMLItemName.replace('%data%', data.name);
      HTMLItemPrice = HTMLItemPrice.replace('%data%', data.price);
      HTMLItemRemark = HTMLItemRemark.replace('%data%', data.remark);
      HTMLItemImage = HTMLItemImage.replace('%image%', data.image).replace('%name%', data.name);
      HTMLItem = HTMLItem.replace('%col2%', HTMLItemName + HTMLItemPrice + HTMLItemRemark + HTMLItemQuantity + HTMLAddToCartButton).replace('%col1%', HTMLItemImage);
      HTMLItem = HTMLItem.replace('%id%', data.id);
      return true;
    }
    function display(container) {
      console.log('item display is called');
      if (loadDataFromModel()) {
        if (createHTML()) {
          console.log(HTMLItem);
          console.log($(container));
          $(container).append(HTMLItem);
        } else
          console.error('cannot display');
      } else {
        console.error('cannot display');
      }
    }
    return { display: display };
  };
  return item;
});
define('model', [], function () {
  var model = {};
  var items = [
    {
      'id': 1,
      'name': 'a',
      'price': '$40',
      'remark': 'store under    4degreecelsius',
      'image': 'http://placehold.it/420x200'
    },
    {
      'id': 2,
      'name': 'b',
      'price': '$60',
      'remark': 'hello~',
      'image': 'http://placehold.it/420x200'
    },
    {
      'id': 3,
      'name': 'c',
      'price': '$70',
      'remark': 'hello~',
      'image': 'http://placehold.it/420x200'
    },
    {
      'id': 4,
      'name': 'd',
      'price': '$90',
      'remark': 'yahdsa',
      'image': 'http://placehold.it/420x200'
    },
    {
      'id': 5,
      'name': 'e',
      'price': '$120',
      'remark': 'gooad',
      'image': 'http://placehold.it/420x200'
    },
    {
      'id': 6,
      'name': 'f',
      'price': '$85',
      'remark': 'hello~',
      'image': 'http://placehold.it/420x200'
    }
  ];
  model.items = items;
  return model;
});
define('program', [
  'windowdisplay',
  'item',
  'jquery',
  'scrollcontroller'
], function (windowdisplay, item, $, scrollcontroller) {
  //var scrollcontroller = new scrollcontroller();
  var wd = new windowdisplay();
  wd.addItem(new item(1));
  wd.addItem(new item(2));
  wd.addItem(new item(3));
  wd.addItem(new item(4));
  wd.addItem(new item(5));
  wd.addItem(new item(6));
  wd.display();
  //setInterval(function(){console.log('hihi');},300);
  setInterval(function () {
    check2();
  }, 300);
  function check() {
    if (isElementReachesAboveScrollTop($(window), $('#main')) && isElementConsistOfVerticalScrollBar($('#window-display'))) {
      console.log('screen is locked');
      lockScroll(true);
      if (isElementReachesScrollEnd($('#window-display'))) {
        console.log('stop screen lock');
        lockScroll(false);
      }
    }
  }
  function check2() {
    //console.log(scrollcontroller.isScrollUp($('#window-display')));
    if (scrollcontroller.isScrollEnd($('#window-display')))
      console.log('end');
  }
  function isElementScrollingDown(elem) {
  }
  function isElementConsistOfVerticalScrollBar(elem) {
    return elem.get(0).scrollHeight !== elem.get(0).clientHeight;
  }
  function isElementReachesAboveScrollTop(container, elem) {
    if (container.scrollTop() >= elem.offset().top)
      return true;
    return false;
  }
  function isElementReachesScrollEnd(elem) {
    if (elem.scrollTop() + elem.innerHeight() >= elem.get(0).scrollHeight)
      return true;
    return false;
  }
});
define('scrollcontroller', ['jquery'], function ($) {
  var ScrollController = function ScrollController(arg) {
    var arg1 = arg || document;
    var scrollUpCallBack = [];
    var scrollDownCallBack = [];
    var scrollTopCallBack = [];
    var currentScrollTop = 0;
    var lastScrollTop = 0;
    var cachedItems = [];
    $(document).ready(function () {
      $(arg1).scroll(function () {
        lastScrollTop = currentScrollTop;
        currentScrollTop = $(this).scrollTop();
        executeCallBacks();
      });
    });
    //not optimized
    function executeCallBacks() {
      if (isScrollUp())
        scrollUpCallBack.forEach(function (callback) {
          callback();
        });
      else if (isScrollDown())
        scrollDownCallBack.forEach(function (callback) {
          callback();
        });
      scrollTopCallBack.forEach(function (item) {
        if (item.top === currentScrollTop) {
          item.callback();
        }
      });
    }
    function getFromCached(selector) {
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
      var filtered = cachedItems.filter(function (item) {
        return item.arg1.selector === selector.selector;
      });
      if (filtered && filtered.length > 0) {
        return filtered[0];
      } else {
        var item = new ScrollController(selector);
        cachedItems.push(item);
        return item;
      }
    }
    function isScrollUp() {
      if (arguments.length == 0) {
        return lastScrollTop > currentScrollTop;
      } else if (arguments.length == 1) {
        var item = getFromCached(arguments[0]);
        return item.isScrollUp();
      }
    }
    function isScrollDown() {
      if (arguments.length == 0)
        return lastScrollTop < currentScrollTop;
      else if (arguments.length == 1) {
        var item = getFromCached(arguments[0]);
        return item.isScrollDown();
      }
    }
    function isScrollEnd() {
      if (arguments.length == 0) {
        if (arg1 === document) {
          var scrollHeight = $(document).height();
          var scrollPosition = $(window).scrollTop() + $(window).height();
          return (scrollHeight - scrollPosition) / scrollHeight === 0;
        } else {
          return arg1.scrollTop() + arg1.innerHeight() >= arg1[0].scrollHeight;
        }
      } else if (arguments.length == 1) {
        var item = getFromCached(arguments[0]);
        console.log(item);
        return item.isScrollEnd();
      }
    }
    function addScrollUpCallBack(callback) {
      scrollUpCallBack.push(callback);
    }
    function addScrollDownCallBack(callback) {
      scrollDownCallBack.push(callback);
    }
    function addScrollPositionCallBack(scrollTop, callback) {
      scrollTopCallBack.push({
        'top': scrollTop,
        'callback': callback
      });
    }
    function disableScroll(elem) {
      elem.css('overflow', 'hidden');
    }
    function enableScroll(elem) {
      elem.css('overflow', 'auto');
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
      arg1: arg1
    };
  }();
  return ScrollController;
});
define('shoppingcart', ['jquery'], function ($) {
  var HTMLShoppingCart = '<div id="shoppingCart">%data%</div>';
  var totalItems = 0;
  var totalPrice = 0;
  var itemList = [];
  function addItem(item) {
  }
  function removeItem(item) {
  }
  function increasePrice(value) {
  }
  function reducePrice(value) {
  }
  function display() {
  }
});
define('windowdisplay', ['jquery'], function ($) {
  var windowDisplay = function WindowDisplay() {
    var self = this;
    var HTMLWindowDisplay = '<div class="window-display-entry"></div>';
    var items = [];
    function addItem(item) {
      items.push(item);
    }
    function removeItem(item) {
      var matched = items.filter(function (a) {
        return a === item;
      });
      items.remove(matcheds);
    }
    function display() {
      $(document).ready(function () {
        items.forEach(function (item) {
          $('#window-display').append(HTMLWindowDisplay);
          item.display($('.window-display-entry:last'));
        });
      });
    }
    return {
      display: display,
      addItem: addItem
    };
  };
  return windowDisplay;
});
