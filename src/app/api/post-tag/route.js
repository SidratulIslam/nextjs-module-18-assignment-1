import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const postTags = await prisma.post_tags.findMany()

        return NextResponse.json({ status: "Success", result: postTags });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {
        let reqBody = await req.json();
        const { postId, tagId } = reqBody

        const postTag = await prisma.post_tags.create({
            data: {
                postId,
                tagId
            }
        })


        return NextResponse.json({ status: "Success", result: postTag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();
        const { postId, tagId } = reqBody

        const postTag = await prisma.post_tags.update({
            where: { id },
            data: {
                postId,
                tagId
            }
        })

        return NextResponse.json({ status: "Success", result: postTag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const postTag = await prisma.post_tags.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: postTag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
