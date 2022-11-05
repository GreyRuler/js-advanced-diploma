!function(){"use strict";var t={905:function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){this.level=t,this.attack=0,this.defence=0,this.health=50,this.type=e,this.attackRange=0,this.movementRange=0}return t.prototype.toString=function(){return"🎖 ".concat(this.level," ⚔ ").concat(this.attack," 🛡 ").concat(this.defence," ❤ ").concat(this.health)},t}();e.default=n},241:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(58)),a=r(n(246)),i=r(n(164)),l=r(n(418)),c=r(n(52)),s=r(n(590)),u=r(n(732)),d=r(n(127)),f=n(460),h=r(n(212)),p=r(n(591)),v=function(){function t(t,e){this.gamePlay=t,this.stateService=e}return t.prototype.init=function(){this.gamePlay.drawUi(a.default.prairie);var t=[i.default,l.default,c.default],e=[s.default,u.default,d.default],n=(0,f.generateTeam)(t,4,3),r=(0,f.generateTeam)(e,4,3),o=this.gamePlay.boardSize,p=(0,f.range)(0,o*o-o,8).concat((0,f.range)(1,o*o-o+1,8)),v=(0,f.range)(o-2,o*o-o,8).concat((0,f.range)(o-1,o*o-o,8)),y=(0,f.randomPosition)(p,3),_=(0,f.randomPosition)(v,3);this.positionedCharacters=n.characters.map((function(t,e){return new h.default(t,y[e])})).concat(r.characters.map((function(t,e){return new h.default(t,_[e])}))),this.gamePlay.redrawPositions(this.positionedCharacters),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this))},t.prototype.onCellClick=function(t){var e,n,r=null===(e=this.positionedCharacters)||void 0===e?void 0:e.find((function(e){return e.position===t}));(null==r?void 0:r.character)&&["bowman","swordsman","magician"].includes(r.character.type)?((null===(n=this.gamePlay.currentCharacter)||void 0===n?void 0:n.position)&&this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position),this.gamePlay.currentCharacter=r,this.gamePlay.selectCell(t)):o.default.showError("Выберите своего персонажа")},t.prototype.onCellEnter=function(t){var e,n,r,o,a=null===(n=null===(e=this.positionedCharacters)||void 0===e?void 0:e.find((function(e){return e.position===t})))||void 0===n?void 0:n.character;a&&this.gamePlay.showCellTooltip(a.toString(),t),this.gamePlay.currentCharacter&&(["bowman","swordsman","magician"].includes(a.type)?this.gamePlay.setCursor(p.default.pointer):["daemon","undead","vampire"].includes(a.type)&&((0,f.attackRadius)(null===(r=this.gamePlay.currentCharacter)||void 0===r?void 0:r.position,null===(o=this.gamePlay.currentCharacter)||void 0===o?void 0:o.character.attackRange,this.gamePlay.boardSize).includes(t)?(this.gamePlay.setCursor(p.default.crosshair),this.gamePlay.selectCell(t,"red")):this.gamePlay.setCursor(p.default.notallowed)))},t.prototype.onCellLeave=function(t){var e,n;this.gamePlay.hideCellTooltip(t),t!==(null===(n=null===(e=this.gamePlay)||void 0===e?void 0:e.currentCharacter)||void 0===n?void 0:n.position)&&this.gamePlay.deselectCell(t)},t}();e.default=v},58:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var r=n(605),o=function(){function t(t){if(!t)throw Error("Container is null");this.container=t,this.boardSize=8,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[]}return t.prototype.drawUi=function(t){var e=this;this.container.innerHTML='\n\t\t\t<div class="controls">\n\t\t\t\t<button data-id="action-restart" class="btn">New Game</button>\n\t\t\t\t<button data-id="action-save" class="btn">Save Game</button>\n\t\t\t\t<button data-id="action-load" class="btn">Load Game</button>\n\t\t\t</div>\n\t\t\t<div class="board-container">\n\t\t\t\t<div data-id="board" class="board"></div>\n\t\t\t</div>\n\t\t',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(function(t){return e.onNewGameClick(t)})),this.saveGameEl.addEventListener("click",(function(t){return e.onSaveGameClick(t)})),this.loadGameEl.addEventListener("click",(function(t){return e.onLoadGameClick(t)}));var n=this.container.querySelector("[data-id=board]");if(!n)throw Error("".concat(n));this.boardEl=n,this.boardEl.classList.add(t);for(var o=0;o<Math.pow(this.boardSize,2);o+=1){var a=document.createElement("div");a.classList.add("cell","map-tile","map-tile-".concat((0,r.calcTileType)(o,this.boardSize))),a.addEventListener("mouseenter",(function(t){return e.onCellEnter(t)})),a.addEventListener("mouseleave",(function(t){return e.onCellLeave(t)})),a.addEventListener("click",(function(t){return e.onCellClick(t)})),this.boardEl.appendChild(a),this.cells.push(a)}},t.prototype.redrawPositions=function(t){for(var e=0,n=this.cells;e<n.length;e++)n[e].innerHTML="";for(var o=0,a=t;o<a.length;o++){var i=a[o],l=this.cells[i.position],c=document.createElement("div");c.classList.add("character",i.character.type);var s=document.createElement("div");s.classList.add("health-level");var u=document.createElement("div");u.classList.add("health-level-indicator","health-level-indicator-".concat((0,r.calcHealthLevel)(i.character.health))),u.style.width="".concat(i.character.health,"%"),s.appendChild(u),c.appendChild(s),l.appendChild(c)}},t.prototype.addCellEnterListener=function(t){this.cellEnterListeners.push(t)},t.prototype.addCellLeaveListener=function(t){this.cellLeaveListeners.push(t)},t.prototype.addCellClickListener=function(t){this.cellClickListeners.push(t)},t.prototype.addNewGameListener=function(t){this.newGameListeners.push(t)},t.prototype.addSaveGameListener=function(t){this.saveGameListeners.push(t)},t.prototype.addLoadGameListener=function(t){this.loadGameListeners.push(t)},t.prototype.onCellEnter=function(t){t.preventDefault();var e=this.cells.indexOf(t.currentTarget);this.cellEnterListeners.forEach((function(t){return t.call(null,e)}))},t.prototype.onCellLeave=function(t){t.preventDefault();var e=this.cells.indexOf(t.currentTarget);this.cellLeaveListeners.forEach((function(t){return t.call(null,e)}))},t.prototype.onCellClick=function(t){var e=this.cells.indexOf(t.currentTarget);this.cellClickListeners.forEach((function(t){return t.call(null,e)}))},t.prototype.onNewGameClick=function(t){t.preventDefault(),this.newGameListeners.forEach((function(t){return t.call(null)}))},t.prototype.onSaveGameClick=function(t){t.preventDefault(),this.saveGameListeners.forEach((function(t){return t.call(null)}))},t.prototype.onLoadGameClick=function(t){t.preventDefault(),this.loadGameListeners.forEach((function(t){return t.call(null)}))},t.showError=function(t){alert(t)},t.showMessage=function(t){alert(t)},t.prototype.selectCell=function(t,e){void 0===e&&(e="yellow"),this.deselectCell(t),this.cells[t].classList.add("selected","selected-".concat(e))},t.prototype.deselectCell=function(t){var e,n=this.cells[t];(e=n.classList).remove.apply(e,Array.from(n.classList).filter((function(t){return t.startsWith("selected")})))},t.prototype.showCellTooltip=function(t,e){this.cells[e].title=t},t.prototype.hideCellTooltip=function(t){this.cells[t].title=""},t.prototype.showDamage=function(t,e){var n=this;return new Promise((function(r){var o=n.cells[t],a=document.createElement("span");a.textContent=e,a.classList.add("damage"),o.appendChild(a),a.addEventListener("animationend",(function(){o.removeChild(a),r()}))}))},t.prototype.setCursor=function(t){this.boardEl&&(this.boardEl.style.cursor=t)},t}();e.default=o},370:function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this.storage=t}return t.prototype.save=function(t){this.storage.setItem("state",JSON.stringify(t))},t.prototype.load=function(){try{return JSON.parse(this.storage.getItem("state"))}catch(t){throw new Error("Invalid state")}},t}();e.default=n},212:function(t,e){Object.defineProperty(e,"__esModule",{value:!0});e.default=function(t,e){this.character=t,this.position=e}},918:function(t,e){Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){this._characters=t}return Object.defineProperty(t.prototype,"characters",{get:function(){return this._characters},enumerable:!1,configurable:!0}),t}();e.default=n},866:function(t,e,n){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(58)),a=r(n(241)),i=r(n(370)),l=document.querySelector("#game-container"),c=new o.default(l),s=new i.default(localStorage);new a.default(c,s).init()},164:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="bowman");var r=t.call(this,e,n)||this;return r.attack=25,r.defence=25,r.attackRange=2,r.movementRange=2,r}return o(e,t),e}(a(n(905)).default);e.default=i},418:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="magician");var r=t.call(this,e,n)||this;return r.attack=10,r.defence=40,r.attackRange=4,r.movementRange=1,r}return o(e,t),e}(a(n(905)).default);e.default=i},52:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="swordsman");var r=t.call(this,e,n)||this;return r.attack=40,r.defence=10,r.attackRange=1,r.movementRange=4,r}return o(e,t),e}(a(n(905)).default);e.default=i},590:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="daemon");var r=t.call(this,e,n)||this;return r.attack=10,r.defence=10,r.attackRange=4,r.movementRange=1,r}return o(e,t),e}(a(n(905)).default);e.default=i},732:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="undead");var r=t.call(this,e,n)||this;return r.attack=40,r.defence=10,r.attackRange=1,r.movementRange=4,r}return o(e,t),e}(a(n(905)).default);e.default=i},127:function(t,e,n){var r,o=this&&this.__extends||(r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},r(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),a=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n){void 0===n&&(n="vampire");var r=t.call(this,e,n)||this;return r.attack=25,r.defence=25,r.attackRange=2,r.movementRange=2,r}return o(e,t),e}(a(n(905)).default);e.default=i},591:function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={auto:"auto",pointer:"pointer",crosshair:"crosshair",notallowed:"not-allowed"}},460:function(t,e,n){var r=this&&this.__generator||function(t,e){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(a){return function(l){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=e.call(t,i)}catch(t){a=[6,t],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,l])}}},o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.attackRadius=e.randomPosition=e.range=e.generateTeam=e.characterGenerator=void 0;var a=o(n(918));function i(t,e){var n,o;return r(this,(function(r){switch(r.label){case 0:return n=Math.ceil(Math.random()*e),o=Math.floor(Math.random()*t.length),[4,new t[o](n)];case 1:return r.sent(),[3,0];case 2:return[2]}}))}function l(t,e,n){void 0===n&&(n=1);for(var r=[],o=t;o<e;o+=n)r.push(o);return r}e.characterGenerator=i,e.generateTeam=function(t,e,n){for(var r=i(t,e),o=[],l=0;l<n;l++){var c=r.next().value;o.push(c)}return new a.default(o)},e.range=l,e.randomPosition=function(t,e){for(var n=[],r=0;r<e;r++){var o=Math.floor(Math.random()*t.length);n.push(t.splice(o,1))}return n.flat()},e.attackRadius=function(t,e,n){for(var r=[],o=l(t-n*e,t+n*e+1,n).filter((function(t){return t>=0&&t<n*n})).values(),a=o.next().value,i=0;i<n;i++){var c=l(n*i,n*(i+1));c.includes(a)&&(r.push(c.filter((function(t){return t<=a+e&&t>=a-e}))),a=o.next().value)}return r.flat()}},246:function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default={prairie:"prairie",desert:"desert",arctic:"arctic",mountain:"mountain"}},605:function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0}),e.calcHealthLevel=e.calcTileType=void 0;var r=n(460);e.calcTileType=function(t,e){switch(!0){case 0===t:return"top-left";case t===e-1:return"top-right";case t===Math.pow(e,2)-e:return"bottom-left";case t===Math.pow(e,2)-1:return"bottom-right";case(0,r.range)(1,e-1).includes(t):return"top";case(0,r.range)(Math.pow(e,2)-e+1,Math.pow(e,2)-1).includes(t):return"bottom";case(0,r.range)(e,Math.pow(e,2)-e,e).includes(t):return"left";case(0,r.range)(2*e-1,Math.pow(e,2)-1,e).includes(t):return"right";default:return"center"}},e.calcHealthLevel=function(t){return t<15?"critical":t<50?"normal":"high"}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r].call(a.exports,a,a.exports,n),a.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n(866)}();