(function(e){function t(t){for(var a,l,r=t[0],o=t[1],u=t[2],d=0,p=[];d<r.length;d++)l=r[d],Object.prototype.hasOwnProperty.call(i,l)&&i[l]&&p.push(i[l][0]),i[l]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);c&&c(t);while(p.length)p.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==i[o]&&(a=!1)}a&&(s.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},i={app:0},s=[];function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/Slots-App/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var u=0;u<r.length;u++)t(r[u]);var c=o;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"148e":function(e,t,n){e.exports=n.p+"img/Cherry.565a5779.png"},"33a7":function(e,t,n){"use strict";n("fc6c")},"34bf":function(e,t,n){e.exports=n.p+"img/7.4fcd6265.png"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("BaseLayout",[n("router-view")],1)},s=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{style:{background:this.$vuetify.theme.themes[e.theme].background},attrs:{id:"main"}},[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[n("v-toolbar-title",[e._v("Slot Machine Test")])],1)]),n("v-main",[n("v-container",[n("v-layout",{attrs:{row:"",wrap:""}},[n("v-col",{staticClass:"fill-height"},[n("v-sheet",{attrs:{"min-height":"70vh",rounded:"lg",elevation:"12"}},[e._t("default")],2)],1)],1)],1)],1)],1)},r=[],o={data:function(){return{}},components:{},methods:{},computed:{theme:function(){return this.$vuetify.theme.dark?"dark":"light"}}},u=o,c=n("2877"),d=Object(c["a"])(u,l,r,!1,null,null,null),p=d.exports,b={name:"App",components:{BaseLayout:p},data:function(){return{}}},f=b,h=Object(c["a"])(f,i,s,!1,null,null,null),m=h.exports,g=n("ce5b"),v=n.n(g),y=(n("bf40"),n("fcf4"));a["default"].use(v.a,{options:{customProperties:!0}});var x=new v.a({theme:{themes:{light:{primary:y["a"].orange.darken1,secondary:y["a"].orange.lighten4,accent:y["a"].lightGreen.lighten2,background:y["a"].grey.lighten3}}}}),A=(n("d5e8"),n("5363"),n("8c4f")),C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("SlotMachine")],1)},R=[],w=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"d-flex flex-column justify-center mb-6",attrs:{fluid:"",flat:"",tile:""}},[a("v-form",{ref:"slotBalanceForm",model:{value:e.formIsValid,callback:function(t){e.formIsValid=t},expression:"formIsValid"}},[a("v-card",{staticClass:"d-flex flex-column flex-grow-1 flex-md-row pa-3",attrs:{flat:""}},[a("v-col",{staticClass:"justify-center",attrs:{cols:"12",md:"6"}},[a("div",{staticClass:"SlotMachine d-flex justify-space-between black ma-auto width-380"},[a("div",{ref:"payline1",staticClass:"SlotMachine-payline--top",class:e.handlePaylineClass("top")}),a("div",{ref:"payline2",staticClass:"SlotMachine-payline--mid",class:e.handlePaylineClass("center")}),a("div",{ref:"payline3",staticClass:"SlotMachine-payline--bot",class:e.handlePaylineClass("bottom")}),a("Reels",{ref:"reel1",attrs:{name:"reel1",duration:2,"reel-data":this.reelData,"debug-enabled":e.debugArea.enableDebug,"debug-reel":e.debugArea.leftReel},on:{stopped:e.reelStopped}}),a("Reels",{ref:"reel2",staticClass:"mx-4",attrs:{name:"reel2",duration:4,"reel-data":this.reelData,"debug-enabled":e.debugArea.enableDebug,"debug-reel":e.debugArea.centerReel},on:{stopped:e.reelStopped}}),a("Reels",{ref:"reel3",attrs:{name:"reel3",duration:6,"reel-data":this.reelData,"debug-enabled":e.debugArea.enableDebug,"debug-reel":e.debugArea.rightReel},on:{"reel-spinning":e.handleSpinStatus,stopped:e.reelStopped}}),a("div",{staticClass:"gradient-overlay"})],1),a("div",{staticClass:"d-flex"},[a("v-text-field",{staticClass:"credits--input mt-6 ma-auto width-380",attrs:{label:"Credits",outlined:"",dense:"",rules:e.rules,type:"text",value:e.currentBalance},on:{keyup:e.handleBalanceInput}}),a("v-text-field",{staticClass:"credits--input mt-6 ma-auto width-380",attrs:{label:"Wins",outlined:"",dense:"",min:"0",max:"5000",disabled:"",type:"text",value:e.currentWins}})],1)]),a("v-col",{staticClass:"flex-column",attrs:{cols:"12",md:"6"}},[a("div",{staticClass:"width-380 paytable ma-auto"},e._l(e.payTable,(function(t,i){return a("div",{key:i,staticClass:"paytable--wrapper"},[e.handleArrayComparison(["7","Cherry"],t.combination)||e.handleArrayComparison(["BAR","2xBAR","3xBAR"],t.combination)?a("v-row",{staticClass:"paytable--row"},[a("v-col",{staticClass:"paytable--imgColumn paytable--imgColumn-single col-10"},[e._v(" Any combination of "),e._l(t.combination,(function(e,t){return a("img",{key:e+t,staticClass:"paytable--img",attrs:{src:n("9e01")("./"+e+".png"),width:"25",height:"22"}})})),e._v(" on any line ")],2),a("transition",{on:{"before-enter":e.beforeEnter,leave:e.leave,css:!1}},[t.win?e._e():a("v-col",{staticClass:"paytable--valueColumn text-right"},[e._v(e._s(t.value))])],1)],1):a("v-row",{staticClass:"paytable--row"},[a("v-col",{staticClass:"paytable--imgColumn pr-0 col-4"},e._l(t.combination,(function(e,t){return a("img",{key:e+t,staticClass:"paytable--img",attrs:{src:n("9e01")("./"+e+".png"),width:"25",height:"22"}})})),0),a("v-col",{staticClass:"paytable--textColumn col-4 col-md-5"},[e._v(" on "+e._s(t.position?t.position:"any")+" line ")]),a("transition",{on:{"before-enter":e.beforeEnter,leave:e.leave,css:!1}},[t.win?e._e():a("v-col",{staticClass:"paytable--valueColumn text-right"},[e._v(e._s(t.value))])],1)],1)],1)})),0),a("div",{staticClass:"width-400 mt-3 ma-auto"},[a("v-btn",{staticClass:"accent mt-3",attrs:{disabled:this.spinning||!e.formIsValid,block:"",elevation:"2",raised:""},on:{mousedown:function(t){return e.spin()}}},[e._v(" Spin ")])],1)])],1)],1),a("div",{staticClass:"px-6 mb-6"},[a("ExpansionPanel",{attrs:{name:"Debug Area"}},[a("v-row",[a("v-col",[a("div",{staticClass:"text-subtitle-2 mb-3"},[e._v("Enable Debug Mode?")]),a("v-switch",{attrs:{color:"accent",label:e.debugArea.enableDebug?"Debug Enabled":"Debug Disabled"},on:{change:e.resetWinState},model:{value:e.debugArea.enableDebug,callback:function(t){e.$set(e.debugArea,"enableDebug",t)},expression:"debugArea.enableDebug"}})],1),a("v-col",[a("div",{staticClass:"text-subtitle-2 mb-3"},[e._v("Left Reel")]),a("v-select",{attrs:{label:"Symbol Position",outlined:"",dense:"",items:e.debugArea.positions,"item-text":"name","item-value":"name","return-object":"",disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.leftReel.position,callback:function(t){e.$set(e.debugArea.leftReel,"position",t)},expression:"debugArea.leftReel.position"}}),a("v-select",{attrs:{label:"Symbol",outlined:"",dense:"",items:e.debugArea.symbols,disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.leftReel.symbol,callback:function(t){e.$set(e.debugArea.leftReel,"symbol",t)},expression:"debugArea.leftReel.symbol"}})],1),a("v-col",[a("div",{staticClass:"text-subtitle-2 mb-3"},[e._v("Center Reel")]),a("v-select",{attrs:{label:"Symbol Position",outlined:"",dense:"","item-text":"name","item-value":"name","return-object":"",items:e.debugArea.positions,disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.centerReel.position,callback:function(t){e.$set(e.debugArea.centerReel,"position",t)},expression:"debugArea.centerReel.position"}}),a("v-select",{attrs:{label:"Symbol",outlined:"",dense:"",items:e.debugArea.symbols,disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.centerReel.symbol,callback:function(t){e.$set(e.debugArea.centerReel,"symbol",t)},expression:"debugArea.centerReel.symbol"}})],1),a("v-col",[a("div",{staticClass:"text-subtitle-2 mb-3"},[e._v("Right Reel")]),a("v-select",{attrs:{label:"Symbol Position",outlined:"",dense:"","item-text":"name","item-value":"name","return-object":"",items:e.debugArea.positions,disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.rightReel.position,callback:function(t){e.$set(e.debugArea.rightReel,"position",t)},expression:"debugArea.rightReel.position"}}),a("v-select",{attrs:{label:"Symbol",outlined:"",dense:"",items:e.debugArea.symbols,disabled:!e.debugArea.enableDebug},on:{change:e.resetWinState},model:{value:e.debugArea.rightReel.symbol,callback:function(t){e.$set(e.debugArea.rightReel,"symbol",t)},expression:"debugArea.rightReel.symbol"}})],1)],1)],1)],1)],1)},B=[],D=n("2909"),E=(n("d3b7"),n("25f0"),n("caad"),n("2532"),n("c740"),n("4de4"),n("99af"),n("d81d"),n("b0c0"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"Reel-wrapper white"},[a("transition",{on:{"before-enter":e.beforeEnter,enter:e.enter,leave:e.leave,css:!1}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.spin,expression:"spin"}],staticClass:"d-flex flex-column mb-6 white",class:this.handleReelClass(),attrs:{id:"reels",name:"slide"}},e._l(e.shuffledReelTileData,(function(e,t){return a("img",{key:e.name+t,staticClass:"Reel-image my-3",attrs:{"data-index":t,src:n("9e01")("./"+e.name+".png")}})})),0)])],1)}),O=[],k=(n("a9e3"),n("fb6a"),n("cffa")),T={name:"SlotReel",emits:["reel-spinning","stopped"],props:{duration:{type:Number},debugEnabled:{type:Boolean},debugReel:{type:Object},reelData:{type:Array,required:!0}},data:function(){return{spin:!1,reelTileData:[],reelDuration:0,offset:0}},watch:{spin:function(e){var t=this;e&&setTimeout((function(){t.reelDuration--}),1e3)},reelDuration:{handler:function(e){var t=this;e>0&&this.spin?setTimeout((function(){t.reelDuration--}),1e3):this.animateEnd()}}},beforeMount:function(){var e=[],t=3*this.reelData.length;while(t>0){var n=Math.floor(Math.random()*this.reelData.length),a=this.reelData[n];e.push(a),t--}this.reelTileData=e},mounted:function(){this.reelDuration=this.duration,this.randomIndex()},methods:{shuffleArray:function(e){for(var t=e.slice(),n=t.length-1;n>0;n--){var a=Math.floor(Math.random()*(n+1)),i=[t[a],t[n]];t[n]=i[0],t[a]=i[1]}return t},setDebugSymbols:function(){if(this.debugEnabled){var e=this.debugReel.symbol;"center"===this.debugReel.position.name&&(this.reelTileData[9]={image:"/assets/".concat(e,".png"),name:"".concat(e)}),"top"===this.debugReel.position.name&&(this.reelTileData[9]={image:"/assets/".concat(e,".png"),name:"".concat(e)}),"bottom"===this.debugReel.position.name&&(this.reelTileData[10]={image:"/assets/".concat(e,".png"),name:"".concat(e)})}},start:function(){this.setDebugSymbols(),this.randomIndex(),this.spinRoulette()},spinRoulette:function(){this.spin=!0,this.$emit("reel-spinning",this.spin),this.reelTileData=this.debugEnabled?this.reelTileData:this.shuffleArray(this.reelTileData)},animateEnd:function(){if(!(this.reelDuration>0)){this.spin=!1,this.$emit("reel-spinning",this.spin);var e=[];return 1===this.offset?(e.push(this.shuffledReelTileData[9]),e.push(this.shuffledReelTileData[10]),this.$emit("stopped",e)):(e.push(this.shuffledReelTileData[9]),this.$emit("stopped",e))}},randomIndex:function(){return this.debugEnabled?(this.offset=this.debugReel.position.value,!0):(this.offset=Math.floor(2*Math.random()),!1)},handleReelClass:function(){return this.debugEnabled?0===this.debugReel.position.value?"Reel":"Reel-offset":0===this.offset?"Reel":"Reel-offset"},beforeEnter:function(e){var t=this;k["a"].set(e,{y:0,onComplete:function(){t.reelDuration=t.duration}})},enter:function(e,t){var n=this;k["a"].to(e,{duration:.5,ease:"none",lazy:!0,repeat:2*this.reelDuration,y:-1e3,onStart:function(){n.animateEnd()},onComplete:function(){}})},leave:function(e,t){var n=this;k["a"].to(e,{duration:.5,ease:"none",stagger:.5,lazy:!0,repeat:2*this.reelDuration,y:-1e3,onComplete:function(){n.reelDuration=n.duration}})}},computed:{shuffledReelTileData:function(){return this.debugEnabled?this.reelTileData:this.shuffleArray(this.reelTileData)}}},P=T,I=(n("33a7"),Object(c["a"])(P,E,O,!1,null,null,null)),V=I.exports,S=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-expansion-panels",[n("v-expansion-panel",[n("v-expansion-panel-header",[e._v(" "+e._s(e.name)+" ")]),n("v-expansion-panel-content",[e._t("default")],2)],1)],1)},W=[],q={props:["name"],data:function(){return{}}},M=q,j=Object(c["a"])(M,S,W,!1,null,null,null),X=j.exports,Z=n("7129"),L={name:"SlotMachine",components:{Reels:V,ExpansionPanel:X},mounted:function(){},data:function(){return{currentBalance:10,currentWins:0,payTable:[{position:"top",combination:["Cherry","Cherry","Cherry"],value:2e3,win:!1},{position:"center",combination:["Cherry","Cherry","Cherry"],value:1e3,win:!1},{position:"bottom",combination:["Cherry","Cherry","Cherry"],value:4e3,win:!1},{position:null,combination:["7","7","7"],value:150,win:!1},{position:null,combination:["7","Cherry"],value:75,win:!1},{position:null,combination:["3xBAR","3xBAR","3xBAR"],value:50,win:!1},{position:null,combination:["2xBAR","2xBAR","2xBAR"],value:20,win:!1},{position:null,combination:["BAR","BAR","BAR"],value:10,win:!1},{position:null,combination:["BAR","2xBAR","3xBAR"],value:5,win:!1}],reelData:[{name:"3xBAR",image:"/assets/3xBAR.png"},{name:"2xBAR",image:"/assets/2xBAR.png"},{name:"BAR",image:"/assets/BAR.png"},{name:"7",image:"/assets/7.png"},{name:"Cherry",image:"/assets/Cherry.png"}],formIsValid:!0,spinning:!1,results:[],winningLine1:null,winningLine2:null,debugArea:{enableDebug:!1,positions:[{name:"top",value:1},{name:"center",value:0},{name:"bottom",value:1}],symbols:["BAR","2xBAR","3xBAR","7","Cherry"],leftReel:{position:{name:"top",value:1},symbol:"BAR"},centerReel:{position:{name:"top",value:1},symbol:"BAR"},rightReel:{position:{name:"top",value:1},symbol:"BAR"}},rules:[function(e){return!!e||"Required"},function(e){return e>0||"Credits are too low"},function(e){return e<=5e3||"Credits should not be above 5000"}]}},methods:{handleSpinStatus:function(e){this.$refs.reel3.spin===e&&(this.spinning=e)},handlePaylineClass:function(e){return this.winningLine2===e||this.winningLine1===e?"payline-win":""},handleBalanceInput:function(e){var t=parseInt(e.target.value)||0;t<=5e3||"Backspace"===e.key?this.currentBalance=t:e.preventDefault()},spin:function(){this.resetWinState(),this.calculateBalance(),this.results=[],this.$refs.reel1.start(),this.$refs.reel2.start(),this.$refs.reel3.start()},reelStopped:function(e){this.results.push(e),3!==this.results.length||this.spinning||this.processWin(this.results)},checkArrayEqualLength:function(e){for(var t=0;t<e.length;t++)if(e[t].length!==e[1].length)return!1;return!0},handleArrayComparison:function(e,t){return e.toString()==t.toString()},handleLooseArrayComparison:function(e,t){return e.every((function(e){return t.includes(e)}))},resetWinState:function(){this.winningLine1=null,this.winningLine2=null;var e=this.payTable.findIndex((function(e){return!0===e.win}));-1!==e&&(this.payTable[e].win=!1)},checkArrayLength:function(e){return e.length>0&&3===e.length},calculateBalance:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e||(this.currentBalance-=1),this.currentWins+=e},checkWin:function(e,t){if(this.checkArrayLength(e))for(var n=this.payTable,a=0;a<n.length;a++){var i=n[a].combination;if(this.handleArrayComparison(e,i)){var s=e.includes("Cherry")?n.filter((function(e){return e.position===t}))[0]:n[a];s["position"]=t,s["win"]=!0,"bottom"===t&&s["combination"].every((function(e,t,n){return"Cherry"===e}))&&this.createBigConfetti(),this.createConfetti(),this.winningLine1=t,this.calculateBalance(s["value"])}else if(this.handleLooseArrayComparison(e,i)){var l=n[a];l["position"]=t,l["win"]=!0,this.createConfetti(),this.winningLine1?this.winningLine2=t:this.winningLine1=t,this.calculateBalance(l["value"])}else;}},processWin:function(e){if(this.checkArrayEqualLength(e)){var t=[],n=[],a=[];2===e[0].length?(t.push(Object(D["a"])(e[0]).shift()),t.push(Object(D["a"])(e[1]).shift()),t.push(Object(D["a"])(e[2]).shift()),a.push(Object(D["a"])(e[0]).pop()),a.push(Object(D["a"])(e[1]).pop()),a.push(Object(D["a"])(e[2]).pop())):n.push.apply(n,Object(D["a"])(e[0]).concat(Object(D["a"])(e[1]),Object(D["a"])(e[2])));var i=t.map((function(e){return e.name})),s=n.map((function(e){return e.name})),l=a.map((function(e){return e.name}));this.checkWin(i,"top"),this.checkWin(s,"center"),this.checkWin(l,"bottom")}},createConfetti:function(){var e=this.$refs.slotBalanceForm.outerHTML,t=Z.create(e,{resize:!0}),n=200,a={origin:{y:.7}};function i(e,i){t(Object.assign({},a,i,{particleCount:Math.floor(n*e)}))}i(.25,{spread:26,startVelocity:55}),i(.2,{spread:60}),i(.35,{spread:100,decay:.91,scalar:.8}),i(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),i(.1,{spread:120,startVelocity:45})},createBigConfetti:function(){var e=this.$refs.slotBalanceForm.outerHTML,t=Z.create(e,{resize:!0}),n=5e3,a=Date.now()+n;(function e(){t({particleCount:7,angle:60,spread:55,origin:{x:0}}),t({particleCount:7,angle:120,spread:55,origin:{x:1}}),Date.now()<a&&requestAnimationFrame(e)})()},beforeEnter:function(e){k["a"].set(e,{color:"#000"})},leave:function(e,t){k["a"].to(e,{duration:.7,repeat:-1,color:"#fb8c00",onComplete:function(){}})}}},z=L,N=(n("81fc"),Object(c["a"])(z,w,B,!1,null,null,null)),Q=N.exports,U={name:"Home",components:{SlotMachine:Q}},H=U,G=Object(c["a"])(H,C,R,!1,null,null,null),F=G.exports;a["default"].use(A["a"]);var J=[{path:"/",name:"Home",component:F}],K=new A["a"]({routes:J}),Y=K;a["default"].config.productionTip=!1,new a["default"]({vuetify:x,router:Y,render:function(e){return e(m)}}).$mount("#app")},6024:function(e,t){e.exports="data:image/png;base64,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"},"81fc":function(e,t,n){"use strict";n("c9bd")},"9e01":function(e,t,n){var a={"./2xBAR.png":"ddb9","./3xBAR.png":"a084","./7.png":"34bf","./BAR.png":"6024","./Cherry.png":"148e"};function i(e){var t=s(e);return n(t)}function s(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}i.keys=function(){return Object.keys(a)},i.resolve=s,e.exports=i,i.id="9e01"},a084:function(e,t,n){e.exports=n.p+"img/3xBAR.31bf5a09.png"},c9bd:function(e,t,n){},ddb9:function(e,t,n){e.exports=n.p+"img/2xBAR.6585bc55.png"},fc6c:function(e,t,n){}});
//# sourceMappingURL=app.ba1c81db.js.map