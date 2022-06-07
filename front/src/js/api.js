let responseApi; 
let stepsWrapper = document.querySelector('.steps-wrapper')


window.addEventListener('load', function() {

    
        
    let getForm = document.querySelector('form')
    let getAllSteps = document.querySelectorAll('.step')
    let getAllButtons = document.querySelectorAll('.form-button[type="button"]')
    let getBackgroundProgressBar = document.querySelector('.progress-bar-background')
    let indexSteps = (getAllSteps.length - 1)
    let userFields = document.querySelectorAll('input[data-userForm]')
    let currentStep = 0
    let textArea = document.querySelector('textarea')


    new FormControl(getForm, getAllSteps, getAllButtons, getBackgroundProgressBar, indexSteps, userFields, currentStep,textArea)



});

async function RequestApi(){
    
    await fetch('http://localhost:4000/form', {
        method: 'get' 
    })
    .then(result => {
        result.json().then(result => {
            var { request_fields,user_fields } = result._embedded
            let fieldsJson = [[...request_fields], [...user_fields]]
            /* console.log(fieldsJson) */
            responseApi = fieldsJson
            CreateForms(request_fields)
        })
    })
    
   /*  console.log('allan') */

    
}
RequestApi()



function CreateForms(request_fields){

    CreateFormSelectsAndTextArea(request_fields)
    CreateFormUser()
}

function CreateFormUser(){
    let divStep = document.createElement("div")
    divStep.classList.add('step')
    /* divStep.setAttribute('divStep','') */


   responseApi[1].forEach((item,index)=> {
        let inputText = CreateInput([item])
        divStep.appendChild(inputText) 
        
    })
    stepsWrapper.append(divStep)
}

function CreateFormSelectsAndTextArea(request_fields){
    responseApi[0].forEach((item,index) => {


        let divStep = document.createElement("div")
        divStep.classList.add('step')
        /* divStep.setAttribute('data-setp','') */

        let title = document.createElement("h3")
        title.classList.add('title-step')
        title.innerHTML = item.label

        let span = document.createElement("span")
        span.classList.add('field-required')

        divStep.append(title)
        
        if(item.type == "enumerable"){
            var select = CreateSelect([item],request_fields[index].placeholder)
            divStep.appendChild(select) 
        }else if(item.type == 'big_text'){
            var textArea = CreateTextArea([item])
            divStep.appendChild(textArea) 
        }

        divStep.append(span)
        stepsWrapper.append(divStep)

    })
}


function CreateSelect(item,request_fields){
    let [selectItem] = item
    let arrayOption = new Array(Object.values(selectItem.values))

    let select = document.createElement("select")
    select.classList.add('form-select')
    arrayOption[0].forEach((itemSelect,index) => {

        if(index == 0){

            let optionDisabled = document.createElement('option')
            optionDisabled.setAttribute('selected','')
            optionDisabled.setAttribute('disabled','')
            optionDisabled.setAttribute('value','')
            optionDisabled.text = request_fields
            select.append(optionDisabled);
        }
        
        let option = document.createElement("option");
        option.value = itemSelect.trim()
        option.text = itemSelect.trim()
        select.append(option);
    })
    if (item.required == true) {
        select.setAttribute('required','')
    }

    return select
}

function CreateTextArea(item){
    let [itemTextArea] = item

    let divform = document.createElement('div')
    divform.classList.add('form-textarea')

    let divtooltip = document.createElement('div')
    divtooltip.classList.add('tooltip')
    divtooltip.innerHTML = 'Ótimo, quanto mais informações, melhor 😊'


    let textArea = document.createElement('textarea')
    textArea.setAttribute('placeholder',`${itemTextArea.placeholder}`)
    textArea.setAttribute('name',`${itemTextArea.name}`)

    if (itemTextArea.required == true) {
        textArea.setAttribute('required','')
    }

    divform.append(textArea,divtooltip)

    return divform
}

function CreateInput(item){
    let [input] = item

    let divform = document.createElement('div')
    divform.classList.add('form-input')

    let span = document.createElement("span")
    span.classList.add('field-required')

   

    let label = document.createElement('label')
    label.setAttribute('for',`${input.name}`)
    label.innerHTML = input.label

    let inputtext = document.createElement('input')
    inputtext.setAttribute('type','text')
    inputtext.setAttribute('id',`${input.name}`)
    inputtext.setAttribute('placeholder',`${input.placeholder}`)
    inputtext.setAttribute('data-userForm','')

    if (input.required == true) {
        inputtext.setAttribute('required','')
    }

    
    divform.append(label,inputtext,span)

    return divform
}





