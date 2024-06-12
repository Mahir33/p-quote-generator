const quoteContainer = document.querySelector("#quote-container");
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const twitterButton = document.querySelector("#twitter");
const newQuoteButton = document.querySelector("#new-quote");

const URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

// function getQuote() {
//   fetch(URL)
//     .then((response) => response.json())
//     .then((data) => {
//       const randomQuote = data[Math.floor(Math.random() * data.length)];
//       console.log(randomQuote);
//       console.log(randomQuote.author);
//       quote.innerHTML = randomQuote.text;
//       author.innerHTML = randomQuote.author;
//     })
//     .catch((error) => console.log(error));
// }

// Get a new quote from API
async function getQuote() {
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

    // Check if author does exist
    if (!randomQuote.author) {
      author.innerHTML = "Unknown";
    } else {
      author.innerHTML = randomQuote.author;
    }

    twitterButton.href = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
  } catch (error) {
    alert(error);
  }
}

// Tweet quote
function tweetQuote() {
  const quoteText = quote.innerText;
  const authorText = author.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuote();
