"use client";
import { Container, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function About() {
	const router = useRouter();
	const [padding_gauche, setPadding_gauche] = useState("0px");

	useEffect(() => {
		if (window.innerWidth < 700) {
			setPadding_gauche("0px");
		} else {
			setPadding_gauche("50px");
		}
		return;
	},[]);

	// `$(padding_gauche)`
	return (
		<main
			className="flex min-h-screen flex-col  p-4"
			style={{ padding: "10px" }}
		>
			<div
				style={{
					textAlign: "center",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<button
					onClick={() => router.back()}
					style={{
						position: "fixed",
						top: "25px",
						left: padding_gauche,
						color: "white",
						padding: "10px",
						paddingRight: "25px",
						paddingLeft: "25px",
						borderRadius: "50px",
						backgroundColor: "seagreen",
					}}
				>
					Retour
				</button>
				<Typography
					variant="h4"
					className="flex-grow"
				>
					Aide - Help
				</Typography>
			</div>

			<Container className="max-w-2xl">
				<div className="my-4"></div>
				<Typography sx={{ textAlign: "justify" }}>
					Ce programme permet de trouver la fraction continue associée à un
					nombre réel (càd entier, rationel ou irrationel){" "}
				</Typography>
				<div className="my-4"></div>
				<Typography sx={{ textAlign: "justify" }}>
					Pour saisir un réel, il faut veiller à utiliser le point au lieu
					de la virgule. Vous pouvez aussi remplacer une séquence
					répétitive dans les décimales par le motif entre parenthèses. Par
					exemple, 2,45718718718... s&apos;écrit 2.45(718).
				</Typography>
				<Typography sx={{ textAlign: "justify" }}>
					On peut également désigner le réel à l&apos;aide d&apos;une
					fraction. Par exemple, saisissez 22/7 ou 1/3.
				</Typography>
				<div className="my-4"></div>
				<Typography sx={{ textAlign: "justify" }}>
					Le programme permet de calculer les différentes réduites : ce
					sont les fractions qui encadrent la valeur du réel de plus en
					plus proche.
				</Typography>
				<div className="my-4"></div>
				<Typography sx={{ textAlign: "justify" }}>
					Cette application est développée en Typescript à l&apos;aide du
					framework NextJS 13 et de l&apos;excellente bibliothèque &quot;{" "}
					<span className="text-orange-500">exactnumber</span> &quot;. Le
					code source du programme est disponible sur mon dépôt GitHub :
					<Link
						href="https://github.com/esHome33/frac"
						className="text-orange-600"
						style={{ fontWeight: "bold" }}
					>
						{" "}
						Fractions Continues
					</Link>
				</Typography>
				<div className="my-4"></div>
				<Typography
					variant="body2"
					sx={{ textAlign: "center" }}
				>
					Programmé par Etienne les 06 et 07 juin 2023
				</Typography>
			</Container>
		</main>
	);
}

export default About;
