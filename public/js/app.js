console.log("client side javascript file is loaded!");


let formElement = document.querySelector("form");
const addressElement = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

formElement.addEventListener('submit',(e)=>{
	e.preventDefault();
	messageOne.textContent = "";
	messageTwo.textContent = "Loading...";
	let url = "/weather?address=";

	const address = addressElement.value;
	url += address;

	fetch(url)
	.then((response) => {
		response.json().then(data=>{
			if(data.error){
				messageOne.textContent = data.error;
				messageTwo.textContent = '';
			}else{
				messageOne.textContent = '';
				messageTwo.textContent = '';
				let outPut = data.location +" >> " + data.forecast;
				messageTwo.textContent = outPut;
			}
		})
	}).catch(error => {
		messageOne.textContent = data.error;
		messageTwo.textContent = '';
	})
})

