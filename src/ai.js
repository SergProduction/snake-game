import { playerControl } from './game'


const eventEmitter = () => {
  const state = {}
  return {
    subscribe: (channel, fn) => {
      state[channel] = fn
    },
    emit: (channel, ...param) => {
      if (state[channel]) {
        state[channel](...param)
      }
    },
  }
}

export const em = eventEmitter()


// playerControl('ArrowUp')
// playerControl('ArrowDown')
// playerControl('ArrowLeft')
// playerControl('ArrowRight')

em.subscribe('render', (data) => {
  console.log(data)
})
