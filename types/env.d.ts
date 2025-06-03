export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			EXPO_PUBLIC_TMDB_API_URL: string;
			EXPO_PUBLIC_TMDB_API_KEY: string;
		}
	}
}
