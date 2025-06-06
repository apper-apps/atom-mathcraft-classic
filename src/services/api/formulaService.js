import formulaData from '../mockData/formula.json'

class FormulaService {
  constructor() {
    this.data = [...formulaData]
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
    const item = this.data.find(formula => formula.id === id)
    return item ? { ...item } : null
  }

  async create(formulaData) {
    await this.delay()
    const newFormula = {
      id: Date.now().toString(),
      expression: formulaData.expression || '',
      variables: [...(formulaData.variables || [])],
      result: formulaData.result || 0,
      steps: [...(formulaData.steps || [])],
      gradeLevel: formulaData.gradeLevel || 1,
      createdAt: new Date().toISOString()
    }
    this.data.push(newFormula)
    return { ...newFormula }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.data.findIndex(formula => formula.id === id)
    if (index === -1) throw new Error('Formula not found')
    
    this.data[index] = { 
      ...this.data[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.data.findIndex(formula => formula.id === id)
    if (index === -1) throw new Error('Formula not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getByGradeLevel(gradeLevel) {
    await this.delay()
    return this.data.filter(formula => formula.gradeLevel <= gradeLevel).map(item => ({ ...item }))
  }
}

export default new FormulaService()