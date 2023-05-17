import Navbar from "./Navbar";
import { useTranslation } from "next-i18next";

interface AppProps {
	children: React.ReactNode;
}

const App = ({ children }: AppProps) => {
	const { t } = useTranslation("common");

	return (
		<div className="flex h-full flex-col items-stretch">
			<header>
				<Navbar />
			</header>

			<main className="h-fit flex-1">{children}</main>

			<footer className="bg-gray-800 p-4 text-center text-white">
				<p>{t("footer")}</p>
			</footer>
		</div>
	);
};

export default App;
