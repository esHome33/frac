"use client";

import Fraction_c from "@/lib/frac_continue";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	Collapse,
	Container,
	FormControl,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { relative } from "path";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const Inputcomp = () => {
	const [fraction, setFraction] = useState("");
	const [mon_reel, setMon_reel] = useState("");
	const [tampon_reel, setTampon_reel] = useState("");
	const [tampon_fc, setTampon_fc] = useState("");
	const [err_msg, setErr_msg] = useState("");
	const [reduites_actif, setReduites_actif] = useState(false);
	const [red, setRed] = useState<string[]>([""]);
	const [calculating, setCalculating] = useState<boolean>(false);
	const [calculatingFC, setCalculatingFC] = useState<boolean>(false);
	const [reel_a_transformer, setReel_a_transformer] = useState<string>("");
	const [fc_a_transformer, setFc_a_transformer] = useState<string>("");



	const valSchema = Yup.object({
		real: Yup.string(),
		fc: Yup.string(),
	});






	const formik = useFormik({
		initialValues: { real: "", fc: "" },
		validationSchema: valSchema,
		onSubmit: async (val) => {
			const le_reel = val.real;
			const la_fc = val.fc;
			const lg_reel = le_reel.length;
			const lg_fc = la_fc.length;
			if (lg_reel > 0) {
				setTampon_reel(le_reel);
				setCalculating(true);
			} else if (lg_fc > 0) {
				setTampon_fc(la_fc);
				setCalculatingFC(true);
			}
		},
	});


	useEffect(() => {
		console.log(`début de useEffect création réel avec ${reel_a_transformer}`);
		setCalculating(true);
		const creation_fc_avec_reel = () => {
			const creer_reel = new Promise<Fraction_c>((resolve, reject) => {
				try {
					const f = Fraction_c.CreerAPartirDunReel(reel_a_transformer);
					resolve(f);
				} catch (error: any) {
					reject(error);
				}
			});
			creer_reel.then((f) => {
				console.log(`création faite OK à partir du réel ${reel_a_transformer}`);
				setMon_reel(f.getReel());
				const la_fraction = f.getFractionContinue();
				const nb_terms = f.getSize();
				setFraction("[" + la_fraction + "] (" + nb_terms + ")");
				setErr_msg("");
				formik.setFieldValue("fc", la_fraction);
				setRed(() => {
					return f.getAllReduites();
				});
				setCalculating(false);
				setReel_a_transformer("");
			}).catch((err) => {
				console.log(`Erreur => ${err.message}`);
				setCalculating(false);
				setReel_a_transformer("");
			});

		}
		if (reel_a_transformer.length !== 0) {
			creation_fc_avec_reel();
			setReel_a_transformer("");
		} else {
			setCalculating(false);
		}
	}, [reel_a_transformer]);


	useEffect(() => {
		console.log(`fc a transformer changed (${fc_a_transformer})`);
		if (fc_a_transformer.length === 0) {
			setCalculatingFC(false);
			return;
		}
		try {
			const f = Fraction_c.CreerAPartirDuneFractionContinue(fc_a_transformer);
			if (f) {
				setMon_reel(() => f.getReel());
				setFraction(() => f.getFractionContinue());
				setErr_msg(() => "");
				setRed(() => {
					return f.getAllReduites();
				});
			} else {
				setErr_msg(() => "doit être de la forme : 1,3,5");
				setFraction(() => "");
				setMon_reel(() => "");
				formik.setFieldValue("fc", "");
			}
		} catch (error: any) {
			setErr_msg(() => "Erreur : " + error.message);
			setFraction(() => "");
			setMon_reel(() => "");
		}
		setCalculatingFC(false);
	}, [fc_a_transformer]);



	useEffect(() => {
		console.log(`calculating = ${calculating} et réel = ${tampon_reel}`);
		setReel_a_transformer(tampon_reel);
		setTampon_reel("");
	}, [calculating]);

	useEffect(() => {
		console.log(`calculating FC = ${calculatingFC} et fc  = ${tampon_fc}`);
		setFc_a_transformer(tampon_fc);
		setTampon_fc("");
	}, [calculatingFC]);


	return (
		<Container className="max-w-lg bg-green-400 rounded-lg p-4 text-blue-800 mb-10">
			<form
				onSubmit={formik.handleSubmit}
				className="p-4 text-center w-full"
			>
				<FormControl className="w-full">
					<Typography
						fontSize={12}
						fontWeight={"bold"}
						color={"darkblue"}
						textAlign="center"
						className="bg-cyan-100 rounded drop-shadow-md p-2 mb-4 "
					>
						Saisie d&apos;un réel ou d&apos;une fraction continue
					</Typography>
					<div className="h-4"></div>
					<TextField
						color={"primary"}
						id="real"
						name="real"
						type="text"
						label="nombre réel (ex : 2.4)"
						helperText={formik.errors.real}
						error={Boolean(formik.errors.real)}
						onChange={(e) => {
							formik.setFieldValue("fc", "");
							formik.handleChange(e)
						}}
						value={formik.values.real}
						className="mb-4"
					/>
					<div className="h-4"> </div>
					<TextField
						color={"primary"}
						id="fc"
						name="fc"
						type="text"
						label="fraction continue (ex : 3,7,14,1,8)"
						helperText={formik.errors.fc}
						error={Boolean(formik.errors.fc)}
						onChange={(e) => {
							formik.setFieldValue("real", "");
							formik.handleChange(e);
						}}
						value={formik.values.fc}
					/>
					<div className="h-4"> </div>
					<Box
						sx={{ m: 1, position: 'relative', marginX: 'auto' }}
					>
						{(calculating || calculatingFC) ? (<Box height={36}>...</Box>) :
							<Button
								variant="outlined"
								type="submit"
								disabled={
									Boolean(formik.errors.real) || Boolean(formik.errors.fc) || (reel_a_transformer.length > 0)
								}
								disableElevation
							>
								Lance le calcul
							</Button>
						}


						<CircularProgress
							variant="indeterminate"
							thickness={7.0}
							hidden={!calculating && !calculatingFC}
							sx={{
								position: "absolute",
								top: '0%',
								left: '36%',
								color: '#DFD',

							}}
						/>
					</Box>
				</FormControl>
			</form>

			<div className="h-4"> </div>

			<Card
				about="card"
				elevation={3}
				className="mt-4"
			>
				<CardHeader title="Résultats"></CardHeader>
				<CardActions disableSpacing>
					<Button
						variant="outlined"
						sx={{marginX:'auto'}}
						onClick={(e: any) => {
							e.preventDefault();
							setReduites_actif(!reduites_actif);
						}}
					>
						{reduites_actif ? "Fermer réduites" : "Afficher réduites"}
					</Button>
				</CardActions>
				<CardContent>
					{mon_reel.length == 0 ? (
						<></>
					) : (
						<>
							<Typography variant="body2">nombre réel :</Typography>
							<Typography
								variant="body1"
								className="bg-green-100 rounded-md drop-shadow p-2 mb-2 overflow-auto"
							>
								{mon_reel}
							</Typography>
						</>
					)}

					{fraction.length == 0 ? (
						<Typography
							variant="body1"
							className="mb-2 text-green-800 text-center"
						>
							la fraction sera affichée ici
						</Typography>
					) : (
						<>
							<Typography variant="body2">
								Fraction continue :
							</Typography>
							<Typography
								variant="body1"
								className="mb-2"
							>
								{fraction}
							</Typography>
						</>
					)}
					{err_msg.length === 0 ? (
						<></>
					) : (
						<div className="bg-red-100 rounded-md drop-shadow p-2 text-center">
							{err_msg}
						</div>
					)}

					<Collapse in={reduites_actif}>
						<CardContent>
							{red.map((elt, index) => {
								return (
									<Typography
										variant="body2"
										key={index}
									>
										{elt}
									</Typography>
								);
							})}
						</CardContent>
					</Collapse>
				</CardContent>
			</Card>
		</Container>
	);
};

export default Inputcomp;
