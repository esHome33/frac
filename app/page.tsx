"use client";
import { Button, Typography } from "@mui/material";
import Inputcomp from "./inputcomp";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Home() {
	const router = useRouter();
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-4">
			<Button
				className="fixed z-10 top-10 left-10 bg-white text-black hover:text-white hover:bg-black"
				sx={{ borderRadius: "50px" }}
				onClick={(e) => {
					e.preventDefault();
					router.push("/about");
				}}
			>
				Help
			</Button>
			<Typography className="text-center">
				Bienvenue dans le domaine des{" "}
				<Link
					href="https://fr.wikipedia.org/wiki/Fraction_continue"
					className="text-orange-600 hover:text-orange-200"
				>
					fractions continues
				</Link>
			</Typography>
			<div className="py-4" />
			<Inputcomp />
			<Typography
				className="text-center text-green-900 font-bold"
				variant="body1"
			>
				programmé par{" "}
				<Link
					href="https://github.com/esHome33"
					className="text-orange-600 hover:text-orange-800"
				>
					ESHome33
				</Link>{" "}
				- juin 2023
			</Typography>
			<Typography variant="body1">
				utilisation de
				<Link
					href="https://github.com/Daninet/exactnumber"
					className="text-orange-600 hover:text-orange-800"
				>
					{" "}
					exactnumber
				</Link>{" "}
				et d&apos;un aglo &quot;maison&quot; pour trouver les réduites +
				décomposer le réel en FC.
			</Typography>
		</main>
	);
}

export default Home;
