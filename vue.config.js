/* eslint-disable prettier/prettier */
module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Derivco Slot Machine";
      return args;
    });
  },

  transpileDependencies: ["vuetify"],
};
