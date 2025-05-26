import Titulo from "./Titulo";

interface LayoutProps {
	titulo: string;
	children: any;
}

export default function Layout(props: LayoutProps) {
	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="flex flex-col w-2/3 bg-sky-100 p-4 rounded shadow">
				<Titulo>{props.titulo}</Titulo>
				<div>{props.children}</div>
			</div>
		</div>
	);
}
