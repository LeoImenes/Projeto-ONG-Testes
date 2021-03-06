function list() {
    let input = document.querySelector('input');
    let names = []
    var body = document.querySelector(body)
    try {
        fetch(`${url}/funcionarios`)
            .then(response => {
                if (!response.ok) {
                    alert("Falha ao carregar dados");
                    window.location.reload();
                } else return response.json();
            })
            .then(data => {
                data.forEach(fun => {
                    var divimg = document.createElement("div")
                    var divnome = document.createElement("div")
                    var cont = document.querySelector(".content")
                    var img = document.createElement("img");
                    var cardfuncionario = document.createElement("div");
                    var nomeFun = document.createElement("h1");
                    var matricula = document.createElement("h3");

                    names.push(fun.nome_completo)

                    cardfuncionario.className = "cardFuncionario"
                    cardfuncionario.addEventListener("click", () => {
                        let id = fun;
                        let store = localStorage.setItem("funcionario", fun.matricula);
                        window.location.href = "../VerFuncionario/index.html"
                    })
                    img.className = "fotoUsuario"
                    divimg.className = "img"
                    divnome.className = "nome"

                    if ((fun.foto == null) || fun.foto == 'undefined' || fun.foto == "null" || fun.foto == "") {
                        img.src = `../../Assets/icones/user.png`
                    } else img.src = fun.foto

                    console.log(fun)

                    if (!fun.status == 0) {
                        matricula.innerHTML = `Ativo`
                        matricula.style.color = `green`
                    } else {
                        matricula.innerHTML = `Inativo`
                        matricula.style.color = `red`
                    }

                    nomeFun.innerHTML = `${fun.nome_completo}`

                    divimg.appendChild(img)
                    divnome.appendChild(nomeFun)
                    divnome.appendChild(matricula)
                    cardfuncionario.appendChild(divimg)
                    cardfuncionario.appendChild(divnome)
                    cont.appendChild(cardfuncionario)
                })
            })
    } catch (e) {
        console.log(e)
    }
}

function buscar() {
    let input = document.getElementById("inp").value.toLowerCase();
    let filtro = document.querySelectorAll("h1");
    let card = document.querySelectorAll(".cardFuncionario")

    filtro.forEach((item, index) => {
        (item.innerHTML.toLowerCase().includes(input)) ? card[index].style.display = "flex": card[index].style.display = "none";
    })
}

function buscarInativos() {
    let filtro = document.querySelectorAll("h3");
    let card = document.querySelectorAll(".cardFuncionario")
    let inativo = document.getElementById("ina")

    if (inativo.checked == 1) {
        inativo.value = "i"
        filtro.forEach((item, index) => {
            (item.innerHTML.toLowerCase().startsWith(inativo.value)) ? card[index].style.display = "flex": card[index].style.display = "none";
        })
    } else {
        filtro.forEach((item, index) => {
            card[index].style.display = "flex";
        })
    }
}

function buscarAtivos() {
    let filtro = document.querySelectorAll("h3");
    let card = document.querySelectorAll(".cardFuncionario")
    let ativo = document.getElementById("ati")

    if (ativo.checked == 1) {

        ativo.value = "a"
        filtro.forEach((item, index) => {
            (item.innerHTML.toLowerCase().startsWith(ativo.value)) ? card[index].style.display = "flex": card[index].style.display = "none";
        })
    } else {
        filtro.forEach((item, index) => {
            card[index].style.display = "flex";
        })
    }

}