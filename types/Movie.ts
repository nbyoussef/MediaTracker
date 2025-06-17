export interface Genre {
	id: number;
	name: string;
}

export interface Movie {
	genres: Genre[];
	vote_count: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	id: number;
	vote_average: number;
	overview: string;
	runtime: number;
}
