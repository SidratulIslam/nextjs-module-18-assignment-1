import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const postMetas = await prisma.post_metas.findMany()

        return NextResponse.json({ status: "Success", result: postMetas });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {

        let reqBody = await req.json();
        const {postId, key, content } = reqBody

        const postMeta = await prisma.post_metas.create({
            data: {
                postId,
                key,
                content
            }
        })


        return NextResponse.json({ status: "Success", result: postMeta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();
        const {postId, key, content } = reqBody

        const postMeta = await prisma.post_metas.update({
            where: { id },
            data: {
                postId,
                key,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: postMeta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const postMeta = await prisma.post_metas.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: postMeta });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
