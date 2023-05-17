import type { GetServerSidePropsContext, GetStaticProps, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth/next";
import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import { authOptions } from "../../server/auth";

import App from "../../components/App";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	// If there is a session, redirect to the home page
	if (session) {
		return { redirect: { destination: "/" } };
	}

	const providers = (await getProviders()) as Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider & { image?: string }
	> | null;

	if (providers && providers["azure-ad"]) {
		providers["azure-ad"].image = "/images/uOttawa.svg";
	}

	return {
		props: {
			providers: providers ?? [],
			...(await serverSideTranslations(context.locale ?? "en", ["common", "navbar", "sign-in"])),
		},
	};
};

const SignIn = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<App>
			<div className="flex min-h-screen flex-col items-center justify-center p-4">
				<div className="flex w-full max-w-md flex-col items-center justify-center space-y-4 rounded-lg border-2 bg-white px-4 py-8 shadow-xl">
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						<Image src="/images/IEEE.svg" alt="Logo" width={100} height={100} />
						<h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
					</div>
					<div className="flex w-full flex-col items-center justify-center space-y-2">
						{Object.values(providers).map(provider => (
							<div key={provider.name} className="flex flex-col items-center justify-center gap-4">
								{provider.image && (
									<Image src={provider.image} alt={provider.name} width={50} height={50} />
								)}
								<button
									className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									onClick={() => void signIn(provider.id)}
								>
									Sign in with {provider.name}
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</App>
	);
};

export default SignIn;
