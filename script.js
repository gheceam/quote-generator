// Get Quote From API
async function getQuote(){
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {

    }catch (error){
        console.log('whoops, no quote', error);
    }
    
}

// On Load
getQuote();