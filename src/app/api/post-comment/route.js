import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const postComments = await prisma.post_categories.findMany()

        return NextResponse.json({ status: "Success", result: postComments });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {
        let reqBody = await req.json();
        const { postId, parentId, title, published, createdAt, publishedAt, content } = reqBody

        const postComment = await prisma.post_categories.create({
            data: {
                postId,
                parentId,
                title,
                published,
                createdAt,
                publishedAt,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: postComment });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();
        const { postId, parentId, title, published, createdAt, publishedAt, content } = reqBody

        const postComment = await prisma.post_categories.update({
            where: { id },
            data: {
                postId,
                parentId,
                title,
                published,
                createdAt,
                publishedAt,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: postComment });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const postComment = await prisma.post_categories.delete({
            where: { id }
        })

        return NextResponse.json({ status: "Success", result: postComment });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
