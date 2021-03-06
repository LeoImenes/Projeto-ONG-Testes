function Relatorio() {
    let relatorio = document.querySelector(".relatorio").value;
    var local = localStorage.getItem("assistido");
    var funcionario = localStorage.getItem('userdata')

    var data = JSON.stringify({
        "id_funcionario": JSON.parse(funcionario).id_funcionario,
        "id_assistido": JSON.parse(local),
        "relatorio": relatorio
    });

    try {
        fetch(`${url}/relatorio/assistido`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: data
            })
            .then((resp) => {
                if (resp.ok) alert("Cadastrado com sucesso");
                return resp.json();
            })
            .then((data) => {
                window.location.href = '../OpcoesRelatorio/';
            });
    } catch (e) {
        console.log(e);
    }
}

function getAssistido() {
    var p = document.querySelector(".infoAssistido  p");
    var img = document.querySelector(".ImgAssistido");
    var local = localStorage.getItem("assistido");

    try {
        fetch(`${url}/assistidos/${local}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                p.innerHTML = ` ${data.nome_completo}`;
                if (data.foto_depois === null || data.foto_depois === 'null' || data.foto_depois === undefined || data.foto_depois === "undefined" || data.foto_depois === "") {
                    img.src = " ../../Assets/icones/user.png";
                } else img.src = data.foto_depois;
            });
    } catch (e) {
        console.log(e);
    }
}