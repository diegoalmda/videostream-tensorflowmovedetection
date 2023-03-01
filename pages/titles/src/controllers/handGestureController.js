export default class HandGestureController {
  #view
  #service
  #camera
  constructor({ view, service, camera }) {
    this.#service = service;
    this.#view = view;
    this.#camera = camera
  }
  async init() {
    return this.#loop()
  }
  async #estimateHands() {
    try {
      const hands = this.#service.estimateHands(thios.#camera.video)
      console.log({ hands })
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async #loop() {
    await this.#service.initializeDetector()
    this.#estimateHands()
    this.#view.loop(this.#loop.bind(this)) // bind acessando o this da classe controller não da view
  }

  static async initialize(deps) {
    const controller = new HandGestureController(deps)
    return controller.init()
  }
}