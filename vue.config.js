/* eslint-disable prettier/prettier */
module.exports = {
  lintOnSave: false,
  publicPath: "/Slots-App/",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Derivco Slot Machine";
      return args;
    });
  },

  transpileDependencies: ["vuetify"],
};
