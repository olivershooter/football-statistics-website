export const getScoreColor = (
	isHome: boolean,
	isWinner: boolean,
	isTie: boolean,
) => {
	if (isTie) return "text-draw";
	return isWinner === isHome ? "text-pitch" : "text-loss";
};
