// assign DOM objects to variables
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// assign getQuote method to click of "New Quote" button
newQuoteBtn.addEventListener("click",getQuoteFromApi);
twitterButton.addEventListener("click",tweetQuote);


async function getQuoteFromApi(){
    // proxy server which allows me to chain url's to get quote
    const proxyURL = 'https://afternoon-cliffs-29592.herokuapp.com/'
    // actual quote api url
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        
        showLoadingSpinner();

        const response = await fetch(proxyURL + apiURL);
        // wait for the response and assign json object to "data"
        const data = await response.json();
        
        removeLoadingSpinner();

        // pass quoteText and quoteAuthor from "data" json object
        // to updatePageQuote to update the DOM
        updatePageQuote(data.quoteText, data.quoteAuthor);

    }catch (error){
        // if error give message and error at console
        console.log('whoops, no quote', error);
    }
    
}

const updatePageQuote = (quote, author) =>{
    
    // if quote is longer than 120 characters,
    // reduce size of font on quote-text by adding 'long-quote' style class,
    // otherwise remove the the 'long-quote' class from quote-text object
    if(quote.length >= 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote;
    // if there is no author for quote
    authorText.innerText = (author.length == 0) ? "Unknown" : author;

}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function showLoadingSpinner() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}

// On Load
getQuoteFromApi();

