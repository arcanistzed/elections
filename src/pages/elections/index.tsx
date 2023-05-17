import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import App from "~/components/App";
import { trpc } from "~/utils/trpc";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	return {
		props: await serverSideTranslations(locale ?? "en", ["common", "navbar", "elections"]),
	};
};

const Elections: NextPage = () => {
	const { t } = useTranslation("elections");

	const query = trpc.elections.getGroupedByEnd.useQuery();

	return (
		<App>
			<div className="p-8">
				<h1 className="text-3xl font-bold">{t("title")}</h1>

				{Object.entries(query.data ?? {}).map(([end, elections]) => (
					<section key={end} className="my-4">
						<h2 className="text-xl font-bold">{end}</h2>
						<ul className="list-inside list-disc">
							{elections?.map(election => (
								<li key={election.id} className="text-lg">
									<a href={`/elections/${election.id}`} className="text-blue-200 hover:text-blue-300">
										{election.name}
									</a>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</App>
	);
};

export default Elections;
