# slot-machine

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Deploy to github pages

```
npm run deploy
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# Slots-App

This application was for Javascript Developer position at Derivco.

## General Comments

This was application wasn't too big so I didn't need to add state management(Vuex) and really only consisted of two components.
The SlotMachine.vue which hosts the SlotReels.vue. Each SlotReel has there own animation state and are controlled by props passed from SlotMachine e.g. the **duration** prop manages the timing for each reel.

I try to strive for less code and efficient code but sometimes less code doesn't really improve readability e.g. triple nested ternary operators. I try to leave as many comments as possible to explain what is happening on the next line. This is to help me if I were ever to come back and pick up the code, or help a new developer that inherits the code base.

As for general guidelines, I follow the VueJS style guide here https://vuejs.org/v2/style-guide/ and try to be consistent with naming conventions.

## Possible Changes

To keep it simplistic each SlotReel.vue's data is being passed as a prop from SlotMachine.vue down to it. If you wanted to switch out a symbol e.g. a 7 symbol or a Cherry symbol you would make the change in SlotMachine.vue. In addition, to having the reelData SlotMachine.vue also has the paytable legend data. If you were to add, update or delete a symbol this is where you would make the change.

The expansion panel for the debug area is a component wrapper that when wrapping any content e.g.

```js
<ExpansionPanel> Hello World </ExpansionPanel>
```

the contemt will appear in the expansion panel body. If you wanted to say make the paytable legend collapsable you would wrap that div with the expansion panel component.
