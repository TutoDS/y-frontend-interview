type ColorsResponseType = {
	colors: {
		timestamp: number;
		hex: string;
		id: number;
		tags: {
			timestamp: number;
			id: number;
			name: string;
		}[];
	}[];

	// have other properties, but not used on this case
};

export { ColorsResponseType };
