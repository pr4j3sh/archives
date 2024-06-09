function checkColorSupport() {
  try {
    const supportsColor = require("supports-color"); // v5.3.0

    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      // load colors array
      console.log("supports color");
    }
  } catch (error) {
    console.log(error);
  }
}

function debug() {
  //   exports.init = init;
  //   exports.log = log;
  //   exports.formatArgs = formatArgs;
  //   exports.save = save;
  //   exports.load = load;
  //   exports.useColors = useColors;
  //   exports.destroy = util.deprecate(() => {},
  //   "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  //   exports.colors = [6, 2, 3, 4, 5, 1];
  //   checkColorSupport();

  exports.inspectOpts = Object.keys(process.env)
    .filter((key) => {
      console.log("---------------------------------------");
      console.log("key -> ", key);
      console.log("---------------------------------------");
      return /^debug_/i.test(key);
    })
    .reduce((obj, key) => {
      // Convert environment variables to camel-case properties in `inspectOpts`
      console.log("obj -> ", obj);
      console.log("{ obj, key } -> ", "{ " + obj + ", " + key + " }");
      const subProp = key.substring(6);
      console.log("substring prop -> ", subProp);
      const lowerProp = subProp.toLowerCase();
      console.log("lower prop -> ", lowerProp);
      const prop = lowerProp.replace(/_([a-z])/g, (_, k) => {
        console.log("lower prop -> ", k);
        return k.toUpperCase();
      });
      console.log("prop -> ", prop);

      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }

      console.log("val -> ", val);

      obj[prop] = val;
      console.log("obj -> ", obj);
      console.log("---------------------------------------");
      return obj;
    }, {});

  console.log(exports);
}

module.exports = debug;
