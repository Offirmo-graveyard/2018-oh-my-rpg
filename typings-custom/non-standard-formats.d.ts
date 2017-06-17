// using typescript 2 wildcard

declare module '*!json' {
	const content: {
		[k: string]: any
	}
	export default content
}
