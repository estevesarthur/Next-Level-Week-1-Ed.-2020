//document
//   .querySelector("select[name=uf]")
//   .addEventListener("change", () => { //ouve eventos de mudança dos seletores e elementos da HTML
//       console.log("mudei")
//   }) //() => {} é outro jeito de criar  function ();, ou seja função anônima
//-----------------------------------
//no teu aqui .js coloque essa funcao aquifuncao de ordenar ali é bem generica voce, //podeusar ela sempre que quiser ordenar um array de objetos
//********************************
//function ordenarPorNome(a, b){
//return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
//}
//**************ela vai receber o objeto a ordenar por nome
//fetch(url)
//.then( res => res.json() )
//.then( objects => {
//for( const object of objects.sort(ordenarPorNome)) {
// escreve no document os dados
//campo.innerHTML += <option value="${object.id}">${object.nome}</option>
//}
//})
function ordenarPorNome(a, b){
    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
}

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json()) //versão comprida ((res) => {return res.json()}), ou seja, função anonima que tem uma resposta e precisa voltar essa resposta
    .then( states => {
        for(state of states.sort(ordenarPorNome)){//for (const state of states)
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
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    
    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for(city of cities.sort(ordenarPorNome)){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
   })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de Coleta abaixo
//pegar todas as li's de uma vez 
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems =[]// arrays de itens selecionados

function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")//add ou remove uma classe com javascript. usa add ou remove ou até mesmo toggle que verifica se é add ou remove
    const itemId = event.target.dataset.id

//verificar se existem items selcioados, se sim pegar os items selcionados
//para isso criou-se a var let selectedItems
    const alreadySelected = selectedItems.findIndex(item => item === itemId)
    //abaixo a forma completa da função *(item => item === itemId)*
    //(function (item){
    //     const itemFound = item === itemId *isso faz o true e false
    //     return itemFound
    // })

//se já estuver selecionado
    if(alreadySelected >= 0){
        //tem que tirar da seleção
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId //tem que retornar false
            return itemIsDifferent    
        })
        selectedItems = filteredItems
    }else{//se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }
//atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}