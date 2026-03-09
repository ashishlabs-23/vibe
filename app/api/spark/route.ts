import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { ideaId } = await req.json();

        // Use ID from session if available
        let userId = (session.user as any).id;
        if (!userId && session.user.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
                select: { id: true }
            });
            if (user) userId = user.id;
        }

        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!ideaId) {
            return NextResponse.json({ error: "Idea ID required" }, { status: 400 });
        }

        // Toggle spark (if exists, delete, else create)
        const existingSpark = await prisma.spark.findUnique({
            where: {
                userId_ideaId: {
                    userId: userId,
                    ideaId,
                },
            },
        });

        if (existingSpark) {
            await prisma.spark.delete({
                where: { id: existingSpark.id },
            });
            return NextResponse.json({ sparked: false });
        } else {
            await prisma.spark.create({
                data: {
                    userId: userId,
                    ideaId,
                },
            });
            return NextResponse.json({ sparked: true });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to process spark" }, { status: 500 });
    }
}
