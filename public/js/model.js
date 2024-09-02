// Model
// Responsavel por armazenar os dados no frontend e consumir a API.
const apiUrl = "https://clienteapi.onrender.com";

export async function buscarClientes() {
  const response = await fetch(`${apiUrl}/clientes`);

  if (!response.ok) {
    throw new Error("Houve um erro ao se comunicar com o servidor.");
  }

  return await response.json();
}

export async function cadastrarCliente(cliente) {
  // Cadastrar o Cliente
  const response = await fetch(`${apiUrl}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Houve um erro ao comunicar com o servidor.");
  }
}

export async function editarCliente(id, cliente) {
  // Cadastrar o Cliente
  const response = await fetch(`${apiUrl}/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error("Houve um erro ao comunicar com o servidor.");
  }
}

export async function excluirCliente(id) {
  // Cadastrar o Cliente
  const response = await fetch(`${apiUrl}/clientes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Houve um erro ao comunicar com o servidor.");
  }
}
