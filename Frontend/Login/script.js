function conectar() {
    let email = document.querySelector(".email")
    let senha = document.querySelector(".senha")
    let data = JSON.stringify({
        email: email.value,
        senha: md5(senha.value),
    });

    try {
        fetch(`${url}/funcionarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            })
            .then((resp) => {
                if (resp.status == 400) {
                    alert("Usuario ou senha incorretos")
                }
                return resp.json();
            })
            .then((data) => {

                if (data.id_funcionario !== undefined) {
                    localStorage.setItem("userdata", JSON.stringify(data));
                    window.location.href = "../../Home";


                } else {
                    alert("Usuario ou Senha invalidos");
                }
            });
    } catch (e) {
        console.log(e)


    }
}

function olharSenha() {
    let img = document.querySelector(".olhar");
    let input = document.querySelector(".senha")

    if (input.type == "password") {
        input.type = "text";
        img.src = "../Assets/icones/visibility.png"

    } else {
        input.type = "password";
        img.src = "../Assets/icones/view.png"
    }
}

var esqueci = document.querySelector('.rec-senha').addEventListener("click", () => {
    window.location.href = "../../RecSenha/"
})

function emptyStore() {
    localStorage.clear()
}