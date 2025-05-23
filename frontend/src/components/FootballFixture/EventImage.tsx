interface EventImageProps {
	eventType: string;
}

export const EventImage = ({ eventType }: EventImageProps) => {
	switch (eventType) {
		case "Goal":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 32 32"
					fill="#000000"
					height="30px"
					width="30px"
				>
					<title>Event Goal</title>

					<path
						d="M27.5,24c1.6-2.3,2.5-5,2.5-8c0-2.7-0.8-5.2-2.1-7.3c0-0.1-0.1-0.1-0.1-0.2C25.3,4.6,21,2,16,2C11,2,6.6,4.6,4.2,8.6
          c0,0.1-0.1,0.1-0.1,0.2c-1.3,2.1-2,4.6-2,7.3c0,3,0.9,5.7,2.5,8c0,0,0.1,0.1,0.1,0.1C7.1,27.7,11.3,30,16,30c4.7,0,8.8-2.3,11.4-5.8
          C27.4,24.1,27.4,24.1,27.5,24z M26,22.5L22.4,23l-1.4-1.4l2-5.8l3.1-1.5l2,1.2c0,0.2,0,0.4,0,0.7C28,18.4,27.3,20.7,26,22.5z
           M25.9,9.3l-0.8,3l-3.2,1.6L17,10.5V6.6l3.4-1.7c0,0,0,0,0,0C22.7,5.8,24.6,7.3,25.9,9.3z M11.5,4.9C11.5,4.9,11.5,4.9,11.5,4.9
          L15,6.6v3.9l-4.9,3.5l-3.3-1.6L6,9.3C7.4,7.3,9.3,5.8,11.5,4.9z M4,15.3l2-1.2l3.1,1.6l2,5.8l-1.4,1.4l-3.7-0.4
          C4.7,20.6,4,18.4,4,16C4,15.8,4,15.5,4,15.3z M12.9,27.6C12.9,27.6,12.9,27.6,12.9,27.6l-1.7-3.4l1.2-1.2h7.2l1.2,1.2l-1.7,3.4
          c0,0,0,0,0,0c-1,0.3-2,0.4-3.1,0.4S13.9,27.8,12.9,27.6z"
					/>
				</svg>
			);
		case "subst":
			return (
				<svg
					fill="#000000"
					height="30px"
					width="30px"
					viewBox="0 0 16 16"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Event Substitue</title>

					<path
						fill="#000000"
						fillRule="evenodd"
						d="M11.297115,8.29289 C11.687615,7.90237 12.320815,7.90237 12.711315,8.29289 L15.418415,11 L12.711315,13.7071 C12.320815,14.0976 11.687615,14.0976 11.297115,13.7071 C10.906615,13.3166 10.906615,12.6834 11.297115,12.2929 L11.590015,12 L2.004215,12 C1.451925,12 1.004215,11.5523 1.004215,11 C1.004215,10.4477 1.451925,10 2.004215,10 L11.590015,10 L11.297115,9.70711 C10.906615,9.31658 10.906615,8.68342 11.297115,8.29289 Z M3.297105,2.29289 C3.687635,1.90237 4.320795,1.90237 4.711325,2.29289 C5.101845,2.68342 5.101845,3.31658 4.711325,3.70711 L4.418425,4 L14.004215,4 C14.556515,4 15.004215,4.44772 15.004215,5 C15.004215,5.55229 14.556515,6 14.004215,6 L4.418425,6 L4.711325,6.29289 C5.101845,6.68342 5.101845,7.31658 4.711325,7.70711 C4.320795,8.09763 3.687635,8.09763 3.297105,7.70711 L0.59,5 L3.297105,2.29289 Z"
					/>
				</svg>
			);
		case "Card":
			return (
				<svg
					fill="#000000"
					height="30px"
					width="30px"
					viewBox="0 0 76 76"
					baseProfile="full"
				>
					<title>Event Card</title>

					<path
						fill="#000000"
						fillOpacity="1"
						strokeLinejoin="round"
						d="M 21.3,17L 46.7,17C 47.418,17 48,17.5821 48,18.3L 48,24.7C 48,25.418 47.418,26 46.7,26L 31.3,26C 30.0298,26 29,27.0298 29,28.3L 29,49.7C 29,50.418 28.418,51 27.7,51L 21.3,51C 20.582,51 20,50.418 20,49.7L 20,18.3C 20,17.582 20.582,17 21.3,17 Z M 33.3,29L 54.7,29C 55.418,29 56,29.582 56,30.3L 56,57.7C 56,58.418 55.418,59 54.7,59L 33.3,59C 32.582,59 32,58.418 32,57.7L 32,30.3C 32,29.582 32.582,29 33.3,29 Z "
					/>
				</svg>
			);
		default:
			return null;
	}
};
