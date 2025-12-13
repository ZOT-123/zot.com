document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body;
  const loader=document.getElementById('loader');
  // 当动画结束或超时后移除 loader
  const finish = ()=>{
    if(body.classList.contains('loaded')) return;
    body.classList.add('loaded');
    if(!loader) return;
    loader.setAttribute('aria-hidden','true');
    // 在过渡结束时移除节点，兼顾 transitionend 与超时回退
    const remove = ()=>{
      if(loader && loader.parentNode) loader.parentNode.removeChild(loader);
    };
    loader.addEventListener('transitionend', ()=> remove(), {once:true});
    setTimeout(remove, 1400);
  };

  // 备用超时，防止被卡住
  const maxWait = 3000;
  const t = setTimeout(finish, maxWait);

  // 允许用户点击跳过
  loader.addEventListener('click',()=>{ clearTimeout(t); finish(); });

  // 当 hi 文本的动画结束，触发完成（更自然）
  const hi = loader.querySelector('.hi');
  if(hi){
    hi.addEventListener('animationend',()=>{ clearTimeout(t); setTimeout(finish,700); });
  } else {
    // fallback
    setTimeout(()=>{ clearTimeout(t); finish(); },1200);
  }
});
