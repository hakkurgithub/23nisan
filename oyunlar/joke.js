'use strict';

(function () {
  const API = 'https://official-joke-api.appspot.com/random_joke';
  const newJokeBtn = document.getElementById('newJoke');
  const speakBtn = document.getElementById('speakJoke');
  const setupEl = document.getElementById('setup');
  const punchEl = document.getElementById('punchline');
  const jokeCard = document.getElementById('jokeCard');

  function setLoading(isLoading) {
    newJokeBtn.disabled = isLoading;
    speakBtn.disabled = isLoading;
    jokeCard.setAttribute('aria-busy', String(isLoading));
  }

  async function fetchJoke() {
    setLoading(true);
    setupEl.innerText = 'Yükleniyor...';
    punchEl.innerText = '';
    try {
      const res = await fetch(API, {headers: {Accept: 'application/json'}});
      if (!res.ok) throw new Error('Ağ hatası: ' + res.status);
      const data = await res.json();
      // sanitize by using innerText
      setupEl.innerText = data.setup || '';
      punchEl.innerText = data.punchline || '';
    } catch (err) {
      setupEl.innerText = 'Şaka getirilemedi. Lütfen tekrar deneyin.';
      punchEl.innerText = '';
      console.error('fetchJoke error', err);
    } finally {
      setLoading(false);
    }
  }

  function speakCurrentJoke() {
    const text = (setupEl.innerText || '') + '\n' + (punchEl.innerText || '');
    if (!('speechSynthesis' in window)) {
      alert('Tarayıcınız sesli okuma desteklemiyor.');
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'tr-TR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  newJokeBtn.addEventListener('click', fetchJoke);
  speakBtn.addEventListener('click', speakCurrentJoke);

  // load initial joke
  fetchJoke();
})();
