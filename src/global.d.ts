// here we customize the globally accepted Window type for the game items added to it
declare global {
  interface Window extends Window {
    System: { import: Function; config: Function }
    scene: any
    game: any
  }
}

export {}
