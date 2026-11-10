const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }
const state = { coins:120, gems:3, xp:35, level:1, streak:1, answered:false };
const $ = id => document.getElementById(id);
function render(){ $('coins').textContent=state.coins; $('gems').textContent=state.gems; $('xp').textContent=state.xp; $('level').textContent=state.level; $('streak').textContent=state.streak; $('xpbar').style.width=(state.xp%100)+'%'; }
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1900);}
document.querySelectorAll('.answers button').forEach(btn=>btn.addEventListener('click',()=>{
 if(state.answered){toast('Сегодняшнее испытание уже пройдено');return;}
 const ok=btn.dataset.answer==='32';
 state.answered=true;
 document.querySelectorAll('.answers button').forEach(b=>{b.disabled=true;if(b.dataset.answer==='32')b.classList.add('correct');});
 if(ok){state.coins+=20;state.xp+=20;if(state.xp>=100){state.level++;state.xp-=100;}$('feedback').textContent='Верно! Отличная работа. Награда начислена 🎉';}
 else {btn.classList.add('wrong');$('feedback').textContent='Почти! Правильный ответ — 32. Завтра будет новый вызов.';}
 render();
}));
document.querySelectorAll('[data-page]').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.dataset.page;if(p==='home'||p==='play'){window.scrollTo({top:0,behavior:'smooth'});return;}const messages={profile:'Профиль появится в следующем обновлении.',rating:'Рейтинг игроков подключим следующим этапом.',shop:'Магазин предметов скоро откроется.',invite:'Реферальные приглашения добавим после подключения сервера.'};toast(messages[p]||'Скоро появится!');}));
$('avatar').addEventListener('click',()=>toast('Профиль будет доступен после подключения Telegram-аккаунта.'));
render();