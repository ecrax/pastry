import { authedProcedure, t } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const groupRouter = t.router({
  getAllWhereUser: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany({
      where: { users: { some: { user_id: ctx.session.user.id } } },
    });
  }),
  getByIdWhereUser: authedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.group.findFirstOrThrow({
        where: {
          AND: [
            { users: { some: { user_id: ctx.session.user.id } } },
            { id: input.groupId },
          ],
        },
      });
    }),
  getPastes: authedProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.paste.findMany({
        where: {
          AND: [
            { group: { users: { some: { user_id: ctx.session.user.id } } } },
            { group_id: input.groupId },
          ],
        },
      });
    }),
  addPaste: authedProcedure
    .input(z.object({ groupId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = await ctx.prisma.group.findFirstOrThrow({
        where: {
          AND: [
            { users: { some: { user_id: ctx.session.user.id } } },
            { id: input.groupId },
          ],
        },
      });

      if (id !== input.groupId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to create pastes in this group",
        });

      return ctx.prisma.paste.create({
        data: {
          content: input.content,
          group_id: input.groupId,
          created_by_id: ctx.session.user.id,
        },
      });
    }),
});
