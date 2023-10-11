import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {
    try {

        const tags = await prisma.tags.findMany()

        return NextResponse.json({ status: "Success", result: tags });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {
    try {

        let reqBody = await req.json();
        const { title, metaTitle, slug, content } = reqBody

        const tag = await prisma.tags.create({
            data: {
                title,
                metaTitle,
                slug,
                content
            }
        })


        return NextResponse.json({ status: "Success", result: tag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();
        const { title, metaTitle, slug, content } = reqBody

        const tag = await prisma.tags.update({
            where: { id },
            data: {
                title,
                metaTitle,
                slug,
                content
            }
        })

        return NextResponse.json({ status: "Success", result: tag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const tag = await prisma.tags.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: tag });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
