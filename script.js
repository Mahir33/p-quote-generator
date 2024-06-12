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

async function getQuote() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    quote.innerHTML = randomQuote.text;
    author.innerHTML = randomQuote.author;
    twitterButton.href = `https://twitter.com/intent/tweet?text=${randomQuote.text} - ${randomQuote.author}`;
  } catch (error) {
    alert(error);
  }
}

newQuoteButton.addEventListener("click", getQuote);

getQuote();
