import { Link } from "@tanstack/react-router";
import { getScoreColor } from "../Common/GetScoreColor";

interface FootballFixtureCardProps {
	id: number;
	homeTeamName: string;
	homeTeamLogo: string;
	homeTeamScore: number;
	awayTeamName: string;
	awayTeamLogo: string;
	awayTeamScore: number;
	date: string;
	params: number;
}

export const FootballFixtureCards = ({
	id: _id,
	homeTeamName,
	homeTeamLogo,
	homeTeamScore,
	awayTeamName,
	awayTeamLogo,
	awayTeamScore,
	date,
	params,
}: FootballFixtureCardProps) => {
	const isTie = homeTeamScore === awayTeamScore;
	const isHomeWinner = homeTeamScore > awayTeamScore;

	const formattedDate = new Date(date).toLocaleDateString("en-GB", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<Link to="/football/fixtures/$id" params={{ id: params.toString() }}>
			<div className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-card transition-all duration-200 hover:border-pitch/40 hover:shadow-[0_0_24px_rgba(0,232,122,0.08)]">
				{/* Date bar */}
				<div className="border-b border-white/[0.06] px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
					{formattedDate}
				</div>

				{/* Teams + Score */}
				<div className="flex items-center justify-between gap-2 px-4 py-5">
					{/* Home team */}
					<div className="flex flex-1 flex-col items-center gap-2">
						<img
							src={homeTeamLogo}
							alt={`${homeTeamName} logo`}
							className="h-12 w-12 object-contain drop-shadow-sm"
						/>
						<span className="text-center text-xs font-medium leading-tight text-foreground/90">
							{homeTeamName}
						</span>
					</div>

					{/* Score */}
					<div className="flex flex-col items-center gap-0.5">
						<div className="flex items-center gap-1.5 font-bebas text-4xl leading-none">
							<span className={getScoreColor(true, isHomeWinner, isTie)}>
								{homeTeamScore ?? "-"}
							</span>
							<span className="text-muted-foreground/40 text-2xl">:</span>
							<span className={getScoreColor(false, isHomeWinner, isTie)}>
								{awayTeamScore ?? "-"}
							</span>
						</div>
					</div>

					{/* Away team */}
					<div className="flex flex-1 flex-col items-center gap-2">
						<img
							src={awayTeamLogo}
							alt={`${awayTeamName} logo`}
							className="h-12 w-12 object-contain drop-shadow-sm"
						/>
						<span className="text-center text-xs font-medium leading-tight text-foreground/90">
							{awayTeamName}
						</span>
					</div>
				</div>

				{/* View match footer */}
				<div className="border-t border-white/[0.05] px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors group-hover:text-pitch">
					View Match →
				</div>
			</div>
		</Link>
	);
};
