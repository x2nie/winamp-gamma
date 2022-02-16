const { Component, Context, useState, mount } = owl;
const { xml } = owl.tags;
const { useRef, useContext } = owl.hooks;
const { whenReady } = owl.utils;

function wait(second, func) {
    return setTimeout(func, second * 1000);
}