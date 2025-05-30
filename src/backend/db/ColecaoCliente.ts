import firebase from "../config";
import ClienteRepositorio from "@/src/core/ClienteRepositorio";
import Cliente from "../../core/Cliente";

export default class ColecaoCliente implements ClienteRepositorio {
	conversor = {
		toFirestore(cliente: Cliente) {
			return {
				nome: cliente.nome,
				idade: cliente.idade,
			};
		},
		fromFirestore(
			snapshot: firebase.firestore.QueryDocumentSnapshot,
			options: firebase.firestore.SnapshotOptions
		): Cliente {
			const dados = snapshot.data(options)!;
			return new Cliente(dados.nome, dados.idade, snapshot.id);
		},
	};

	private colecao() {
		return firebase
			.firestore()
			.collection("clientes")
			.withConverter(this.conversor);
	}

	async salvar(cliente: Cliente): Promise<Cliente> {
		if (cliente.id) {
			await this.colecao().doc(cliente.id).set(cliente);
			return cliente;
		} else {
			const docRef = await this.colecao().add(cliente);
			const doc = await docRef.get();
			const clienteSalvo = doc.data();
			if (!clienteSalvo)
				throw new Error("Documento não encontrado após salvar");
			return clienteSalvo;
		}
	}

	async excluir(cliente: Cliente): Promise<void> {
		return this.colecao().doc(cliente.id).delete();
	}

	async obterTodos(): Promise<Cliente[]> {
		const query = await this.colecao().get();
		return query.docs.map((doc) => doc.data());
	}
}
