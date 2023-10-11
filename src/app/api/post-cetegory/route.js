import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma= new PrismaClient();

export async function GET(req, res) {

    try {

        const postCategories = await prisma.post_categories.findMany()

        return NextResponse.json({ status: "Success", result: postCategories });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function POST(req, res) {

    try {
        let reqBody = await req.json();
        const { postId, categoryId } = reqBody

        const postCategory = await prisma.post_categories.create({
            data: {
                postId,
                categoryId
            }
        })


        return NextResponse.json({ status: "Success", result: postCategory });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function PUT(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        let reqBody = await req.json();
        const { postId, categoryId } = reqBody

        const postCategory = await prisma.post_categories.update({
            where: { id },
            data: {
                postId,
                categoryId
            }
        })

        return NextResponse.json({ status: "Success", result: postCategory });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}

export async function DELETE(req, res) {
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id')
        const postCategory = await prisma.post_categories.delete({
            where: { id }
        })
        return NextResponse.json({ status: "Success", result: postCategory });
    } catch (err) {
        return NextResponse.json({ status: "Fail", result: err.toString() });
    }
}
