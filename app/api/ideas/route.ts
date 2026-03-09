/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    try {
        const ideas = await prisma.idea.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { name: true, image: true } },
                _count: { select: { sparks: true } },
            },
        });
        return NextResponse.json(ideas);
    } catch (error) {
        console.error("PRISMA ERROR IN BUILD:", error);
        return NextResponse.json({ error: "Failed to fetch ideas" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, category } = await req.json();

        if (!title || !content || !category) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Use the ID from the session if it exists (NextAuth allows this in the session callback)
        // If not, fall back to looking up the user by email
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

        const newIdea = await prisma.idea.create({
            data: {
                title,
                content,
                category,
                authorId: userId,
            },
        });

        return NextResponse.json(newIdea);
    } catch {
        return NextResponse.json({ error: "Failed to create idea" }, { status: 500 });
    }
}
