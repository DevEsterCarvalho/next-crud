import Cliente from "../core/Cliente";
import { IconeEdicao } from "./Icones";
import { IconeLixo } from "./Icones";

interface TabelaProps {
	clientes: Cliente[];
	clienteSelecionado?: (cliente: Cliente) => void;
	clienteExcluido?: (cliente: Cliente) => void;
}

export default function Tabela(props: TabelaProps) {
	const exibirAcoes = props.clienteExcluido || props.clienteSelecionado;

	function renderizarCabecalho() {
		return (
			<tr>
				<th className="text-left p-3">Código</th>
				<th className="text-left p-3">Nome</th>
				<th className="text-left p-3">Idade</th>
				{exibirAcoes ? <th className="text-center p-3">Ações</th> : false}
			</tr>
		);
	}

	function renderizarDados() {
		return props.clientes?.map((cliente, i) => {
			return (
				<tr
					key={cliente.id}
					className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}
				>
					<td className="text-left p-3">{cliente.id}</td>
					<td className="text-left p-3">{cliente.nome}</td>
					<td className="text-left p-3">{cliente.idade}</td>
					{exibirAcoes ? renderizarAcoes(cliente) : false}
				</tr>
			);
		});
	}
	function renderizarAcoes(cliente: Cliente) {
		return (
			<td className="flex justify-center">
				{props.clienteSelecionado ? (
					<button
						onClick={() => props.clienteSelecionado?.(cliente)}
						className="flex justify-center items-center 
                        text-green-600 rounded-full p-2 m-1  
                        hover:bg-purple-50"
					>
						{IconeEdicao}
					</button>
				) : (
					false
				)}
				{props.clienteExcluido ? (
					<button
						onClick={() => props.clienteExcluido?.(cliente)}
						className="flex justify-center items-center 
                        text-red-500 rounded-full p-2 m-1  
                        hover:bg-purple-50"
					>
						{IconeLixo}
					</button>
				) : (
					false
				)}
			</td>
		);
	}

	return (
		<table className="w-full rounded-xl overflow-hidden">
			<thead
				className={`
                    text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800`}
			>
				{renderizarCabecalho()}
			</thead>
			<tbody>{renderizarDados()}</tbody>
		</table>
	);
}
