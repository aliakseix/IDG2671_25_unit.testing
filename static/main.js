

function main(){
	document.getElementById("adForm").addEventListener("submit", ev=>{
		ev.preventDefault();
		const adNameEl = document.getElementById("name");
		const adName = adNameEl.value.trim();
		const url = document.getElementById("url").value.trim();
		const fullname = document.getElementById("fullname").value.trim();
		if(!adName){
			adNameEl.value = "";
			adNameEl.setAttribute("placeholder", "Advertiser Name can't be Empty!!!");
			return;
		}
		fetch("/save-ads", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				txt: adName,
				url,
				fullname
			})
		}).then(resp=>{
			if(resp.ok){
				window.location.reload();
			}else{
				resp.text()
					.then(msg=>{
						const errEl = document.querySelector(".error-message");
						errEl.innerText = msg;
						errEl.style.display = "block";
					});

			}
		}).catch(err=>{
			console.error(err.message);
			window.alert(err.message);
		});
	});
}

if(document.state === "loading"){
	document.addEventListener("DOMContentLoaded", ev=>main());
}else{
	main();
}