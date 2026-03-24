import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

const stats = [
	{ value: "8", label: "Leagues" },
	{ value: "6", label: "Seasons" },
	{ value: "✓", label: "Live Data" },
];

function Index() {
	return (
		<div className="-mt-8 -mx-8 min-h-screen">
			{/* Hero */}
			<div
				className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 text-center"
				style={{
					background:
						"radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,232,122,0.07) 0%, transparent 60%), linear-gradient(180deg, #0a0a0f 0%, #0b0d14 100%)",
				}}
			>
				{/* Grid pattern */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.04]"
					style={{
						backgroundImage: `linear-gradient(rgba(0,232,122,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,232,122,0.5) 1px, transparent 1px)`,
						backgroundSize: "80px 80px",
					}}
				/>

				{/* Content */}
				<div className="relative z-10 flex flex-col items-center">
					<span className="mb-6 inline-flex items-center gap-2 rounded-full border border-pitch/25 bg-pitch/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-pitch">
						<span className="h-1.5 w-1.5 rounded-full bg-pitch" />
						Live Football Data
					</span>

					<h1
						className="font-bebas leading-none tracking-wide text-white"
						style={{ fontSize: "clamp(3.5rem, 12vw, 9rem)" }}
					>
						Every Match.
						<br />
						<span className="text-pitch">Every Stat.</span>
					</h1>

					<p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
						Premier League, La Liga, Serie A, Bundesliga and more — real data,
						real insights.
					</p>

					<Link
						to="/football/fixtures"
						className="mt-8 inline-flex items-center gap-2 rounded-lg bg-pitch px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-pitch/90 hover:shadow-[0_0_40px_rgba(0,232,122,0.35)]"
					>
						Browse Fixtures
						<span aria-hidden>→</span>
					</Link>
				</div>

				{/* Stat pills */}
				<div className="relative z-10 mt-20 flex flex-wrap justify-center gap-4">
					{stats.map(({ value, label }) => (
						<div
							key={label}
							className="flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-6 py-3 backdrop-blur-sm"
						>
							<span className="font-bebas text-2xl text-pitch">{value}</span>
							<span className="text-sm text-muted-foreground">{label}</span>
						</div>
					))}
				</div>

				{/* Bottom fade */}
				<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
			</div>
		</div>
	);
}
