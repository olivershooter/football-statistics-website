import { getScoreColor } from "@/components/Common/GetScoreColor";
import { SectionHeader } from "@/components/Common/SectionHeader";
import { EventTimeline } from "@/components/FootballFixture/EventTimeline";
import { ShirtSVG } from "@/components/FootballFixture/ShirtSVG";
import { useGetRequest } from "@/hooks/useGetRequest";
import { createFileRoute } from "@tanstack/react-router";

const API_OPTIONS = {
	url: "/api/football/fixtures",
};

export const Route = createFileRoute("/football/fixtures/$id")({
	component: FootballFixture,
});

function FootballFixture() {
	const { id } = Route.useParams();

	const { data, error, isPending } = useGetRequest({
		url: `${API_OPTIONS.url}?id=${id}`,
		queryKey: `${id}`,
		gcTime: 1000 * 60 * 60 * 24 * 7,
	});

	if (error) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<div className="rounded-xl border border-loss/20 bg-loss/[0.06] px-8 py-6 text-center text-loss">
					Error loading fixture: {error.message}
				</div>
			</div>
		);
	}

	if (isPending) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-pitch" />
					<span className="text-sm text-muted-foreground">Loading match...</span>
				</div>
			</div>
		);
	}

	const fixtureData = data.response[0];
	const { teams, league, score, fixture, events, lineups, statistics } =
		fixtureData;

	const newDate = new Date(fixture.date).toLocaleString("en-GB", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	const positionMap: Record<string, string> = {
		D: "DEF",
		G: "GK",
		M: "MID",
		F: "FWD",
	};

	const isTie = score.fulltime.home === score.fulltime.away;
	const isHomeWinner = score.fulltime.home > score.fulltime.away;

	const renderScoreHero = () => (
		<div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-card">
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pitch/[0.03] to-transparent" />

			{/* League badge */}
			<div className="relative flex items-center justify-center gap-2 border-b border-white/[0.06] py-3">
				<img
					src={league.logo}
					alt={league.name}
					className="h-5 w-5 object-contain"
				/>
				<span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					{league.name} · {league.season}
				</span>
			</div>

			{/* Score row */}
			<div className="relative flex items-center justify-between gap-4 px-6 py-8 sm:px-12">
				{/* Home */}
				<div className="flex flex-1 flex-col items-center gap-3">
					<img
						src={teams.home.logo}
						alt={teams.home.name}
						className="h-16 w-16 object-contain sm:h-20 sm:w-20"
					/>
					<span className="text-center font-bebas text-xl tracking-wide text-foreground sm:text-2xl">
						{teams.home.name}
					</span>
				</div>

				{/* Score */}
				<div className="flex flex-col items-center gap-1">
					<div className="flex items-center gap-2">
						<span
							className={`font-bebas text-6xl leading-none sm:text-7xl ${getScoreColor(true, isHomeWinner, isTie)}`}
						>
							{score.fulltime.home}
						</span>
						<span className="font-bebas text-4xl text-muted-foreground/30">
							:
						</span>
						<span
							className={`font-bebas text-6xl leading-none sm:text-7xl ${getScoreColor(false, isHomeWinner, isTie)}`}
						>
							{score.fulltime.away}
						</span>
					</div>
					<span className="text-xs text-muted-foreground">
						HT {score.halftime.home} – {score.halftime.away}
					</span>
				</div>

				{/* Away */}
				<div className="flex flex-1 flex-col items-center gap-3">
					<img
						src={teams.away.logo}
						alt={teams.away.name}
						className="h-16 w-16 object-contain sm:h-20 sm:w-20"
					/>
					<span className="text-center font-bebas text-xl tracking-wide text-foreground sm:text-2xl">
						{teams.away.name}
					</span>
				</div>
			</div>

			{/* Match meta */}
			<div className="relative grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
				{[
					{ label: "Status", value: fixture.status.short },
					{ label: "Venue", value: fixture.venue.name },
					{ label: "Referee", value: fixture.referee ?? "—" },
				].map(({ label, value }) => (
					<div key={label} className="flex flex-col items-center py-4 px-3">
						<span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
							{label}
						</span>
						<span className="mt-1 text-center text-sm font-medium text-foreground/90 leading-tight">
							{value}
						</span>
					</div>
				))}
			</div>
		</div>
	);

	const renderLineup = (teamIndex: number) => {
		const team = lineups[teamIndex];
		return (
			<div className="space-y-2">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="font-bebas text-xl tracking-wide text-foreground">
						{team.team.name}
					</h3>
					<span className="rounded-full border border-white/[0.08] bg-secondary px-3 py-1 text-xs text-muted-foreground">
						{team.formation}
					</span>
				</div>
				{team.startXI.map(({ player }: { player: any }) => (
					<div
						key={player.id}
						className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-secondary/60 px-3 py-2.5 transition-colors hover:border-white/10 hover:bg-secondary"
					>
						<div className="flex items-center gap-3">
							<ShirtSVG
								width={32}
								height={32}
								playersNumber={player.number ? player.number.toString() : "?"}
								colour={
									team.team.colors.player.primary
										? `#${team.team.colors.player.primary}`
										: "#333333"
								}
								alt={player.name}
							/>
							<span className="text-sm font-medium text-foreground/90">
								{player.name}
							</span>
						</div>
						<span className="rounded bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
							{positionMap[player.pos] || player.pos}
						</span>
					</div>
				))}
			</div>
		);
	};

	const renderStatBar = (
		homeVal: string | number | null,
		awayVal: string | number | null,
		label: string,
	) => {
		const parseVal = (v: string | number | null) => {
			if (v === null || v === undefined) return 0;
			if (typeof v === "string" && v.endsWith("%"))
				return Number.parseInt(v, 10);
			return Number(v) || 0;
		};

		const home = parseVal(homeVal);
		const away = parseVal(awayVal);
		const total = home + away;
		const homePct = total > 0 ? (home / total) * 100 : 50;
		const isPercentage =
			typeof homeVal === "string" && homeVal?.endsWith("%");

		return (
			<div key={label} className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="font-semibold tabular-nums text-foreground">
						{homeVal ?? "—"}
					</span>
					<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						{label}
					</span>
					<span className="font-semibold tabular-nums text-foreground">
						{awayVal ?? "—"}
					</span>
				</div>
				{isPercentage && (
					<div className="flex h-1.5 w-full overflow-hidden rounded-full bg-secondary">
						<div
							className="h-full bg-pitch transition-all"
							style={{ width: `${homePct}%` }}
						/>
						<div
							className="h-full flex-1 bg-muted-foreground/30"
						/>
					</div>
				)}
			</div>
		);
	};

	const renderStatistics = () => {
		const homeStats = statistics[0].statistics;
		const awayStats = statistics[1].statistics;
		const statTypes = [
			"Ball Possession",
			"Shots on Goal",
			"Corner Kicks",
			"Yellow Cards",
		];

		const getStat = (stats: any[], type: string) =>
			stats.find((s: any) => s.type === type)?.value;

		return (
			<div className="space-y-5">
				{statTypes.map((stat) =>
					renderStatBar(getStat(homeStats, stat), getStat(awayStats, stat), stat),
				)}
			</div>
		);
	};

	const renderRound = () => {
		if (!league.round.includes("Regular Season")) {
			return (
				<span className="rounded-full border border-white/[0.08] bg-secondary px-3 py-1 text-xs text-muted-foreground">
					{league.round}
				</span>
			);
		}
		return null;
	};

	return (
		<div className="mx-auto max-w-4xl space-y-10">
			{/* Score hero */}
			<div>{renderScoreHero()}</div>

			{/* Match details */}
			<div>
				<SectionHeader title="Match Details" svgName="whistle" />
				<div className="flex flex-wrap items-center justify-center gap-3">
					<span className="rounded-full border border-white/[0.08] bg-secondary px-4 py-1.5 text-sm text-muted-foreground">
						{newDate}
					</span>
					{renderRound()}
				</div>
			</div>

			{/* Lineups */}
			<div>
				<SectionHeader title="Lineups" svgName="lineup" />
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<div>{renderLineup(0)}</div>
					<div>{renderLineup(1)}</div>
				</div>
			</div>

			{/* Events */}
			<div>
				<SectionHeader title="Event Timeline" svgName="timeline" />
				<EventTimeline events={events} />
			</div>

			{/* Statistics */}
			<div>
				<SectionHeader title="Statistics" svgName="stats" />
				{/* Team name headers */}
				<div className="mb-6 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<img
							src={teams.home.logo}
							alt={teams.home.name}
							className="h-6 w-6 object-contain"
						/>
						<span className="text-sm font-semibold">{teams.home.name}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-sm font-semibold">{teams.away.name}</span>
						<img
							src={teams.away.logo}
							alt={teams.away.name}
							className="h-6 w-6 object-contain"
						/>
					</div>
				</div>
				{renderStatistics()}
			</div>
		</div>
	);
}
