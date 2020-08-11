//or get set name
const getName = () => {
    let name = prompt('Enter Your name');
    if(!name) {
        alert('Please Provide A name');
        getName();
    }
    return name;
}

let userName = localStorage.getItem('name');
if(!userName) {
    const name = getName();
    console.log(name);
    localStorage.setItem('name',name);
    userName = name;
}else {
    document.querySelector('.greet').textContent = `Welcome , ${userName}`;
    document.querySelector('header .username').textContent = userName;
}

const id = document.querySelector('.form-input input');
id.addEventListener('input',(e)=>{
    if(e.target.value.trim() !== '') {
        document.getElementById('submitBtn').disabled = false;
    }
    else {
        document.getElementById('submitBtn').disabled = true;
    }
})