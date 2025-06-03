import { MovieType } from "@/types/Movie";

type WatchlistAction =
	| { type: "added"; movie: MovieType }
	| { type: "deleted"; movieID: number };

export default function watchlistReducer(
	watchlist: MovieType[],
	action: WatchlistAction
) {
	switch (action.type) {
		case "added": {
			return [...watchlist, action.movie];
		}
		case "deleted": {
			return watchlist.filter((movie) => movie.id !== action.movieID);
		}
		default: {
			return watchlist;
		}
	}
}
