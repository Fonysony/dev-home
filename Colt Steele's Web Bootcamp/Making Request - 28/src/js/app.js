// XMLHttpRequest
const req = new XMLHttpRequest();

req.onload = function() {
    console.log(`XMLRequest:`, req);
    const data = JSON.parse(req.responseText);
    console.log(`XMLRequest.responseText:`, data);
    console.log(data.ticker.price);
};
req.onerror = function() {
    console.log(this);
}
req.open("GET", "https://api.cryptonator.com/api/ticker/btc-usd");
req.send();


// FETCH!!!
fetch('https://api.cryptonator.com/api/ticker/btc-usd')
    .then(res => {
        console.log(`fetch res:`, res);
        return res.json();
    })
    .then(data => {
        console.log(`.then after res.json():`, data);
        console.log(`Bitcoin data: ${data.ticker.price}`);
    })
    .catch(err => {
        console.log(err);
    })

    
// ASYNC FUNCTION
const fetchBitcoinPrice = async() => {
    try {
        const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
        console.log(`async function:`, res);
        const data = await res.json();
        console.log(`async function res.json():`, data);
        console.log(`Bitcoin data: ${data.ticker.price}`);
    } catch(err) {
        console.log(err);
    }
}

fetchBitcoinPrice();
console.log('STILL RUNNING');

const dataCollect = {
    promiseData: async function(url) {
        try{
            const res = await fetch(url);
            console.log(res);
            const data = await res.json();
            this.urlData = data;
        } catch(err) {
            console.log(err);
        } 
    },
    urlData: undefined,
}

  const addNewJoke = async () => {
      const data = await getDadJoke();
      console.log(data);
  }

  const getDadJoke = async() => {
      const config = {
        headers: {
            Accept: 'application/json'
        }
      }
      const res = await fetch('https://icanhazdadjoke.com/', config);
      const data = await res.json();
      return data;
  }