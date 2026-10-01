'use strict';
const search=document.querySelector('#search');
const buttons=Array.from(document.querySelectorAll('[data-filter]'));
const articles=Array.from(document.querySelectorAll('.card'));
let active='todos';
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function filterNews(){const query=normalize(search.value.trim());let count=0;articles.forEach(article=>{const match=(active==='todos'||article.dataset.regimes.split(' ').includes(active))&&normalize(article.textContent).includes(query);article.hidden=!match;if(match)count++;});document.querySelector('#result').textContent=count===1?'1 notícia ou orientação encontrada':count+' notícias e orientações encontradas';document.querySelector('#empty').hidden=count!==0;}
search.addEventListener('input',filterNews);
buttons.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterNews();}));
document.querySelector('#lead-link').addEventListener('click',()=>{active='todos';search.value='';buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='todos')));filterNews();document.querySelector('#simples details').open=true;});
