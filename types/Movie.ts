export interface Genre {
	id: number;
	name: string;
}

export interface ProductionCompany {
	id: number;
	name: string;
	logo_path: string;
	origin_country: string;
}

export interface Movie {
	production_companies: ProductionCompany[];
	revenue: number;
	budget: number;
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
