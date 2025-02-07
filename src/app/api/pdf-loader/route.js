import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl = "https://whimsical-bird-678.convex.cloud/api/storage/e7d9a11b-a683-4ac0-912f-1de6b4bdcd48";

export async function GET(req) {
    const reqUrl = req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    console.log(pdfUrl);
    // 1. Load the Pdf file
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
        pdfTextContent += doc.pageContent;
    });

    // 2. Split the text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    const splitterList = [];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    });

    return NextResponse.json({ result: splitterList });
}
