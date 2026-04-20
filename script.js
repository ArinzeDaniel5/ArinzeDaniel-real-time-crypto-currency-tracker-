const cryptoContainer=document.getElementById("cryptoContainer");
const searchInput=document.getElementById("searchInput");
let coins=[];
//FETCH DATA
async function fetchCrypto(){
    const res=await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
    coins=await res.json();
    renderCoins(coins);
}
//RENDER
function renderCoins(data){
    cryptoContainer.innerHTML="";
    data.forEach(coin=>{
        const div=document.createElement("div");
        div.classList.add("crypto-card");
        div.innerHTML=`
        <div>
            <strong>${coin.name}</strong>(${coin.symbol.toUpperCase()})
            </div>
            <div>$${coin.current_price}</div>
        `
        ;
        cryptoContainer.appendChild(div);
    });
}
//SEARCH 
searchInput.addEventListener("input",()=>{
    const query=searchInput.value.toLowerCase();
    const filtered=coins.filter(coin=>
        coin.name.toLowerCase().includes(query)
        );
        renderCoins(filtered);
});
//AUTO REFRESH(REAL-TIME FEEL)
setInterval(fetchCrypto, 10000);//every 10 seconds 
fetchCrypto()