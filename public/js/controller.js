import {
  buscarClientes,
  cadastrarCliente,
  editarCliente,
  excluirCliente,
} from "./model.js";
import { listarClientes, mostrarError } from "./view.js";

let clientesState = [];

// Lógica da Aplicação
// Listagem de Clientes
async function handleListarClientes() {
  // O Fetch faz uma requisição (por padrão um GET)
  // para a URL especificada.
  // Await ele espera a promessa terminar, para continuar o codigo
  clientesState = await buscarClientes();
  listarClientes(clientesState);
}

window.addEventListener("DOMContentLoaded", handleListarClientes);

// Cadastro de Clientes
const formCliente = document.getElementById("form-cliente");

async function handleCadastrarCliente(event) {
  event.preventDefault();

  const novoCliente = {
    nome: formCliente.cliente.value.trim(),
    email: formCliente.email.value.trim(),
    endereco: formCliente.endereco.value.trim(),
  };

  try {
    if (novoCliente.nome == "") {
      throw new Error("O campo nome é obrigatório.");
    }

    if (novoCliente.email == "") {
      throw new Error("O campo email é obrigatório.");
    }

    if (novoCliente.endereco == "") {
      throw new Error("O campo endereço é obrigatório.");
    }

    await cadastrarCliente(novoCliente);
    mostrarError("");
  } catch (error) {
    mostrarError(error.message);
    return;
  }

  // Listar Clientes
  handleListarClientes();

  // Fecha o modal do bootstrap
  let modal = document.getElementById("modal-cliente");
  modal = bootstrap.Modal.getInstance(modal);
  modal.hide();

  // Limpando o Formulário.
  formCliente.reset();
}

formCliente.addEventListener("submit", handleCadastrarCliente);

export async function handleExcluirCliente(clienteId) {
  let confirmarExclusao = confirm('Deseja excluir o cliente?')

  if (confirmarExclusao) {
    await excluirCliente(clienteId);
    handleListarClientes();
  }
}
