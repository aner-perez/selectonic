!function(a){"use strict";function b(a,b){if("object"!=typeof a)throw new TypeError("First argument must be an object with scheme of default options.");return this._schema=a,this._options={},this._callbacks={},this.set(b,!0),this}b.extend=function(){var a,b=arguments[0],c=Array.prototype.slice.call(arguments);c.shift();for(var d=0;d<c.length;d++){a=c[d];for(var e in a)b[e]=a[e]}return b},b.prototype.set=function(a,c){var d,e,f=this._schema,g={},h={};a=a||{};for(d in a){var i=a[d],j=f[d],k=typeof i===j.type||null===i&&j.nullable;if(void 0!==j){if(j.unchangeable&&!c)throw new Error('Option "'+d+'" could be setted once at the begining.');if(!k){var l='Option "'+d+'" must be '+j.type+(j.nullable?" or null.":".");throw new TypeError(l)}if(j.values&&j.values.indexOf(i)<0)throw new RangeError('Option "'+d+'" only could be in these values: "'+j.values.join('", "')+'".')}}for(d in f)void 0!==f[d].default&&(h[d]=f[d].default);g=c?b.extend(g,h,a):b.extend(g,a);for(d in g)(e=this._callbacks[d])&&(g[d]=e.call(this,g[d]));this._options=g},b.prototype.get=function(a){return a?this._options[a]:b.extend({},this._options)},b.prototype.on=function(a,b){this._callbacks[a]=b},b.prototype.off=function(a){this._callbacks[a]&&delete this._callbacks[a]},a.SuperOptions=b}(window),function(a,b,c){"use strict";var d={box:{type:"object"},offset:{"default":0,type:"number"},clone:{"default":null,type:"function",isNullable:!0},cloneRemove:{"default":null,type:"function",isNullable:!0},move:{"default":null,type:"function",isNullable:!0},stop:{"default":null,type:"function",isNullable:!0},over:{"default":null,type:"function",isNullable:!0},out:{"default":null,type:"function",isNullable:!0},visible:{"default":null,type:"function",isNullable:!0}},e=a(b),f=function(a,b){this.options=new c(d,b),this.$el=a,this.box=this.options.get("box"),this._initState={position:this.$el.css("position"),top:this.$el.css("top")},this._called={},this.$el.data("scrollSpy",this),this._bindEvents()};f.prototype._bindEvents=function(){var c=this;a(b).on("scroll",function(){c._refreshBoxScroll(c.box)})},f.prototype._refreshBoxScroll=function(c){var d=this.options.get("offset"),f=a(c),g=c===b,h=g?f.outerHeight():c.clientHeight,i=f.scrollTop(),j=g?0:f.offset().top,k=e.outerHeight(),l=e.scrollTop(),m=this.$el,n=m.outerHeight(),o=g?m.offset().top:m.offset().top-j+i;l+k>j&&j+h>l?(this._callEvent("over"),this._callEvent("visible",{window:{height:k,scrollTop:l},item:{height:n,topInBox:o},box:{height:h,top:j}})):this._callEvent("out"),j>l+d?(m.css({position:this._initState.position,top:this._initState.top}),this._cutClone()):l>h+j-n-d?(this._setClone(),m.css({position:"absolute",top:h+j-n}),this._callEvent("stop")):(this._setClone(),m.css({position:"fixed",top:0+this.options.get("offset")}),this._callEvent("move"))},f.prototype._setClone=function(){this._clone||(this._clone=this.$el.clone().css({opacity:0}).attr("id",null),this._clone.addClass("scrollSpy-clone"),this._callEvent("clone"),this._clone.insertBefore(this.$el))},f.prototype._cutClone=function(){this._clone&&(this._callEvent("cloneRemove"),this._clone.remove(),delete this._clone)},f.prototype._callEvent=function(b,c){var d=this.options.get(b),e=[],f=!d||!a.isFunction(d);switch(b){case"move":this._called.stop=!1;break;case"visible":if(f)return;e.push(c);break;case"clone":if(f)return;e.push(this._clone),e.push(this.$el);break;case"out":case"over":if(this._called[b])return;this._called[b]=!0,this._called["out"===b?"over":"out"]=!1;break;case"stop":if(this._called.stop)return;this._called.stop=!0}f||d.apply(this,e)},a.fn.scrollSpy=function(b){return this.length?(this.each(function(c,d){var e=a(d);new f(e,b)}),this):this}}(jQuery,window,window.SuperOptions),+function(a){"use strict";function b(c,d){var e,f=a.proxy(this.process,this);this.$element=a(c).is("body")?a(window):a(c),this.$body=a("body"),this.$scrollElement=this.$element.on("scroll.bs.scroll-spy.data-api",f),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||(e=a(c).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a",this.offsets=a([]),this.targets=a([]),this.activeTarget=null,this.refresh(),this.process()}b.DEFAULTS={offset:10},b.prototype.refresh=function(){var b=this.$element[0]==window?"offset":"position";this.offsets=a([]),this.targets=a([]);{var c=this;this.$body.find(this.selector).map(function(){var d=a(this),e=d.data("target")||d.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[b]().top+(!a.isWindow(c.$scrollElement.get(0))&&c.$scrollElement.scrollTop()),e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){c.offsets.push(this[0]),c.targets.push(this[1])})}},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight,d=c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(b>=d)return g!=(a=f.last()[0])&&this.activate(a);if(g&&b<=e[0])return g!=(a=f[0])&&this.activate(a);for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(!e[a+1]||b<=e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,a(this.selector).parentsUntil(this.options.target,".active").removeClass("active");var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")};var c=a.fn.scrollspy;a.fn.scrollspy=function(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})},a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=c,this},a(window).on("load",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);b.scrollspy(b.data())})})}(jQuery),function(a){"use strict";var b={UP:38,DOWN:40,ESCAPE:27,ENTER:13,SPACE:32},c=function(b){this.$el=a(b),this.button=this.$el.find(".select-trigger"),this.title=this.button.find(".select-title"),this.list=this.$el.find(".select-group"),this.isOpend=!1,this.isEnabled=!0,this.init()};c.prototype.init=function(){var a=this;this.button.on("blur",function(b){a.isEnabled&&a.close.call(a,b)}).on("mouseup",function(a){a.stopPropagation()}),this.$el.on("keydown",function(b){a.isEnabled&&a.keyHandler.call(a,b)}).on("mousedown",function(b){if(a.isEnabled){var c=a.button[0]===b.target||a.title[0]===b.target;return c?(a.isOpend?a.close.call(a):(b.stopPropagation(),a.open.call(a)),void 0):(b.preventDefault(),void 0)}}),this.list.selectonic({multi:!1,keyboard:!0,keyboardMode:"toggle",mouseMode:"mouseup",focusOnHover:!0,selectionBlur:!1,focusBlur:!0,create:function(){this.selectonic("disable")},select:function(b,c){b.preventDefault(),a.selected=c.target,a.setValue(c.items.html()),a.close()},stop:function(c,d){c.preventDefault(),(c.which===b.ENTER&&a.isOpend||!d.target)&&a.close()}})},c.prototype.keyHandler=function(a){var c=a.which;this.isOpend||c!==b.UP&&c!==b.DOWN&&c!==b.SPACE||(a.stopPropagation(),a.preventDefault(),this.open()),this.isOpend&&c===b.ESCAPE&&(this.close(),a.stopPropagation())},c.prototype.open=function(){this.$el.addClass("opend"),this.list.selectonic("enable"),this.selected&&this.list.selectonic("focus",this.selected).selectonic("scroll"),this.isOpend=!0},c.prototype.close=function(){this.$el.removeClass("opend"),this.list.selectonic("disable"),this.isOpend=!1},c.prototype.setValue=function(a){this.title.html(a)},c.prototype.disable=function(){this.isOpend&&this.close(),this.list.selectonic("disable"),this.isEnabled=!1,this.$el.addClass("disabled")},c.prototype.enable=function(){this.isOpend&&this.list.selectonic("enable"),this.isEnabled=!0,this.$el.removeClass("disabled")},a.fn.mySelect=function(b){if(!this.length)return this;var d;return b&&"string"==typeof b?(d=this.data("plugin_select"),d[b].call(d)):this.each(function(){var b=a(this);d=new c(this),b.data("plugin_select",d)}),a(this)}}(jQuery,window),function(a){"use strict";function b(a){void 0===a?e.toggleClass("disabled"):e.toggleClass("disabled",a)}function c(b){b.each(function(b,c){var d=a(c);d.addClass("animate"),setTimeout(function(){d.removeClass("animate")},300)})}var d=a("#actions-list"),e=d.find(".actions-list__actionbar"),f=d.find(".actions-list__group");f.selectonic({multi:!0,keyboard:!0,focusBlur:!0,selectionBlur:!0,before:function(b){(b.target===e[0]||a(b.target).is("button.actions-list__button"))&&this.selectonic("cancel")},select:function(){b(!1)},unselectAll:function(){b(!0)}}),e.on("click","button",function(a){a.preventDefault(),c(f.selectonic("getSelected")),this.blur()}),b(!0)}(jQuery);var demo=demo||{};!function(a,b){"use strict";function c(a){g.css("margin-top",a)}var d,e=a("#wellcome"),f=e.height(),g=a(".l-wrapper"),h=a(b);c(f),h.on("resize",function(){d&&(clearTimeout(d),d=null),d=setTimeout(function(){f=e.height(),c(f)},100)})}(jQuery,window),function(a){"use strict";function b(b){var c,d,e=a(b.target),f=a("#selectable-list");switch(e[0].type){case"checkbox":c=e.attr("id"),d=e.is(":checked");break;case"radio":c=e.attr("name"),d=e.next().html()}"handle"===c?(d=d?".actions-list__handle":d,f.toggleClass("handle",d),f.selectonic("option",c,d)):f.selectonic("option",c,d)}a(".b-options").change(b),a(".b-list").on("selectstart",function(a){a.preventDefault()})}(jQuery,window),function(a){"use strict";var b=a("#selectable-list"),c=a("#log-screen");a(".b-methods").click(function(d){var e=d.target;if("BUTTON"===e.tagName){d.stopImmediatePropagation(),d.preventDefault();var f,g=a(e).attr("data-action");if(!g)return;switch(g){case"getSelected":f=b.selectonic(g);break;case"getSelectedId":f=b.selectonic(g);break;default:b.selectonic(g)}f&&(demo.log('<div class="eventLog__space"><div>',c),a.each(f,function(b,d){var e="getSelectedId"===g?"#"+d:a(d).find(".actions-list__title").html();demo.log(e,c)}))}})}(jQuery,window),function(a){"use strict";var b=3e3;demo.log=function(c,d){var e;e=a("<div>"+c+"</div>").css("display","none").prependTo(d).slideDown(100),setTimeout(function(){e.fadeOut(500,function(){e.remove()})},b)}}(jQuery,window),function(a){"use strict";var b=a("#selectable-list");demo.scenarios={chooseEven:function(){b.selectonic("select",":even")},chooseThird:function(){b.selectonic("select","li:eq(3)")},unselectEven:function(){b.selectonic("unselect",":even")},unselectThird:function(){b.selectonic("unselect","li:eq(3)")}},a("#chooseEven").click(demo.scenarios.chooseEven),a("#chooseThird").click(demo.scenarios.chooseThird),a("#unselectEven").click(demo.scenarios.unselectEven),a("#unselectThird").click(demo.scenarios.unselectThird)}(jQuery,window),function(a){"use strict";var b=-1,c=function(){return'<span class="log-number">'+ ++b+".</span> "},d=a("#log-screen"),e=a("#selectable-list").selectonic({autoScroll:!0,create:function(){demo.log("create",d)},before:function(a){a&&"BUTTON"===a.target.tagName&&this.selectonic("cancel"),demo.log(c()+'before<div class="eventLog__space"></div>',d)},focusLost:function(){demo.log(c()+"focusLost",d)},select:function(){demo.log(c()+"select",d)},unselect:function(){demo.log(c()+"unselect",d)},unselectAll:function(){demo.log(c()+"unselectAll",d)},stop:function(){demo.log(c()+"stop",d),b=-1},destroy:function(){demo.log("destroy",d)}});e.selectonic(a("li").first()),a(["multi","focusBlur","selectionBlur","keyboard","loop","focusOnHover"]).each(function(b,c){a("#"+c).prop("checked",e.selectonic("option",c))}),a(["mouseMode","keyboardMode"]).each(function(b,c){var d=e.selectonic("option",c);a("input[name="+c+"][data-option="+d+"]").prop("checked",!0)})}(jQuery,window),function(a){"use strict";function b(a){a.addClass("disabled"),a===e.select?d.mySelect("disable"):a.find(".b-example:not(.scrollSpy-clone) .j-selectable").selectonic("disable")}function c(c){h!==c&&(c.removeClass("disabled"),c===e.select?d.mySelect("enable"):c.find(".b-example:not(.scrollSpy-clone) .j-selectable").selectonic("enable"),h=c,a.each(e,function(a,c){c!==h&&f[a]&&b(c)}))}var d=a(".b-select");d.mySelect(),d.mySelect("disable");var e={},f={},g=a("#navbar").height(),h=null,i=!1;e.select=a("#example1"),e.list=a("#example-list"),e.sandbox=a("#sandbox"),a.each(e,function(a){f[a]=!0}),e.list.find(".b-example").scrollSpy({box:e.list.find(".example-body")[0],offset:g,visible:function(a){(void 0===e.select.fromItemBottomOffset||a.window.scrollTop+a.window.height<e.select.fromItemBottomOffset)&&c(e.list)}}),e.select.find(".b-example").scrollSpy({box:e.select.find(".example-body")[0],offset:g,visible:function(a){i||(e.select.fromItemBottomOffset=a.box.top+a.item.topInBox+a.item.height,e.select.fromBoxBottomOffset=a.box.top+a.box.height,e.select.itemHeight=a.item.height,a.window.scrollTop+a.window.height>=e.select.fromItemBottomOffset&&e.select.fromBoxBottomOffset-a.window.scrollTop>a.item.height+g&&c(e.select))},clone:function(a,b){b.css({zIndex:"15"})}}),e.sandbox.find(".b-example").scrollSpy({box:e.sandbox.find(".example-body")[0],offset:g,visible:function(a){(void 0===e.select.fromBoxBottomOffset||void 0===e.select.itemHeight||e.select.fromBoxBottomOffset-a.window.scrollTop<e.select.itemHeight+g)&&c(e.sandbox)},clone:function(a){a.find("#selectable-list").attr("id",null)}})}(jQuery,window),function(a,b){"use strict";var c=a("#navbar"),d=a(b),e=-c.height();c.on("click","a",function(b){b.preventDefault();var c=a(b.target).attr("href"),f=a(c),g=f.offset().top;d.scrollTop(g+e)})}(jQuery,window);