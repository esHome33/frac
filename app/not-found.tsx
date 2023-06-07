import Link from "next/link";

export default function NotFound() {
	return (
		<div style={{ textAlign: "center" }}>
			<h2>Not Found</h2>
			<p>Could not find requested resource.</p>
			<p />
			<p>La ressource demandée n&apos;existe pas sur ce serveur.</p>
			<p>
				Get Back to home page : <Link href="/">back</Link>
			</p>
		</div>
	);
}
