class KeysManager {
  constructor() {
    this.keysListening = [];
    this.keysPressing = [];
    this.nextId = 0;

    this.init();
  }

  init() {
    window.addEventListener("keydown", ({ key }) => {
      this.keysPressing = this.keysPressing.includes(key)
        ? this.keysPressing
        : [...this.keysPressing, key.toLowerCase()];

      const keysCombination = this.keysPressing.join("+");

      this.matchKey(keysCombination);
    });

    window.addEventListener("keyup", ({ key }) => {
      const keyFormatted = key.toLowerCase();

      this.keysPressing = this.keysPressing.filter(
        (keyPressing) => keyFormatted !== keyPressing
      );
    });
  }

  matchKey(keyCombination) {
    const matches = this.keysListening.filter(
      ({ keyMatch }) => keyMatch === keyCombination
    );

    matches.forEach(({ callback }) => callback());
  }

  on(keyMatch, callback) {
    this.keysListening = [
      ...this.keysListening,
      { keyMatch, callback, id: this.nextId },
    ];

    this.nextId++;
  }

  off(idRemoved) {
    this.keysListening = this.keysListening.filter(
      ({ id }) => id !== idRemoved
    );
  }
}

export const keysManager = new KeysManager();
