import { NextResponse } from "next/server";
import NameStone, { AuthenticationError, NetworkError } from "namestone-sdk";
const ns = new NameStone(process.env.NEXT_PUBLIC_NAMESTONE_APIKEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, domain, address, coin_types } = body;

    if (!name || !domain || !address || !coin_types) {
      return NextResponse.json(
        { error: "Missing required parameters." },
        { status: 400 }
      );
    }

    const response = await ns.setName({
      name,
      domain,
      address,
      coin_types
    });

    return NextResponse.json({
      message: "Name set successfully",
      data: response
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: "Authentication failed", message: error.message },
        { status: 401 }
      );
    } else if (error instanceof NetworkError) {
      return NextResponse.json(
        { error: "Network error", message: error.message },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred", message: error },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: Request) {
  try {
    const response = await ns.getNames({
      domain: "vinaysingh.eth"
    });

    if (response.length > 0) {
      return NextResponse.json({
        message: `Found ${response.length} name(s).`,
        names: response
      });
    } else {
      return NextResponse.json({
        message: "No names found for the specified domain and address.",
        names: []
      });
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: "Authentication failed", message: error.message },
        { status: 401 }
      );
    } else if (error instanceof NetworkError) {
      return NextResponse.json(
        { error: "Network error", message: error.message },
        { status: 503 }
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred", message: error.message },
        { status: 500 }
      );
    }
  }
}
