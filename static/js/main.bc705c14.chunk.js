(this["webpackJsonpcorona-stats"]=this["webpackJsonpcorona-stats"]||[]).push([[0],{134:function(e,t,a){e.exports=a(273)},139:function(e,t,a){},140:function(e,t,a){},142:function(e,t,a){},143:function(e,t,a){},144:function(e,t,a){},273:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(6),c=a.n(o),i=(a(139),a(140),a(130)),u=a(22),l=a(7),s=(a(85),a(34)),m=a(2),h=a(60),p=function(e){if(!e.ok){var t=e.headers.get("content-type");return-1!==(null===t||void 0===t?void 0:t.indexOf("application/json"))?e.json().then((function(t){return Promise.reject(new Error(e.statusText))}),(function(){return Promise.reject(new Error(e.statusText))})):Promise.reject(new Error(e.statusText))}return Promise.resolve(e)},d=function(e){return p(e).then((function(e){return e.json()}))},f=function(e){return p(e).then((function(e){return e.text()})).then((function(e){return e.split("\n").map((function(e){return e.split(",")}))}))},v=function(e){return e.reduce((function(e,t){return e+t}),0)},b=a(15),E=a.n(b),y=a(37),g="https://pkgstore.datahub.io/JohnSnowLabs/population-figures-by-country/population-figures-by-country-csv_json/data/2159fad77778c3b584f3d396593e0af6/population-figures-by-country-csv_json.json",w={Brunei:"Brunei Darussalam",Bahamas:"Bahamas, The",Congo:"Congo, Rep.","Cape Verde":"Cabo Verde","Democratic Republic of Congo":"Congo, Dem. Rep.",Egypt:"Egypt, Arab Rep.",Eritrea:"Eritrea","Faeroe Islands":"Faroe Islands",Gambia:"Gambia, The",Iran:"Iran, Islamic Rep.",Kyrgyzstan:"Kyrgyz Republic",Laos:"Lao PDR",Macedonia:"Macedonia, FYR",Russia:"Russian Federation","Saint Kitts and Nevis":"St. Kitts and Nevis","Saint Lucia":"St. Lucia","Saint Vincent and the Grenadines":"St. Vincent and the Grenadines",Slovakia:"Slovak Republic","South Korea":"Korea, Dem. People\u2019s Rep.",Syria:"Syrian Arab Republic",Timor:"Timor-Leste",Venezuela:"Venezuela, RB","United States Virgin Islands":"Virgin Islands (U.S.)"},j=function(e){return e.map((function(e){var t=Object.keys(e).slice(-1)[0];return{country:e.Country,population:e[t]}}))};function C(){return(C=Object(y.a)(E.a.mark((function e(){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(g).then(d).then(j));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var N="https://covid.ourworldindata.org/data/ecdc/new_deaths.csv",O=function(e){var t,a=Object(h.a)(e),n=a[0],r=a.slice(1),o=Object(h.a)(n).slice(1),c=r.filter((function(e){return e.length>1})),i=(t=c)[0].map((function(e,a){return t.map((function(e){return e[a]}))})),u=Object(h.a)(i),l=u[0],s=u.slice(1);return o.map((function(e,t){var a=s[t].map((function(e){return parseInt(e||"0")}));return{name:e,values:l.map((function(e,t){return{date:e,value:a[t]}})),maxValue:Math.max.apply(Math,Object(m.a)(a)),total:v(a)}})).filter((function(e){return e.maxValue>0}))},S=function(e,t){var a=e.map((function(e){var a=function(e,t){var a=function(e){return t.find((function(t){return t.country===e}))},n=a(e);if(n)return n;var r=w[e];return r?a(r):void 0}(e.name,t);return Object(s.a)({},e,{population:null===a||void 0===a?void 0:a.population,totalPerCapita:(null===a||void 0===a?void 0:a.population)?e.total/a.population:0})}));return function(e,t){var a=e.filter((function(e){return!e.population}));a.length>0&&console.warn("No population found for the following countries:",a.map((function(e){return e.name})))}(a),a},x=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)([]),c=Object(l.a)(o,2),i=c[0],u=c[1];return Object(n.useEffect)((function(){(function(){return C.apply(this,arguments)})().then(r)}),[]),Object(n.useEffect)((function(){fetch(N).then(f).then(O).then(u)}),[]),Object(n.useMemo)((function(){return S(i,a)}),[a,i])},T=(a(142),a(143),function(e){var t=e.timeline,a=e.barWidth,n=void 0===a?3:a,o=e.prefixText,c=Math.max.apply(Math,Object(m.a)(t.map((function(e){return e.value})))),i=t[t.length-1],u=t.length*(n+1);return r.a.createElement("div",{className:"minigraph"},r.a.createElement("div",{className:"bars",style:{width:u}},t.map((function(e){var t=e.date,a=e.value;return r.a.createElement("div",{key:t,className:"date",title:"".concat(t,": ").concat(a),style:{marginRight:1}},r.a.createElement("div",{className:"bar",style:{height:c?a/c*40:0}}))}))),r.a.createElement("div",{className:"legend"},o,r.a.createElement("span",{className:"value"},i.value)))}),D=(a(144),function(e){var t=e.width,a=e.progress;return r.a.createElement("div",{className:"progressbar",style:{width:t}},r.a.createElement("div",{className:"progress",style:{width:"".concat(100*a,"%")}}))}),k=function(e){var t,a=e.country;return r.a.createElement("div",{className:"country-hover"},r.a.createElement("span",{className:"foo"},"Population: ",(t=a.population)?new Intl.NumberFormat("en-GB",{notation:"compact",compactDisplay:"short"}).format(t):"unknown"))},P=function(e){var t=e.country,a=e.maxPerCapita,o=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useCallback)((function(){return r(!0)}),[]),c=Object(n.useCallback)((function(){return r(!1)}),[]),i=Object(n.useRef)();return[Object(n.useCallback)((function(e){i.current&&(i.current.removeEventListener("mouseover",o),i.current.removeEventListener("mouseout",c)),e&&(e.addEventListener("mouseover",o),e.addEventListener("mouseout",c))}),[o,c]),a]}(),c=Object(l.a)(o,2),i=c[0],u=c[1],m=Object(n.useContext)(G),h=Object(n.useMemo)((function(){return t.values.reduce((function(e,t,a){return 0===a?e.push(t):e.push(Object(s.a)({},t,{value:e[a-1].value+t.value})),e}),[])}),[t]);return r.a.createElement("tr",{ref:i,title:"Total: ".concat(t.total,", per million: ").concat(Math.round(1e6*(t.totalPerCapita||0)))},r.a.createElement("td",{className:"country-name"},t.name,u&&r.a.createElement(k,{country:t})),r.a.createElement("td",{className:"deaths-per-capita prl"},t.population?r.a.createElement("div",{className:"deaths-per-capita-bar"},r.a.createElement(D,{width:100,progress:t.totalPerCapita/a}),r.a.createElement("div",{className:"progressbar-overlay"},Math.round(1e6*t.totalPerCapita))):r.a.createElement("div",{className:"info-small"},"No population data")),m.showDeathsTotal&&r.a.createElement("td",null,r.a.createElement(T,{timeline:h.slice(-40),barWidth:3})),m.showDeathsNew&&r.a.createElement("td",null,r.a.createElement(T,{timeline:t.values.slice(-40),barWidth:3,prefixText:"+"})))},R=function(e){var t=e.countryData,a=Math.max.apply(Math,Object(m.a)(t.map((function(e){return e.totalPerCapita||0})))),o=Object(n.useContext)(G);return r.a.createElement("table",{className:"countries mtl"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null,"Total Deaths"),o.showDeathsTotal&&r.a.createElement("th",{className:"align-right"},"Deaths"),o.showDeathsNew&&r.a.createElement("th",{className:"align-right"},"Deaths")),r.a.createElement("tr",null,r.a.createElement("th",null,"Location"),r.a.createElement("th",null,"per mill capita"),o.showDeathsTotal&&r.a.createElement("th",{className:"align-right"},"total"),o.showDeathsNew&&r.a.createElement("th",{className:"align-right"},"per day"))),r.a.createElement("tbody",null,t.sort((function(e,t){return t.totalPerCapita-e.totalPerCapita})).filter((function(e){return!(o.hideTinyCountries&&(e.population||0)<2e5)})).map((function(e){return r.a.createElement(P,{key:e.name,country:e,maxPerCapita:a})}))))},I=a(277),L=a(276),M=a(4),V=a(275),B=a(274),K={hideTinyCountries:!1,showDeathsNew:!0,showDeathsTotal:!1},F=function(e){var t=e.updateSearchProps,a=Object(n.useContext)(G),o=function(e){return function(n){return t(Object(s.a)({},a,{},Object(M.a)({},e,n)))}};return r.a.createElement(V.a,null,r.a.createElement(V.a.Item,{label:"Hide tiny countries"},r.a.createElement(B.a,{checked:a.hideTinyCountries,onChange:o("hideTinyCountries")})),r.a.createElement(V.a.Item,{label:"Show new deaths per day"},r.a.createElement(B.a,{checked:a.showDeathsNew,onChange:o("showDeathsNew")})),r.a.createElement(V.a.Item,{label:"Show total deaths per day"},r.a.createElement(B.a,{checked:a.showDeathsTotal,onChange:o("showDeathsTotal")})))},G=r.a.createContext(K),J=function(){var e=x(),t=Object(n.useState)(!1),a=Object(l.a)(t,2),o=a[0],c=a[1],i=Object(n.useState)(K),u=Object(l.a)(i,2),s=u[0],m=u[1];return r.a.createElement(G.Provider,{value:s},r.a.createElement("div",{className:"per-country-page mll"},r.a.createElement("h1",null,"Coronavirus - deaths per capita"),r.a.createElement("p",{className:"info-text"},"The big countries tend to get all the coronavirus media. But there are many small countries that are hit much harder than the big. This graph shows coronavirus cases per country ordered by per million capita."),r.a.createElement("p",{className:"info-small mbxs"},"Using data from"," ",r.a.createElement("a",{href:"https://ourworldindata.org/coronavirus-source-data"},"ourworldindata.org/coronavirus-source-data")," ","and"," ",r.a.createElement("a",{href:"https://datahub.io/JohnSnowLabs/population-figures-by-country"},"datahub.io/JohnSnowLabs"),".",r.a.createElement("br",null),"New data from the day before are present every day at 13:00 CET, according to"," ",r.a.createElement("a",{href:"https://ourworldindata.org/coronavirus"},"ourworldindata.org/coronavirus")),r.a.createElement(I.a,{type:"primary",onClick:function(){return c(!0)}},"Configure"),r.a.createElement(L.a,{title:"Search details",placement:"left",closable:!0,onClose:function(){return c(!1)},visible:o,width:300},r.a.createElement(F,{updateSearchProps:m})),r.a.createElement(R,{countryData:e})))},W=function(){return r.a.createElement(i.a,null,r.a.createElement(u.c,null,r.a.createElement(u.a,{path:"/"},r.a.createElement(J,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(W,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,t,a){}},[[134,1,2]]]);
//# sourceMappingURL=main.bc705c14.chunk.js.map