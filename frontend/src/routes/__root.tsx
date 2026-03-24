import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => (
		<>
			<nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/95 backdrop-blur-md">
				<div className="container flex h-16 items-center justify-between">
					<Link to="/" className="font-bebas text-2xl tracking-widest text-pitch">
						KICKOFF
					</Link>
					<div className="flex items-center gap-8">
						<Link
							to="/"
							className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground [&.active]:text-pitch"
						>
							HOME
						</Link>
						<Link
							to="/football/fixtures"
							className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground [&.active]:text-pitch"
						>
							FIXTURES
						</Link>
					</div>
				</div>
			</nav>
			<div className="container pt-8 pb-16">
				<Outlet />
			</div>
		</>
	),
});
