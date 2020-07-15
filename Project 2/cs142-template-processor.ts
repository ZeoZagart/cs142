interface Map {
	[key: string]: string
}

class Cs142TemplateProcessor {
	private template: string
	constructor(template: string) {
		this.template = template
	}

	fillIn(hmap: Map) {
		for(let key in hmap) {
			const exp = new RegExp(`{{${key}}}`,"gi")
			this.template = this.template.replace(exp, hmap[key])
		}
		return this.template
	}
}
