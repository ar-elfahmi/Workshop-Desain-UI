// URL API yang digunakan
const API_URL = 'https://motivational-spark-api.vercel.app/api/quotes/random';

// Ambil elemen-elemen dari HTML (seperti query selector di Laravel/Blade)
const btnQuote = document.getElementById('btn');
const quoteText = document.getElementById('qoute');
const quoteAuthor = document.getElementById('author');
const rawData = document.getElementById('date');

// FUNGSI 1: Fetch Data dari API (Ambil Data)
function mintaResponseApi() {
  return fetch(API_URL);
//   fetch(API_URL).then(function (response) {
//   console.log(response);
// });
}

function ubahResponseKeJson(response) {
  return response.json();
}

function ambilDataPenting(dataJson) {
  return {
    quote: dataJson.quote,
    author: dataJson.author
  };
}

function tampilkanKeHtml(dataQuote) {
  quoteText.textContent = dataQuote.quote;
  quoteAuthor.textContent = `by ${dataQuote.author}.`;
}

async function ambilDataQuote() { // ini fugsi utama saat tombol di klik
  const response = await mintaResponseApi(); // fungsi ini untuk fetch api
  const dataJson = await ubahResponseKeJson(response); // standarisasi output jason
  const dataQuote = ambilDataPenting(dataJson);
  tampilkanKeHtml(dataQuote);
}



