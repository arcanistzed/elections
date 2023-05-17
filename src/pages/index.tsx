import type { GetStaticProps, NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";
import Link from "next/link";
import App from "~/components/App";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale ?? "en", ["common", "navbar", "index"]),
	};
};

const Home: NextPage = () => {
	const { t } = useTranslation("index");

	return (
		<>
			<Head>
				<title>{t("title")}</title>
				<meta name="description" content={t("description") ?? "IEEE uOttawa Elections"} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<App>
				<div className="flex h-full flex-col items-center justify-center gap-8">
					<h1 className="max-w-6xl break-words bg-gradient-to-r from-cyan-400 to-indigo-600 bg-clip-text p-8 py-2 text-center font-mono text-4xl font-bold leading-snug text-transparent sm:text-6xl sm:leading-snug md:text-8xl md:leading-snug">
						{t("title")}
					</h1>
					<p className="text-center text-2xl font-bold text-gray-400">{t("description")}</p>
					<Button />
				</div>
			</App>
		</>
	);
};

export default Home;

const Button: React.FC = () => {
	const { data: sessionData } = useSession();
	const { t } = useTranslation("index");

	return sessionData ? (
		<Link href="/elections">
			<button className="rounded-lg bg-blue-900 py-4 px-8 text-xl text-white transition-colors duration-500 hover:bg-blue-800">
				{t("see-elections")}
			</button>
		</Link>
	) : (
		<button
			className="rounded-lg bg-blue-900 py-4 px-8 text-xl text-white transition-colors duration-500 hover:bg-blue-800"
			onClick={() => void signIn()}
		>
			{t("sign-in")}
		</button>
	);
};
