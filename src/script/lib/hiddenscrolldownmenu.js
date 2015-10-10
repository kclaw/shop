define('hiddenscrolldownmenu',['jquery', 'scrollcontroller'],function($, sc){

  $(document).ready(function(){
      setInterval(function(){
        if (sc.isScrollDown()){
            window.setTimeout(hideNav, 300);
        } else {
            window.setTimeout(showNav, 300);
        }
      },200);

  });

  function hideNav() {
    $("nav").removeClass("is-visible").addClass("is-hidden");
  }
  function showNav() {
    $("nav").removeClass("is-hidden").addClass("is-visible");
  }

});
