/**
* Wallop.js
*
* @fileoverview Minimal JS library to show & hide things
*
* @author Pedro Duarte
* @author http://pedroduarte.me/wallop
*
*/
!function (t) {
  function e(t, e) {
    if (!t)
      throw new Error("Missing selector. Refer to Usage documentation: https://github.com/peduarte/wallop#javascript");
    for (var s = 0; s < l.length; s++)if (l[s] === t)
      throw new Error("An instance of Wallop with this selector already exists.");
    if (this.options = {
      buttonPreviousClass: "Wallop-buttonPrevious",
      buttonNextClass: "Wallop-buttonNext",
      itemClass: "Wallop-item",
      currentItemClass: "Wallop-item--current",
      showPreviousClass: "Wallop-item--showPrevious",
      showNextClass: "Wallop-item--showNext",
      hidePreviousClass: "Wallop-item--hidePrevious",
      hideNextClass: "Wallop-item--hideNext",
      carousel: !0
    }
      , this.whitelist = { form: !0 }
      , t.length > 0 && !this.whitelist[t])
      throw new Error("Selector cannot be an array, Refer to Usage documentation: https://github.com/peduarte/wallop#javascript");
    this.$selector = t, this.options = n(this.options, e), this.event = null, this.reset(), this.buttonPrevious = this.$selector.querySelector(" ." + this.options.buttonPreviousClass), this.buttonNext = this.$selector.querySelector(" ." + this.options.buttonNextClass), this.bindEvents(), this.createCustomEvent(), this.currentItemIndex === -1 && (this.currentItemIndex = 0, i(this.allItemsArray[this.currentItemIndex], this.options.currentItemClass)), this.updateButtonStates(); var o = this; setTimeout(function () { o.event.detail.currentItemIndex = o.currentItemIndex, o.$selector.dispatchEvent(o.event) }, 0)
  }
  function s(t, e) { if (t) return e || (e = document), e.querySelector("." + t) } function i(t, e) {
    t && (t.className = (t.className + " " + e).trim())
  }
  function o(t, e) {
    t && (t.className = t.className.replace(e, "").trim())
  }

  function n(t, e) {
    var s, i = {}; for (s in t) i[s] = t[s]; for (s in e) i[s] = e[s]; return i
  }

  function r(t, e) {
    e = e ||
      { bubbles: !1, cancelable: !1, detail: void 0 }; var s = document.createEvent("CustomEvent"); return s.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), s
  } var l = [], u = e.prototype;

  u.updateButtonStates = function () {
    !this.buttonPrevious && !this.buttonNext || this.options.carousel || (this.currentItemIndex === this.lastItemIndex ? this.buttonNext.setAttribute("disabled", "disabled") : 0 === this.currentItemIndex && this.buttonPrevious.setAttribute("disabled", "disabled"))
  }, u.removeAllHelperSettings = function () {
    o(this.allItemsArray[this.currentItemIndex],
      this.options.currentItemClass),
      o(s(this.options.hidePreviousClass,
        this.$selector), this.options.hidePreviousClass),
      o(s(this.options.hideNextClass, this.$selector),
        this.options.hideNextClass),
      o(s(this.options.showPreviousClass,
        this.$selector), this.options.showPreviousClass),
      o(s(this.options.showNextClass, this.$selector),
        this.options.showNextClass), (this.buttonPrevious || this.buttonNext) && (this.buttonPrevious.removeAttribute("disabled"), this.buttonNext.removeAttribute("disabled"))
  }, u.goTo = function (t) {
    if (t !== this.currentItemIndex && (t = t === -1 && this.options.carousel ? this.lastItemIndex : t, t = t === this.lastItemIndex + 1 && this.options.carousel ? 0 : t, !(t < 0 || t > this.lastItemIndex))) {
      this.removeAllHelperSettings()
      var e = (t > this.currentItemIndex || 0 === t && this.currentItemIndex === this.lastItemIndex) && !(t === this.lastItemIndex && 0 === this.currentItemIndex);
      i(this.allItemsArray[this.currentItemIndex], e ? this.options.hidePreviousClass : this.options.hideNextClass), i(this.allItemsArray[t], this.options.currentItemClass + " " + (e ? this.options.showNextClass : this.options.showPreviousClass)), this.currentItemIndex = t, this.updateButtonStates(), this.event.detail.currentItemIndex = this.currentItemIndex, this.$selector.dispatchEvent(this.event)
    }
  }, u.previous = function () {
    this.goTo(this.currentItemIndex - 1)
  }, u.next = function () {
    this.goTo(this.currentItemIndex + 1)
  }, u.reset = function () {
    this.allItemsArray = Array.prototype.slice.call(this.$selector.querySelectorAll(" ." + this.options.itemClass)), this.currentItemIndex = this.allItemsArray.indexOf(this.$selector.querySelector(" ." + this.options.currentItemClass)), this.lastItemIndex = this.allItemsArray.length - 1
  }, u.bindEvents = function () {
    l.push(this.$selector);
    var t = this;
    this.buttonPrevious && this.buttonPrevious.addEventListener("click", function (e) { e.preventDefault(), t.previous() }), this.buttonNext && this.buttonNext.addEventListener("click", function (e) {
      e.preventDefault(), t.next()
    })
  }, u.on = function (t, e) {
    this.$selector.addEventListener(t, e, !1)
  }, u.off = function (t, e) {
    this.$selector.removeEventListener(t, e, !1)
  }, u.createCustomEvent = function () {
    var t = this;
    this.event = new r("change", { detail: { wallopEl: t.$selector, currentItemIndex: Number(t.currentItemIndex) }, bubbles: !0, cancelable: !0 })
  }, r.prototype = window.CustomEvent ? window.CustomEvent.prototype : {}, window.CustomEvent = r, "function" == typeof define && define.amd ? define(function () {
    return e
  }) : "undefined" != typeof module && module.exports ? module.exports = e : t.Wallop = e
}(this);


/**
 * Main Js
 *
 */
var clientBtn = document.querySelector('.js-clients-btn'),
  clientAll = document.querySelector('.js-clients-all'),
  isClientsOpen = false;

if (clientBtn != null) {
  clientBtn.addEventListener('click', function () {
    if (!isClientsOpen) {
      clientAll.style.display = 'inline';
      //aboutSection.style.display = 'block';
      this.innerHTML = '– clients';
      isClientsOpen = true;
    } else {
      clientAll.style.display = 'none';
      this.innerHTML = '+ clients';
      isClientsOpen = false;
    }

  });
}

//window.onload = function() {
var wallopEl = document.querySelector('.Wallop');
if (wallopEl) {
  var slider = new Wallop(wallopEl);
  window.setInterval(function () {
    slider.next();
  }, 3000)
}
//});



