export interface GitHubFile {
  name: string
  path: string
  downloadUrl: string
  size: number
}

export class GitHubStorage {
  private token: string
  private owner: string
  private repo: string
  
  constructor() {
    this.token = process.env.GITHUB_TOKEN!
    this.owner = process.env.GITHUB_OWNER!
    this.repo = process.env.GITHUB_REPO!
  }

  /**
   * Get file download URL from GitHub
   */
  async getFileUrl(filePath: string): Promise<string> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`)
    }

    const data = await response.json()
    return data.download_url
  }

  /**
   * Get file content as base64
   */
  async getFileContent(filePath: string): Promise<string> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${filePath}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3.raw'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    return base64
  }

  /**
   * List all files in a course folder
   */
  async listCourseFiles(courseId: string): Promise<GitHubFile[]> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${courseId}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to list files: ${response.statusText}`)
    }

    const files = await response.json()
    
    return files
      .filter((file: any) => file.type === 'file' && file.name.endsWith('.pdf'))
      .map((file: any) => ({
        name: file.name,
        path: file.path,
        downloadUrl: file.download_url,
        size: file.size
      }))
  }

  /**
   * Generate temporary access URL (expires in 15 mins)
   */
  async generateTempUrl(filePath: string, userId: string): Promise<string> {
    const baseUrl = await this.getFileUrl(filePath)
    
    // Add timestamp and user hash for tracking
    const timestamp = Date.now()
    const expiresAt = timestamp + (15 * 60 * 1000) // 15 minutes
    
    // In production, you'd encrypt this
    const token = Buffer.from(`${userId}:${expiresAt}`).toString('base64')
    
    return `${baseUrl}?token=${token}`
  }
}