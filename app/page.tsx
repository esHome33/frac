"use client";
import { Typography } from "@mui/material";
import Inputcomp from "./inputcomp";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-4">
			<Typography className="text-center">
				Bienvenue dans le domaine des fractions continues
			</Typography>
			<div className="py-4" />
			<Inputcomp />
			<Typography
				className="text-center text-green-300"
				variant="body1"
			>
				programmé par ESHome33 - juin 2023
			</Typography>
			<Typography variant="body2">
				utilisation de
				<Link
					href="https://github.com/Daninet/exactnumber"
					className="text-yellow-200"
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
