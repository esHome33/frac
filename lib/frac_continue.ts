import { ExactNumberType, ExactNumber as N } from "exactnumber";
/**
 * une classe qui encapsule une fraction continue, ses coefficients et la valeur réelle.
 * @author Etienne
 */
export default class Fraction_c {
	private static taille_tableaux: number = 300;
	private valeurs: bigint[] = new Array<bigint>(Fraction_c.taille_tableaux);
	private p: bigint[] = new Array<bigint>(Fraction_c.taille_tableaux);
	private q: bigint[] = new Array<bigint>(Fraction_c.taille_tableaux);

	private reel: ExactNumberType = N("0");

	private max_num: number = 0;

	/**
	 *  construit une instance de cette classe. Le constructeur est privé : utiliser les deux membres statiques
	 *  pour créer une nouvelle instance de Fraction_c.
	 */
	private constructor() {}

	/**
	 * 	Créer une fraction continue à l'aide d'un réel passé sous la forme d'une chaine de caractères.
	 * @param le_reel le réel sous la forme d'une chaine de caractères. Ex : 3.1415 => 3,7,14,1,8
	 * @returns la fraction continue approximant au mieux ce réel et contenant ses coefficients
	 */
	public static CreerAPartirDunReel = (le_reel: string) => {
		const resu = new Fraction_c();
		let val = N("0");

		// soit le réel est défini sous forme de fraction soit il est défini par un
		// nombre au format partie entière.partie décimale
		try {
			val = N(le_reel);
		} catch (e: any) {
			throw new Error("ce réel ne convient pas : " + le_reel);
		}

		resu.initialiserPQ();
		resu.reel = val;
		resu.max_num = 0;
		let ent: ExactNumberType;
		let frac: ExactNumberType;
		let isZero: boolean;
		const precisionmax = N("0.00000000000000000000000000000000000000000001");
		do {
			console.log(resu.max_num + " tour : " + val.toString());
			ent = val.intPart();
			frac = val.fracPart();
			const ent_s = ent.toString();
			resu.valeurs[resu.max_num++] = BigInt(ent_s);
			isZero =
				frac.lt(precisionmax) ||
				frac.isZero() ||
				resu.max_num > Fraction_c.taille_tableaux - 2;
			if (!isZero) {
				val = frac.inv();
			}
		} while (!isZero);

		// calcul des coeffs p et q
		for (let i: number = 0; i < resu.max_num; i++) {
			resu.p[i + 2] = resu.valeurs[i] * resu.p[i + 1] + resu.p[i];
			resu.q[i + 2] = resu.valeurs[i] * resu.q[i + 1] + resu.q[i];
		}

		return resu;
	};

	/**
	 * Crée une nouvelle fraction continue à l'aide d'une suite finie de coefficients séparés par des virgules
	 * @param fraction suite de coeffs séparés par des virgules. Ex : 1,2,3 qui correspond au rationnel 10/7
	 */
	public static CreerAPartirDuneFractionContinue = (fraction: string) => {
		const resu = new Fraction_c();
		resu.initialiserPQ();
		if (fraction.includes(",")) {
			let contenu = fraction.split(",");
			let cpt = 0;
			contenu.forEach((element) => {
				const it = BigInt(element);
				resu.valeurs[cpt++] = it;
			});

			// il y a cpt éléments dans la fraction
			resu.max_num = cpt;

			// on va calculer le réel et stocker les dénominateurs et numérateurs des réduites.
			for (let i = 0; i < cpt; i++) {
				resu.p[i + 2] = resu.valeurs[i] * resu.p[i + 1] + resu.p[i];
				resu.q[i + 2] = resu.valeurs[i] * resu.q[i + 1] + resu.q[i];
			}

			resu.reel = N(resu.p[cpt + 1].toString()).div(
				resu.q[cpt + 1].toString()
			);
			return resu;
		} else {
			return undefined;
		}
	};

	/**
	 * initialisation des tableaux P et Q de la fraction continue.
	 */
	private initialiserPQ = () => {
		this.p[0] = BigInt("0");
		this.p[1] = BigInt("1");
		this.q[0] = BigInt("1");
		this.q[1] = BigInt("0");
	};

	/**
	 * retourne la valeur réelle codée par cette fraction continue
	 * @returns une chaine comportant le nombre réel
	 */
	public getReel = () => {
		return this.reel.toString();
	};

	/**
	 *  Fournit la liste des coefficients de la fraction continue
	 * @returns la liste des coefficients de la fraction continue séparée par des virgules
	 */
	public getFractionContinue = () => {
		let resu: string = "";
		for (let i: number = 0; i < this.max_num; i++) {
			resu += this.valeurs[i].toString() + ", ";
		}

		return resu.substring(0, resu.length - 2);
	};

	/**
	 *  Retourne la réduite de rang n
	 * @param rang le rang souhaité (si supérieur à max_num, une exception est levée)
	 * @returns la chaine contenant la fraction réduite d'ordre rang de cette fraction continue
	 */
	public getReduite = (rang: number) => {
		if (rang > this.max_num) {
			throw new Error(
				"il n'y a pas autant de réduites dans cette fraction rationnelle : " +
					rang +
					" (max = " +
					this.max_num +
					")"
			);
		}
		const num = this.p[rang + 2];
		const den = this.q[rang + 2];
		let resu = num.toString();
		if (den != BigInt("1")) {
			resu += " / " + den.toString();
		}
		return resu;
	};

	/**
	 * Fournit une chaine contenant toutes les réduites de cette fraction continue.
	 * @returns une chaine contenant toutes les réduites de this fraction continue
	 */
	public getAllReduites = () => {
		let resu: string[] = [];

		for (let i = 0; i < this.max_num; i++) {
			const numerat = this.p[2 + i].toString();
			const de = this.q[2 + i];
			const denom = de.toString();
			if (de == BigInt("1")) {
				resu.push(numerat);
			} else {
				resu.push(numerat + " / " + denom);
			}
		}

		return resu;
	};

	/**
	 * Retourne le nombre d'éléments contenus dans this fraction continue,
	 * sous forme d'une chaine de caractères.
	 *
	 * @returns le nombre d'éléments dans la fraction continue
	 */
	public getSize = () => {
		return this.max_num + "";
	};
}
