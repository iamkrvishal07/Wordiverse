const form = document.querySelector("form");
const res = document.querySelector(".result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const word = form.elements[0].value;
  await getWordInfo(word);
});

const getWordInfo = async (word) => {
  try {
    res.innerHTML = "Fetching Data...";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];
    res.innerHTML = `
        <h2> <strong>Word: </strong> ${data[0].word}</h2>
        <p> ${data[0].meanings[0].partOfSpeech} </p>
        <p> <strong>Meaning: </strong> ${
          definitions.definition === undefined ? "Not Found": definitions.definition}</p>
        <p> <strong>Example: </strong> ${definitions.example === undefined ? "Not Found" : definitions.example}</p>
        <p> <strong>Antonyms: </strong </p>
        `;

        if (definitions.antonyms.length === 0){
            res.innerHTML += `<span> Not Found </span>`;

        }
        else{
            for(let i=0; i<definitions.antonyms.length; i++){
                res.innerHTML+= `<li> ${definitions.antonyms[i]}</li>`;
            }
        }
    // Adding Read More Button
    res.innerHTML += `<div> <a href = ${data[0].sourceUrls} target="_blank">Read More </a> </div>` ;

    console.log(data);

  } catch (error) {
    console.error("Error fetching word info:", error);
    res.innerHTML = "<p>Word not found</p>";
  }
};
