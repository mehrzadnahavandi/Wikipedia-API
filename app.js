const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

console.log('wiki starts');


const formDom = document.querySelector(".form");
const inputDom = document.querySelector(".form-input");
const resultDom = document.querySelector(".results");

console.log(formDom, inputDom, resultDom)

formDom.addEventListener('submit', (e)=>{
    e.preventDefault();
    const value = inputDom.value;
    if(!value){
        resultDom.innerHTML = 
        '<div class="error"> please enter valid search term</div>'
        return
    }
    fetchPages(value)
})


const fetchPages = async (searchValue) =>{
    resultDom.innerHTML = "<div class= 'loading'></div>"
    try {
        const response = await fetch(`${url}${searchValue}`)
        const data = await response.json()
        // console.log(data)
        const results = data.query.search
        if(results.length < 1){
            resultDom.innerHTML = 
            '<div class="error"> No Matching Result. Please try again ... </div>';
            return;
        }
        renderResult(results)
    } catch (error) {
        resultDom.innerHTML = 
        '<div class="error"> There is an error ... </div>'
    }
}


const renderResult = (list) => {
    const cardList = list.map((item) => {
        // console.log(item)
        const {title, snippet, pageid} = item
        return `<a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
        <h4>${title}</h4>
        <p>
        ${snippet}
        </p>
      </a>`
    })
    .join('')
    resultDom.innerHTML = 
    `<div class="articles">
        ${cardList}
    </div>`
}