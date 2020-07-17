class Cs142TemplateProcessor {
	private template: string
	constructor(template: string) {
		this.template = template
	}

	fillIn(hmap: Map<string, string>) {
		for(let key in hmap) {
			const exp = new RegExp(`{{${key}}}`,"gi")
			this.template = this.template.replace(exp, hmap[key]!)
		}
		const exp = new RegExp(`{{[^{}]*}}`,"gi")
		this.template = this.template.replace(exp, "")
		return this.template
	}
}
