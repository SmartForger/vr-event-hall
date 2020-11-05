// here we customize the globally accepted Window type for the game items added to it
declare global {
  interface Window extends Window {
    System: { import: Function; config: Function }
    state: any
    scene: any
    game: any
    ///////////////////////////////////////
    // Babylon Scene Loader Window Hooks //
    ///////////////////////////////////////
    loadScene: (sceneFile: string, queryString: string = null) => void
    updateStatus: (status: string, details: string, state: number) => void
    updateProgress: (progress: number) => void
    loadSceneComplete: () => void
    ///////////////////////////////////////
    // Babylon Web Socket Window Hooks   //
    ///////////////////////////////////////
    socketConnect: (connection) => void
  }
}

export {}
