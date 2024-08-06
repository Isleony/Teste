document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formcadastro");
    const btnSubmit = document.getElementById("btnsubmit");
    const btnClear = document.getElementById("btnclear");
    const lista = document.getElementById("registro-lista");

    let registros = [];

    function validarCampo(campo) {
        if (campo.value.trim() === "") {
            campo.classList.remove("valid");
            campo.classList.add("invalid");
            return false;
        } else {
            campo.classList.remove("invalid");
            campo.classList.add("valid");
            return true;
        }
    }

    function validarFormulario() {
        let valido = true;
        const campos = form.querySelectorAll("input[type='text']");
        campos.forEach(campo => {
            if (!validarCampo(campo)) {
                valido = false;
            }
        });
        return valido;
    }

    function atualizarLista() {
        lista.innerHTML = "";
        registros.forEach((registro, index) => {
            const li = document.createElement("li");
            li.textContent = `Registro ${index + 1}: Campo 1 = ${registro.campo1}, Campo 2 = ${registro.campo2}, Campo 3 = ${registro.campo3}`;
            const btnExcluir = document.createElement("button");
            btnExcluir.textContent = "Excluir";
            btnExcluir.onclick = () => excluirRegistro(index);
            li.appendChild(btnExcluir);
            lista.appendChild(li);
        });
    }

    function incluirRegistro() {
        const campo1 = form.querySelector("#campo1");
        const campo2 = form.querySelector("#campo2");
        const campo3 = form.querySelector("#campo3");

        if (validarFormulario()) {
            registros.push({
                campo1: campo1.value,
                campo2: campo2.value,
                campo3: campo3.value
            });
            atualizarLista();
            form.reset();
            campo1.classList.remove("valid", "invalid");
            campo2.classList.remove("valid", "invalid");
            campo3.classList.remove("valid", "invalid");
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }

    function excluirRegistro(index) {
        if (confirm("Tem certeza de que deseja excluir este registro?")) {
            registros.splice(index, 1);
            atualizarLista();
        }
    }

    function limparFormulario() {
        form.reset();
        form.querySelectorAll("input[type='text']").forEach(campo => {
            campo.classList.remove("valid", "invalid");
        });
    }

    btnSubmit.addEventListener("click", incluirRegistro);
    btnClear.addEventListener("click", limparFormulario);
});