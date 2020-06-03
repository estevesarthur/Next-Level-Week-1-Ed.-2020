//document
 //   .querySelector("select[name=uf]")
 //   .addEventListener("change", () => { //ouve eventos de mudança dos seletores e elementos da HTML
 //       console.log("mudei")
 //   }) //() => {} é outro jeito de criar  function ();, ou seja função anônima

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()) //versão comprida ((res) => {return res.json()}), ou seja, função anonima que tem uma resposta e precisa voltar essa resposta
    .then( states => {
        for(state of states){//for (const state of states)
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
   })
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSlectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        citySelect.disabled = false
   })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)