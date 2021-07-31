let pessoa = new Object();
let dados = [];

console.log(dados);

if(JSON.parse(localStorage.getItem('pacientes')) != null){
    dados = JSON.parse(localStorage.getItem('pacientes'));
    geraTemplate()
}
function calcular() {

    let nome    = document.getElementById("nome").value.trim();
    let altura  = parseFloat(document.getElementById("altura").value);
    let peso    = parseFloat(document.getElementById("peso").value);

    if (validaForm(nome, altura, peso)) {
        
        let imc = calcularImc(altura, peso); //chama a função pra calcular imc
        let situacao = geraSituacao(imc); //chama a função pra calcular imc
        
        //gera o objeto pessoa com os dados devidamente preenchidos
        pessoa.nome = nome;
        pessoa.altura = altura;
        pessoa.peso = peso.toFixed(2);
        pessoa.imc = imc.toFixed(2);
        pessoa.situacao = situacao;
        
        //cadastra pessoa no array dados
        dados.push(pessoa);
        pessoa = {};//reseta objeto pessoa para novo cadastro
        localStorage.setItem('pacientes',JSON.stringify(dados));
        
        geraTemplate();// gera o template baseado na quandidade de pessoas cadastradas
        limparForm();
    } else {
        alert("Preencha todos os dados corretamente");
    }

}

function validaForm(nome, altura, peso) {

    if (nome == '' || altura <= 0 || peso <= 0) {
        return false;
    }
    return true;
}

function limparForm() {

    document.getElementById("nome").value = '';
    document.getElementById("altura").value = '';
    document.getElementById("peso").value = '';
}

function calcularImc(altura, peso) {

    let imc = peso / (altura * altura);
    return imc;
}
/*
    Resultado	        Situação
    Entre 18,5 e 24,99	Peso normal
    Entre 25 e 29,99	Acima do peso
    Entre 30 e 34,99	Obesidade I
    Entre 35 e 39,99	Obesidade II (severa)
 */
function geraSituacao(imc) {

    if (imc < 18.5) {
        return "Magreza Severa";
    } else if (imc >= 18.5 && imc < 25) {
        return "Peso normal";
    } else if (imc >= 25 && imc < 30) {
        return "Acima do peso";
    } else if (imc >= 30 && imc < 35) {
        return "Obesidade I";
    } else if (imc >= 35 && imc < 40) {
        return "Obesidade II (severa)";
    } else {
        return "Muito Obeso (cuidado)";
    }
}


/*
     <tr>
        <td>João</td>
        <td>167</td>
        <td>80</td>
        <td>30</td>
        <td>acima do peso</td>
    </tr>
*/
function geraTemplate() {

    let pacientes = JSON.parse(localStorage.getItem('pacientes'));
    let template = '';
    for (let i = 0; i <pacientes.length; i++) {
        template +=
            `<tr id="item">
                <td>${pacientes[i].nome}</td>
                <td>${pacientes[i].altura}</td>
                <td>${pacientes[i].peso}</td>
                <td>${pacientes[i].imc}</td>
                <td>${pacientes[i].situacao}</td>
            </tr>`;
            console.log(pacientes);
    }
    document.getElementById('cadastro').innerHTML = template;
    
}