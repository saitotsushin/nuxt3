import{_ as d}from"./nuxt-link.76077d35.js";import{_ as c,o as n,n as r,w as i,a as e,t as a,c as m,b as l,F as u}from"./entry.61d1d86b.js";const g={props:["imagePath","cardName","imageIcon","productId"],methods:{}},h={class:"card"},p={class:"cardHeader"},f={class:"cardIcon"},x=["src"],I=["src"];function N(o,s,t,$,y,C){const _=d;return n(),r(_,{to:{path:`product/${t.productId}`}},{default:i(()=>[e("div",h,[e("div",p,[e("div",f,[e("img",{src:t.imageIcon,alt:"Image"},null,8,x)]),e("p",null,a(t.cardName)+" "+a(t.productId),1)]),e("img",{src:t.imagePath,alt:"Image"},null,8,I)])]),_:1},8,["to"])}const v=c(g,[["render",N]]),P={},k=e("h1",null,"This is index Page",-1);function B(o,s){const t=v;return n(),m(u,null,[k,l(t,{imagePath:"/images/thumb/html5game.png",cardName:"HTML5game",imageIcon:"/images/icons/html5.png",productId:1},null,8,["imagePath","imageIcon"])],64)}const F=c(P,[["render",B]]);export{F as default};
