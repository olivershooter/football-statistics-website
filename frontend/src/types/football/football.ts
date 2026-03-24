export interface FootballFixtures {
	id: number;
	teams: {
		home: {
			name: string;
			logo: string;
		};
		away: {
			name: string;
			logo: string;
		};
	};
	fixture: {
		date: string;
		id: number;
	};
	score: {
		fulltime: {
			away: number;
			home: number;
		};
	};
}

export interface Player {
	id: number;
	name: string;
	number?: number;
	pos: string;
}

// The API wraps each player in a { player: Player } envelope inside startXI/substitutes
export interface LineupPlayer {
	player: Player;
}

export interface Lineup {
	team: {
		id: number;
		name: string;
		logo: string;
		colors: {
			player: { primary: string; number: string; border: string };
			goalkeeper: { primary: string; number: string; border: string };
		};
	};
	formation: string;
	startXI: LineupPlayer[];
	substitutes: LineupPlayer[];
}

export interface StatisticsItem {
	type: string;
	value: string | number | null;
}

export interface Statistics {
	statistics: StatisticsItem[];
}

export interface Team {
	id: number;
	name: string;
	logo: string;
	winner: boolean;
}

export interface Event {
	time: {
		elapsed: number;
		extra: number | null;
	};
	team: {
		id: number;
		name: string;
		logo: string;
	};
	player: {
		id: number;
		name: string;
		photo?: string;
	};
	assist?: {
		id: number | null;
		name: string | null;
	};
	type:
		| "Goal"
		| "Card"
		| "subst"
		| "Missed Penalty"
		| "Penalty Scored"
		| "Red Card"
		| "VAR Review"
		| string;
	detail: string;
	comments?: string;
}

export type MatchStatus = {
	long: string;
	short: string;
	elapsed: number;
	extra: number | null;
};

export type Fixture = {
	id: number;
	referee: string | null;
	timezone: string;
	date: string;
	timestamp: number;
	status: MatchStatus;
	period: {
		first: number;
		second: number;
	};
	venue: {
		id: number;
		name: string;
		city: string;
	};
};

export interface League {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	round: string;
	standings: boolean;
}

export interface Score {
	halftime: { home: number; away: number };
	fulltime: { home: number; away: number };
	extratime: { home: number | null; away: number | null };
	penalty: { home: number | null; away: number | null };
}

export interface Teams {
	home: Team;
	away: Team;
}

export interface FootballFixture {
	fixture: Fixture;
	league: League;
	teams: Teams;
	goals: { home: number; away: number };
	score: Score;
	events: Event[];
	lineups: Lineup[];
	statistics: Statistics[];
}

export interface FootballFixtureResponse {
	response: FootballFixture[];
}

export interface FootballFixtureQuery {
	get: string;
	parameters: { id: string };
	errors: unknown[];
	results: number;
	paging: { current: number; total: number };
	response: FootballFixture[];
}

export type FootballFixtureRouteParams = {
	id: string;
};
