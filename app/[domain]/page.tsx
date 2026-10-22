export default async function TenantPage(
    props: {
        params: Promise<{ domain: string }>
    }
) {
    const params = await props.params;
    const { domain } = params;

    return (
    <main className="p-8">
        <h1 className="text-2xl font-bold">テナント: {domain}</h1>
        <p>このページは {domain} 向けに動的配信されています。</p>
    </main>
    );
}

export const instant = false;