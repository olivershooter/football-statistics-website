import { HorizontalLine } from "./HorizontalLine";

export const SectionHeader = ({
	title,
	svgName,
}: {
	title: string;
	svgName?: string;
}) => (
	<div className="mb-6 py-2">
		<div className="flex items-center gap-4">
			<div className="h-px flex-1 bg-white/[0.07]" />
			<div className="flex flex-col items-center gap-1">
				{svgName && <HorizontalLine svgName={svgName} />}
				<h2 className="font-bebas text-xl tracking-[0.15em] text-foreground/80 sm:text-2xl">
					{title.toUpperCase()}
				</h2>
			</div>
			<div className="h-px flex-1 bg-white/[0.07]" />
		</div>
	</div>
);
