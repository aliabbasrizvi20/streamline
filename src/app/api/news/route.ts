import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");

    const apiKey =
      "886007129a29af502a84aaf8a0a2e55a";

    let url = "";

    if (query) {
      url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        query
      )}&lang=en&apikey=${apiKey}`;
    } else {
      url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${apiKey}`;
    }

    const response = await fetch(url, {
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error("News API Error:", error);

    return NextResponse.json(
      {
        articles: [],
      },
      {
        status: 500,
      }
    );
  }
}