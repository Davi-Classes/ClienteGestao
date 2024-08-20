// Componentes
function Icone(icone) {
    let ionIcon = document.createElement('ion-icon')
    // ionIcon.name = icone
    ionIcon.setAttribute('name', icone)
    return ionIcon
}

function LinhaCliente(cliente) {
    let linha = document.createElement('tr')

    let clienteId = linha.insertCell()
    clienteId.textContent = `${cliente.id}.`

    let clienteNome = linha.insertCell()
    clienteNome.textContent = cliente.nome

    let clienteEmail = linha.insertCell()
    clienteEmail.textContent = cliente.email

    let clienteEndereco = linha.insertCell()
    clienteEndereco.textContent = cliente.endereco

    let clienteAcoes = linha.insertCell()
    
    let botaoEditar = document.createElement('button')
    botaoEditar.className = 'btn btn-primary'
    botaoEditar.appendChild(Icone('pencil'))

    let botaoExcluir = document.createElement('button')
    botaoExcluir.className = 'btn btn-danger'
    botaoExcluir.appendChild(Icone('trash'))

    clienteAcoes.appendChild(botaoEditar)
    clienteAcoes.appendChild(botaoExcluir)

    return linha
}

// Lógica da Aplicação
// Estado dos Clientes (Sempre que esse cara mudar, a gente renderiza denovo)
const clientesState = [
    {
        id: 1,
        nome: 'Marco Aurélio',
        email: 'marco@email.com',
        endereco: 'Pampulha, Belo Horizonte - MG'
    },
    {
        id: 2,
        nome: 'Tainá',
        email: 'ainaprogramadora@outlook.com',
        endereco: 'Padre Eustaquio, Belo Horizonte - MG'
    }
]

// Listagem de Clientes
function listarClientes(clientes) {
    const tabelaClientes = document.getElementById('clientes')

    // Limpando Linhas da Tabela (Exceto Cabeçalho)
    let qtdClientes = tabelaClientes.rows.length - 1
    for (let index = qtdClientes; index > 0; index--) {
        tabelaClientes.deleteRow(index)
    }

    // Adicionando linhas na tabela segundo os clientes recebidos como parametro.
    let dadosClientes = tabelaClientes.querySelector('tbody')
    for (let cliente of clientes) {
        let linhaCliente = LinhaCliente(cliente)
        dadosClientes.appendChild(linhaCliente)
    }
}

function handleListarClientes() {
    listarClientes(clientesState)
}

window.addEventListener("DOMContentLoaded", handleListarClientes)


// Cadastro de Clientes
function mostrarError(mensagem) {
    const errorDiv = document.getElementById('error-message')
    errorDiv.textContent = mensagem
}

const formCliente = document.getElementById('form-cliente')

function handleCadastrarCliente(event) {
    event.preventDefault()
    
    const novoCliente = {
        id: 10,
        nome: formCliente.cliente.value.trim(),
        email: formCliente.email.value.trim(),
        endereco: formCliente.endereco.value.trim()
    }

    try {
        if (novoCliente.nome == '') {
            throw new Error("O campo nome é obrigatório.");
        }

        if (novoCliente.email == '') {
            throw new Error("O campo email é obrigatório.");
        }

        if (novoCliente.endereco == '') {
            throw new Error("O campo endereço é obrigatório.");
        }

        mostrarError('')
    } catch (error) {
        mostrarError(error.message)
        return
    }

    clientesState.push(novoCliente)
    listarClientes(clientesState)

    let modal = document.getElementById('modal-cliente');
    modal = bootstrap.Modal.getInstance(modal)
    modal.hide();
}

formCliente.addEventListener("submit", handleCadastrarCliente)
