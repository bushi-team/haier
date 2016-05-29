define("slider.js",function(t,e,i){var n=function(t){if(!t.dom)throw new Error("没有定义要插入的dom节点!");if(!t.data||!t.data.length)throw new Error("没有传入数据!");this._opts=t,this._setting(),this._renderHTML(),this._bindHandler(),this._setPlayWhenFocus()};n.prototype._setting=function(){var t=this._opts;this.wrap=t.dom,this.data=t.data,this.type=t.type||"pic",this.isAutoScale=t.isAutoScale||!1,this.isVertical=t.isVertical||!1,this.isDestroyCon=t.isDestroyCon||!1,this.isImgLazy=t.isImgLazy||!0,this.duration=t.duration||2e3,this.axis=this.isVertical?"Y":"X",this.width=this.wrap.clientWidth,this.height=this.wrap.clientHeight,this.ratio=this.height/this.width,this.scale=t.isVertical?this.height:this.width,this.sliderIndex=this.sliderIndex||0,this.callback={onTouchStart:t.onTouchStart,onTouchEnd:t.onTouchEnd,onTouchMove:t.onTouchMove,onSlideChange:t.onSlideChange,onSlideInto:t.onSlideInto,onDestroy:t.onDestroy},this.data.length<2?(this.isLooping=!1,this.isAutoplay=!1):(this.isLooping=t.isLooping||!1,this.isAutoplay=t.isAutoplay||!1),this.isAutoplay&&this.play(),this._animateFunc=t.animateType in this._animateFuncs?this._animateFuncs[t.animateType]:this._animateFuncs["default"],this.callback.onSlideInto&&this.callback.onSlideInto()},n.prototype._renderHTML=function(){var t,e,i;for(this.isDestroyCon||this.wrap.getElementsByTagName("ul")[0]&&this.wrap.removeChild(this.wrap.getElementsByTagName("ul")[0]),this.outer?(this.outer.innerHTML="",t=this.outer):t=document.createElement("ul"),this.els=[],e=0;3>e;e++)i=document.createElement("li"),i.style.width=this.width+"px",i.style.height=this.height+"px",this._animateFunc(i,this.axis,this.scale,e,0),this.els.push(i),t.appendChild(i),i.innerHTML=this._renderItem(!this.isVertical||"rotate"!=this._opts.animateType&&"flip"!=this._opts.animateType?e-1+this.sliderIndex:1-e+this.sliderIndex);this.outer||(this.outer=t,this.wrap.appendChild(t))},n.prototype._renderItem=function(t){var e,i,n=this.data.length;if(e=this.isLooping?0>t?this.data[n+t]:t>n-1?this.data[t-n]:this.data[t]:this.data[t]||{empty:!0},e.empty)return"";if("pic"===this.type){e.href&&(i='<a href="'+e.href+'">');var s="src";this.isImgLazy&&(s="data-src"),i+=this.isAutoScale?e.height/e.width>this.ratio?'<img height="'+this.height+'" '+s+'="'+e.content+'">':'<img width="'+this.width+'" '+s+'="'+e.content+'">':"<img "+s+'="'+e.content+'">',e.href&&(i+="</a>")}else(this.type="dom")?i='<div style="height:'+e.height+";width:"+e.width+';">'+e.content+"</div>":"overspread"===this.type&&(i=this.ratio<1?'<div style="height: 100%; width:100%; background:url('+e.content+") center no-repeat; background-size:"+this.width+'px auto;"></div>':'<div style="height: 100%; width:100%; background:url('+e.content+") center no-repeat; background-size: auto "+this.height+'px;"></div>');return i},n.prototype._animateFuncs={"default":function(t,e,i,n,s){t.style.webkitTransform="translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)"}},n.prototype._slide=function(t){var e=this.data,i=this.els,n=this.sliderIndex+t;e[n]?this.sliderIndex=n:this.isLooping?this.sliderIndex=t>0?0:e.length-1:t=0;var s;t>0?(s=i.shift(),i.push(s)):0>t&&(s=i.pop(),i.unshift(s)),0!==t&&(s.innerHTML=this._renderItem(n+t),s.style.webkitTransition="none",s.style.visibility="hidden",setTimeout(function(){s.style.visibility="visible"},200),this.callback.onSlideChange&&this.callback.onSlideChange(this.sliderIndex));for(var o=0;3>o;o++)i[o]!==s&&(i[o].style.webkitTransition="all .3s ease"),this._animateFunc(i[o],this.axis,this.scale,o,0);this.isAutoplay&&(this.sliderIndex!==e.length-1||this.isLooping||this.pause())},n.prototype._bindHandler=function(){var t=this,e=!1,i=this.outer,n=function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}();this.touch={hasTouch:n,startEvt:n?"touchstart":"mousedown",moveEvt:n?"touchmove":"mousemove",endEvt:n?"touchend":"mouseup",sizeEvt:n?"orientationchange":"resize"},this.event={start:function(i){t.pause(),e=!0,t.callback.onTouchStart&&t.callback.onTouchStart(),t.startTime=(new Date).getTime(),t.startX=t.touch.hasTouch?i.targetTouches[0].pageX:i.pageX,t.startY=t.touch.hasTouch?i.targetTouches[0].pageY:i.pageY},move:function(i){if(e){i.preventDefault(),t.onslide&&t.onslide();for(var n=t.axis,s=t.touch.hasTouch?i.targetTouches[0]["page"+n]:i["page"+n],o=s-t["start"+n],a=0;3>a;a++){var h=t.els[a];h.style.webkitTransition="all 0s",t._animateFunc(h,n,t.scale,a,o)}t.callback.onTouchMove&&t.callback.onTouchMove(),t.offset=o}},end:function(i){i.preventDefault(),e=!1;var n=t.scale/2,s=t.offset,o=(new Date).getTime();n=o-t.startTime>300?n:14,t._slide(s>=n?-1:-n>s?1:0),t.isAutoplay&&t.play(),t.offset=0,t.callback.onTouchEnd&&t.callback.onTouchEnd()},orientation:function(){setTimeout(function(){t.reset()},100)},focus:function(){t.isAutoplay&&t.play()},blur:function(){t.pause()},lazyLoad:function(){var e=function(t,e){var i=document.createElement("img");i.onload=i.error=function(){e&&e()},i.src=t},i=function(t,i){function n(){a++,a==o&&i&&i()}for(var s=t,o=s.length,a=0,h=0;o>h;h++)e(t[h],n)};if(t.isImgLazy){for(var n=[],s=0,o=t.data.length;o>s;s++)n.push(t.data[s].content);i(n,function(){for(var e=(t.outer.getElementsByTagName("li"),0),i=t.els.length;i>e;e++){var n=t.els[e].getElementsByTagName("img")[0];n.setAttribute("src",n.getAttribute("data-src"))}t.isImgLazy=!1})}}},this._opts.data.length<2||(i.addEventListener(t.touch.startEvt,t.event.start),i.addEventListener(t.touch.moveEvt,t.event.move),i.addEventListener(t.touch.endEvt,t.event.end),window.addEventListener(t.touch.sizeEvt,t.event.orientation),"complete"==document.readyState?t.event.lazyLoad():window.addEventListener("load",t.event.lazyLoad,!1))},n.prototype._setPlayWhenFocus=function(){var t=this;window.addEventListener("focus",t.event.focus,!1),window.addEventListener("blur",t.event.blur,!1)},n.prototype.play=function(){var t=this;clearInterval(this.autoPlayTimer),this.autoPlayTimer=setInterval(function(){t._slide(1)},t.duration)},n.prototype.pause=function(){clearInterval(this.autoPlayTimer)},n.prototype.reset=function(){this.pause(),this._setting(),this._renderHTML(),this.isAutoplay&&this.play()},n.prototype.destroy=function(){var t=this,e=this.outer;this.pause(),e.removeEventListener(t.touch.startEvt,t.event.start),e.removeEventListener(t.touch.moveEvt,t.event.move),e.removeEventListener(t.touch.endEvt,t.event.end),window.removeEventListener("focus",t.event.focus,!1),window.removeEventListener("blur",t.event.blur,!1),window.removeEventListener(t.touch.sizeEvt,t.event.orientation),window.addEventListener("load",t.event.lazyLoad,!1),this.callback.onDestroy&&this.callback.onDestroy(),this.isDestroyCon&&(this.wrap.innerHTML="")},i.exports=n});