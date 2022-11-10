!function(){"use strict";var e={905:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){this.level=0,this.attack=0,this.defence=0,this.health=50,this.type=t,this.attackRange=0,this.movementRange=0;for(var r=0;r<e;r++)this.levelUP()}return e.prototype.toString=function(){return"🎖 ".concat(this.level," ⚔ ").concat(this.attack," 🛡 ").concat(this.defence," ❤ ").concat(this.health)},e.prototype.levelUP=function(){this.level?(this.health>20?this.health=100:this.health+=80,this.level+=1,this.attack=this.improvingPerformance(this.attack),this.defence=this.improvingPerformance(this.defence)):this.level+=1},e.prototype.improvingPerformance=function(e){return Math.max(e,e*(80+this.health)/100)},e}();t.default=r},241:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(58)),i=r(460),o=n(r(591)),s=r(605),l=n(r(992)),c=n(r(982)),u=n(r(918)),h=function(){function e(e,t){this.positionedCharacters=[],this.themes=new l.default("prairie"),this.positionedAllies=[],this.positionedEnemies=[],this.gamePlay=e,this.stateService=t}return e.prototype.init=function(){var e=this;this.gamePlay.drawUi(this.themes.currentTheme);var t=this.gamePlay.boardSize;this.positionedAllies=(0,i.generatePositionedAllies)(t),this.positionedEnemies=(0,i.generatePositionedEnemies)(t),this.positionedCharacters=this.positionedAllies.map((function(e){return e})),this.positionedEnemies.forEach((function(t){e.positionedCharacters.push(t)})),this.userTeam=new u.default(this.positionedAllies.map((function(e){return e.character}))),this.gamePlay.redrawPositions(this.positionedCharacters),this.gamePlay.addCellClickListener(this.onCellClick.bind(this)),this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this)),this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this)),this.gamePlay.addNewGameListener((function(){return e.init()})),this.gamePlay.addSaveGameListener((function(){var t={userTeam:e.positionedAllies,enemyTeam:e.positionedEnemies,theme:e.themes.currentTheme};e.stateService.save(t)})),this.gamePlay.addLoadGameListener((function(){var t=e.stateService.load();if(t){var r=c.default.from(t);e.themes=new l.default(r.theme),e.gamePlay.drawUi(e.themes.currentTheme),e.positionedAllies=t.allyTeam,e.positionedEnemies=t.enemyTeam,e.positionedCharacters=r.characters,e.userTeam=new u.default(r.userTeam),e.gamePlay.redrawPositions(e.positionedCharacters)}}))},e.prototype.onCellClick=function(e){var t,r,n,l,c,u,h,d=this,f=this.positionedCharacters.find((function(t){return t.position===e}));if(this.gamePlay.currentCharacter&&!f&&(0,i.movementRadius)(null===(t=this.gamePlay.currentCharacter)||void 0===t?void 0:t.position,null===(r=this.gamePlay.currentCharacter)||void 0===r?void 0:r.character.movementRange,this.gamePlay.boardSize).includes(e)&&(this.gamePlay.deselectCell(e),this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position),this.gamePlay.currentCharacter.position=e,this.gamePlay.redrawPositions(this.positionedCharacters),this.gamePlay.currentCharacter=void 0,this.gamePlay.setCursor(o.default.auto),this.attackEnemy()),f)if(null===(n=this.userTeam)||void 0===n?void 0:n.has(f.character))(null===(l=this.gamePlay.currentCharacter)||void 0===l?void 0:l.position)&&this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position),this.gamePlay.currentCharacter=f,this.gamePlay.selectCell(e);else if(this.gamePlay.currentCharacter)if((0,i.attackRadius)(null===(c=this.gamePlay.currentCharacter)||void 0===c?void 0:c.position,null===(u=this.gamePlay.currentCharacter)||void 0===u?void 0:u.character.attackRange,this.gamePlay.boardSize).includes(e)&&!(null===(h=this.userTeam)||void 0===h?void 0:h.has(f.character))){this.gamePlay.deselectCell(this.gamePlay.currentCharacter.position);var p=(0,s.dealDamage)(this.gamePlay.currentCharacter.character,f.character);f.character.health-=p,this.gamePlay.showDamage(e,"".concat(p)).then((function(){d.deathCharacter(f.character),d.gamePlay.redrawPositions(d.positionedCharacters);var e=d.enemies();if(d.gamePlay.currentCharacter=void 0,d.gamePlay.setCursor(o.default.auto),e&&e.length)d.attackEnemy();else{var t=d.allies();null==t||t.forEach((function(e){e.character.levelUP()}));var r=d.gamePlay.boardSize,n=(0,i.generatePositionedEnemies)(r);d.positionedCharacters=d.positionedCharacters.concat(n);var a=d.themes.next();"prairie"!==a?(d.gamePlay.drawUi(a),d.gamePlay.redrawPositions(d.positionedCharacters)):d.gamePlay.clearEvents()}}))}else a.default.showError("Недопустимое действие");else a.default.showError("Выберите своего персонажа")},e.prototype.onCellEnter=function(e){var t,r,n=null===(t=this.positionedCharacters.find((function(t){return t.position===e})))||void 0===t?void 0:t.character;n&&this.gamePlay.showCellTooltip(n.toString(),e),this.gamePlay.currentCharacter&&(n?(null===(r=this.userTeam)||void 0===r?void 0:r.has(n))?this.gamePlay.setCursor(o.default.pointer):(0,i.attackRadius)(this.gamePlay.currentCharacter.position,this.gamePlay.currentCharacter.character.attackRange,this.gamePlay.boardSize).includes(e)?(this.gamePlay.setCursor(o.default.crosshair),this.gamePlay.selectCell(e,"red")):this.gamePlay.setCursor(o.default.notallowed):(0,i.movementRadius)(this.gamePlay.currentCharacter.position,this.gamePlay.currentCharacter.character.movementRange,this.gamePlay.boardSize).includes(e)?(this.gamePlay.setCursor(o.default.pointer),this.gamePlay.selectCell(e,"green")):this.gamePlay.setCursor(o.default.notallowed))},e.prototype.onCellLeave=function(e){var t,r;this.gamePlay.hideCellTooltip(e),e!==(null===(r=null===(t=this.gamePlay)||void 0===t?void 0:t.currentCharacter)||void 0===r?void 0:r.position)&&this.gamePlay.deselectCell(e)},e.prototype.attackEnemy=function(){var e=this,t=this.allies(),r=this.enemies(),n=null==t?void 0:t.reduce((function(t,n){var a=null==r?void 0:r.filter((function(t){return(0,i.attackRadius)(t.position,t.character.attackRange,e.gamePlay.boardSize).includes(n.position)}));if(null==a?void 0:a.length){var o=[n,a];t.push(o)}return t}),[]);if(null==n?void 0:n.length){var a=(0,s.randomElementFromArray)(n),o=a[0],l=a[1],c=(0,s.randomElementFromArray)(l),u=(0,s.dealDamage)(c.character,o.character);o.character.health-=u,this.gamePlay.showDamage(o.position,"".concat(u)).then((function(){var t;e.deathCharacter(o.character),e.gamePlay.redrawPositions(e.positionedCharacters),(null===(t=e.allies())||void 0===t?void 0:t.length)||e.gamePlay.clearEvents()}))}else if(r){var h=(0,s.randomElementFromArray)(r),d=(0,i.movementRadius)(h.position,h.character.movementRange,this.gamePlay.boardSize),f=this.positionedCharacters.map((function(e){return e.position})),p=d.filter((function(e){return!f.includes(e)}));h.position=(0,s.randomElementFromArray)(p)}},e.prototype.deathCharacter=function(e){e.health<=0&&(this.positionedCharacters=this.positionedCharacters.filter((function(t){return t.character!==e})))},e.prototype.allies=function(){var e=this;return this.positionedCharacters.filter((function(t){var r;return null===(r=e.userTeam)||void 0===r?void 0:r.has(t.character)}))},e.prototype.enemies=function(){var e=this;return this.positionedCharacters.filter((function(t){var r;return!(null===(r=e.userTeam)||void 0===r?void 0:r.has(t.character))}))},e}();t.default=h},58:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var n=r(605),a=function(){function e(e){this.boardSize=8,this.cells=[],this.cellClickListeners=[],this.cellEnterListeners=[],this.cellLeaveListeners=[],this.newGameListeners=[],this.saveGameListeners=[],this.loadGameListeners=[],this.container=e}return e.prototype.drawUi=function(e){var t=this;this.container.innerHTML='\n\t\t\t<div class="controls">\n\t\t\t\t<button data-id="action-restart" class="btn">New Game</button>\n\t\t\t\t<button data-id="action-save" class="btn">Save Game</button>\n\t\t\t\t<button data-id="action-load" class="btn">Load Game</button>\n\t\t\t</div>\n\t\t\t<div class="board-container">\n\t\t\t\t<div data-id="board" class="board"></div>\n\t\t\t</div>\n\t\t',this.newGameEl=this.container.querySelector("[data-id=action-restart]"),this.saveGameEl=this.container.querySelector("[data-id=action-save]"),this.loadGameEl=this.container.querySelector("[data-id=action-load]"),this.newGameEl.addEventListener("click",(function(e){return t.onNewGameClick(e)})),this.saveGameEl.addEventListener("click",(function(e){return t.onSaveGameClick(e)})),this.loadGameEl.addEventListener("click",(function(e){return t.onLoadGameClick(e)}));var r=this.container.querySelector("[data-id=board]");this.boardEl=r,this.boardEl.classList.add(e),this.cells.length=0;for(var a=0;a<Math.pow(this.boardSize,2);a+=1){var i=document.createElement("div");i.classList.add("cell","map-tile","map-tile-".concat((0,n.calcTileType)(a,this.boardSize))),i.addEventListener("mouseenter",(function(e){return t.onCellEnter(e)})),i.addEventListener("mouseleave",(function(e){return t.onCellLeave(e)})),i.addEventListener("click",(function(e){return t.onCellClick(e)})),this.boardEl.appendChild(i),this.cells.push(i)}},e.prototype.redrawPositions=function(e){for(var t=0,r=this.cells;t<r.length;t++)r[t].innerHTML="";for(var a=0,i=e;a<i.length;a++){var o=i[a],s=this.cells[o.position],l=document.createElement("div");l.classList.add("character",o.character.type);var c=document.createElement("div");c.classList.add("health-level");var u=document.createElement("div");u.classList.add("health-level-indicator","health-level-indicator-".concat((0,n.calcHealthLevel)(o.character.health))),u.style.width="".concat(o.character.health,"%"),c.appendChild(u),l.appendChild(c),s.appendChild(l)}},e.prototype.addCellEnterListener=function(e){this.cellEnterListeners.push(e)},e.prototype.addCellLeaveListener=function(e){this.cellLeaveListeners.push(e)},e.prototype.addCellClickListener=function(e){this.cellClickListeners.push(e)},e.prototype.addNewGameListener=function(e){this.newGameListeners.push(e)},e.prototype.addSaveGameListener=function(e){this.saveGameListeners.push(e)},e.prototype.addLoadGameListener=function(e){this.loadGameListeners.push(e)},e.prototype.onCellEnter=function(e){e.preventDefault();var t=this.cells.indexOf(e.currentTarget);this.cellEnterListeners.forEach((function(e){return e.call(null,t)}))},e.prototype.onCellLeave=function(e){e.preventDefault();var t=this.cells.indexOf(e.currentTarget);this.cellLeaveListeners.forEach((function(e){return e.call(null,t)}))},e.prototype.onCellClick=function(e){var t=this.cells.indexOf(e.currentTarget);this.cellClickListeners.forEach((function(e){return e.call(null,t)}))},e.prototype.onNewGameClick=function(e){e.preventDefault(),this.newGameListeners.forEach((function(e){return e.call(null)}))},e.prototype.onSaveGameClick=function(e){e.preventDefault(),this.saveGameListeners.forEach((function(e){return e.call(null)}))},e.prototype.onLoadGameClick=function(e){e.preventDefault(),this.loadGameListeners.forEach((function(e){return e.call(null)}))},e.showError=function(e){alert(e)},e.showMessage=function(e){alert(e)},e.prototype.selectCell=function(e,t){void 0===t&&(t="yellow"),this.deselectCell(e),this.cells[e].classList.add("selected","selected-".concat(t))},e.prototype.deselectCell=function(e){var t,r=this.cells[e];(t=r.classList).remove.apply(t,Array.from(r.classList).filter((function(e){return e.startsWith("selected")})))},e.prototype.showCellTooltip=function(e,t){this.cells[t].title=e},e.prototype.hideCellTooltip=function(e){this.cells[e].title=""},e.prototype.showDamage=function(e,t){var r=this;return new Promise((function(n){var a=r.cells[e],i=document.createElement("span");i.textContent=t,i.classList.add("damage"),a.appendChild(i),i.addEventListener("animationend",(function(){a.removeChild(i),n()}))}))},e.prototype.setCursor=function(e){this.boardEl&&(this.boardEl.style.cursor=e)},e.prototype.clearEvents=function(){this.cells.forEach((function(e){var t=e.cloneNode(!0);e.replaceWith(t)}))},e}();t.default=a},982:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.from=function(e){var t=e.characters;return{theme:e.theme,characters:t,userTeam:e.userTeam}},e}();t.default=r},370:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(58)),i=r(605),o=function(){function e(e){this.storage=e}return e.prototype.save=function(e){this.storage.setItem("state",JSON.stringify(e))},e.prototype.load=function(){var e;try{var t=JSON.parse(null!==(e=this.storage.getItem("state"))&&void 0!==e?e:""),r=t.userTeam.map((function(e){return(0,i.positionedCharacterToClassType)(e)})),n=t.enemyTeam.map((function(e){return(0,i.positionedCharacterToClassType)(e)})),o=r.concat(n),s=r.map((function(e){return e.character}));return{theme:t.theme,characters:o,userTeam:s,allyTeam:r,enemyTeam:n}}catch(e){return void a.default.showError("У Вас нет сохранений")}},e}();t.default=o},212:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,t){this.character=e,this.position=t}},918:function(e,t){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e){this._characters=e}return Object.defineProperty(e.prototype,"characters",{get:function(){return this._characters},enumerable:!1,configurable:!0}),e.prototype.has=function(e){return this._characters.includes(e)},e}();t.default=r},866:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(58)),i=n(r(241)),o=n(r(370)),s=document.getElementById("game-container");if(s){var l=new a.default(s),c=new o.default(localStorage);new i.default(l,c).init()}},164:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="bowman");var n=e.call(this,t,r)||this;return n.attack=25,n.defence=25,n.attackRange=2,n.movementRange=2,n}return a(t,e),t}(i(r(905)).default);t.default=o},418:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="magician");var n=e.call(this,t,r)||this;return n.attack=10,n.defence=40,n.attackRange=4,n.movementRange=1,n}return a(t,e),t}(i(r(905)).default);t.default=o},52:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="swordsman");var n=e.call(this,t,r)||this;return n.attack=40,n.defence=10,n.attackRange=1,n.movementRange=4,n}return a(t,e),t}(i(r(905)).default);t.default=o},590:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="daemon");var n=e.call(this,t,r)||this;return n.attack=10,n.defence=10,n.attackRange=4,n.movementRange=1,n}return a(t,e),t}(i(r(905)).default);t.default=o},732:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="undead");var n=e.call(this,t,r)||this;return n.attack=40,n.defence=10,n.attackRange=1,n.movementRange=4,n}return a(t,e),t}(i(r(905)).default);t.default=o},127:function(e,t,r){var n,a=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r="vampire");var n=e.call(this,t,r)||this;return n.attack=25,n.defence=25,n.attackRange=2,n.movementRange=2,n}return a(t,e),t}(i(r(905)).default);t.default=o},591:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default={auto:"auto",pointer:"pointer",crosshair:"crosshair",notallowed:"not-allowed"}},460:function(e,t,r){var n=this&&this.__generator||function(e,t){var r,n,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(a=2&i[0]?n.return:i[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,i[1])).done)return a;switch(n=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,n=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==i[0]&&2!==i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=t.call(e,o)}catch(e){i=[6,e],n=0}finally{r=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.generatePositionedAllies=t.generatePositionedEnemies=t.movementRadius=t.attackRadius=t.randomPosition=t.range=t.generateTeam=t.characterGenerator=void 0;var i=a(r(918)),o=a(r(212)),s=a(r(164));function l(e,t){var r,a;return n(this,(function(n){switch(n.label){case 0:return r=Math.ceil(Math.random()*t),a=Math.floor(Math.random()*e.length),[4,new e[a](r)];case 1:return n.sent(),[3,0];case 2:return[2]}}))}function c(e,t,r){for(var n=l(e,t),a=[],o=0;o<r;o++){var s=n.next().value;a.push(s)}return new i.default(a)}function u(e,t,r){void 0===r&&(r=1);for(var n=[],a=e;a<t;a+=r)n.push(a);return n}function h(e,t){for(var r=[],n=0;n<t;n++){var a=Math.floor(Math.random()*e.length);r.push(e.splice(a,1))}return r.flat()}t.characterGenerator=l,t.generateTeam=c,t.range=u,t.randomPosition=h,t.attackRadius=function(e,t,r){for(var n=[],a=u(e-r*t,e+r*t+1,r).filter((function(e){return e>=0&&e<r*r})).values(),i=a.next().value,o=0;o<r;o++){var s=u(r*o,r*(o+1));s.includes(i)&&(n.push(s.filter((function(e){return e<=i+t&&e>=i-t}))),i=a.next().value)}return n.flat()},t.movementRadius=function(e,t,r){for(var n=[],a=u(e-r*t,e+r*t+1,r).filter((function(e){return e>=0&&e<r*r})),i=a.indexOf(e),o=a.slice(0,i).reverse(),s=a.slice(i),l=0;l<t;l++)for(var c=function(e){var t=u(r*e,r*(e+1));if(t.includes(o[l])){var a=u(o[l]-(l+1),o[l]+(l+2),l+1);n.push(a.filter((function(e){return t.includes(e)})))}if(t.includes(s[l+1])){var i=u(s[l+1]-(l+1),s[l+1]+(l+2),l+1);n.push(i.filter((function(e){return t.includes(e)})))}},h=0;h<r;h++)c(h);var d=function(e){var a=u(r*e,r*(e+1));if(a.includes(s[0])){var i=u(s[0]-t,s[0]+t+1);n.push(i.filter((function(e){return a.includes(e)})))}};for(h=0;h<r;h++)d(h);return n.flat()},t.generatePositionedEnemies=function(e){var t=c([s.default],4,3),r=h(u(e-2,e*e-e,8).concat(u(e-1,e*e-e,8)),3);return t.characters.map((function(e,t){return new o.default(e,r[t])}))},t.generatePositionedAllies=function(e){var t=c([s.default],4,3),r=h(u(0,e*e-e,8).concat(u(1,e*e-e+1,8)),3);return t.characters.map((function(e,t){return new o.default(e,r[t])}))}},992:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(r(782)),i=function(){function e(e){this.values=a.default,this.currentTheme=e,this.index=this.values.indexOf(e)}return e.prototype.next=function(){return++this.index,this.index===this.values.length&&(this.index=0),this.currentTheme=this.values[this.index],this.currentTheme},e}();t.default=i},782:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=["prairie","desert","arctic","mountain"]},605:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.positionedCharacterToClassType=t.characterToClassType=t.randomElementFromArray=t.dealDamage=t.calcHealthLevel=t.calcTileType=void 0;var a=r(460),i=n(r(212)),o=n(r(164)),s=n(r(418)),l=n(r(52)),c=n(r(590)),u=n(r(732)),h=n(r(127));function d(e){var t=[o.default,s.default,l.default,c.default,u.default,h.default],r=t.findIndex((function(t){return t.name.toLowerCase()===e.type})),n=new t[r](e.level);return n.level=e.level,n.health=e.health,n.attack=e.attack,n.defence=e.defence,n}t.calcTileType=function(e,t){switch(!0){case 0===e:return"top-left";case e===t-1:return"top-right";case e===Math.pow(t,2)-t:return"bottom-left";case e===Math.pow(t,2)-1:return"bottom-right";case(0,a.range)(1,t-1).includes(e):return"top";case(0,a.range)(Math.pow(t,2)-t+1,Math.pow(t,2)-1).includes(e):return"bottom";case(0,a.range)(t,Math.pow(t,2)-t,t).includes(e):return"left";case(0,a.range)(2*t-1,Math.pow(t,2)-1,t).includes(e):return"right";default:return"center"}},t.calcHealthLevel=function(e){return e<15?"critical":e<50?"normal":"high"},t.dealDamage=function(e,t){return Math.max(e.attack-t.defence,.1*e.attack)},t.randomElementFromArray=function(e){return e[Math.floor(Math.random()*e.length)]},t.characterToClassType=d,t.positionedCharacterToClassType=function(e){var t=d(e.character);return new i.default(t,e.position)}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r(866)}();