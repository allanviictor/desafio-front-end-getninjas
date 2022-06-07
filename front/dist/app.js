


export class FormControl {
   
    constructor(getForm,getAllSteps,getAllButtons,getBackgroundProgressBar,indexSteps,userFields,currentStep,textArea){
        this.getForm = getForm
        this.getAllSteps = getAllSteps
        this.getAllButtons = getAllButtons
        this.getBackgroundProgressBar = getBackgroundProgressBar
        this.indexSteps = indexSteps
        this.userFields = userFields
        this.currentStep = currentStep
        this.textArea = textArea
        

        this.getForm.addEventListener('submit',(e)=> {
            e.preventDefault();
            this.ValidateFormUser()
        
            let fields = [...this.userFields]
            let valuefields = [] 
            fields.forEach(item=> valuefields.push(item.value))

            let fieldsValid = !valuefields.some(element => element == "")
        
            if(fieldsValid){
        
                alert('form submited')
            }
        })

        this.textArea.addEventListener('keyup',(e)=> {
            if(e.target.textLength < 15 ){
                let [toolTip] = [...document.querySelectorAll('.tooltip')]
                toolTip.innerHTML = 'Ótimo, quanto mais informações, melhor 😊' 
                toolTip.classList.remove('success')
            }if(e.target.textLength >= 15){
                let [toolTip] = [...document.querySelectorAll('.tooltip')]
                toolTip.innerHTML = 'Boa descrição, acha que consegue dizer mais? 😃'
                toolTip.classList.remove('success')
            }if(e.target.textLength >= 25){
                let [toolTip] = [...document.querySelectorAll('.tooltip')]
                toolTip.innerHTML = 'Uau, agora sim, excelente descrição! 😎 '
                toolTip.classList.add('success')
            }
        })
   
    
        this.getForm.addEventListener("click",(event) => this.Navegation(event)) 

        
        this.DefineSteps()
        this.DefineNavegationButtons()
        this.IniciateProgressBar()
        
        this.FocusOutInput()

    }

    DefineSteps(){
        
        this.getAllSteps.forEach((item,index) => {
            item.setAttribute('data-step',index)
            
            if(index == 0){
                item.classList.toggle('active-step')
                this.currentStep = index
    
            }
    
            
        })
    
        if(this.currentStep == 0){
            document.querySelector('.secondary').style.display = 'none'
        }
    }
    
    DefineNavegationButtons(){
    
        this.getAllButtons.forEach(item => {
            if(item.classList.contains('primary')){
                item.setAttribute('data-next','')
                item.setAttribute('data-bar','increment')
            }else if(item.classList.contains('secondary')) {
                item.setAttribute('data-previus','')
                item.setAttribute('data-bar','decrement')
            }
        })
    }
    
    IniciateProgressBar(){
        let value = parseFloat(100/this.getAllSteps.length) 
        this.getBackgroundProgressBar.style.width = `${value}%` 
    }
    
    
    FocusOutInput(){
        
        this.userFields.forEach(item => {
            item.addEventListener("blur",(e)=> {
                let Field = this.getAllSteps[this.indexSteps].querySelectorAll("#" + item.getAttribute('id'))
                if(item.value == ""){
                    this.TratativeFormUser(...Field,'error')
                }else {
                    this.TratativeFormUser(...Field,'valid')
                }
            })
        })
    
    }
    
    ValidateFormUser(){

        this.userFields.forEach(item => {
            let Field = this.getAllSteps[this.indexSteps].querySelectorAll("#" + item.getAttribute('id'))
            if(item.value == ""){
                this.TratativeFormUser(...Field,'error')
            }else {
                this.TratativeFormUser(...Field,'valid')
            }
        })
    }
    
    ValidateSelectForm(){
        let hasField = this.getAllSteps[this.currentStep].querySelectorAll('select')
        console.log(hasField)
        if(hasField.length > 0){
            let [ field ] = this.getAllSteps[this.currentStep].querySelectorAll('select')

            if (!field.value) {
                this.getAllSteps[this.currentStep].querySelector('.field-required').innerHTML = 'campo obrigatorio'
                return false
            }
            this.getAllSteps[this.currentStep].querySelector('.field-required').innerHTML = ''
            
            return true
        }else {
            return true
        }
        
    }
    
    TratativeFormUser(field,type){
        let Span = field.parentElement.querySelector('.field-required')
        if(type == 'error'){
            Span.innerHTML = "Campo Obrigatorio"
        }else {
            Span.innerHTML = ""
        }
    }
    
    
    Progressbar(value){
        let valueUpOrDown =  parseFloat(100/this.getAllSteps.length) 
        let currentWidth = parseFloat(this.getBackgroundProgressBar.style.width.replace("%","").trim())     
        if(value == 'increment'){
            this.getBackgroundProgressBar.style.width = `${ currentWidth + valueUpOrDown }%`
        }else if(value == "decrement"){
            this.getBackgroundProgressBar.style.width = `${ currentWidth - valueUpOrDown }%`
        }
    
    }
    
    
    Navegation(event){
        let barValue;
        if(event.target.matches('[data-next]')){
            if(this.ValidateSelectForm()){
                this.currentStep += 1
                barValue = event.target.dataset.bar
            }
        }else if(event.target.matches('[data-previus]')){
            this.currentStep -= 1
            barValue = event.target.dataset.bar
        }
        this.Progressbar(barValue)
        this.showCurrentStep()
    }
    
    showCurrentStep(){
        
        this.getAllSteps.forEach((item,index) => {
            item.classList.toggle('active-step', index === this.currentStep)
        })
    
        if(this.currentStep == (this.getAllSteps.length - 1)){
            document.querySelector('.form-button.primary[type="button"]').style.display = "none"
            document.querySelector('.form-button.primary[type="submit"]').style.display = "block"
        }else {
            document.querySelector('.form-button.primary[type="button"]').style.display = "block"
            document.querySelector('.form-button.primary[type="submit"]').style.display = "none"
        }
    
        if(this.currentStep > 0){
            document.querySelector('.secondary').style.display = 'block'
        }else {
            document.querySelector('.secondary').style.display = 'none'
        }
        
    }
    
    
   

}    






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





