(function(window, factory, undefined) {
  // Set Objects
  var preset, action, out;

  // Touch Iframe Support
  try {
    document.createElement("iframe");
  } catch (e) {
    return console.error("iframe not support");
  }

  // Preset
  preset = {
    // Time
    time: 60 * 1000,
    // Width
    width: "375",
    // Height
    height: "667",
    // Border
    frameborder: 0,
    // No Scroll
    scrolling: "no"
  };

  // Action
  action = {
    // Timeout
    timeout: function(callback, time) {
      // Set Timeout
      out = setTimeout(function() {
        // Get Type
        var stop = callback() === false;

        // Stop
        if (stop) {
          return cleatTimeout(out);
        }

        // Recursion
        action.timeout(callback, time);
      }, time);
    },

    // Merge Object
    merge: function(origin, target) {
      // New Json
      var json = {};

      // Clone ?
      for (var i in origin) {
        json[i] = origin[i];
      }

      // Merge ?
      for (var i in target) {
        json[i] = target[i];
      }

      return json;
    },

    // Ness
    ness: function(option, container, proxy) {
      // Clean
      if (proxy) {
        container.removeChild(proxy);
      }

      // Create
      proxy = action.createFrame(option);

      // Append
      container.appendChild(proxy);

      // Return
      return proxy;
    },

    // Create Frame Object
    createFrame: function(option) {
      // Create Node
      var node = document.createElement("iframe");

      // Set Attributes
      this.setFrame(node, option);

      // Return
      return node;
    },

    // Set Frame Option
    setFrame: function(frame, option) {
      // Set Option into Frame
      for (var key in option) {
        // Set Attribute
        frame.setAttribute(key, option[key]);
      }
    }
  };

  // Proxy
  window.iframeRefresh = factory(preset, action);
})(
  // Injection Global
  window,

  // Factory
  function(preset, action) {
    // Return
    return function(selector, url, option) {
      // Parameter Default
      if (!selector) {
        // Use Body as Container
      }

      if (!url) {
        return console.log("url is required !");
      }

      // Option Merge
      option = action.merge(preset, option || {});

      // Set Url
      option.src = url;

      // Get Node
      var container = selector
        ? document.querySelector(selector)
        : document.body;

      // Set Proxy
      var proxy = action.ness(option, container);

      // Insert Frame
      action.timeout(function() {
        // Ness
        proxy = action.ness(option, container, proxy);
      }, option.time);
    };
  }
);
