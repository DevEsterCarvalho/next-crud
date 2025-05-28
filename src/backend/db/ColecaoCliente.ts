import ClienteRepositorio from "@/src/core/ClienteRepositorio";
import Cliente from "../../core/Cliente";

export default class ColecaoCliente implements ClienteRepositorio {
	async salvar(cliente: Cliente): Promise<Cliente> {
		return cliente; // retorna o mesmo cliente que recebeu por enquanto
	}

	async excluir(cliente: Cliente): Promise<void> {
		return;
	}

	async obterTodos(): Promise<Cliente[]> {
		return []; //array vazio enquanto esta e desenvolvimento
	}
}
