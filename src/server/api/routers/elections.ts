import type { Election } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const electionsRouter = createTRPCRouter({
	getGroupedByEnd: publicProcedure.query(async ({ ctx }) => {
		return (
			await ctx.prisma.election.findMany({
				select: {
					id: true,
					name: true,
					end: true,
				},
				orderBy: {
					end: "desc",
				},
			})
		).reduce((acc, curr) => {
			const year = new Date(curr.end).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year]?.push(curr);
			return acc;
		}, {} as Record<number, Pick<Election, "id" | "name">[]>);
	}),
});
