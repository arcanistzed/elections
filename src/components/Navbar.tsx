import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
	const { t } = useTranslation("navbar");
	const { data: sessionData } = useSession();

	const router = useRouter();
	const activeRoute = router.pathname;

	return (
		<nav aria-label="Main navigation" className="bg-blue-900 shadow">
			<ul className="flex flex-wrap">
				<li>
					<Link
						href="/"
						className={`block px-8 py-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-800 ${
							activeRoute === "/" ? "bg-blue-800" : ""
						}`}
					>
						{t("home")}
					</Link>
				</li>
				<li>
					<Link
						href="https:/ieeeuottawa.ca"
						target="_blank"
						rel="noreferrer"
						className="block px-8 py-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-800"
					>
						{t("ieee")}
					</Link>
				</li>
				<li>
					<Link
						href="/elections"
						className={`block px-8 py-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-800 ${
							activeRoute === "/leaderboard" ? "bg-blue-800" : ""
						}`}
					>
						{t("elections")}
					</Link>
				</li>
				<li className="ml-auto">
					<button
						onClick={() => (sessionData ? void signOut() : void signIn())}
						className="block px-8 py-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-800"
					>
						{sessionData ? t("sign-out") : t("sign-in")}
					</button>
				</li>
				<li>
					<Link
						href={router.asPath}
						locale={router.locale === "en" ? "fr" : "en"}
						className="block px-8 py-4 text-lg font-medium transition-colors duration-500 hover:bg-blue-800"
					>
						{router.locale === "en" ? "FR" : "EN"}
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
