import templateData from '../mockData/template.json'

class TemplateService {
  constructor() {
    this.data = [...templateData]
    this.idCounter = Math.max(...this.data.map(item => parseInt(item.id))) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.data]
  }

  async getById(id) {
    await this.delay()
    const item = this.data.find(template => template.id === id)
    return item ? { ...item } : null
  }

  async create(templateData) {
    await this.delay()
    const newTemplate = {
      id: Date.now().toString(),
      name: templateData.name || '',
      formula: templateData.formula || '',
      category: templateData.category || 'basic',
      gradeLevel: templateData.gradeLevel || 1,
      description: templateData.description || '',
      createdAt: new Date().toISOString()
    }
    this.data.push(newTemplate)
    return { ...newTemplate }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.data.findIndex(template => template.id === id)
    if (index === -1) throw new Error('Template not found')
    
    this.data[index] = { 
      ...this.data[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.data.findIndex(template => template.id === id)
    if (index === -1) throw new Error('Template not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getByCategory(category) {
    await this.delay()
    return this.data.filter(template => template.category === category).map(item => ({ ...item }))
  }

  async getByGradeLevel(gradeLevel) {
    await this.delay()
    return this.data.filter(template => template.gradeLevel <= gradeLevel).map(item => ({ ...item }))
  }
}

export default new TemplateService()