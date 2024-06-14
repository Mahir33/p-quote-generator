const quoteContainer = document.querySelector("#quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

const URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

let retryCounter = 0;

async function getRandomQuoteFromAPI() {
  showLoadSpinnerBeforeQuoteIsLoaded();
  // Fetch quote from URL
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];

    // Check the length of the quote and apply or remove class
    if (randomQuote.text.length > 50) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    quote.innerHTML = randomQuote.text;

    // Does the author exist?
    if (!randomQuote.author) {
      author.innerHTML = "Unknown";
    } else {
      author.innerHTML = randomQuote.author;
    }

    // Set the twitter button to link to the quote
    twitterButton.href = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
    hideLoadSpinnerAfterQuoteWasLoaded();
    throw new Error("Ooops, someting went wrong!");
  } catch (error) {
    if (retryCounter < 3) {
      retryCounter++;
      setTimeout(getRandomQuoteFromAPI, 5000); // Retry after 5 seconds
    } else {
      console.log("Exceeded maximum retry attempts");
    }
  }
}

// Show spinner on load
function showLoadSpinnerBeforeQuoteIsLoaded() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadSpinnerAfterQuoteWasLoaded() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Tweet the current quote
function tweetCurrentQuote() {
  const quoteText = quote.innerText;
  const authorText = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteButton.addEventListener("click", getRandomQuoteFromAPI);
twitterButton.addEventListener("click", tweetCurrentQuote);

// On Load
getRandomQuoteFromAPI();
