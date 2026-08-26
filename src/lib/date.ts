const formatter = new Intl.DateTimeFormat('pt-BR', {
	day: 'numeric',
	month: 'long',
	year: 'numeric'
});

export function friendlyDate(isoDate: string): string {
	return formatter.format(new Date(isoDate));
}
