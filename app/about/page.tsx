"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function About() {
	const router = useRouter();
	return (
		<main className="flex min-h-screen flex-col items-center justify-start p-4">
			<div className="flex flex-row space-x-12">
				<Button
					className=" bg-white text-black hover:bg-black hover:text-white"
					onClick={() => router.back()}
				>
					Retour
				</Button>
				<Typography
					variant="h4"
					className="flex-grow"
				>
					Aide - Help
				</Typography>
			</div>

			<div className="my-4"></div>
			<Typography>
				Ce programme permet de trouver la fraction continue associée à un
				nombre réel (càd entier, rationel ou irrationel){" "}
			</Typography>
			<div className="my-4"></div>
			<Typography>
				Pour saisir un réel, il faut veiller à utiliser le point au lieu de
				la virgule. Vous pouvez aussi remplacer une séquence répétitive dans
				les décimales par le motif entre parenthèses. Par exemple,
				2,45718718718... s&apos;écrit 2.45(718).
			</Typography>
			<Typography>
				On peut également désigner le réel à l&apos;aide d&apos;une
				fraction. Par exemple, saisissez 22/7 ou 1/3.
			</Typography>
			<div className="my-4"></div>
			<Typography>
				Le programme permet de calculer les différentes réduites : ce sont
				les fractions qui encadrent la valeur du réel de plus en plus
				proche.
			</Typography>
			<div className="my-4"></div>
			<Typography>
				Cette application est développée en Typescript à l&apos;aide du
				framework NextJS 13 et de l&apos;excellente bibliothèque &quot;{" "}
				<span className="text-orange-500">exactnumber</span> &quot;. Le code
				source du programme est disponible sur mon dépôt GitHub :
			</Typography>
			<Typography fontWeight={"bold"}>
				<div className="my-4"></div>
				<Link
					href="https://github.com/esHome33/frac"
					className="text-orange-600"
				>
					{" "}
					Fractions Continues
				</Link>
			</Typography>
			<div className="my-4"></div>
			<Typography variant="body2">
				Programmé par Etienne les 06 et 07 juin 2023
			</Typography>
		</main>
	);
}

export default About;
