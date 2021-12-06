let buttons = document.getElementsByClassName("edit_btn")
let inputs = document.getElementsByTagName("input")
let xx = document.getElementsByClassName("save")


for(button of buttons){
    button.addEventListener("click",()=>{
        let current = sessionStorage.getItem("disabled")
        console.log(current)
        if(current === "true"){
            enable_inputs()
        }
        else{
            disable_inputs()
        }
    })
}


const disable_inputs = () =>{

    for(x of xx ){
        x.style.display = "none"
    }
    sessionStorage.setItem("disabled","true")
    for(input of inputs){
        input.disabled = true;
        input.readonly = true;
    }
}

const enable_inputs = () =>{
    // $(".save").show()
    sessionStorage.setItem("disabled","false")
    for(input of inputs){
        input.disabled = false;
        input.readonly = false;
    }
    for(x of xx ){
        x.style.display = "block";
    }
}