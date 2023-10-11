import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const posts = await prisma.posts.findMany()

        return NextResponse.json({ status: "Success", result: posts });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {
        let reqBody = await req.json();

        const { authorId, parentId, title, metaTitle, slug, summary, published, createdAt, updatedAt, publishedAt, content } = reqBody

        const post = await prisma.posts.create({
            data: {
                authorId,
                parentId,
                title,
                metaTitle,
                slug,
                summary,
                published,
                createdAt,
                updatedAt,
                publishedAt,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: post });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();

        const { authorId, parentId, title, metaTitle, slug, summary, published, createdAt, updatedAt, publishedAt, content } = reqBody

        const post = await prisma.posts.update({
            where: { id },
            data: {
                authorId,
                parentId,
                title,
                metaTitle,
                slug,
                summary,
                published,
                createdAt,
                updatedAt,
                publishedAt,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: post });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const post = await prisma.posts.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: post });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
