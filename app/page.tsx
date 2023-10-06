"use client";
import { Typography } from "@mui/material";
import Inputcomp from "./inputcomp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
	const [padding_gauche, setPadding_gauche] = useState("0px");

	useEffect(() => {
		if (window.innerWidth < 700) {
			setPadding_gauche("2px");
		} else {
			setPadding_gauche("50px");
		}
		return;
	}, []);

	const router = useRouter();
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-4">
			<button
				style={{
					borderRadius: "50px",
					position: "fixed",
					top: "50px",
					left: padding_gauche,
					color: "white",
					backgroundColor: "seagreen",
					zIndex: "10",
					padding: "10px",
					paddingLeft: "30px",
					paddingRight: "30px",
				}}
				onClick={(e) => {
					e.preventDefault();
					router.push("/about");
				}}
			>
				Help
			</button>
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
				- juin-oct 2023
			</Typography>
			<Typography variant="body1" className="text-center">
				utilisation de
				<Link
					href="https://github.com/Daninet/exactnumber"
					className="text-orange-600 hover:text-orange-800"
				>
					{" "}
					exactnumber
				</Link>{" "}
				et d&apos;un algo &quot;maison&quot; pour trouver les réduites +
				décomposer le réel en FC.
			</Typography>
		</main>
	);
}

export default Home;
