const nav = document.querySelector('nav');
const detail = document.querySelector('#detail');
let pups;


const fetchPuppies = async()=> {
  const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2307-ftb-et-web-ft/players');
  const json = await response.json();
  pups = json.data;
  render();
};

const render = ()=>{
    const hash = window.location.hash.slice(1)*1;
    const html = pups.players.map ( players => {
      return `
        <a href='#${players.id !== hash ? players.id : ''}' class = '${players.id === hash ? 'selected':''}'>
        ${players.name} 
        </a>
      `;
    }).join('');
    nav.innerHTML = html; 
 
    const puppy = pups.players.find( puppy =>{
        return puppy.id === hash;
    });
let detailHtml = 'CLICK ON A NAME TO LEARN MORE ABOUT THE PLAYER';
    if(puppy){
        detailHtml = `<div style='background-image: url(${puppy.imageURL})'>
         ${puppy.breed} </div>`;
    }
    
    detail.innerHTML = detailHtml; 
};

window.addEventListener('hashchange', ()=>{
   render();
});

fetchPuppies(); 
