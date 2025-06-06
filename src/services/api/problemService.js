import problemData from '../mockData/problem.json'

class ProblemService {
  constructor() {
    this.data = [...problemData]
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
    const item = this.data.find(problem => problem.id === id)
    return item ? { ...item } : null
  }

  async create(problemData) {
    await this.delay()
    const newProblem = {
      id: Date.now().toString(),
      question: problemData.question || '',
      formula: problemData.formula || '',
      answer: problemData.answer || 0,
      difficulty: problemData.difficulty || 'easy',
      hints: [...(problemData.hints || [])],
      createdAt: new Date().toISOString()
    }
    this.data.push(newProblem)
    return { ...newProblem }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.data.findIndex(problem => problem.id === id)
    if (index === -1) throw new Error('Problem not found')
    
    this.data[index] = { 
      ...this.data[index], 
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...this.data[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.data.findIndex(problem => problem.id === id)
    if (index === -1) throw new Error('Problem not found')
    
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getByDifficulty(difficulty) {
    await this.delay()
    return this.data.filter(problem => problem.difficulty === difficulty).map(item => ({ ...item }))
  }
}

export default new ProblemService()