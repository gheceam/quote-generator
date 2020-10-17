// Get Quote From API
async function getQuote(){
    const proxyURL = 'https://afternoon-cliffs-29592.herokuapp.com/'
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        // console.log(data);
        updatePageQuote(data.quoteText, data.quoteAuthor);
    }catch (error){
        console.log('whoops, no quote', error);
    }
    
}

const updatePageQuote = (quoteText, quoteAuthor) =>{
    // console.log(quoteText,quoteAuthor);
    const author = quoteAuthor;
    const quote = quoteText;

    document.querySelector("#quote").innerHTML = quoteText;
    document.querySelector("#author").innerHTML = quoteAuthor;

}

// Initialize variables
const button = document.querySelector("#new-quote");
const twitterButton = document.querySelector("twitter-button");

// initialize callback function to button
button.addEventListener("click",getQuote);
// On Load
getQuote();

