define("item",["jquery","model"],function(e,i){var a=function(a){function t(){console.log("item loadDataFromModel is called"),console.log(i);for(var e=0;e<i.items.length;e++)if(a===i.items[e].id)return c=i.items[e],!0;return!1}function l(){return console.log("Item createHTML is called"),console.log(c),c?(r=r.replace("%data%",c.name),d=d.replace("%data%",c.price),s=s.replace("%data%",c.remark),u=u.replace("%image%",c.image).replace("%name%",c.name),n=n.replace("%col2%",r+d+s+p+m).replace("%col1%",u),n=n.replace("%id%",c.id),!0):!1}function o(i){console.log("item display is called"),t()&&l()?(console.log(n),console.log(e(i)),e(i).append(n)):console.error("cannot display")}var c,n='<div class="item" id="%id%">%col1%<section>%col2%</section></div>',r='<div class="item-name">%data%</div>',s='<div class="item-remark">%data%</div>',d='<div class="item-price">%data%</div>',m='<button class="item-button">Add</button>',p='<input type="text" class="item-quantity" value="1" size="1"></input>',u='<figure><img src="%image%"><figcaption>%name%</figcaption></figure>';return{display:o}};return a});