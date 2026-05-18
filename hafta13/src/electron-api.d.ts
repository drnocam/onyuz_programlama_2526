export {}

declare global {
  interface Window {
    electronAPI: {
      getSpecialPaths: () => Promise<{
        home: string
        desktop: string
        documents: string
        downloads: string
        pictures: string
        music: string
        videos: string
      }>
      pickDirectory: () => Promise<string | null>
      readDirectory: (directoryPath: string) => Promise<
        Array<{
          name: string
          path: string
          isDirectory: boolean
          size: number
          modifiedAt: number
        }>
      >
      openPath: (targetPath: string) => Promise<string>
    }
  }
}
