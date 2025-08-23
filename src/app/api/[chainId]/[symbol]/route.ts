import { getTokenDetails } from "@/utils/funkit";


export async function GET(request: Request,
    { params }: { params: Promise<{ symbol: string, chainId: string }> },
) {
    const { symbol, chainId } = await params;

    const tokenInfo = await getTokenDetails({ chainId, symbol })

    return new Response(JSON.stringify({ symbol, tokenInfo }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}