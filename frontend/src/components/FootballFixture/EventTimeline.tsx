import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { EventImage } from "./EventImage";

interface EventTimelineProps {
	events: any;
}

export const EventTimeline = ({ events }: EventTimelineProps) => {
	const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [totalItems, setTotalItems] = useState(0);

	useEffect(() => {
		if (!carouselApi) return;

		const updateCarouselState = () => {
			setCurrentIndex(carouselApi.selectedScrollSnap());
			setTotalItems(carouselApi.scrollSnapList().length);
		};

		updateCarouselState();
		carouselApi.on("select", updateCarouselState);

		return () => {
			carouselApi.off("select", updateCarouselState);
		};
	}, [carouselApi]);

	const scrollToIndex = (index: number) => {
		carouselApi?.scrollTo(index);
	};

	return (
		<div className="relative mx-auto max-w-7xl px-5 pb-10">
			<Carousel
				className="z-10 w-full max-w-7xl"
				setApi={setCarouselApi}
				opts={{ loop: true }}
			>
				<CarouselContent>
					{events.map((event: any) => (
						<CarouselItem
							className="flex h-36 items-center justify-center p-4"
							key={event.time.elapsed + event.player.id}
						>
							<div className="flex h-36 w-52 flex-col items-center gap-1.5 rounded-xl border border-white/[0.07] bg-card px-4 py-3 transition-colors hover:border-white/[0.12]">
								<span className="w-full text-left text-xs font-semibold text-pitch">
									{event.time.elapsed}'
								</span>
								<span className="w-full text-center text-sm font-semibold text-foreground leading-tight">
									{event.player.name}
								</span>
								<div className="flex flex-col items-center gap-1">
									<span className="text-center text-xs text-muted-foreground leading-tight">
										{event.detail}
									</span>
									<EventImage eventType={event.type} />
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			{/* Navigation Arrows */}
			<div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-0">
				<Button
					onClick={() => scrollToIndex(currentIndex - 1)}
					className="pointer-events-auto h-full w-12 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent"
				>
					<ChevronLeft className="size-8 text-muted-foreground hover:text-foreground" strokeWidth={1.5} />
				</Button>
				<Button
					onClick={() => scrollToIndex(currentIndex + 1)}
					className="pointer-events-auto h-full w-12 rounded-none bg-transparent p-0 shadow-none hover:bg-transparent"
				>
					<ChevronRight className="size-8 text-muted-foreground hover:text-foreground" strokeWidth={1.5} />
				</Button>
			</div>

			{/* Navigation Dots */}
			<div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5">
				{Array.from({ length: totalItems }).map((_, index) => (
					<button
						type="button"
						key={`dot-${index}`}
						onClick={() => scrollToIndex(index)}
						className={`h-1.5 rounded-full transition-all ${
							currentIndex === index
								? "w-4 bg-pitch"
								: "w-1.5 bg-white/20 hover:bg-white/40"
						}`}
					/>
				))}
			</div>
		</div>
	);
};
