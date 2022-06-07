


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





