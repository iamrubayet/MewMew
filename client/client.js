const form = document.querySelector('form');//grabbing an element
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:5000/v2/mews' : 'https://meower-api.now.sh/v2/mews';

loadingElement.style.display = '';

listAllMews();

form.addEventListener('submit',(event)=>{
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');

	const mew = {
		name,
		content

	};

form.style.display = 'none';
loadingElement.style.display = '';

fetch(API_URL,{
	method: 'POST',
	body : JSON.stringify(mew),
	headers : {
		'content-type': 'application/json'
	}
}).then(response=>response.json())
  .then(createdMew=>{
  	form.reset();
  	setTimeout(()=>{
  	form.style.display = '';


  	},30000)
  	
  	listAllMews();
    


  });



});


function listAllMews(){
	mewsElement.innerHTML = '';
	fetch(API_URL)
	.then(response=>response.json())
	.then(mews=>{
		mews.reverse();
		mews.forEach(mew=>{
			const div = document.createElement('div');
			const header = document.createElement('header');
			header.textContent = mew.name;

			const contents = document.createElement('p');
			contents.textContent = mew.content;

			const date = document.createElement('small');
			date.textContent = new Date(mew.created)

			div.appendChild(header);
			div.appendChild(contents);
			div.appendChild(date);

			mewsElement.appendChild(div);

		});
		loadingElement.style.display = 'none';

	});
}