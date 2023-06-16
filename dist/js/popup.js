(()=>{"use strict";var e,n={778:(e,n,r)=>{r.d(n,{Z:()=>c});var t=r(81),o=r.n(t),a=r(645),i=r.n(a)()(o());i.push([e.id,"body {\r\n    background-color: #ffffff;\r\n    min-width: 500px;\r\n    min-height: 500px;\r\n    max-width: 500px;\r\n    margin: 0;\r\n    padding: 0;\r\n    font-family: Calibri, serif;\r\n    font-size: 18px;\r\n    color: #1e2b3c;\r\n}\r\n\r\n.pink {\r\n    color: #95227d;\r\n}\r\n\r\n.bold {\r\n    font-weight: bold;\r\n}\r\n\r\nbutton {\r\n    background-color: #7d81db;\r\n    width: 484px;\r\n    color: #f5f5f5;\r\n    padding: 12px;\r\n    margin-top: 8px;\r\n    border: solid 1px #7d81db;\r\n    border-radius: 8px;\r\n}\r\n\r\n.bottom {\r\n    margin: 0;\r\n    background-color: #f4f5f6;\r\n    position: absolute;\r\n    bottom: 0;\r\n    width: 100%;\r\n    padding: 8px;\r\n}\r\n\r\n.content {\r\n    padding: 16px;\r\n    overflow-wrap: break-word;\r\n}",""]);const c=i},602:(e,n,r)=>{var t=r(294),o=r(745),a=r(379),i=r.n(a),c=r(795),l=r.n(c),s=r(569),d=r.n(s),u=r(565),m=r.n(u),f=r(216),p=r.n(f),b=r(589),g=r.n(b),h=r(778),v={};v.styleTagTransform=g(),v.setAttributes=m(),v.insert=d().bind(null,"head"),v.domAPI=l(),v.insertStyleElement=p(),i()(h.Z,v),h.Z&&h.Z.locals&&h.Z.locals,(0,o.s)(document.getElementById("root")).render(t.createElement(t.StrictMode,null,t.createElement((()=>{const[e,n]=(0,t.useState)(0),[r,o]=(0,t.useState)();return(0,t.useEffect)((()=>{chrome.action.setBadgeText({text:e.toString()})}),[e]),(0,t.useEffect)((()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){o(e[0].url)}))}),[]),t.createElement(t.Fragment,null,t.createElement("div",{className:"content"},t.createElement("p",null,"Current URL: ",r),t.createElement("p",null,"Current Time: ",t.createElement("p",{className:"pink bold"}," ",(new Date).toLocaleTimeString()," ")," ")),t.createElement("div",{className:"bottom"},t.createElement("button",{onClick:()=>n(e+1)},"count up"),t.createElement("button",{onClick:()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){const n=e[0];n.id&&chrome.tabs.sendMessage(n.id,{color:"#555555"},(e=>{console.log("result message:",e)}))}))}},"change background"),t.createElement("button",{onClick:()=>{chrome.tabs.query({active:!0,currentWindow:!0},(function(e){const n=e[0];n.id&&chrome.tabs.sendMessage(n.id,{action:"highlightButtons",color:"#FF0000"},(e=>{console.log("result message:",e)}))}))}},"Ny funksjon")))}),null)))}},r={};function t(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={id:e,exports:{}};return n[e](a,a.exports,t),a.exports}t.m=n,e=[],t.O=(n,r,o,a)=>{if(!r){var i=1/0;for(d=0;d<e.length;d++){for(var[r,o,a]=e[d],c=!0,l=0;l<r.length;l++)(!1&a||i>=a)&&Object.keys(t.O).every((e=>t.O[e](r[l])))?r.splice(l--,1):(c=!1,a<i&&(i=a));if(c){e.splice(d--,1);var s=o();void 0!==s&&(n=s)}}return n}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[r,o,a]},t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e={42:0};t.O.j=n=>0===e[n];var n=(n,r)=>{var o,a,[i,c,l]=r,s=0;if(i.some((n=>0!==e[n]))){for(o in c)t.o(c,o)&&(t.m[o]=c[o]);if(l)var d=l(t)}for(n&&n(r);s<i.length;s++)a=i[s],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(d)},r=self.webpackChunkchrome_extension_typescript_starter=self.webpackChunkchrome_extension_typescript_starter||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))})(),t.nc=void 0;var o=t.O(void 0,[736],(()=>t(602)));o=t.O(o)})();